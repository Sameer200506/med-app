import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"

interface PrescriptionProps {
    date: string;
    text: string;
}

export function PrescriptionCard({ date, text }: PrescriptionProps) {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Prescription</CardTitle>
                <CardDescription>{new Date(date).toLocaleDateString()}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="line-clamp-3 text-sm text-muted-foreground mb-4">
                    {text}
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="w-full">View Full Text</Button>
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
            </CardContent>
        </Card>
    )
}
