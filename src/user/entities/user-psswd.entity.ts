import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class UserPass {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  userId: number;

  @OneToOne(() => User, {onDelete: 'CASCADE'})
  @JoinColumn({name: "userId",})
  user: User;

  @Column()
  password: string;

  @CreateDateColumn({ type: 'timestamp' })
  createPsswdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatePsswdAt: Date;
}