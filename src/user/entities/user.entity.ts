import { Compra } from 'src/compras/entities/compra.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  rol: string;

  @Column()
  email: string;

  @Column({ default: null })
  image: string;

  @OneToMany(() => Compra, (compra) => compra.user)
  @JoinColumn()
  compras: Compra[];
}
