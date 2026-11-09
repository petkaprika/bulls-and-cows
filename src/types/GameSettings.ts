export type NumberSystem = 'bin' | 'oct' | 'dec' | 'hex';

export interface GameSettings {
  base: NumberSystem;
  length: number;
}
