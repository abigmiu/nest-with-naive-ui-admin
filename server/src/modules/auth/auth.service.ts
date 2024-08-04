import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginRequestDto } from './dto/login.dto';
import { PrismaService } from '@/app/depend/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async login(data: LoginRequestDto) {
    const foundData = await this.prismaService.user.findFirst({
      where: {
        username: data.username,
        password: data.password,
      },
    });
    console.log('🚀 ~ AuthService ~ login ~ foundData:', foundData);

    if (!foundData) {
      throw new BadRequestException('账号或密码错误');
    }
    const token = await this.generateToken(foundData.id, foundData.roleId);

    return {
      ...foundData,
      token,
    };
  }

  private async generateToken(id: number, roleId: number) {
    const token = await this.jwtService.signAsync({
      id,
      roleId,
    });
    return token;
  }
}
