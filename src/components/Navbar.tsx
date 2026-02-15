import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { HeartPulse } from 'lucide-react';

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const user = localStorage.getItem('user');

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    if (location.pathname === '/login' || location.pathname === '/signup') {
        return null;
    }

    return (
        <nav className="border-b bg-background">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-2 font-bold text-xl text-primary">
                    <HeartPulse className="h-6 w-6" />
                    <span>MedConnect</span>
                </div>
                <div className="flex items-center gap-4">
                    {user && (
                        <Button variant="ghost" onClick={handleLogout}>
                            Logout
                        </Button>
                    )}
                </div>
            </div>
        </nav>
    );
}
