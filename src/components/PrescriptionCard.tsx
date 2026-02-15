import { useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { analyzePrescription, MedicineAnalysis } from "@/lib/gemini";
import { Loader2, Sparkles } from "lucide-react";

interface PrescriptionProps {
    date: string;
    text: string;
}

export function PrescriptionCard({ date, text }: PrescriptionProps) {
    const [analyzing, setAnalyzing] = useState(false);
    const [analysis, setAnalysis] = useState<MedicineAnalysis[] | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleAnalyze = async () => {
        setAnalyzing(true);
        setIsOpen(true); // Open dialog immediately to show loading state
        try {
            const result = await analyzePrescription(text);
            setAnalysis(result);
        } catch (error) {
            console.error("Analysis failed:", error);
        } finally {
            setAnalyzing(false);
        }
    };

    return (
        <Card className="w-full flex flex-col">
            <CardHeader>
                <CardTitle>Prescription</CardTitle>
                <CardDescription>{new Date(date).toLocaleDateString()}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
                <div className="line-clamp-3 text-sm text-muted-foreground mb-4">
                    {text}
                </div>

                <div className="flex gap-2 mt-auto">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="flex-1">View Text</Button>
                        </DialogTrigger>
                        <DialogContent className="max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>Prescription Text</DialogTitle>
                                <DialogDescription>Extracted on {new Date(date).toLocaleString()}</DialogDescription>
                            </DialogHeader>
                            <div className="whitespace-pre-wrap text-sm">
                                {text}
                            </div>
                        </DialogContent>
                    </Dialog>

                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogTrigger asChild>
                            <Button
                                onClick={handleAnalyze}
                                className="flex-1 gap-2 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white border-0"
                            >
                                <Sparkles className="h-4 w-4" />
                                AI Analyze
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle className="flex items-center gap-2">
                                    <Sparkles className="h-5 w-5 text-purple-600" />
                                    AI Medicine Analysis
                                </DialogTitle>
                                <DialogDescription>
                                    Suggested medicines and timings based on the prescription.
                                </DialogDescription>
                            </DialogHeader>

                            {analyzing ? (
                                <div className="flex flex-col items-center justify-center py-8 space-y-4">
                                    <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
                                    <p className="text-sm text-muted-foreground">Analyzing prescription with Gemini AI...</p>
                                </div>
                            ) : analysis ? (
                                <div className="space-y-4">
                                    <div className="grid gap-4">
                                        {analysis.map((med, index) => (
                                            <div key={index} className="flex flex-col sm:flex-row justify-between p-4 rounded-lg bg-slate-50 border border-slate-100 dark:bg-slate-800 dark:border-slate-700">
                                                <div>
                                                    <h3 className="font-semibold text-lg text-primary">{med.name}</h3>
                                                    <p className="text-sm text-muted-foreground">Dosage: {med.dosage}</p>
                                                </div>
                                                <div className="mt-2 sm:mt-0 text-right">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                                        {med.timing}
                                                    </span>
                                                    {med.notes && (
                                                        <p className="text-xs text-muted-foreground mt-1 italic">{med.notes}</p>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-xs text-muted-foreground text-center mt-4">
                                        Disclaimer: AI generated suggestions. Please consult a doctor before taking any medication.
                                    </p>
                                </div>
                            ) : (
                                <div className="text-center py-4 text-red-500">
                                    Failed to analyze. Please try again.
                                </div>
                            )}
                        </DialogContent>
                    </Dialog>
                </div>
            </CardContent>
        </Card>
    )
}
