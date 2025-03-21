import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
// export class UserPass {
//   @PrimaryGeneratedColumn()
//   id: number;
  
//   @ManyToOne(() => User, {cascade: true})
//   @JoinColumn({name: 'idUser'})
//   idUser: User;

//   @Column()
//   password: string;

//   @CreateDateColumn({ type: 'timestamp' })
//   createPassdAt: Date;

//   @UpdateDateColumn({ type: 'timestamp' })
//   updatePassdAt: Date;
// }

export class UserPass {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idUser: number;

  @Column()
  password: string;

  @CreateDateColumn({ type: 'timestamp' })
  createPassdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatePassdAt: Date;
}