import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Upload as UploadIcon, FileText } from 'lucide-react';
import { extractTextFromImage } from '@/lib/ocr';
import { PrescriptionCard } from '@/components/PrescriptionCard';

interface Prescription {
    id: string;
    date: string;
    text: string;
}

export default function Upload() {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
    const { toast } = useToast();

    useEffect(() => {
        const saved = localStorage.getItem('prescriptions');
        if (saved) {
            setPrescriptions(JSON.parse(saved));
        }
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setLoading(true);
        try {
            const text = await extractTextFromImage(file);

            const newPrescription: Prescription = {
                id: Date.now().toString(),
                date: new Date().toISOString(),
                text: text,
            };

            const updated = [newPrescription, ...prescriptions];
            setPrescriptions(updated);
            localStorage.setItem('prescriptions', JSON.stringify(updated));
            setFile(null);

            // Reset input
            const input = document.getElementById('file-upload') as HTMLInputElement;
            if (input) input.value = '';

            toast({
                title: "Success",
                description: "Prescription extracted and saved successfully.",
            });
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Failed to extract text. Please check your API key and try again.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Upload Prescription</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="file-upload">Prescription Image</Label>
                        <Input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} />
                    </div>
                    <Button
                        onClick={handleUpload}
                        disabled={!file || loading}
                        className="w-full sm:w-auto"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Processing...
                            </>
                        ) : (
                            <>
                                <UploadIcon className="mr-2 h-4 w-4" />
                                Upload & Extract
                            </>
                        )}
                    </Button>
                </CardContent>
            </Card>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <FileText className="h-6 w-6" />
                    History
                </h2>
                {prescriptions.length === 0 ? (
                    <p className="text-muted-foreground">No prescriptions uploaded yet.</p>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {prescriptions.map((p) => (
                            <PrescriptionCard key={p.id} date={p.date} text={p.text} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
