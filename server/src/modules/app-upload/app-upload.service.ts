import { IAppConfig } from '@/types/app/config';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as qiniu from 'qiniu';
import { v4 } from 'uuid';
import { AppUploadResponseDto } from './dto/response.dto';

@Injectable()
export class AppUploadService {
    constructor(
        private readonly configService: ConfigService,
    ) {}

    getQiniuUploadCertificate() {
        const { accessKey, secretKey, bucket, uploadUrl, accessUrl } = this.configService.get<IAppConfig['qiniu']>('qiniu');
        
        const uuid = v4();
        const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
        const options = {
            scope: `${bucket}:${uuid}`
        };
        const putPolicy = new qiniu.rs.PutPolicy(options);
        const uploadToken = putPolicy.uploadToken(mac);
        

        return new AppUploadResponseDto({
            accessUrl: `${accessUrl}/${uuid}`,
            uploadUrl,
            fileFiled: 'file',
            form: {
                token: uploadToken,
                key: uuid
            },
            headers: {},
            method: 'POST'
        });
    }   
}
