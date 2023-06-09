import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthenticationService } from './authentication.service';
import { SignInDto } from './dto/sign-in.dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto/sign-up.dto';
import { AuthType } from './enums/auth-type.enum';
import { Auth } from './decorators/auth.decorator';
import { RefreshTokenDto } from './dto/refresh-token.dto/refresh-token.dto';
import { OtpAuthenticationService } from './otp-authentication.service';
import { ActiveUser } from '../decorators/active-user.decorator';
import { ActiveUserData } from '../interfaces/active-user-data.interface';
import { toFileStream } from 'qrcode';

@Auth(AuthType.None)
@Controller('authentication')
export class AuthenticationController {
  constructor(
    private readonly autService: AuthenticationService,
    private readonly otpAuthServie: OtpAuthenticationService,
  ) {}

  @Post('/signIn')
  async sighIn(
    @Res({ passthrough: true }) response: Response,
    @Body() signInDto: SignInDto,
  ) {
    return this.autService.signIn(signInDto);
    /*const accessToken = await this.autService.signIn(signInDto);
    response.cookie('accessToken', accessToken, {
      secure: true,
      httpOnly: true,
      sameSite: true,
    });*/
  }

  @HttpCode(HttpStatus.OK)
  @Post('/signUp')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.autService.signUp(signUpDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/refresh')
  refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.autService.refreshTokens(refreshTokenDto);
  }

  @Auth(AuthType.Bearer)
  @HttpCode(HttpStatus.OK)
  @Post('2fa/generate')
  async generate(
    @ActiveUser() activeUser: ActiveUserData,
    @Res() response: Response,
  ) {
    const { uri, secret } = await this.otpAuthServie.generateSecret(
      activeUser.email,
    );
    await this.otpAuthServie.enableTfa(activeUser.email, secret);
    response.type('png');
    return toFileStream(response, uri);
  }
}
