import { materialsData } from '../data/materials';
import { ritualsData } from '../data/rituals';
import { artisansData } from '../data/artisans';

export const heritageService = {
  getAllMaterials: () => materialsData,
  getMaterialById: (id: string) => materialsData.find((m) => m.id === id),
  getAllRituals: () => ritualsData,
  getRitualById: (id: string) => ritualsData.find((r) => r.id === id),
  getAllArtisans: () => artisansData,
  getArtisanById: (id: string) => artisansData.find((a) => a.id === id),
};
