import { IExceptionServicePaylaod } from "@domain/common/interfaces"

class ExceptionService<TKeys extends string> extends Error {

    public readonly code: number

    public readonly data?: IExceptionServicePaylaod<TKeys>['data']

    private constructor(status: IExceptionServicePaylaod<TKeys>['status'], data: IExceptionServicePaylaod<TKeys>['data']) {
        super(status.message)

        this.code = status.code
        this.message = status.message

        this.data = data

        if (typeof Error.captureStackTrace === 'function') Error.captureStackTrace(this, this.constructor)
    }
    

    public static new<TKeys extends string>(payload: IExceptionServicePaylaod<TKeys>): ExceptionService<TKeys> {
        return new ExceptionService<TKeys>(payload.status, payload.data)
    }
}

export { ExceptionService }