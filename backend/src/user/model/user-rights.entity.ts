/* eslint-disable prettier/prettier */
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity('userRights')
  export class UserRightsEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    username:string
  
    @Column()
    moduleID: number;
  
    @Column()
    subModuleID: number;

    @Column()
    rights: boolean;
  
  }
  