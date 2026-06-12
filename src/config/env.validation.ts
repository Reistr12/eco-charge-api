import { Env } from './env';

const REQUIRED_ENV_KEYS: Array<keyof Env> = [
  'NODE_ENV',
  'PORT',
  'DB_HOST',
  'DB_PORT',
  'DB_USER',
  'DB_PASSWORD',
  'DB_NAME',
  'REDIS_HOST',
  'REDIS_PORT',
];

export const validateEnv = (config: Record<string, unknown>): Env => {
  const missingKeys = REQUIRED_ENV_KEYS.filter((key) => {
    const value = config[key];
    return value === undefined || value === null || value === '';
  });

  if (missingKeys.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingKeys.join(', ')}`,
    );
  }

  const nodeEnv = String(config.NODE_ENV);
  const allowedNodeEnvs: Env['NODE_ENV'][] = [
    'development',
    'production',
    'local',
    'test',
  ];

  if (!allowedNodeEnvs.includes(nodeEnv as Env['NODE_ENV'])) {
    throw new Error(
      `Invalid NODE_ENV: ${nodeEnv}. Allowed values: ${allowedNodeEnvs.join(', ')}`,
    );
  }

  const port = Number(config.PORT);
  const dbPort = Number(config.DB_PORT);
  const redisPort = Number(config.REDIS_PORT);

  if (Number.isNaN(port) || port <= 0) {
    throw new Error('Invalid PORT: must be a positive number');
  }

  if (Number.isNaN(dbPort) || dbPort <= 0) {
    throw new Error('Invalid DB_PORT: must be a positive number');
  }

  if (Number.isNaN(redisPort) || redisPort <= 0) {
    throw new Error('Invalid REDIS_PORT: must be a positive number');
  }

  return {
    NODE_ENV: nodeEnv as Env['NODE_ENV'],
    PORT: String(config.PORT),
    DB_HOST: String(config.DB_HOST),
    DB_PORT: String(config.DB_PORT),
    DB_USER: String(config.DB_USER),
    DB_PASSWORD: String(config.DB_PASSWORD),
    DB_NAME: String(config.DB_NAME),
    REDIS_HOST: String(config.REDIS_HOST),
    REDIS_PORT: String(config.REDIS_PORT),
  };
};