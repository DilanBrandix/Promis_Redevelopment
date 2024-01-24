import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class CoHeaderService {
  constructor(
    @InjectDataSource('promis-legacy')
    private promisLegacyDataSource: DataSource,
    @InjectDataSource('promis-cdc') private promisRapidDataSource: DataSource,
  ) {}

  async viewScheduleBreakdownlegacy(coId: string) {
    const viewM3Data = await this.promisLegacyDataSource.query(
      `ProMIS_SX_SP_TMP_CO_Download_new'${coId}'`,
    );
    return viewM3Data;
  }

  async viewOperationBreakdownlegacy(coId: string) {
    const viewM3Data = await this.promisLegacyDataSource.query(
      `SELECT OperationNumber,Name 
      FROM M3_sys_CO_Operations
      WHERE COID='${coId}'  
      Group by OperationNumber,Name Order by OperationNumber`,
    );
    return viewM3Data;
  }

  async saveCoHeaderlegacy(coId: string) {
    const saveM3Data = await this.promisLegacyDataSource.query(
      `ProMIS_SX_SP_CO_Download'${coId}'`,
    );
    return saveM3Data;
  }

  async viewScheduleBreakdownRapid(coId: string) {
    const viewCDCData = await this.promisRapidDataSource.query(
      `SELECT distinct MVXJDTA.OOHEAD.OAORNO AS OrderID, MVXJDTA.OOHEAD.OAFACI AS Factory, MVXJDTA.OOHEAD.OAOREF AS CustomerStyle, MVXJDTA.OOLINE.OBPONR AS OrderLine, MVXJDTA.OOLINE.OBCUOR AS MPO, 
      MVXJDTA.OOLINE.OBDWDT AS BLI_DEL_DATE, MVXJDTA.OOLINE.OBCODT AS Cpo_Del_Date, MVXJDTA.MWOHED.VHPRNO AS Product, MVXJDTA.MWOHED.VHMFNO AS MONumber,
      MVXJDTA.MWOHED.VHORQA AS OrderedQuantity, MVXJDTA.MWOHED.VHSCHN AS ScheduleId, MVXJDTA.MWOHED.VHTXT1 AS TextRefMO, MVXJDTA.MWOHED.VHDWNO AS SplitStatusDrawingNumber,
      MVXJDTA.MWOHED.VHWHST AS MO_Status, MVXJDTA.MWOHED.VHHDPR AS StyleID, MVXJDTA.MITMAH.HMOPTY AS Colour_Code, MVXJDTA.MITMAH.HMOPTX AS Size_Code, MVXJDTA.MITMAH.HMOPTZ AS ZFeature_Code,
      Y.PFTX30 AS Colour_Description, X.PFTX15 AS Size_Description,Z.PFTX15 AS ZFeature_Description, MVXJDTA.MITMAS.MMBUAR AS BuyerDivisionId, MVXJDTA.MITMAS.MMITTY AS ItemType,  +
      MVXJDTA.MITMAS.MMITCL AS Product_Category, MVXJDTA.MITMAS.MMCFI4 AS Range, MVXJDTA.MWOOPE.VOPITI AS SMV, MVXJDTA.MWOOPE.VOPRNO AS SKU, MVXJDTA.MITHRY.HITX40 AS Buyer_Name 
      FROM  MVXJDTA.OOHEAD INNER JOIN 
      MVXJDTA.OOLINE ON MVXJDTA.OOHEAD.OAORNO = MVXJDTA.OOLINE.OBORNO INNER JOIN 
      MVXJDTA.MWOHED ON MVXJDTA.OOLINE.OBORNO = MVXJDTA.MWOHED.VHRORN AND MVXJDTA.OOLINE.OBPONR = MVXJDTA.MWOHED.VHRORL INNER JOIN 
      MVXJDTA.MITMAH ON MVXJDTA.MWOHED.VHITNO = MVXJDTA.MITMAH.HMITNO AND MVXJDTA.MWOHED.VHHDPR = MVXJDTA.MITMAH.HMSTYN INNER JOIN 
      MVXJDTA.MITMAS ON MVXJDTA.MITMAH.HMITNO = MVXJDTA.MITMAS.MMITNO INNER JOIN 
      MVXJDTA.MWOOPE ON MVXJDTA.MWOHED.VHFACI = MVXJDTA.MWOOPE.VOFACI AND MVXJDTA.MWOHED.VHMFNO = MVXJDTA.MWOOPE.VOMFNO INNER JOIN 
      MVXJDTA.MITHRY ON MVXJDTA.MITMAS.MMHIE3 = MVXJDTA.MITHRY.HIHIE0 INNER JOIN 
      MVXJDTA.MPDOPT AS X ON MVXJDTA.MITMAH.HMCONO = X.PFCONO AND MVXJDTA.MITMAH.HMOPTX = X.PFOPTN AND X.PFOGRP = 'X' INNER JOIN 
      MVXJDTA.MPDOPT AS Y ON MVXJDTA.MITMAH.HMCONO = Y.PFCONO AND MVXJDTA.MITMAH.HMOPTY = Y.PFOPTN AND Y.PFOGRP = 'Y' INNER JOIN 
      MVXJDTA.MPDOPT AS Z ON MVXJDTA.MITMAH.HMCONO = Z.PFCONO AND MVXJDTA.MITMAH.HMOPTZ = Z.PFOPTN AND Z.PFOGRP = 'Z'  
      where (MVXJDTA.MITHRY.HIHLVL = '3') and  MVXJDTA.OOHEAD.OAORNO in('${coId}');`,
    );
    return viewCDCData;
  }
  async viewOperationBreakdownRapid(coId: string) {
    const viewM3Data = await this.promisRapidDataSource.query(
      `SELECT MVXJDTA.MWOHED.VHRORN AS COId, MVXJDTA.MWOHED.VHSCHN AS ScheduleId, MVXJDTA.MWOHED.VHMFNO AS MONumber,sfcs.oms_oms_mo_operations.fr_operation_number AS OperationNumber, MVXJDTA.MWOOPE.VOPLGR AS WorkCenterId, +
      manufacturing_integration.manufacturingOperations.code AS OperationCode,   manufacturing_integration.manufacturingOperations.name AS Name, 
     MVXJDTA.MWOHED.VHWHST AS MO_Status, sfcs.oms_oms_mo_operations.smv AS SMV FROM  MVXJDTA.MWOHED INNER JOIN 
     MVXJDTA.MWOOPE ON MVXJDTA.MWOHED.VHFACI = MVXJDTA.MWOOPE.VOFACI AND MVXJDTA.MWOHED.VHMFNO = MVXJDTA.MWOOPE.VOMFNO AND MVXJDTA.MWOHED.VHPRNO = MVXJDTA.MWOOPE.VOPRNO AND 
     MVXJDTA.MWOHED.VHSCHN = MVXJDTA.MWOOPE.VOSCHN INNER JOIN sfcs.oms_oms_mo_operations ON MVXJDTA.MWOOPE.VOMFNO = sfcs.oms_oms_mo_operations.mo_number INNER JOIN 
     manufacturing_integration.manufacturingOperations ON sfcs.oms_oms_mo_operations.fr_operation_number = manufacturing_integration.manufacturingOperations.fr_operation_number WHERE(MVXJDTA.MWOHED.VHRORN in('${coId}'));`,
    );
    return viewM3Data;
  }
}
