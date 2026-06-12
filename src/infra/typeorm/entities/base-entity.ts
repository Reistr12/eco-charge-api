import {
    BaseEntity as TypeormBaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity extends TypeormBaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
    updatedAt!: Date;

    @DeleteDateColumn({
        name: 'deleted_at',
        type: 'timestamp with time zone',
        nullable: true,
    })
    deletedAt!: Date | null;

    @Column({ name: 'created_by', type: 'uuid', nullable: true })
    createdBy!: string | null;

    @Column({ name: 'updated_by', type: 'uuid', nullable: true })
    updatedBy!: string | null;

    @Column({ name: 'deleted_by', type: 'uuid', nullable: true })
    deletedBy!: string | null;
}