/**
 * Battle Phase enum
 * Represents the sequential stages of a battle
 */
export const PHASES = {
  IDLE: 'idle',
  LOADING: 'loading',
  SOLUTION1: 'solution1',
  SOLUTION2: 'solution2',
  JUDGE: 'judge',
  WINNER: 'winner',
};

/**
 * Phase transition delays (ms)
 * Controls the pacing of the battle experience
 */
export const PHASE_DELAYS = {
  [PHASES.LOADING]: 800,
  [PHASES.SOLUTION1]: 1500,
  [PHASES.SOLUTION2]: 1500,
  [PHASES.JUDGE]: 2000,
  [PHASES.WINNER]: 1200,
};

/**
 * Creates the initial battle state
 */
export function createInitialState() {
  return {
    phase: PHASES.IDLE,
    problem: '',
    solution1: null,
    solution2: null,
    judge: null,
    error: null,
  };
}

/**
 * Determines the winner from judge scores
 * @param {Object} judge - Judge result object
 * @returns {number|null} 1, 2, or null for tie
 */
export function determineWinner(judge) {
  if (!judge) return null;
  const s1 = Number(judge.solution_1_score);
  const s2 = Number(judge.solution_2_score);
  if (s1 > s2) return 1;
  if (s2 > s1) return 2;
  return null; // tie
}
