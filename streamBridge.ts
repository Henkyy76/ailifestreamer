import { spawn, type ChildProcessWithoutNullStreams } from 'node:child_process';
import { existsSync } from 'node:fs';
import ffmpegStaticPath from 'ffmpeg-static';

export interface StreamStartOptions {
  rtmpUrl: string;
  streamKey: string;
  inputUrl?: string;
}

export interface StreamStatus {
  state: 'idle' | 'starting' | 'running' | 'stopped' | 'error';
  pid?: number;
  message: string;
  startedAt?: string;
}

let ffmpegProcess: ChildProcessWithoutNullStreams | null = null;
let status: StreamStatus = { state: 'idle', message: 'Stream bridge belum dijalankan.' };

function getFfmpegPath(): string {
  const configuredPath = process.env.FFMPEG_PATH;
  if (configuredPath && existsSync(configuredPath)) return configuredPath;
  if (ffmpegStaticPath && existsSync(ffmpegStaticPath)) return ffmpegStaticPath;
  return process.platform === 'win32' ? 'ffmpeg.exe' : 'ffmpeg';
}

export function getStreamStatus(): StreamStatus {
  return { ...status, pid: ffmpegProcess?.pid };
}

export function startStream(options: StreamStartOptions): StreamStatus {
  if (process.env.VERCEL) {
    throw new Error('Streaming worker harus dijalankan di VPS atau komputer lokal, bukan Vercel serverless.');
  }
  if (ffmpegProcess) return getStreamStatus();
  if (!options.rtmpUrl.startsWith('rtmp://') && !options.rtmpUrl.startsWith('rtmps://')) {
    throw new Error('RTMP URL tidak valid.');
  }
  if (!options.streamKey.trim()) throw new Error('Stream key wajib diisi.');

  const destination = `${options.rtmpUrl.replace(/\/$/, '')}/${options.streamKey}`;
  const input = options.inputUrl || 'testsrc=size=1280x720:rate=30';
  const inputArgs = options.inputUrl
    ? ['-reconnect', '1', '-i', input]
    : ['-f', 'lavfi', '-i', input];
  const args = [
    '-hide_banner', '-loglevel', 'warning',
    ...inputArgs,
    '-f', 'lavfi', '-i', 'anullsrc=channel_layout=stereo:sample_rate=44100',
    '-shortest', '-c:v', 'libx264', '-preset', 'veryfast', '-tune', 'zerolatency',
    '-pix_fmt', 'yuv420p', '-r', '30', '-g', '60', '-c:a', 'aac', '-b:a', '128k',
    '-f', 'flv', destination
  ];

  status = { state: 'starting', message: 'Menghubungkan encoder ke RTMP...' };
  const child = spawn(getFfmpegPath(), args, { windowsHide: true });
  ffmpegProcess = child;

  child.on('spawn', () => {
    status = { state: 'running', message: 'Encoder berjalan dan mencoba mengirim stream ke RTMP.', startedAt: new Date().toISOString() };
  });
  child.on('error', error => {
    ffmpegProcess = null;
    status = { state: 'error', message: `FFmpeg tidak dapat dijalankan: ${error.message}` };
  });
  child.on('exit', (code, signal) => {
    ffmpegProcess = null;
    if (status.state !== 'error') {
      status = { state: code === 0 ? 'stopped' : 'error', message: `Encoder berhenti (code=${code}, signal=${signal || 'none'}).` };
    }
  });

  return getStreamStatus();
}

export function stopStream(): StreamStatus {
  if (!ffmpegProcess) {
    status = { state: 'stopped', message: 'Tidak ada encoder yang sedang berjalan.' };
    return getStreamStatus();
  }
  ffmpegProcess.kill('SIGTERM');
  status = { state: 'stopped', message: 'Encoder sedang dihentikan.' };
  return getStreamStatus();
}
