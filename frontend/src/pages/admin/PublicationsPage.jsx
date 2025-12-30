import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, FileText, Upload, Download, Loader2 } from 'lucide-react';
import { publicationsAPI } from '@/lib/api';

const PublicationsPage = () => {
    const [publications, setPublications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        category: 'Laporan',
        file: null,
    });

    useEffect(() => {
        fetchPublications();
    }, []);

    const fetchPublications = async () => {
        try {
            setLoading(true);
            const response = await publicationsAPI.getAll();
            setPublications(response.data.data || []);
        } catch (error) {
            console.error('Error fetching publications:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const data = new FormData();
            data.append('name', formData.name);
            data.append('category', formData.category);
            if (formData.file) {
                data.append('file', formData.file);
            }

            if (editingId) {
                await publicationsAPI.update(editingId, data);
            } else {
                await publicationsAPI.create(data);
            }

            setIsModalOpen(false);
            setEditingId(null);
            setFormData({ name: '', category: 'Laporan', file: null });
            fetchPublications();
        } catch (error) {
            console.error('Error saving publication:', error);
            alert('Gagal menyimpan publikasi');
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (publication) => {
        setEditingId(publication._id);
        setFormData({
            name: publication.name,
            category: publication.category,
            file: null,
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (!confirm('Apakah Anda yakin ingin menghapus publikasi ini?')) return;

        try {
            await publicationsAPI.delete(id);
            fetchPublications();
        } catch (error) {
            console.error('Error deleting publication:', error);
            alert('Gagal menghapus publikasi');
        }
    };

    const openAddModal = () => {
        setEditingId(null);
        setFormData({ name: '', category: 'Laporan', file: null });
        setIsModalOpen(true);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Publications</h1>
                    <p className="text-gray-500">Kelola laporan dan manual book</p>
                </div>
                <button
                    onClick={openAddModal}
                    className="flex items-center gap-2 bg-rose-600 text-white px-4 py-2 rounded-lg hover:bg-rose-700 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Tambah Publikasi
                </button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <Loader2 className="w-8 h-8 animate-spin text-rose-600" />
                    </div>
                ) : publications.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                        <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>Belum ada publikasi</p>
                    </div>
                ) : (
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="text-left p-4 font-medium text-gray-600">Nama</th>
                                <th className="text-left p-4 font-medium text-gray-600">Kategori</th>
                                <th className="text-left p-4 font-medium text-gray-600">Tanggal</th>
                                <th className="text-left p-4 font-medium text-gray-600">File</th>
                                <th className="text-right p-4 font-medium text-gray-600">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {publications.map((pub) => (
                                <tr key={pub._id} className="hover:bg-gray-50">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center">
                                                <FileText className="w-5 h-5 text-rose-600" />
                                            </div>
                                            <span className="font-medium text-gray-900">{pub.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                            pub.category === 'Laporan' 
                                                ? 'bg-blue-100 text-blue-700' 
                                                : 'bg-green-100 text-green-700'
                                        }`}>
                                            {pub.category}
                                        </span>
                                    </td>
                                    <td className="p-4 text-gray-500">
                                        {new Date(pub.createdAt).toLocaleDateString('id-ID')}
                                    </td>
                                    <td className="p-4">
                                        {pub.file && pub.file[0] && (
                                            <a
                                                href={pub.file[0]}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-1 text-rose-600 hover:underline"
                                            >
                                                <Download className="w-4 h-4" />
                                                Download
                                            </a>
                                        )}
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => handleEdit(pub)}
                                                className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(pub._id)}
                                                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 m-4">
                        <h2 className="text-xl font-bold mb-4">
                            {editingId ? 'Edit Publikasi' : 'Tambah Publikasi'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Nama Publikasi
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                                    placeholder="Laporan Triwulan I 2025"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Kategori
                                </label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                                >
                                    <option value="Laporan">Laporan</option>
                                    <option value="Manual Book">Manual Book</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    File PDF {editingId && '(kosongkan jika tidak ingin mengubah)'}
                                </label>
                                <div className="flex items-center gap-2 p-3 border-2 border-dashed rounded-lg hover:border-rose-500 transition-colors">
                                    <Upload className="w-5 h-5 text-gray-400" />
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        onChange={(e) => setFormData({ ...formData, file: e.target.files[0] })}
                                        className="flex-1 text-sm"
                                        required={!editingId}
                                    />
                                </div>
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
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

export default PublicationsPage;
