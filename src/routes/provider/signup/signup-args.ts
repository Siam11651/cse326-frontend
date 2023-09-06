export class SignupArgs
{
    public username: string | null  = null;
    public email: string | null  = null;
    public password0: string | null  = null;
    public password1: string | null  = null;
    public pfp: File | null  = null;
    public contact: string | null  = null;
    public nidNumber: number | null = null;
    public nid: File | null = null;
    public address: string | null = null;
    public region: string | null = null;
}