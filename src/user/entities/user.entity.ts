import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50})
  name: string;

  @Column({ length: 50 })
  lastname: string;
  
  @Column({ length: 10, unique: true})
  identityNum: string;

  @Column({ length: 10, unique: true})
  cellphoneNum: string;

  @Column()
  age: number;

  @Column()
  gender: number;

  @Column({type: 'timestamp', nullable: true})
  birthdate: Date;

  @Column({ length: 100, unique: true })
  email: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
