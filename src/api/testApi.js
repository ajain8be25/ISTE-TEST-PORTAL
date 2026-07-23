/**
 * Placeholder API layer.
 *
 * Every function here simulates a network call and returns mock-shaped
 * data so the UI can be built and tested end-to-end. Replace the body of
 * each function with a real `fetch`/`axios` call to your backend — the
 * signatures and return shapes are the contract the rest of the app relies on.
 */

const SIMULATED_LATENCY_MS = 600;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Registers a candidate for the test.
 * @param {{ name: string, rollNumber: string, email: string, branch: string, year: string }} formData
 * @returns {Promise<{ success: boolean, candidateId?: string, message?: string }>}
 */
export async function registerCandidate(formData) {
  // TODO: Replace with real API call, e.g.
  // const res = await fetch('/api/register', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(formData),
  // });
  // return res.json();

  await wait(SIMULATED_LATENCY_MS);
  console.log('[placeholder] registerCandidate called with:', formData);

  return {
    success: true,
    candidateId: `TEMP-${Date.now()}`,
    message: 'Registration placeholder successful. Connect a backend to persist this.',
  };
}

/**
 * Fetches the question set for the test.
 * @returns {Promise<Array<{ id: string, text: string, options: { A: string, B: string, C: string, D: string } }>>}
 */
export async function getQuestions() {
  // TODO: Replace with real API call, e.g.
  // const res = await fetch('/api/questions');
  // return res.json();

  await wait(SIMULATED_LATENCY_MS);
  console.log('[placeholder] getQuestions called');

  // Empty until a backend is connected — the Test page renders an
  // explicit empty state when this resolves to an empty array.
  return [];
}

/**
 * Submits the candidate's answers.
 * @param {{ answers: Record<string, string>, candidateId?: string, timeSpentSeconds?: number }} payload
 * @returns {Promise<{ success: boolean, message?: string }>}
 */
export async function submitAnswers(payload) {
  // TODO: Replace with real API call, e.g.
  // const res = await fetch('/api/submit', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(payload),
  // });
  // return res.json();

  await wait(SIMULATED_LATENCY_MS);
  console.log('[placeholder] submitAnswers called with:', payload);

  return {
    success: true,
    message: 'Submission placeholder successful. Connect a backend to persist this.',
  };
}
