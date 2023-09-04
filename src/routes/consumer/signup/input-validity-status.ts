export class InputValidityStatus
{
    public nameInvalid: boolean = false;
    public emailInvalid: boolean = false;

    public Reset()
    {
        this.nameInvalid = false;
        this.emailInvalid = false;
    }
}