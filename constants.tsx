
export const POPULAR_BRANDS = [
  "Toyota", "Honda", "Suzuki", "Nissan", "Mitsubishi", 
  "Mazda", "Hyundai", "Kia", "Mercedes-Benz", "BMW", 
  "Audi", "Land Rover", "Micro", "Tata", "Mahindra",
  "Daihatsu", "Subaru", "Lexus", "Peugeot", "Renault",
  "Volkswagen", "Ford", "Chevrolet", "MG", "DFSK",
  "Zotye", "Changan", "BAIC", "Chery", "Proton"
].sort();

export const FITTINGS_LIST = [
  "Power Steering", "Air bags", "Power Shutter", "ABS/Brake",
  "Power Mirror", "Power Aerial", "Single/Dual AC", "CD/DVD/TV",
  "Reverse Camera", "Remote/Smart Key", "Rim Embellisher", "Rear Wiper",
  "Alloy Wheel Rim", "Spoiler", "Sun Roof", "Auto Gear",
  "Sun/Door Visor", "4 Wheel Drive (4WD)", "Modified Buffer",
  "Winder/Box", "Body Kit"
];

export const YEARS = Array.from({ length: 50 }, (_, i) => (new Date().getFullYear() - i).toString());

export const BRAND_MODELS: Record<string, string[]> = {
  "Toyota": ["Vitz", "Aqua", "Premio", "Allion", "Corolla", "Axio", "Land Cruiser", "Prado", "CHR", "Raize", "Hilux", "Hiace", "Camry", "Prius", "Yaris", "Belta", "Harrier", "Rush", "Passo", "Pixis"],
  "Honda": ["Fit", "Grace", "Vezel", "Civic", "Insight", "CR-V", "Shuttle", "Accord", "Jade", "N-Box", "N-WGN", "Freed"],
  "Suzuki": ["Alto", "Wagon R", "Spacia", "Swift", "Vitara", "Every", "Celerio", "Hustler", "Jimny", "Baleno", "S-Presso", "Dzire", "Ertiga"],
  "Nissan": ["Leaf", "Dayz", "X-Trail", "Sunny", "March", "NV200", "Bluebird", "Note", "Patrol", "Navara", "Tiida", "Juke", "Caravan"],
  "Mitsubishi": ["Montero", "L200", "Xpander", "Mirage", "Outlander", "Lancer", "Pajero", "Eclipse Cross", "Delica"],
  "Mazda": ["Axela", "Demio", "CX-5", "CX-3", "Atenza", "Mazda 2", "Mazda 3", "Mazda 6", "Flare"],
  "Hyundai": ["Tucson", "Santa Fe", "Elantra", "Accent", "Ioniq", "Kona", "Creta", "Grand i10"],
  "Kia": ["Sportage", "Sorento", "Rio", "Picanto", "Stinger", "Niro", "Seltos"],
  "Mercedes-Benz": ["C-Class", "E-Class", "S-Class", "CLA", "GLA", "GLC", "GLE"],
  "BMW": ["3 Series", "5 Series", "7 Series", "X1", "X3", "X5", "i3", "i8"],
  "Micro": ["Panda", "Trend", "Emgrand 7", "Kyron", "Rexton"],
  "Daihatsu": ["Mira", "Cast", "Move", "Terios", "Rocky", "Hijet", "Tanto"],
  "Tata": ["Nano", "Indica", "Ace", "Xenon"],
  "Mahindra": ["Scorpio", "KUV100", "Bolero", "Thar"],
  "MG": ["ZS", "HS", "MG3", "MG6"],
  "DFSK": ["Glory 580", "Glory i-Auto", "V21"],
};
