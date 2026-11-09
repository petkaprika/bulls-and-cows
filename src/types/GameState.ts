import type { GameSettings } from './GameSettings';

export interface GuessHistoryEntry {
  guess: string;
  bulls: number;
  cows: number;
}

export interface GameState {
  settings: GameSettings;
  secret: string;
  history: GuessHistoryEntry[];
}
