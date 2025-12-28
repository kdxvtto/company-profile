import { NavLink, useNavigate } from 'react-router-dom';
import { 
    LayoutDashboard, 
    Users, 
    Briefcase, 
    Newspaper, 
    UserCog,
    ChevronLeft,
    LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

const Sidebar = ({ isOpen, setIsOpen }) => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const menuItems = [
        {
            title: 'Dashboard',
            icon: LayoutDashboard,
            path: '/admin',
        },
        {
            title: 'Team Profile',
            icon: Users,
            path: '/admin/team',
        },
        {
            title: 'Services',
            icon: Briefcase,
            path: '/admin/services',
        },
        {
            title: 'News',
            icon: Newspaper,
            path: '/admin/news',
        },
        {
            title: 'Users',
            icon: UserCog,
            path: '/admin/users',
        },
    ];

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <aside
            className={`fixed top-0 left-0 z-40 h-screen bg-gradient-to-b from-red-800 via-red-700 to-red-900 text-white transition-all duration-300 ${
                isOpen ? 'w-64' : 'w-20'
            } ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
        >
            {/* Logo */}
            <div className="flex items-center justify-between h-16 px-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                    <img
                        src="https://bankwonogiri.co.id/public/uploads/logo.png"
                        alt="Bank Wonogiri"
                        className="h-10 w-auto"
                    />
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(!isOpen)}
                    className="hidden lg:flex text-white hover:bg-white/10"
                >
                    <ChevronLeft className={`w-5 h-5 transition-transform ${!isOpen ? 'rotate-180' : ''}`} />
                </Button>
            </div>

            {/* Navigation */}
            <nav className="p-4 space-y-2">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.path === '/admin'}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                                    isActive
                                        ? 'bg-white/20 text-white shadow-lg'
                                        : 'text-white/70 hover:bg-white/10 hover:text-white'
                                }`
                            }
                        >
                            <Icon className="w-5 h-5 flex-shrink-0" />
                            {isOpen && (
                                <span className="font-medium">{item.title}</span>
                            )}
                        </NavLink>
                    );
                })}
            </nav>

            {/* Logout Button */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-all duration-200"
                >
                    <LogOut className="w-5 h-5 flex-shrink-0" />
                    {isOpen && (
                        <span className="font-medium">Logout</span>
                    )}
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;

