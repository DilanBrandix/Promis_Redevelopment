import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { coHeader } from '../../model/co-header.entity';
import { coheader } from '../../model/co-header.interface';
import { LogsService } from 'src/logs/services/logs/logs.service';
import { scheduleOperation } from '../../model/schedule-operation.entity';
import { schedule_Operation } from '../../model/schedule-operation.interface';

@Injectable()
export class CoHeaderService {
  constructor(
    @InjectDataSource('promis-legacy')
    private promisLegacyDataSource: DataSource,
    @InjectDataSource('promis-cdc') private promisRapidDataSource: DataSource,
    private readonly logsService: LogsService,
  ) {}

  // Methods Implemented To Get Data From Legacy System
  async viewScheduleBreakdownlegacy(coId: string) {
    try {
      let viewM3Data = await this.promisLegacyDataSource.query(
        `ProMIS_SX_SP_TMP_CO_Download_new'${coId}'`,
      );
      let details: any = [];
      const helper = {};
      viewM3Data = viewM3Data.reduce(function (r, o) {
        const schedule = o['Schedule_ID']
          ? o['Schedule_ID'].toString().trim()
          : '';
        const color = o['Colour_Code']
          ? o['Colour_Code'].toString().trim()
          : '';
        const size = o['Size_Code'] ? o['Size_Code'].toString().trim() : '';
        const key = schedule + color + size;

        if (!helper[key]) {
          helper[key] = Object.assign({}, o); // create a copy of o
          r.push(helper[key]);
        } else {
          helper[key].Quantity += o.Quantity;
        }
        // console.log(r);
        return r;
      }, []);
      details = viewM3Data.map((m: any) => {
        const data = {
          CO_ID: m['CO_ID'],
          Schedule_ID: m['Schedule_ID'],
          Colour_Code: m['Colour_Code'],
          Size_Code: m['Size_Code'],
          Quantity: m['Quantity'],
        };
        return data;
      });
      return details;
    } catch (error) {
      await this.logsService.createlog({
        cluster: 'BLI',
        message: 'Fail',
        error_description: `${error}`,
        created_by: 'Dilan',
        module: 'CO Header',
      });
    }
  }

  async viewOperationBreakdownlegacy(coId: string) {
    try {
      const viewM3Data = await this.promisLegacyDataSource.query(
        `SELECT OperationNumber,Name 
      FROM M3_sys_CO_Operations
      WHERE COID='${coId}'  
      Group by OperationNumber,Name Order by OperationNumber`,
      );
      return viewM3Data;
    } catch (error) {
      await this.logsService.createlog({
        cluster: 'BLI',
        message: 'Fail',
        error_description: `${error}`,
        created_by: 'Dilan',
        module: 'CO Header',
      });
    }
  }

  async saveCoHeaderlegacy(coId: string) {
    try {
      await this.promisLegacyDataSource.query(
        `ProMIS_SX_SP_CO_Download'${coId}'`,
      );
      await this.logsService.createlog({
        cluster: 'BLI',
        message: 'Success',
        error_description: 'CO Details Inserted Successfully',
        created_by: 'Dilan',
        module: 'CO Header',
      });
      return 'Executed Successfully';
    } catch (error) {
      await this.logsService.createlog({
        cluster: 'BLI',
        message: 'Fail',
        error_description: `${error}`,
        created_by: 'Dilan',
        module: 'CO Header',
      });
    }
  }

  // Methods Implemented To Get Data From RAPID System
  async scheduleBreakdownDataRapid(coId: string) {
    try {
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
    } catch (error) {
      await this.logsService.createlog({
        cluster: 'BLI',
        message: 'Fail',
        error_description: `${error}`,
        created_by: 'Dilan',
        module: 'CO Header',
      });
    }
  }
  async viewScheduleBreakdownRapid(coId: string) {
    try {
      let viewSBD = await this.scheduleBreakdownDataRapid(coId);

      viewSBD = viewSBD.map((m: any) => {
        const data = {
          CO_ID: m['OrderID'],
          Schedule_ID: m['ScheduleId'],
          Colour_Code: m['Colour_Code'],
          Size_Code: m['Size_Code'],
          Quantity: m['OrderedQuantity'],
        };
        return data;
      });
      return viewSBD;
    } catch (error) {
      await this.logsService.createlog({
        cluster: 'BLI',
        message: 'Fail',
        error_description: `${error}`,
        created_by: 'Dilan',
        module: 'CO Header',
      });
    }
  }

  async OperationBreakdownDataRapid(coId: string) {
    try {
      const viewCDCData = await this.promisRapidDataSource.query(
        `SELECT MVXJDTA.MWOHED.VHRORN AS COId, MVXJDTA.MWOHED.VHSCHN AS ScheduleId, MVXJDTA.MWOHED.VHMFNO AS MONumber,sfcs.oms_oms_mo_operations.fr_operation_number AS OperationNumber, MVXJDTA.MWOOPE.VOPLGR AS WorkCenterId, +
        manufacturing_integration.manufacturingOperations.code AS OperationCode,   manufacturing_integration.manufacturingOperations.name AS Name, 
       MVXJDTA.MWOHED.VHWHST AS MO_Status, sfcs.oms_oms_mo_operations.smv AS SMV FROM  MVXJDTA.MWOHED INNER JOIN 
       MVXJDTA.MWOOPE ON MVXJDTA.MWOHED.VHFACI = MVXJDTA.MWOOPE.VOFACI AND MVXJDTA.MWOHED.VHMFNO = MVXJDTA.MWOOPE.VOMFNO AND MVXJDTA.MWOHED.VHPRNO = MVXJDTA.MWOOPE.VOPRNO AND 
       MVXJDTA.MWOHED.VHSCHN = MVXJDTA.MWOOPE.VOSCHN INNER JOIN sfcs.oms_oms_mo_operations ON MVXJDTA.MWOOPE.VOMFNO = sfcs.oms_oms_mo_operations.mo_number INNER JOIN 
       manufacturing_integration.manufacturingOperations ON sfcs.oms_oms_mo_operations.fr_operation_number = manufacturing_integration.manufacturingOperations.fr_operation_number WHERE(MVXJDTA.MWOHED.VHRORN in('${coId}'));`,
      );
      return viewCDCData;
    } catch (error) {
      await this.logsService.createlog({
        cluster: 'BLI',
        message: 'Fail',
        error_description: `${error}`,
        created_by: 'Dilan',
        module: 'CO Header',
      });
    }
  }
  async viewOperationBreakdownRapid(coId: string) {
    try {
      let viewOBData = await this.OperationBreakdownDataRapid(coId);

      viewOBData = Object.values(
        viewOBData.reduce((cb, d) => {
          const key = d.COId + d.OperationNumber + d.Name;
          cb[key] = d;
          return cb;
        }, {}),
      );
      return viewOBData;
    } catch (error) {
      await this.logsService.createlog({
        cluster: 'BLI',
        message: 'Fail',
        error_description: `${error}`,
        created_by: 'Dilan',
        module: 'CO Header',
      });
    }
  }

  async saveCDCData(coId: string) {
    try {
      await this.promisLegacyDataSource.query(`DELETE
      FROM [ProMIS_SX].[dbo].[ProMIS_SX_M3_Schedule_Breakdown] 
      where CO_ID = ${coId}`);
      await this.logsService.createlog({
        cluster: 'BLI',
        message: 'Success',
        error_description: `CO Deletion Success From SB: ${coId}`,
        created_by: 'Dilan',
        module: 'CO Header',
      });
    } catch (error) {
      await this.logsService.createlog({
        cluster: 'BLI',
        message: 'Fail',
        error_description: `CO Deletion Failed From SB: ${error}`,
        created_by: 'Dilan',
        module: 'CO Header',
      });
    }
    try {
      let scheduleBreakdownRapid = await this.scheduleBreakdownDataRapid(coId);
      let bliDelDate;
      let cpoDelDate;
      scheduleBreakdownRapid = scheduleBreakdownRapid.map((sb: any) => {
        if (sb.BLI_DEL_DATE) {
          const date = sb.BLI_DEL_DATE.toString().slice(6, 8);
          const month = sb.BLI_DEL_DATE.toString().slice(4, 6);
          const year = sb.BLI_DEL_DATE.toString().slice(0, 4);

          bliDelDate = month + '/' + date + '/' + year;
        }
        if (sb.Cpo_Del_Date) {
          const date = sb.Cpo_Del_Date.toString().slice(6, 8);
          const month = sb.Cpo_Del_Date.toString().slice(4, 6);
          const year = sb.Cpo_Del_Date.toString().slice(0, 4);

          cpoDelDate = month + '/' + date + '/' + year;
        }
        const sbData: coheader = {
          CO_ID: sb['OrderID'],
          FG_Number: sb['StyleID'].toString(),
          Schedule_ID: sb['ScheduleId'].toString(),
          BLI_Del_Date: bliDelDate ? bliDelDate : null,
          CPO_Del_Date: cpoDelDate ? cpoDelDate : null,
          Buyer_PO: sb['MPO'],
          Buyer_Styleno: sb['CustomerStyle'],
          Range: sb['Product'],
          Item_SKU_Code: sb['SKU'],
          Colour_Code: sb['Colour_Code'],
          Colour_Description: sb['Colour_Description'],
          Size_Code: sb['Size_Code'],
          Size_Description: sb['Size_Description'],
          ZFeature_Code: sb['ZFeature_Code'],
          ZFeature_Description: sb['ZFeature_Description'],
          MO_Number: sb['MONumber'],
          Quantity: sb['OrderedQuantity'],
          MO_Status: sb['MO_Status'],
          SMV: sb['SMV'],
          Product_Category: sb['Product_Category'],
          Buyer_Name: sb['Buyer_Name'],
          Club_Number: 0,
          MKR_Status: true,
          PED: null,
          Extra: 0,
        };

        return sbData;
      });
      //console.log(scheduleBreakdownRapid[0]);
      await this.promisLegacyDataSource.manager
        .getRepository(coHeader)
        .save(scheduleBreakdownRapid, { chunk: 50 });
      await this.logsService.createlog({
        cluster: 'BLI',
        message: 'Success',
        error_description: 'Data Inserted To Schedule Breakdown Successfully',
        created_by: 'Dilan',
        module: 'CO Header',
      });
      // return saveScheduleBD;
    } catch (error) {
      await this.logsService.createlog({
        cluster: 'BLI',
        message: 'Fail',
        error_description: `${error}`,
        created_by: 'Dilan',
        module: 'CO Header',
      });
    }

    try {
      await this.promisLegacyDataSource.query(`DELETE
      FROM [ProMIS_SX].[dbo].[ProMIS_SX_M3_CO_Schedule_Operations]
      where CO_ID = ${coId}`);
      await this.logsService.createlog({
        cluster: 'BLI',
        message: 'Success',
        error_description: `CO Deletion Success From SO: ${coId}`,
        created_by: 'Dilan',
        module: 'CO Header',
      });
    } catch (error) {
      await this.logsService.createlog({
        cluster: 'BLI',
        message: 'Fail',
        error_description: `CO Deletion Failed From SO: ${error}`,
        created_by: 'Dilan',
        module: 'CO Header',
      });
    }

    try {
      let operationBreakdownRapid = await this.OperationBreakdownDataRapid(
        coId,
      );

      operationBreakdownRapid = operationBreakdownRapid.map((so: any) => {
        const soData: schedule_Operation = {
          CO_ID: so['COId'],
          Schedule_ID: so['ScheduleId'].toString(),
          MO_Number: so['MONumber'],
          Operation_Code: so['OperationCode'],
          Work_Centre_ID: so['WorkCenterId'],
          MO_Status: so['MO_Status'],
          SMV: so['SMV'],
        };
        return soData;
      });

      await this.promisLegacyDataSource.manager
        .getRepository(scheduleOperation)
        .save(operationBreakdownRapid, { chunk: 50 });
      await this.logsService.createlog({
        cluster: 'BLI',
        message: 'Success',
        error_description: 'Data Inserted To Schedule Operation Successfully',
        created_by: 'Dilan',
        module: 'CO Header',
      });
    } catch (error) {
      await this.logsService.createlog({
        cluster: 'BLI',
        message: 'Fail',
        error_description: `${error}`,
        created_by: 'Dilan',
        module: 'CO Header',
      });
    }
    return 'Executed Successfully';
  }
}
