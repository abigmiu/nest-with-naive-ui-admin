import { Injectable } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';

@Injectable()
export class AppClsService {
  constructor(protected readonly clsService: ClsService) {}

  getClsId() {
    return this.clsService.getId();
  }
}
