import { Controller, Get, Query } from '@nestjs/common';
import { ListService } from './list.service';
import { QueryListRequestDto } from './dto/query-list.dto';

@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Get()
  getList(@Query() query: QueryListRequestDto) {
    return this.listService.getList(query);
  }
}
