import { Compra } from 'src/compras/entities/compra.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 100 })
  nombre: string;
  @Column({ length: 150 })
  descripcion: string;
  @Column({ type: 'double' })
  precio: number;
}
