import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ABHA from './pages/ABHA';
import Upload from './pages/Upload';
import AbhaHealthData from './pages/AbhaHealthData';
import { Toaster } from './components/ui/toaster';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const user = localStorage.getItem('user');
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
}

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-background font-sans antialiased text-foreground">
                <Navbar />
                <main className="container mx-auto p-4">
                    <Routes>
                        <Route path="/" element={<Navigate to="/login" replace />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route
                            path="/abha"
                            element={
                                <ProtectedRoute>
                                    <ABHA />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/upload"
                            element={
                                <ProtectedRoute>
                                    <Upload />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/abha-health-data"
                            element={
                                <ProtectedRoute>
                                    <AbhaHealthData />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </main>
                <Toaster />
            </div>
        </Router>
    );
}

export default App;
