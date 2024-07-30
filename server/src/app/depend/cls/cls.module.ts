import { Global, Module } from '@nestjs/common';
import { ClsModule } from 'nestjs-cls';
import { v4 as uuidV4 } from 'uuid';
import { AppClsService } from './cls.service';

@Global()
@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: false,
        generateId: true,
        idGenerator: (req: Request) => {
          return req.headers['X-Request-Id'] ?? uuidV4();
        },
      },
    }),
  ],
  providers: [AppClsService],
  exports: [AppClsService],
})
export class AppClsModule {}
