export enum ConsumerFetchState
{
    FETCHING = 0,
    LOGGED_IN = 1,
    NOT_LOGGED_IN = 3
}

export class ConsumerLoginData
{
    public static fetchState: ConsumerFetchState = ConsumerFetchState.FETCHING;
    public static username: string = "";
    public static pfpPath: string = "";
}