import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserBaseQueryResponseDto {
    @Expose()
        password: string;
}
