export class SigninError extends Error
{
    private errorcode: number;

    constructor(errorcode: number, messege?: string | undefined, options?: ErrorOptions | undefined)
    {
        super(messege, options);
        this.errorcode = errorcode;
    }

    public GetErrorcode(): number
    {
        return this.errorcode;
    }
}