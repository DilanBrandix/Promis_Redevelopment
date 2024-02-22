/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('ProMIS_SX_M3_Schedule_Breakdown')
export class coHeader {

    @PrimaryColumn()
    CO_ID:string
  
    @PrimaryColumn()
    FG_Number: string;
    
    @PrimaryColumn()
    Schedule_ID: string;

    @Column()
    BLI_Del_Date: Date;

    @Column()
    CPO_Del_Date: Date;

    @Column()
    Buyer_PO: string;

    @Column()
    Buyer_Styleno: string;

    @Column()
    Range: string;

    @Column()
    Item_SKU_Code: string;

    @PrimaryColumn()
    Colour_Code: string;

    @Column()
    Colour_Description: string;

    @PrimaryColumn()
    Size_Code: string;

    @Column()
    Size_Description: string;

    @Column()
    ZFeature_Code: string;

    @Column()
    ZFeature_Description: string;

    @PrimaryColumn()
    MO_Number: string;

    @Column({ type: 'numeric'})
    Quantity: number;

    @Column({ type: 'numeric'})
    MO_Status: number;

    @Column({ type: 'numeric', nullable: true })
    SMV: number;

    @Column({nullable: true })
    Product_Category: string;

    @Column({nullable: true })
    Buyer_Name: string;

    @Column({ type: 'numeric', nullable: true })
    Club_Number: number;

    @Column({ type: 'bit', nullable: true })
    MKR_Status: boolean;

    @Column({ nullable: true} )
    PED: Date;

    @Column({ type: 'numeric', nullable: true })
    Extra: number;
}