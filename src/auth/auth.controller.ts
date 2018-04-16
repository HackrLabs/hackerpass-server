import { Controller, Get, Post, Request, Response, Body, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Auth } from './auth.decorator';

@Controller('auth')
export class AuthController {

	constructor(
		private authService: AuthService,
	) {}

  @Auth(false)
	@Post('/login')
  public async login(
    @Response() res,
		@Body('email') email,
		@Body('password') password
	) {
		const auth = await this.authService.login(email, password);
		res.status(HttpStatus.OK).json(auth);
	}
}
