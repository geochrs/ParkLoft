export default function getApiUrl() {
  const productionUrl = process.env.REACT_APP_PRODUCTION_API_URL;
  const developmentUrl = process.env.REACT_APP_DEVELOPMENT_API_URL;

  return process.env.NODE_ENV === 'production' ? productionUrl : developmentUrl;
}
