import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createHmac } from "crypto";

@Injectable()
export class CommonService {
    constructor(
        private readonly configService: ConfigService
    ) {}

    /** 密码加密 */
    signPassword(password: string) {
        const signedPassword = createHmac(
            'sha1',
            this.configService.get<string>('hamcKey'),
        )
            .update(password)
            .digest('hex');
        return signedPassword;
    }

}