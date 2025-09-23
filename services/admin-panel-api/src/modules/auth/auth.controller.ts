import { Body, Controller, Post, UsePipes } from '@nestjs/common';

import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';

import { JoiValidationPipe } from '../../pipes/joi-validation.pipe';
import { signInUserSchema } from '../../validations';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  @UsePipes(new JoiValidationPipe(signInUserSchema))
  async signIn(@Body() { email, password }: SignInDto) {
    return await this.authService.signIn({ email, password });
  }
}
