/* eslint-disable prettier/prettier */
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    PrimaryColumn
  } from 'typeorm';
  
  @Entity('users')
  export class UsersEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @PrimaryColumn()
    username:string
  
    @Column()
    employeeName: string;
  
    @Column()
    status: boolean;

    @Column()
    department: string;
  
    @Column()
    cluster: string;
  
    @CreateDateColumn()
    created_at: Date;
  
  }
  