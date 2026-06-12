import { MigrationInterface, QueryRunner } from "typeorm";

export class AddInitialColumns1781283087956 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
        `)

        await queryRunner.query(`
            CREATE TYPE "user_role_enum" AS ENUM ('Host', 'Driver', 'Admin');
        `)

        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "user" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMPTZ,
                "created_by" uuid,
                "updated_by" uuid,
                "deleted_by" uuid,
                "name" character varying(255) NOT NULL,
                "email" character varying(255) NOT NULL UNIQUE,
                "password" character varying(255) NOT NULL,
                "role" "user_role_enum" NOT NULL,
                CONSTRAINT "PK_user_id" PRIMARY KEY (id)
            );
        `);

        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "charging_station" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMPTZ,
                "created_by" uuid,
                "updated_by" uuid,
                "deleted_by" uuid,
                "id_owner" uuid NOT NULL,
                "name" character varying(255) NOT NULL,
                "description" text NOT NULL,
                "latlng" jsonb NOT NULL,
                "is_active" boolean NOT NULL DEFAULT true,
                "address" character varying(255) NOT NULL,
                "kw_power" double precision NOT NULL,
                "price_per_kwh" jsonb NOT NULL,
                "connector_types" text[] NOT NULL,
                CONSTRAINT "PK_charging_station_id" PRIMARY KEY (id),
                CONSTRAINT "CHK_charging_station_kw_power_positive" CHECK ("kw_power" > 0),
                CONSTRAINT "FK_charging_station_owner" FOREIGN KEY ("id_owner") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
            );
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "IDX_charging_station_owner" ON "charging_station" ("id_owner");
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "IDX_charging_station_active" ON "charging_station" ("is_active");
        `);


    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX IF EXISTS "IDX_charging_station_active";
        `);

        await queryRunner.query(`
            DROP INDEX IF EXISTS "IDX_charging_station_owner";
        `);

        await queryRunner.query(`
            DROP TABLE IF EXISTS "charging_station";
        `);

        await queryRunner.query(`
            DROP TABLE "user";
        `);

        await queryRunner.query(`
            DROP TYPE "user_role_enum";
        `);
    }

}
