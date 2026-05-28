import { applyDecorators } from "@nestjs/common";
import { ApiBadRequestResponse, ApiForbiddenResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiResponse, ApiUnauthorizedResponse } from "@nestjs/swagger";

export function ApiCommonResponcesForProjects () {
    return applyDecorators(
        ApiUnauthorizedResponse({ 
            description: 'User not authorized',
            example: {
                "message": "no token in header",
                "error": "Unauthorized",
                "statusCode": 401
            }}),
        ApiBadRequestResponse({ 
            description: 'Invalid data.',
        example: {
            "message:": "[array of errors]",
            "error": "Bad Request",
            "statusCode": 400
        }}),
        ApiForbiddenResponse({ 
            description: 'User has no access to this action',
            example: {
                "message": "No access.",
                "error": "Forbidden",
                "statusCode": 403
            }}),

        ApiNotFoundResponse({ 
            description: 'User not found',
        example: {
            "message": "Project not found",
            "error": "Not Found",
            "statusCode": 404
        }}),
    )
}