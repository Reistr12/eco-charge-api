import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base-entity';
import { UserRoleEnum } from './enums/user-role.enum';

@Entity('user')
export class UserEntity extends BaseEntity {
    @Column({ name: 'name', type: 'varchar', length: 255 })
    name!: string;

    @Column({ name: 'email', type: 'varchar', length: 255, unique: true })
    email!: string;

    @Column({ name: 'password', type: 'varchar', length: 255 })
    password!: string;

    @Column({ name: 'role', type: 'enum', enum: UserRoleEnum })
    role!: UserRoleEnum;
}