import 'reflect-metadata';
import 'dotenv/config';
import { join } from 'path';
import { DataSource } from 'typeorm';
import { ChargingStationEntity } from '../entities/charging-station.entity';
import { UserEntity } from '../entities/user.entity';

const isTsRuntime = __filename.endsWith('.ts');
const migrationsPath = isTsRuntime
  ? join(__dirname, '..', 'migrations', '*.ts')
  : join(__dirname, '..', 'migrations', '*.js');
const host = isTsRuntime
  ? process.env.DB_HOST_MIGRATION ?? process.env.DB_HOST ?? 'localhost'
  : process.env.DB_HOST ?? 'localhost';

const AppDataSource = new DataSource({
  type: 'postgres',
  host,
  port: Number(process.env.DB_PORT ?? 5432),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [UserEntity, ChargingStationEntity],
  migrations: [migrationsPath],
  synchronize: false,
});

export default AppDataSource;
