
export class ServiceError extends Error {
    public status: number = 500;
    public errorCode: string = 'internalServerError';

    constructor(message: string, status: number, errorCode: string) {
        super(message);

        this.status = status;
        this.errorCode = errorCode;
    }
}
