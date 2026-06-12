export type Env = {
    NODE_ENV: 'development' | 'production' | 'local' | 'test';
    PORT: string;
    DB_HOST: string;
    DB_PORT: string;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_NAME: string;
    REDIS_HOST: string;
    REDIS_PORT: string;
    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;
};