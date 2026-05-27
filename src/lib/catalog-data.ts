export type System =
  | 'brakes'
  | 'engine'
  | 'suspension'
  | 'transmission'
  | 'electric'
  | 'filtration'
  | 'cooling'
  | 'body';

export type Brand = 'mb' | 'bmw' | 'sprinter';

export type Part = {
  id: string;
  partNumber: string;
  name: string;
  brand: Brand;
  system: System;
  fitment: string;
  oemRef?: string;
};

/* 24 placeholder parts spread across brands & systems */
export const parts: Part[] = [
  // Mercedes-Benz
  { id: 'mb-001', partNumber: 'A 000 421 16 12', name: 'Disco de freno delantero ventilado', brand: 'mb', system: 'brakes', fitment: 'C-Class W205 · E-Class W213', oemRef: '0004211612' },
  { id: 'mb-002', partNumber: 'A 005 153 99 28', name: 'Sensor MAF', brand: 'mb', system: 'electric', fitment: 'M271 1.8L Kompressor', oemRef: '0051539928' },
  { id: 'mb-003', partNumber: 'A 642 200 09 01', name: 'Termostato con carcasa', brand: 'mb', system: 'cooling', fitment: 'OM642 V6 diesel', oemRef: '6422000901' },
  { id: 'mb-004', partNumber: 'A 156 200 02 01', name: 'Bomba de agua eléctrica', brand: 'mb', system: 'cooling', fitment: 'A45 AMG M133' },
  { id: 'mb-005', partNumber: 'A 211 320 47 30', name: 'Amortiguador trasero ADS', brand: 'mb', system: 'suspension', fitment: 'E-Class W211 Airmatic' },
  { id: 'mb-006', partNumber: 'A 271 094 03 04', name: 'Filtro de aire panel', brand: 'mb', system: 'filtration', fitment: 'CGI 1.8L · M271' },
  { id: 'mb-007', partNumber: 'A 211 540 22 17', name: 'Sensor ABS rueda trasera', brand: 'mb', system: 'electric', fitment: 'W211 / W219' },
  { id: 'mb-008', partNumber: 'A 002 153 02 28', name: 'Sonda lambda banda ancha', brand: 'mb', system: 'engine', fitment: 'M272 V6 / M273 V8' },

  // BMW
  { id: 'bmw-001', partNumber: '11 65 7 583 222', name: 'Turbocompresor', brand: 'bmw', system: 'engine', fitment: 'N20 2.0T (F30 / F32)' },
  { id: 'bmw-002', partNumber: '11 36 7 587 760', name: 'Solenoide VANOS de admisión', brand: 'bmw', system: 'engine', fitment: 'N52 / N53 / N54', oemRef: '11367548387' },
  { id: 'bmw-003', partNumber: '34 11 6 854 126', name: 'Disco de freno delantero', brand: 'bmw', system: 'brakes', fitment: 'F30 / F31 / F32' },
  { id: 'bmw-004', partNumber: '34 35 6 870 350', name: 'Pastillas freno traseras', brand: 'bmw', system: 'brakes', fitment: '3 Series F30 / 4 Series F32' },
  { id: 'bmw-005', partNumber: '31 31 6 786 521', name: 'Brazo de control inferior', brand: 'bmw', system: 'suspension', fitment: 'E60 / E61 5 Series' },
  { id: 'bmw-006', partNumber: '13 71 7 568 728', name: 'Filtro de aire', brand: 'bmw', system: 'filtration', fitment: 'N20 / N26 2.0T' },
  { id: 'bmw-007', partNumber: '17 11 8 600 092', name: 'Radiador principal', brand: 'bmw', system: 'cooling', fitment: 'X5 F15 · X6 F16 N55' },
  { id: 'bmw-008', partNumber: '24 00 7 588 752', name: 'Mecatrónica caja ZF 8HP', brand: 'bmw', system: 'transmission', fitment: 'F-chassis 8HP45/8HP70' },

  // Sprinter
  { id: 'sp-001', partNumber: 'A 906 460 04 80', name: 'Caja de dirección', brand: 'sprinter', system: 'suspension', fitment: 'Sprinter 906 (2006-2018)' },
  { id: 'sp-002', partNumber: 'A 642 094 04 04', name: 'Filtro de combustible diesel', brand: 'sprinter', system: 'filtration', fitment: 'OM642 V6 · OM651 4cil' },
  { id: 'sp-003', partNumber: 'A 642 200 02 15', name: 'Bomba de agua', brand: 'sprinter', system: 'cooling', fitment: 'OM642 V6 CDI' },
  { id: 'sp-004', partNumber: 'A 906 410 11 17', name: 'Cardán trasero corto', brand: 'sprinter', system: 'transmission', fitment: 'Sprinter 906 RWD' },
  { id: 'sp-005', partNumber: 'A 906 540 27 17', name: 'Sensor de velocidad ABS', brand: 'sprinter', system: 'electric', fitment: 'Sprinter 906 todas las versiones' },
  { id: 'sp-006', partNumber: 'A 906 490 06 14', name: 'Catalizador SCR completo', brand: 'sprinter', system: 'engine', fitment: 'OM651 BlueTEC EU5' },
  { id: 'sp-007', partNumber: 'A 906 880 03 22', name: 'Espejo lateral eléctrico', brand: 'sprinter', system: 'body', fitment: 'Sprinter 906 (después 2013)' },
  { id: 'sp-008', partNumber: 'A 906 320 14 13', name: 'Amortiguador trasero', brand: 'sprinter', system: 'suspension', fitment: 'Sprinter 906 LCV' },
];

export const brandLabels: Record<Brand, string> = {
  mb: 'Mercedes-Benz',
  bmw: 'BMW',
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
