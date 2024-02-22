/* eslint-disable prettier/prettier */
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity('submodule')
  export class SubModuleEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    submodule:string
  
  }
  