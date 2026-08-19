import React, { useState, useRef } from 'react';
import { Plus, Search, Upload, Download, Trash2, Edit3, CheckCircle2, AlertCircle, Info, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface Step1DataProdukProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  onNext: () => void;
}

export const Step1DataProduk: React.FC<Step1DataProdukProps> = ({
  products,
  setProducts,
  onNext
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // New product form state
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState('Skincare');
  const [formPrice, setFormPrice] = useState('99000');
  const [formOrigPrice, setFormOrigPrice] = useState('149000');
  const [formStock, setFormStock] = useState('100');
  const [formDesc, setFormDesc] = useState('');
  const [formPromo, setFormPromo] = useState('');

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSelect = (id: string) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, selected: !p.selected } : p));
  };

  const selectAll = (checked: boolean) => {
    setProducts(prev => prev.map(p => ({ ...p, selected: checked })));
  };

  const handleDelete = (id: string) => {
    if (confirm('Hapus produk ini dari katalog Live?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    if (editingProduct) {
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? {
        ...p,
        name: formName,
        category: formCategory,
        price: parseInt(formPrice) || 0,
        originalPrice: parseInt(formOrigPrice) || 0,
        stock: parseInt(formStock) || 0,
        description: formDesc,
        promoText: formPromo
      } : p));
      setEditingProduct(null);
    } else {
      const newProd: Product = {
        id: `prod-${Date.now()}`,
        name: formName,
        category: formCategory,
        price: parseInt(formPrice) || 99000,
        originalPrice: parseInt(formOrigPrice) || 149000,
        stock: parseInt(formStock) || 50,
        soldCount: 0,
        image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&auto=format&fit=crop&q=80',
        description: formDesc || 'Produk unggulan dengan kualitas terbaik untuk pelanggan setia Anda.',
        benefits: ['Kualitas terjamin BPOM', 'Bahan premium aman dipakai', 'Packaging eksklusif'],
        promoText: formPromo || 'Promo Spesial Sesi Live!',
        selected: true
      };
      setProducts(prev => [newProd, ...prev]);
    }

    setShowAddModal(false);
    setFormName('');
    setFormDesc('');
  };

  const handleCsvImport = () => {
    const sampleCsvNames = [
      'Toner Hydrating Essence',
      'Clay Mask Purifying Detox',
      'Eye Cream Peptide Booster',
      'Lip Tint Glow Natural'
    ];
    const newItems: Product[] = sampleCsvNames.map((name, idx) => ({
      id: `csv-${Date.now()}-${idx}`,
      name,
      category: 'Skincare',
      price: 85000 + (idx * 20000),
      originalPrice: 125000 + (idx * 20000),
      stock: 75,
      soldCount: 12,
      image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=500&auto=format&fit=crop&q=80',
      description: `Produk impor CSV: ${name} formulasi mutakhir teruji klinis.`,
      benefits: ['Mencerahkan & melembabkan', 'Tekstur ringan', 'Hemat pemakaian 2 bulan'],
      promoText: 'Diskon kilat CSV import!',
      selected: true
    }));

    setProducts(prev => [...newItems, ...prev]);
    alert(`Berhasil mengimpor ${newItems.length} produk dari file CSV!`);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      alert(`File "${files[0].name}" berhasil diunggah dan ditambahkan ke RAG Knowledge Base!`);
    }
  };

  const selectedCount = products.filter(p => p.selected).length;

  return (
    <div className="space-y-6">
      
      {/* Step Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-600/20 text-blue-400 text-xs font-bold border border-blue-500/30">
              STEP 1
            </span>
            <h2 className="text-xl font-bold text-white">Data Produk</h2>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Unggah atau tambahkan produk yang akan dipromosikan AI ke dalam RAG Knowledge Base.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleCsvImport}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
            id="btn-import-csv"
          >
            <Download className="w-4 h-4 text-cyan-400" />
            <span>Import CSV</span>
          </button>

          <button
            onClick={() => {
              setEditingProduct(null);
              setFormName('');
              setFormDesc('');
              setShowAddModal(true);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/20 transition-all"
            id="btn-tambah-produk"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Produk</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Products Table + Right Upload Box */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Search + Table */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari produk (nama, kategori)..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
              id="search-input-produk"
            />
          </div>

          {/* Table Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                  <tr>
                    <th className="p-3 w-10 text-center">
                      <input
                        type="checkbox"
                        checked={selectedCount === products.length && products.length > 0}
                        onChange={(e) => selectAll(e.target.checked)}
                        className="rounded border-slate-700 bg-slate-800 text-blue-600 focus:ring-0 cursor-pointer"
                      />
                    </th>
                    <th className="p-3">Produk</th>
                    <th className="p-3">Harga</th>
                    <th className="p-3">Stok</th>
                    <th className="p-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredProducts.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-slate-500">
                        Tidak ada produk ditemukan. Tambah produk baru atau import CSV.
                      </td>
                    </tr>
                  ) : (
                    filteredProducts.map((prod) => (
                      <tr 
                        key={prod.id} 
                        className={`hover:bg-slate-800/40 transition-colors ${prod.selected ? 'bg-blue-950/10' : ''}`}
                      >
                        <td className="p-3 text-center">
                          <input
                            type="checkbox"
                            checked={prod.selected || false}
                            onChange={() => toggleSelect(prod.id)}
                            className="rounded border-slate-700 bg-slate-800 text-blue-600 focus:ring-0 cursor-pointer"
                          />
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={prod.image}
                              alt={prod.name}
                              className="w-10 h-10 rounded-lg object-cover bg-slate-800 border border-slate-700"
                            />
                            <div>
                              <p className="font-semibold text-white">{prod.name}</p>
                              <span className="inline-block text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 mt-0.5">
                                {prod.category}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="font-semibold text-cyan-400">
                            Rp{prod.price.toLocaleString('id-ID')}
                          </div>
                          {prod.originalPrice && (
                            <div className="text-[10px] text-slate-500 line-through">
                              Rp{prod.originalPrice.toLocaleString('id-ID')}
                            </div>
                          )}
                        </td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${
                            prod.stock > 30 ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/40' : 'bg-amber-950 text-amber-300 border border-amber-800/40'
                          }`}>
                            {prod.stock} pcs
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => {
                                setEditingProduct(prod);
                                setFormName(prod.name);
                                setFormCategory(prod.category);
                                setFormPrice(prod.price.toString());
                                setFormOrigPrice(prod.originalPrice?.toString() || '');
                                setFormStock(prod.stock.toString());
                                setFormDesc(prod.description);
                                setFormPromo(prod.promoText || '');
                                setShowAddModal(true);
                              }}
                              className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors"
                              title="Edit Produk"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDelete(prod.id)}
                              className="p-1.5 rounded-lg hover:bg-rose-900/40 text-slate-400 hover:text-rose-300 transition-colors"
                              title="Hapus Produk"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Table Footer */}
            <div className="p-3 bg-slate-950/60 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Total {products.length} Produk ({selectedCount} Terpilih untuk Live)</span>
              <div className="flex items-center gap-1">
                <button className="px-2.5 py-1 rounded bg-blue-600 text-white font-medium">1</button>
                <button className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300">2</button>
                <button className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300">3</button>
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Drag Drop Upload + Tips */}
        <div className="space-y-4">
          
          {/* Upload Area */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragActive(false);
              alert('Media berhasil diunggah ke pipeline AI!');
            }}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[220px] ${
              dragActive 
                ? 'border-blue-500 bg-blue-950/20' 
                : 'border-slate-700 hover:border-slate-600 bg-slate-900/50 hover:bg-slate-900/80'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,video/*"
              className="hidden"
              onChange={handleFileUpload}
            />
            <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center mb-3">
              <Upload className="w-6 h-6 text-blue-400" />
            </div>
            <h4 className="text-sm font-semibold text-white">Upload Gambar / Video</h4>
            <p className="text-xs text-slate-400 mt-1">
              Drag & drop atau klik untuk upload
            </p>
            <span className="text-[10px] text-slate-500 mt-2 bg-slate-800 px-2 py-0.5 rounded">
              Format: JPG, PNG, MP4 (Max 200MB)
            </span>
          </div>

          {/* Tips Card */}
          <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold">
              <Sparkles className="w-4 h-4" />
              <span>Tips Produk AI Live</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Gunakan foto produk berlatar belakang bersih dan deskripsi yang mencantumkan keunggulan utama (USP). AI akan menggunakan data ini untuk merespon chat pembeli secara akurat 24/7.
            </p>
          </div>

          {/* Next Step Action */}
          <button
            onClick={onNext}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all active:scale-98 flex items-center justify-center gap-2"
            id="btn-next-to-step2"
          >
            <span>Lanjut: Pilih AI Host</span>
            <span>→</span>
          </button>

        </div>

      </div>

      {/* Add / Edit Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">
                {editingProduct ? 'Edit Produk' : 'Tambah Produk Baru'}
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Nama Produk</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Contoh: Serum Brightening Niacinamide 10%"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Kategori</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Skincare">Skincare</option>
                    <option value="Makeup">Makeup</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Gadget">Gadget & Tech</option>
                    <option value="Paket">Paket Bundling</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Stok Awal</label>
                  <input
                    type="number"
                    value={formStock}
                    onChange={(e) => setFormStock(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Harga Live (Rp)</label>
                  <input
                    type="number"
                    required
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    placeholder="99000"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Harga Coret (Rp)</label>
                  <input
                    type="number"
                    value={formOrigPrice}
                    onChange={(e) => setFormOrigPrice(e.target.value)}
                    placeholder="149000"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Deskripsi & Keunggulan (Untuk AI RAG)</label>
                <textarea
                  rows={3}
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  placeholder="Jelaskan manfaat utama, kandungan bahan, dan aturan pakai..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Promo Live Khusus</label>
                <input
                  type="text"
                  value={formPromo}
                  onChange={(e) => setFormPromo(e.target.value)}
                  placeholder="Contoh: Diskon 30% + Gratis Pouch Exclusive"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-md"
                >
                  Simpan Produk
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
