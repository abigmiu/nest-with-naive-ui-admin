import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsInt, IsOptional } from "class-validator";

export class IPagerParams {
    @IsInt()
    @Type(() => Number)
    @IsOptional()
    page: number = 1;

    @IsInt()
    @Type(() => Number)
    @IsOptional()
    pageSize: number = 20;

    @IsInt()
    @Type(() => Number)
    @IsOptional()
    firstId?: number;

    @IsBoolean()
    @Type(() => Boolean)
    @IsOptional()
    realtime?: boolean;
}


export class PageResponse<T> {
    constructor(data: {
        total: number;
        data: T[];
        page: number;
        pageSize: number;
    }) {
        const totalPage = Math.ceil(data.total / data.pageSize);
        this.data = data.data;
        this.itemCount = data.total;
        this.page = data.page;
        this.pageSize = data.pageSize;
        this.pageCount = totalPage;
    }

    @ApiProperty({ title: "当前页数" })
    page: number;

    @ApiProperty({ title: "当前分页size" })
    pageSize: number;

    @ApiProperty({ title: "分页总数" })
    pageCount: number;

    @ApiProperty({ title: "总数" })
    itemCount: number;

    @ApiProperty({ title: "数据" })
    data: T[];
}