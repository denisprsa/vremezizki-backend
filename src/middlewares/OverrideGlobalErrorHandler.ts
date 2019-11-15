import { Err, GlobalErrorHandlerMiddleware, OverrideProvider, Req, Res } from "@tsed/common";
import { ServiceError } from "../helpers/ServiceError";

@OverrideProvider(GlobalErrorHandlerMiddleware)
export class OverrideGlobalErrorHandler extends GlobalErrorHandlerMiddleware {

    use(@Err() error: any, @Req() request: Req, @Res() response: Res): any {
        if (error instanceof ServiceError) {
            response.status(error.status);
            return response.json({
                message: error.message,
                errorCode: error.errorCode
            });
        }

        response.status(error.status);
        response.json({
            message: error.message,
            errorCode: error.name
        });
    }
}
