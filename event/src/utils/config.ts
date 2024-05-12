import dotenv from 'dotenv';
import path from 'path'

function createConfig(configPath: string) {
  dotenv.config({ path: configPath });

  // Validate essential configuration
  const requiredConfig = [
    'NODE_ENV',
    'PORT',
    'MONGODB_URL',
    'LOG_LEVEL',
    'API_GATEWAY_URL'
  ];
  const missingConfig = requiredConfig.filter((key) => !process.env[key]);

  if (missingConfig.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingConfig.join(', ')}`
    );
  }

  // Return configuration object
  return {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    apiGatewayUrl: process.env.API_GATEWAY_URL,
    logLevel: process.env.LOG_LEVEL,
    mongoUrl: process.env.MONGODB_URL,
  };
}

const getConfig = (currentEnv: string = 'development') => {
  const configPath =
    currentEnv === "development"
      ? path.join(__dirname, `../../configs/.env`)
      : path.join(__dirname, `../../configs/.env.${currentEnv}`);
  return createConfig(configPath);
};

export default getConfig;