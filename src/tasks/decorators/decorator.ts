import { createParamDecorator, ExecutionContext } from "@nestjs/common";


export const currentProject = createParamDecorator (
   ( data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.project;
   },
);