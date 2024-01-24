import { Controller, Post, Body } from '@nestjs/common';
import { CoHeaderService } from '../../services/co_header/co_header.service';

@Controller('co-header')
export class CoHeaderController {
  constructor(private coHeader: CoHeaderService) {}

  @Post('viewScheduleBreakdownLegacy')
  viewScheduleBreakdownLegacy(@Body() data): Promise<any> {
    return this.coHeader.viewScheduleBreakdownlegacy(data.coId);
  }

  @Post('viewOperatrionBreakdown')
  viewOperatrionBreakdown(@Body() data): Promise<any> {
    return this.coHeader.viewOperationBreakdownlegacy(data.coId);
  }

  @Post('saveCOData')
  saveCOData(@Body() data): Promise<any> {
    return this.coHeader.saveCoHeaderlegacy(data.coId);
  }

  @Post('viewScheduleBreakdownRapid')
  viewScheduleBreakdownRapid(@Body() data): Promise<any> {
    return this.coHeader.viewScheduleBreakdownRapid(data.coId);
  }

  @Post('viewOperationBreakdownRapid')
  viewOperationBreakdownRapid(@Body() data): Promise<any> {
    return this.coHeader.viewOperationBreakdownRapid(data.coId);
  }
}
