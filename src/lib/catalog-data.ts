export type System =
  | 'brakes'
  | 'engine'
  | 'suspension'
  | 'transmission'
  | 'electric'
  | 'filtration'
  | 'cooling'
  | 'body';

export type Brand = 'mb' | 'bmw' | 'landrover' | 'sprinter';

export type Part = {
  id: string;
  partNumber: string;
  name: { es: string; en: string };
  brand: Brand;
  system: System;
  fitment: string;
  oemRef?: string;
  photo: string;
};

/* 24 placeholder parts spread across brands & systems
   Fotos: extraidas de los catalogos PDF FREY (originals/pdf-extracted) */
export const parts: Part[] = [
  // Mercedes-Benz
  { id: 'mb-001', partNumber: 'A 000 421 16 12', name: { es: 'Disco de freno delantero ventilado', en: 'Front vented brake disc' }, brand: 'mb', system: 'brakes', fitment: 'C-Class W205 · E-Class W213', oemRef: '0004211612', photo: '/products/mb-01.webp' },
  { id: 'mb-002', partNumber: 'A 005 153 99 28', name: { es: 'Sensor MAF', en: 'MAF sensor' }, brand: 'mb', system: 'electric', fitment: 'M271 1.8L Kompressor', oemRef: '0051539928', photo: '/products/mb-02.webp' },
  { id: 'mb-003', partNumber: 'A 642 200 09 01', name: { es: 'Termostato con carcasa', en: 'Thermostat with housing' }, brand: 'mb', system: 'cooling', fitment: 'OM642 V6 diesel', oemRef: '6422000901', photo: '/products/mb-03.webp' },
  { id: 'mb-004', partNumber: 'A 156 200 02 01', name: { es: 'Bomba de agua eléctrica', en: 'Electric water pump' }, brand: 'mb', system: 'cooling', fitment: 'A45 AMG M133', photo: '/products/mb-04.webp' },
  { id: 'mb-005', partNumber: 'A 211 320 47 30', name: { es: 'Amortiguador trasero ADS', en: 'Rear ADS shock absorber' }, brand: 'mb', system: 'suspension', fitment: 'E-Class W211 Airmatic', photo: '/products/mb-05.webp' },
  { id: 'mb-006', partNumber: 'A 271 094 03 04', name: { es: 'Filtro de aire panel', en: 'Panel air filter' }, brand: 'mb', system: 'filtration', fitment: 'CGI 1.8L · M271', photo: '/products/mb-06.webp' },
  { id: 'mb-007', partNumber: 'A 211 540 22 17', name: { es: 'Sensor ABS rueda trasera', en: 'Rear wheel ABS sensor' }, brand: 'mb', system: 'electric', fitment: 'W211 / W219', photo: '/products/mb-07.webp' },
  { id: 'mb-008', partNumber: 'A 002 153 02 28', name: { es: 'Sonda lambda banda ancha', en: 'Wideband lambda sensor' }, brand: 'mb', system: 'engine', fitment: 'M272 V6 / M273 V8', photo: '/products/mb-08.webp' },

  // BMW
  { id: 'bmw-001', partNumber: '11 65 7 583 222', name: { es: 'Turbocompresor', en: 'Turbocharger' }, brand: 'bmw', system: 'engine', fitment: 'N20 2.0T (F30 / F32)', photo: '/products/bmw-01.webp' },
  { id: 'bmw-002', partNumber: '11 36 7 587 760', name: { es: 'Solenoide VANOS de admisión', en: 'Intake VANOS solenoid' }, brand: 'bmw', system: 'engine', fitment: 'N52 / N53 / N54', oemRef: '11367548387', photo: '/products/bmw-02.webp' },
  { id: 'bmw-003', partNumber: '34 11 6 854 126', name: { es: 'Disco de freno delantero', en: 'Front brake disc' }, brand: 'bmw', system: 'brakes', fitment: 'F30 / F31 / F32', photo: '/products/bmw-03.webp' },
  { id: 'bmw-004', partNumber: '34 35 6 870 350', name: { es: 'Pastillas freno traseras', en: 'Rear brake pads' }, brand: 'bmw', system: 'brakes', fitment: '3 Series F30 / 4 Series F32', photo: '/products/bmw-04.webp' },
  { id: 'bmw-005', partNumber: '31 31 6 786 521', name: { es: 'Brazo de control inferior', en: 'Lower control arm' }, brand: 'bmw', system: 'suspension', fitment: 'E60 / E61 5 Series', photo: '/products/bmw-05.webp' },
  { id: 'bmw-006', partNumber: '13 71 7 568 728', name: { es: 'Filtro de aire', en: 'Air filter' }, brand: 'bmw', system: 'filtration', fitment: 'N20 / N26 2.0T', photo: '/products/bmw-06.webp' },
  { id: 'bmw-007', partNumber: '17 11 8 600 092', name: { es: 'Radiador principal', en: 'Main radiator' }, brand: 'bmw', system: 'cooling', fitment: 'X5 F15 · X6 F16 N55', photo: '/products/bmw-07.webp' },
  { id: 'bmw-008', partNumber: '24 00 7 588 752', name: { es: 'Mecatrónica caja ZF 8HP', en: 'ZF 8HP gearbox mechatronics' }, brand: 'bmw', system: 'transmission', fitment: 'F-chassis 8HP45/8HP70', photo: '/products/bmw-08.webp' },

  // Land Rover
  { id: 'lr-001', partNumber: 'LR007132', name: { es: 'Disco de freno delantero ventilado', en: 'Front vented brake disc' }, brand: 'landrover', system: 'brakes', fitment: 'Range Rover Sport L320 · Discovery L319', photo: '/products/bmw-03.webp' },
  { id: 'lr-002', partNumber: 'LR051622', name: { es: 'Compresor de suspensión neumática', en: 'Air suspension compressor' }, brand: 'landrover', system: 'suspension', fitment: 'Range Rover L322 · L405 · Sport L320', oemRef: 'LR078650', photo: '/products/bmw-08.webp' },
  { id: 'lr-003', partNumber: 'LR011279', name: { es: 'Bomba de agua eléctrica', en: 'Electric water pump' }, brand: 'landrover', system: 'cooling', fitment: 'Range Rover Evoque L538 · Discovery Sport', photo: '/products/mb-04.webp' },
  { id: 'lr-004', partNumber: 'LR069385', name: { es: 'Sensor MAF', en: 'MAF sensor' }, brand: 'landrover', system: 'electric', fitment: 'L320 Sport TDV6 3.0L', photo: '/products/mb-02.webp' },
  { id: 'lr-005', partNumber: 'LR017319', name: { es: 'Brazo de control superior', en: 'Upper control arm' }, brand: 'landrover', system: 'suspension', fitment: 'Range Rover L322 (2002-2012)', photo: '/products/mb-09.webp' },
  { id: 'lr-006', partNumber: 'LR026371', name: { es: 'Filtro de aceite premium', en: 'Premium oil filter' }, brand: 'landrover', system: 'filtration', fitment: 'AJ-V8 / TDV6 / SDV6 diesel', photo: '/products/sprinter-02.webp' },

  // Sprinter
  { id: 'sp-001', partNumber: 'A 906 460 04 80', name: { es: 'Caja de dirección', en: 'Steering box' }, brand: 'sprinter', system: 'suspension', fitment: 'Sprinter 906 (2006-2018)', photo: '/products/sprinter-01.webp' },
  { id: 'sp-002', partNumber: 'A 642 094 04 04', name: { es: 'Filtro de combustible diesel', en: 'Diesel fuel filter' }, brand: 'sprinter', system: 'filtration', fitment: 'OM642 V6 · OM651 4cil', photo: '/products/sprinter-02.webp' },
  { id: 'sp-003', partNumber: 'A 642 200 02 15', name: { es: 'Bomba de agua', en: 'Water pump' }, brand: 'sprinter', system: 'cooling', fitment: 'OM642 V6 CDI', photo: '/products/sprinter-03.webp' },
  { id: 'sp-004', partNumber: 'A 906 410 11 17', name: { es: 'Cardán trasero corto', en: 'Short rear driveshaft' }, brand: 'sprinter', system: 'transmission', fitment: 'Sprinter 906 RWD', photo: '/products/sprinter-04.webp' },
  { id: 'sp-005', partNumber: 'A 906 540 27 17', name: { es: 'Sensor de velocidad ABS', en: 'ABS speed sensor' }, brand: 'sprinter', system: 'electric', fitment: 'Sprinter 906 todas las versiones', photo: '/products/sprinter-05.webp' },
  { id: 'sp-006', partNumber: 'A 906 490 06 14', name: { es: 'Catalizador SCR completo', en: 'Complete SCR catalyst' }, brand: 'sprinter', system: 'engine', fitment: 'OM651 BlueTEC EU5', photo: '/products/sprinter-06.webp' },
  { id: 'sp-007', partNumber: 'A 906 880 03 22', name: { es: 'Espejo lateral eléctrico', en: 'Electric side mirror' }, brand: 'sprinter', system: 'body', fitment: 'Sprinter 906 (después 2013)', photo: '/products/sprinter-07.webp' },
  { id: 'sp-008', partNumber: 'A 906 320 14 13', name: { es: 'Amortiguador trasero', en: 'Rear shock absorber' }, brand: 'sprinter', system: 'suspension', fitment: 'Sprinter 906 LCV', photo: '/products/sprinter-08.webp' },
];

export const brandLabels: Record<Brand, string> = {
  mb: 'Mercedes-Benz',
  bmw: 'BMW',
  landrover: 'Land Rover',
  sprinter: 'MB Sprinter',
};

export const systemSlugs: System[] = [
  'brakes',
  'engine',
  'suspension',
  'transmission',
  'electric',
  'filtration',
  'cooling',
  'body',
];

/* ------- VEHICLE TAXONOMY for the fitment selector ------- */

export type VehicleModel = {
  model: string;          // visible name, e.g. "C-Class"
  generation: string;     // e.g. "W205" — used to match against fitment string
  yearFrom: number;
  yearTo: number;
  matchTokens: string[];  // strings used to match against parts[].fitment (case-insensitive contains)
};

export const vehicles: Record<Brand, VehicleModel[]> = {
  mb: [
    { model: 'C-Class', generation: 'W205', yearFrom: 2014, yearTo: 2021, matchTokens: ['W205', 'C-Class'] },
    { model: 'E-Class', generation: 'W213', yearFrom: 2016, yearTo: 2023, matchTokens: ['W213', 'E-Class'] },
    { model: 'E-Class', generation: 'W211', yearFrom: 2003, yearTo: 2009, matchTokens: ['W211', 'E-Class'] },
    { model: 'A45 AMG', generation: 'M133', yearFrom: 2013, yearTo: 2018, matchTokens: ['M133', 'A45'] },
    { model: 'GLE / ML', generation: 'OM642', yearFrom: 2005, yearTo: 2019, matchTokens: ['OM642'] },
    { model: 'CLS 500', generation: 'W219', yearFrom: 2004, yearTo: 2010, matchTokens: ['W219'] },
    { model: 'C 200 / 250', generation: 'M272/M273', yearFrom: 2005, yearTo: 2014, matchTokens: ['M271', 'M272', 'M273'] },
  ],
  bmw: [
    { model: '3-Series', generation: 'F30', yearFrom: 2012, yearTo: 2019, matchTokens: ['F30', 'F31', '3 Series'] },
    { model: '4-Series', generation: 'F32', yearFrom: 2013, yearTo: 2020, matchTokens: ['F32', '4 Series'] },
    { model: '5-Series', generation: 'E60', yearFrom: 2003, yearTo: 2010, matchTokens: ['E60', 'E61', '5 Series'] },
    { model: 'X5', generation: 'F15', yearFrom: 2013, yearTo: 2018, matchTokens: ['F15', 'X5'] },
    { model: 'X6', generation: 'F16', yearFrom: 2014, yearTo: 2019, matchTokens: ['F16', 'X6'] },
    { model: '328i / 428i', generation: 'N20/N26', yearFrom: 2011, yearTo: 2018, matchTokens: ['N20', 'N26'] },
    { model: '335i / 535i', generation: 'N52/N54', yearFrom: 2006, yearTo: 2013, matchTokens: ['N52', 'N53', 'N54', 'E90', 'E60', 'E70'] },
  ],
  sprinter: [
    { model: 'Sprinter 906', generation: 'OM642 V6 diesel', yearFrom: 2006, yearTo: 2013, matchTokens: ['906', 'OM642'] },
    { model: 'Sprinter 906', generation: 'OM651 4-cyl diesel', yearFrom: 2009, yearTo: 2018, matchTokens: ['906', 'OM651'] },
    { model: 'Sprinter 906 LCV', generation: 'all variants', yearFrom: 2006, yearTo: 2018, matchTokens: ['906', 'LCV', 'Sprinter'] },
  ],
  landrover: [
    { model: 'Range Rover Sport', generation: 'L320', yearFrom: 2005, yearTo: 2013, matchTokens: ['L320', 'Range Rover Sport'] },
    { model: 'Range Rover', generation: 'L322', yearFrom: 2002, yearTo: 2012, matchTokens: ['L322', 'Range Rover'] },
    { model: 'Range Rover Evoque', generation: 'L538', yearFrom: 2011, yearTo: 2019, matchTokens: ['L538', 'Evoque'] },
    { model: 'Discovery 4', generation: 'L319', yearFrom: 2009, yearTo: 2017, matchTokens: ['L319', 'Discovery'] },
    { model: 'Defender', generation: 'classic', yearFrom: 1990, yearTo: 2016, matchTokens: ['Defender'] },
  ],
};

/** Returns the parts that match the given vehicle filter */
export function partsForVehicle(brand: Brand, model?: VehicleModel): Part[] {
  if (!model) return parts.filter((p) => p.brand === brand);
  const tokens = model.matchTokens.map((t) => t.toLowerCase());
  return parts.filter((p) => {
    if (p.brand !== brand) return false;
    const hay = p.fitment.toLowerCase();
    return tokens.some((t) => hay.includes(t));
  });
}
