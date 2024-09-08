import { IPagerParams } from "@/types/pager";
import { Expose } from "class-transformer";

export class QueryFilePageRequestDto extends IPagerParams {
    
}

@Expose()
export class QueryFileRecordResponseDto {
    constructor(data: Partial<QueryFileRecordResponseDto>) {
        Object.assign(this, data);
    }

    @Expose()
    id: number;

    @Expose()
    remark: string | null;

    @Expose()
    tags: string[];

    @Expose()
    file: {
        url: string;
        id: number;
        width: number;
        height: number;
        fileName: string;
    };

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;
}