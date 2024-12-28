export default function getApiUrl() {
  const productionUrl = import.meta.env.VITE_PRODUCTION_API_URL;
  const developmentUrl = import.meta.env.VITE_DEVELOPMENT_API_URL;

  return import.meta.env.MODE === 'production' ? productionUrl : developmentUrl;
}
