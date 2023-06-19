export enum Guitar {
  Electric = 'Electric',
  Acoustic = 'Acoustic',
  Ukulele = 'Ukulele',
}

export type GuitarType = keyof typeof Guitar;
