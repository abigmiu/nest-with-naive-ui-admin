import { Controller, Get, Query } from '@nestjs/common';
import { ListService } from './list.service';
import { QueryListRequestDto } from './dto/query-list.dto';
import { Permission } from '@/decorator/permission.decorator';
import { GOOD_PERMISSION } from '@/constant/permission';

@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Permission(GOOD_PERMISSION.LIST.id)
  @Get()
  getList(@Query() query: QueryListRequestDto) {
    return this.listService.getList(query);
  }
}
