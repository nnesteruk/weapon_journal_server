export class CreateStatsDto {
  totalSum: number;
  totalProducts: number;
  totalCases: number;
  totalIdentification: number;
  products: Record<string, number>;
  documents: { category: string; _sum: { count: number | null } }[];
  refusesCases;
}
