import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

const cherryPickedKeys = [
  "REACT_APP_API_URL",
  "MAPBOX_ACCESS_TOKEN"
];

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const processEnv = {};
  cherryPickedKeys.forEach(key => processEnv[key] = env[key]);

  return {
    define: {
      'process.env': processEnv
    },
    plugins: [react()],
  }
})