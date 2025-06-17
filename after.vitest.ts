import { afterEach, vi } from 'vitest'
afterEach(() => {
  console.log('After each test: reset all mocks')
  vi.resetAllMocks();
});