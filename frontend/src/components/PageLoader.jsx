import { Loader2 } from 'lucide-react';

const PageLoader = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-slate-50 flex items-center justify-center">
            <div className="text-center">
                <Loader2 className="w-12 h-12 animate-spin text-rose-600 mx-auto mb-4" />
                <p className="text-gray-600 font-medium">Memuat halaman...</p>
            </div>
        </div>
    );
};

export default PageLoader;
