import "@testing-library/jest-dom/vitest";

// optional: cleanup after each test (usually automatic, but safe)
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

afterEach(() => {
  cleanup();
});