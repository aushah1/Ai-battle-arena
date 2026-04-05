import { useState, useCallback, useRef } from 'react';
import { invokeBattle } from '../api/battleApi';
import { PHASES, PHASE_DELAYS, createInitialState, determineWinner } from '../state/battleState';

/**
 * Custom hook for managing the entire battle lifecycle.
 * Controls API calls, phase transitions, and state updates.
 */
export function useBattle() {
  const [state, setState] = useState(createInitialState());
  const timeoutsRef = useRef([]);

  /** Clear all pending timeouts */
  const clearAllTimeouts = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }, []);

  /** Schedule a delayed state update */
  const scheduleUpdate = useCallback((updateFn, delay) => {
    return new Promise((resolve) => {
      const id = setTimeout(() => {
        updateFn();
        resolve();
      }, delay);
      timeoutsRef.current.push(id);
    });
  }, []);

  /** Start a new battle */
  const startBattle = useCallback(async (problem) => {
    if (!problem.trim()) return;

    // Reset and begin loading
    clearAllTimeouts();
    setState({
      ...createInitialState(),
      phase: PHASES.LOADING,
      problem: problem.trim(),
    });

    try {
      // Call the API
      const data = await invokeBattle(problem.trim());

      // Phase 1: Show Solution 1
      await scheduleUpdate(() => {
        setState((prev) => ({
          ...prev,
          phase: PHASES.SOLUTION1,
          solution1: data.solution_1,
        }));
      }, PHASE_DELAYS[PHASES.SOLUTION1]);

      // Phase 2: Show Solution 2
      await scheduleUpdate(() => {
        setState((prev) => ({
          ...prev,
          phase: PHASES.SOLUTION2,
          solution2: data.solution_2,
        }));
      }, PHASE_DELAYS[PHASES.SOLUTION2]);

      // Phase 3: Show Judge evaluation
      await scheduleUpdate(() => {
        setState((prev) => ({
          ...prev,
          phase: PHASES.JUDGE,
          judge: data.judge,
        }));
      }, PHASE_DELAYS[PHASES.JUDGE]);

      // Phase 4: Declare winner
      await scheduleUpdate(() => {
        setState((prev) => ({
          ...prev,
          phase: PHASES.WINNER,
        }));
      }, PHASE_DELAYS[PHASES.WINNER]);

    } catch (err) {
      setState((prev) => ({
        ...prev,
        phase: PHASES.IDLE,
        error: err.message || 'Battle failed. Check backend connection.',
      }));
    }
  }, [clearAllTimeouts, scheduleUpdate]);

  /** Reset to idle */
  const resetBattle = useCallback(() => {
    clearAllTimeouts();
    setState(createInitialState());
  }, [clearAllTimeouts]);

  // Derived values
  const winner = determineWinner(state.judge);
  const isActive = state.phase !== PHASES.IDLE;
  const isLoading = state.phase === PHASES.LOADING;

  return {
    ...state,
    winner,
    isActive,
    isLoading,
    startBattle,
    resetBattle,
  };
}
