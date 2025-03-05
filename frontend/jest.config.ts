import type { Config } from 'jest';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom', 'jest-canvas-mock'],
};

export default config;
