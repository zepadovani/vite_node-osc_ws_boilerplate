import { defineConfig } from 'vite';

export default defineConfig({
  // ... other configurations

  server: {
    host: '0.0.0.0', // Listen on all network interfaces
    port: 8080,       // Replace with your desired port if needed
  }
});
