
export interface VehicleData {
  brand: string;
  model: string;
  year: string;
  chassisNumber?: string;
  engineNumber?: string;
}

export interface MarketRange {
  condition: 'Excellent' | 'Good' | 'Average';
  minValue: number;
  maxValue: number;
  minSumInsured: number;
  maxSumInsured: number;
}

export interface Fitting {
  name: string;
  available: boolean;
}

export interface VehicleReport {
  brand: string;
  name: string;
  year: string;
  fuelType: 'BEV' | 'PHEV' | 'HEV' | 'PETROL' | 'DIESEL';
  engineCapacity: string;
  seatingCapacity: number;
  marketRanges: MarketRange[];
  fittings: Fitting[];
  otherFittings: string[];
  disclaimer: string;
}
