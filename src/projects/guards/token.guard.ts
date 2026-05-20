import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../../users/users.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
    private usersService: UsersService,
    private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    
        const request = context.switchToHttp().getRequest<Request>();

        const token = request.headers['auth-token'];

        if(!token) throw new UnauthorizedException('no token in header'); 

        try {
            const payload = this.jwtService.verify(token);

            const user = await this.usersService.findById(payload);

            if(!user) {
                throw new UnauthorizedException('User not found');
            }

            request['user'] = user;

            return true;
        } catch {
            throw new HttpException('No access', HttpStatus.FORBIDDEN);
        }
    }
}