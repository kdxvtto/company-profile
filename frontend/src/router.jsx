import { createBrowserRouter } from 'react-router-dom';

// Public pages
import App from './App';

// Auth pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

// Admin pages
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import TeamPage from './pages/admin/TeamPage';
import ServicesPage from './pages/admin/ServicesPage';
import NewsPage from './pages/admin/NewsPage';
import UsersPage from './pages/admin/UsersPage';

// Protected Route
import ProtectedRoute from './components/auth/ProtectedRoute';

const router = createBrowserRouter([
    // Public routes
    {
        path: '/',
        element: <App />,
    },
    // Auth routes
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/register',
        element: <RegisterPage />,
    },
    // Admin routes (protected)
    {
        path: '/admin',
        element: (
            <ProtectedRoute>
                <AdminLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                index: true,
                element: <Dashboard />,
            },
            {
                path: 'team',
                element: <TeamPage />,
            },
            {
                path: 'services',
                element: <ServicesPage />,
            },
            {
                path: 'news',
                element: <NewsPage />,
            },
            {
                path: 'users',
                element: <UsersPage />,
            },
        ],
    },
]);

export default router;
