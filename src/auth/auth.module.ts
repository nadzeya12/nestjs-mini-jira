// import { Module } from '@nestjs/common';
// import { UsersModule } from '../users/users.module'; 
// import { AuthService } from './auth.service';
// import {JwtModule, JwtSecretRequestType} from '@nestjs/jwt';
// import { AuthController } from './auth.controller';


// JwtModule.register ({
//     secret: 'whin1378xnsk&jdjqk',

//     privateKey: '22222222222',

//     publicKey: '7778877887788'

// })
// secretProvider: (
//     requestType: JwtSecretRequestType,
//     token: string,
// ) => {
//     switch (requestType) {
//         case JwtSecretRequestType.SIGN:
//             return 'private-key';

//         case JwtSecretRequestType.VERIFY:
//             return 'publicKey';

//         default:
//             return 'hard-to-guess-key'
//     }
// }
// @Module({
//     imports: [UsersModule,
//         JwtModule.register({
//             global: true,
//             signOptions: {expiresIn: '60s'}
//             //secret: secretProvider
//         })
//     ],
//     providers: [AuthService],
//     controllers: [AuthService],
//     exports: [AuthService]
// })
// export class AuthModule {}