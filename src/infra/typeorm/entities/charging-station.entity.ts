import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base-entity';
import { UserEntity } from './user.entity';

@Entity('charging_station')
export class ChargingStationEntity extends BaseEntity {
    @Column({
        name: 'id_owner',
        type: 'uuid',
        nullable: false,
    })
    idOwner!: string;

    @ManyToOne(() => UserEntity, {
        nullable: false,
        onDelete: 'RESTRICT',
    })
    @JoinColumn({ name: 'id_owner' })
    owner!: UserEntity;

    @Column({
        name: 'name',
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    name!: string;

    @Column({
        name: 'description',
        type: 'text',
        nullable: false,
    })
    description!: string;

    @Column({
        name: 'latlng',
        type: 'jsonb',
        nullable: false,
    })
    latlng!: { lat: number; lng: number };

    @Column({
        name: 'is_active',
        type: 'boolean',
        default: true,
    })
    isActive!: boolean;

    @Column({
        name: 'address',
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    address!: string;

    @Column({
        name: 'kw_power',
        type: 'double precision',
        nullable: false,
    })
    power!: number;

    @Column({
        name: 'price_per_kwh',
        type: 'jsonb',
        nullable: false,
    })
    pricePerKWh!: Record<string, number>;

    @Column({
        name: 'connector_types',
        type: 'text',
        array: true,
        nullable: false,
    })
    connectorTypes!: string[];
}