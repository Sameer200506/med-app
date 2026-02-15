import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { User, FileText, Activity } from 'lucide-react';

interface HealthRecord {
    id: string;
    date: string;
    doctor: string;
    diagnosis: string;
    hospital: string;
}

export default function AbhaHealthData() {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Fake patient data
    const patientData = {
        name: "Rahul Sharma",
        age: 34,
        gender: "Male",
        bloodGroup: "O+",
        abhaId: "12-3456-7890-1234",
        mobile: "+91 98765 43210"
    };

    // Fake health records
    const healthRecords: HealthRecord[] = [
        {
            id: "REC001",
            date: "2024-01-15",
            doctor: "Dr. Anjali Gupta",
            diagnosis: "Viral Fever",
            hospital: "City General Hospital"
        },
        {
            id: "REC002",
            date: "2023-11-20",
            doctor: "Dr. Ramesh Kumar",
            diagnosis: "General Checkup",
            hospital: "Apollo Clinic"
        },
        {
            id: "REC003",
            date: "2023-08-05",
            doctor: "Dr. Priya Singh",
            diagnosis: "Sprained Ankle",
            hospital: "Ortho Care Centre"
        }
    ];

    useEffect(() => {
        // Simulate fetching data
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="container mx-auto p-4 max-w-4xl space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-primary">ABHA Health Profile</h1>
                <Button variant="outline" onClick={() => navigate('/upload')}>
                    Go to Dashboard
                </Button>
            </div>

            {loading ? (
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <Skeleton className="h-8 w-1/3 mb-2" />
                            <Skeleton className="h-4 w-1/4" />
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                        </CardContent>
                    </Card>
                    <div className="grid gap-4 md:grid-cols-2">
                        <Skeleton className="h-40 w-full" />
                        <Skeleton className="h-40 w-full" />
                    </div>
                </div>
            ) : (
                <>
                    {/* Patient Details Card */}
                    <Card className="border-l-4 border-l-primary shadow-md">
                        <CardHeader className="flex flex-row items-center gap-4 pb-2">
                            <div className="bg-primary/10 p-3 rounded-full">
                                <User className="h-8 w-8 text-primary" />
                            </div>
                            <div>
                                <CardTitle className="text-xl">{patientData.name}</CardTitle>
                                <CardDescription>ABHA ID: {patientData.abhaId}</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                                <div>
                                    <p className="text-sm text-muted-foreground">Age</p>
                                    <p className="font-medium">{patientData.age} Years</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Gender</p>
                                    <p className="font-medium">{patientData.gender}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Blood Group</p>
                                    <p className="font-medium">{patientData.bloodGroup}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Mobile</p>
                                    <p className="font-medium">{patientData.mobile}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Health Records Section */}
                    <div>
                        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                            <Activity className="h-6 w-6 text-primary" />
                            Recent Health Records
                        </h2>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {healthRecords.map((record) => (
                                <Card key={record.id} className="hover:shadow-lg transition-shadow">
                                    <CardHeader className="pb-2">
                                        <div className="flex justify-between items-start">
                                            <CardTitle className="text-lg font-medium text-primary">
                                                {record.diagnosis}
                                            </CardTitle>
                                            <FileText className="h-5 w-5 text-muted-foreground" />
                                        </div>
                                        <CardDescription>{new Date(record.date).toLocaleDateString()}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium">{record.doctor}</p>
                                            <p className="text-xs text-muted-foreground">{record.hospital}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-green-800 flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                        <p className="text-sm font-medium">
                            Live synchronization with national health registry active.
                        </p>
                    </div>
                </>
            )}
        </div>
    );
}
