/* eslint-disable prettier/prettier */
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity('module')
  export class ModuleEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    module:string
  
  }
  