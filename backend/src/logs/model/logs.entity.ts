/* eslint-disable prettier/prettier */
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity('error_log')
  export class LogEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({nullable:true})
    cluster:string
  
    @Column({ nullable: true })
    message: string;
  
    @Column({ nullable: true })
    error_description: string;

    @Column({ nullable: true })
    module: string;
  
    @Column({ nullable: true })
    created_by: string;
  
    @CreateDateColumn()
    created_at: Date;
  
  }
  