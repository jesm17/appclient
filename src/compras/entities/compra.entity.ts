import { Producto } from 'src/productos/entities/producto.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Compra {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Producto)
  @JoinTable()
  productos: Producto[];
  @Column('int')
  cantidad: number;
  @ManyToOne(() => User, (user) => user.id)
  user: number;
  // @ManyToOne(() => User, (user) => user.id)
  // @JoinColumn()
  // user: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' }) // fecha de creacion
  createdAt: Date;

  @Column('int')
  totalPagar: number;
}
