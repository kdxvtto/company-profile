import { Component } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ error, errorInfo });
        // Log error to service (e.g., Sentry)
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    handleRefresh = () => {
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-slate-50 flex items-center justify-center p-4">
                    <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <AlertTriangle className="w-8 h-8 text-red-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            Oops! Terjadi Kesalahan
                        </h1>
                        <p className="text-gray-600 mb-6">
                            Maaf, terjadi kesalahan yang tidak terduga. Silakan coba muat ulang halaman.
                        </p>
                        
                        {/* Error details in dev mode */}
                        {import.meta.env.DEV && this.state.error && (
                            <div className="bg-gray-100 rounded-lg p-4 mb-6 text-left">
                                <p className="text-sm font-mono text-red-600 break-all">
                                    {this.state.error.toString()}
                                </p>
                            </div>
                        )}

                        <div className="flex gap-3">
                            <button
                                onClick={this.handleRefresh}
                                className="flex-1 flex items-center justify-center gap-2 bg-rose-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-rose-700 transition-colors"
                            >
                                <RefreshCw className="w-4 h-4" />
                                Muat Ulang
                            </button>
                            <Link
                                to="/"
                                className="flex-1 flex items-center justify-center gap-2 border border-gray-300 text-gray-700 px-4 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                            >
                                <Home className="w-4 h-4" />
                                Beranda
                            </Link>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
