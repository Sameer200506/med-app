export interface MedicineAnalysis {
    name: string;
    dosage: string;
    timing: string;
    notes?: string;
}

export async function analyzePrescription(text: string): Promise<MedicineAnalysis[]> {
    console.log("Simulating AI analysis for:", text);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Return fake data based on the user's request for a project demo
    return [
        {
            name: "Amoxyclav 625",
            dosage: "1 tablet",
            timing: "After breakfast and dinner (Twice a day)",
            notes: "Antibiotic for infection"
        },
        {
            name: "Paracetamol 650",
            dosage: "1 tablet",
            timing: "After food (SOS - only if fever > 100°F)",
            notes: "For fever and body pain"
        },
        {
            name: "Pantop 40",
            dosage: "1 tablet",
            timing: "Before breakfast (Empty stomach)",
            notes: "For acidity/gastritis"
        },
        {
            name: "Cetrizine 10mg",
            dosage: "1 tablet",
            timing: "At night before sleep",
            notes: "For allergy/cold"
        },
        {
            name: "Multivitamin",
            dosage: "1 capsule",
            timing: "After lunch",
            notes: "Supplement"
        }
    ];
}
