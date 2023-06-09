import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../users/entities/user.entity';
import { Repository } from 'typeorm';
import { authenticator } from 'otplib';

@Injectable()
export class OtpAuthenticationService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async generateSecret(email: string) {
    const secret = authenticator.generateSecret();
    const appName = this.configService.getOrThrow('TFA_APP_NAME');
    const uri = authenticator.keyuri(email, appName, secret);
    return {
      uri,
      secret,
    };
  }

  verify(code: string, secret: string): boolean {
    return authenticator.verify({ token: code, secret });
  }

  async enableTfa(email: string, secret: string): Promise<void> {
    const { id } = await this.userRepository.findOneByOrFail({
      where: { email },
      select: { id: true },
    });
    await this.userRepository.update(
      { id },
      { tfaSecret: secret, isTfaEnabled: true },
    );
  }
}
