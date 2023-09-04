export class InputValidityStatus
{
    public nameInvalid: boolean = false;
    public emailInvalid: boolean = false;
    public password0Invalid: boolean = false;
    public password1Invalid: boolean = false;

    public Reset()
    {
        this.nameInvalid = false;
        this.emailInvalid = false;
        this.password0Invalid = false;
        this.password1Invalid = false;
    }
}