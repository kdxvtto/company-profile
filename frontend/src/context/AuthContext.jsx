import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '@/lib/api';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        const token = localStorage.getItem('token');
        console.log('[AuthContext] Checking auth, token exists:', !!token);
        
        if (token) {
            try {
                const response = await authAPI.getProfile();
                console.log('[AuthContext] Profile fetched:', response.data);
                setUser(response.data.data);
            } catch (error) {
                console.error('[AuthContext] Profile fetch failed:', error);
                localStorage.removeItem('token');
                setUser(null);
            }
        }
        setLoading(false);
    };

    const login = async (email, password) => {
        console.log('[AuthContext] Logging in...');
        const response = await authAPI.login({ email, password });
        console.log('[AuthContext] Login response:', response.data);
        
        const { token, data } = response.data; // Check response structure carefully
        // Note: backend response usually has 'data' property for user object
        
        localStorage.setItem('token', token);
        // Important: Set user immediately to avoid race condition
        setUser(data || response.data.user); 
        return response;
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    const value = {
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
