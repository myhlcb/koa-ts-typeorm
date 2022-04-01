import {
    Entity,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    Index, Generated, PrimaryColumn,
} from 'typeorm';
@Entity('users')
export class User extends BaseEntity {
    @PrimaryColumn({unsigned: true, width: 12})
    @Generated('increment')
    @Index()
    public id: number;
    @CreateDateColumn()
    public createdTime: Date;

    @UpdateDateColumn()
    public updatedTime: Date;
}
