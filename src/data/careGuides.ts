export interface CareGuide {
  id: string;
  materialName: string;
  dailyCareInstructions: string[];
  patinaExplanation: string;
  cleaningRitualSteps: string[];
}

export const careGuidesData: CareGuide[] = [];
