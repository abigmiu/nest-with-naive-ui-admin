import { Injectable } from "@nestjs/common";
import { RoleService } from "../role/role.service";
import { Workbook } from 'exceljs';
import { join } from "path";
import { UserService } from "./user.service";
import { CommonService } from "../common/common.service";
import { PrismaService } from "@/app/depend/prisma/prisma.service";

@Injectable()
export class UserImportService {
    constructor(
        private readonly roleService: RoleService,
        private readonly userService: UserService,
        private readonly commonService: CommonService,
        private readonly prismaService: PrismaService
    ) {

    }

    /** 获取用户导入模板 */
    async getImportUserTemplate() {
        const sheetPath = join(process.cwd(), 'assets/sheet/用户导入模板.xlsx');
        return this.fillRole(sheetPath);
    }

    /** 获取用户导出数据 */
    async getExportUserFile() {
        const sheetPath = join(process.cwd(), 'assets/sheet/用户导出.xlsx');

        return this.fillUser(sheetPath);
    }

    async importFile(buffer: Buffer) {
        const data = await this.parseImportFile(buffer);
        const roles = await this.roleService.getSimpleList();
        const effectiveData = [];
        data.forEach((item) => {
            console.log("🚀 ~ UserImportService ~ data.forEach ~ item:", item);
            const [account, username, password, rolename] = item;
            const role = roles.find((role) => role.name === rolename);
            if (role && account && username) {
                const obj = {
                    account,
                    username,
                    roleId: role.id,
                };
                if (password) {
                    obj['password'] = this.commonService.signPassword(password.toString());
                } else {
                    obj['password'] = this.commonService.signPassword('123456');
                }
                effectiveData.push(obj);
            }
        }); 
        await this.prismaService.user.createMany({ data: effectiveData });
    }

    private async parseImportFile(buffer: Buffer) {
        console.log("🚀 ~ UserImportService ~ parseImportFile ~ buffer:", Buffer.isBuffer(buffer));
        const workbook = new Workbook();
        const sheets = await workbook.xlsx.load(buffer);
        const worksheet = workbook.getWorksheet(1);
        const result = [];
        worksheet.eachRow((row, rowNumber) => {
            if (rowNumber === 1) {
                return;
            }
            result.push([
                row.getCell('A').value,
                row.getCell('B').value,
                row.getCell('C').value,
                row.getCell('D').value
            ]);
        });

        return result;
    }

    private async fillUser(sheetPath: string) {
        const users = await this.userService.getList();

        const workbook = new Workbook();
        const sheets = await workbook.xlsx.readFile(sheetPath);
        const worksheet = workbook.getWorksheet(1);

        const sheetStartColIndex = 1;
        users.forEach((item, index) => {
            worksheet.getCell(`A${index + sheetStartColIndex}`).value = item.account;
            worksheet.getCell(`B${index + sheetStartColIndex}`).value = item.username;
            worksheet.getCell(`C${index + sheetStartColIndex}`).value = item.role.name;
        });

        const buffer = await workbook.xlsx.writeBuffer();
        return buffer;
    }

    /** 给用户导入模板填充数据 */
    private async fillRole(sheetPath: string) {
        const roles = await this.roleService.getSimpleList();
        const workbook = new Workbook();
        const sheets = await workbook.xlsx.readFile(sheetPath);
        const worksheet = workbook.getWorksheet(1);
        
        for (let i = 1; i <= 9999; i++) {
            worksheet.getCell(`D${i}`).dataValidation = {
                type: 'list',
                allowBlank: false,
                formulae: [`"${roles.map((role) => role.name).join(',')}"`],
            };
        
        }
       
        const buffer = await workbook.xlsx.writeBuffer();
        return buffer;
    }



}