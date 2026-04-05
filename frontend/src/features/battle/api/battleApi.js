const API_URL = 'http://localhost:3000/invoke';

/**
 * Invokes a battle by sending a problem to the backend.
 * @param {string} problem - The problem/challenge prompt
 * @returns {Promise<Object>} Battle response with solutions and judge results
 */
export async function invokeBattle(problem) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ problem }),
  });

  if (!response.ok) {
    throw new Error(`Battle API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}
