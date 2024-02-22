/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('ProMIS_SX_M3_CO_Schedule_Operations')
export class scheduleOperation {

    @PrimaryColumn()
    CO_ID:string
    
    @PrimaryColumn()
    Schedule_ID: string;

    @PrimaryColumn()
    MO_Number: string;

    @PrimaryColumn({ type: 'numeric'})
    Operation_Code: number;

    @Column({nullable: true })
    Work_Centre_ID: string;

    @Column({ type: 'numeric'})
    MO_Status: number;

    @Column({ type: 'numeric', nullable: true })
    SMV: number;
}