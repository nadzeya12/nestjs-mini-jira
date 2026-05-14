import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "../auth.service";
import { ConfigService } from "@nestjs/config";
import {ExtractJwt, Strategy} from 'passport-jwt'
import { JwtPayload } from "jsonwebtoken";
import { Injectable } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor (
        private readonly AuthService: AuthService,
        private readonly configService: ConfigService
    ) {
        super ({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
            algorithms: ['HS256'],
        });
    }
    async validate (payload: JwtPayload) {
        return await this.AuthService.validate(payload.id);
    }
    
}