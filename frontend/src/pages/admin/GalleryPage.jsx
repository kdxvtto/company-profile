import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Image, Upload, Loader2, X } from 'lucide-react';
import { galleryAPI } from '@/lib/api';
import Pagination from '@/components/admin/Pagination';

const GalleryPage = () => {
    const [gallery, setGallery] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [saving, setSaving] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        image: null,
    });
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        fetchGallery(currentPage);
    }, [currentPage]);

    const fetchGallery = async (page = 1) => {
        try {
            setLoading(true);
            const response = await galleryAPI.getAll({ page, limit: 12 });
            setGallery(response.data.data || []);
            if (response.data.pagination) {
                setTotalPages(response.data.pagination.totalPages || 1);
            }
        } catch (error) {
            console.error('Error fetching gallery:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, image: file });
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const data = new FormData();
            data.append('title', formData.title);
            data.append('content', formData.content);
            if (formData.image) {
                data.append('image', formData.image);
            }

            if (editingId) {
                await galleryAPI.update(editingId, data);
            } else {
                await galleryAPI.create(data);
            }

            closeModal();
            fetchGallery(currentPage);
        } catch (error) {
            console.error('Error saving gallery:', error);
            alert('Gagal menyimpan galeri');
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (item) => {
        setEditingId(item._id);
        setFormData({
            title: item.title,
            content: item.content,
            image: null,
        });
        setPreview(item.image?.[0] || null);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (!confirm('Apakah Anda yakin ingin menghapus galeri ini?')) return;

        try {
            await galleryAPI.delete(id);
            fetchGallery(currentPage);
        } catch (error) {
            console.error('Error deleting gallery:', error);
            alert('Gagal menghapus galeri');
        }
    };

    const openAddModal = () => {
        setEditingId(null);
        setFormData({ title: '', content: '', image: null });
        setPreview(null);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingId(null);
        setFormData({ title: '', content: '', image: null });
        setPreview(null);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Gallery</h1>
                    <p className="text-gray-500">Kelola galeri foto kegiatan</p>
                </div>
                <button
                    onClick={openAddModal}
                    className="flex items-center justify-center gap-2 bg-rose-600 text-white px-4 py-2 rounded-lg hover:bg-rose-700 transition-colors w-full sm:w-auto"
                >
                    <Plus className="w-5 h-5" />
                    Tambah Galeri
                </button>
            </div>

            {/* Content */}
            <div className="bg-white rounded-xl shadow-lg p-6">
                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <Loader2 className="w-8 h-8 animate-spin text-rose-600" />
                    </div>
                ) : gallery.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                        <Image className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>Belum ada galeri</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {gallery.map((item) => (
                            <div key={item._id} className="group relative bg-gray-100 rounded-xl overflow-hidden aspect-square">
                                {item.image?.[0] ? (
                                    <img
                                        src={item.image[0]}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                        <Image className="w-12 h-12 text-gray-400" />
                                    </div>
                                )}
                                
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="absolute bottom-0 left-0 right-0 p-4">
                                        <h3 className="text-white font-semibold truncate">{item.title}</h3>
                                        <p className="text-white/80 text-sm line-clamp-2">{item.content}</p>
                                    </div>
                                    
                                    {/* Action Buttons */}
                                    <div className="absolute top-3 right-3 flex gap-2">
                                        <button
                                            onClick={() => handleEdit(item)}
                                            className="p-2 bg-white/90 rounded-lg text-blue-600 hover:bg-white transition-colors"
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item._id)}
                                            className="p-2 bg-white/90 rounded-lg text-red-600 hover:bg-white transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Pagination */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold">
                                {editingId ? 'Edit Galeri' : 'Tambah Galeri'}
                            </h2>
                            <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-lg">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Image Preview */}
                            <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden relative">
                                {preview ? (
                                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                                        <Image className="w-12 h-12 mb-2" />
                                        <span>Pilih gambar</span>
                                    </div>
                                )}
                                <label className="absolute inset-0 cursor-pointer">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                        required={!editingId}
                                    />
                                </label>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Judul
                                </label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                                    placeholder="Judul galeri"
                                    required
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Deskripsi
                                </label>
                                <textarea
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 resize-none"
                                    rows={3}
                                    placeholder="Deskripsi galeri"
                                    required
                                />
                            </div>
                            
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="flex-1 px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                                    {saving ? 'Menyimpan...' : 'Simpan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GalleryPage;
