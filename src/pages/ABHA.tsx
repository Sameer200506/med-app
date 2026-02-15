import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

export default function ABHA() {
    const [abhaId, setAbhaId] = useState('');
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleConnect = (e: React.FormEvent) => {
        e.preventDefault();
        if (abhaId.trim()) {
            toast({
                title: "ABHA Connected Successfully",
                description: "Your ABHA ID has been linked to your account.",
            });
            // Small delay to show toast
            setTimeout(() => {
                navigate('/upload');
            }, 1500);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Connect ABHA ID</CardTitle>
                    <CardDescription>Link your Ayushman Bharat Health Account</CardDescription>
                </CardHeader>
                <form onSubmit={handleConnect}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="abha">ABHA ID</Label>
                            <Input
                                id="abha"
                                type="text"
                                placeholder="Enter your ABHA ID (e.g., 12-3456-7890-1234)"
                                value={abhaId}
                                onChange={(e) => setAbhaId(e.target.value)}
                                required
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full">Connect</Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
