import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

afterEach(() => {
  vi.clearAllMocks();
  vi.resetAllMocks();
  vi.restoreAllMocks();
  cleanup();
});
