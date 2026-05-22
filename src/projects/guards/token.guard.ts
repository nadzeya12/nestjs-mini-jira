import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { log } from "node:console";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const request = context.switchToHttp().getRequest<Request>();

        const token = request.headers['auth-token'];

        if (!token) throw new UnauthorizedException('no token in header');

        try {
            const payload = this.jwtService.verify<{ userId: string }>(token);
            console.log('payload', payload)

            const user = await this.usersService.findById(payload.userId);

            if (!user) {
                throw new UnauthorizedException('User not found');
            }

            request['user'] = user;
            console.log('user', user)

            return true;
        } catch (err) {
            if (err instanceof HttpException) throw err;
            const message = err instanceof Error ? err.message : 'No access';
            throw new HttpException(message, HttpStatus.FORBIDDEN);
        }
    }
}