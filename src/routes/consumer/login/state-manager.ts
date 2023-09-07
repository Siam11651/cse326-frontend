import { goto } from "$app/navigation";
import { SigninError } from "../../../lib/errors/signin-error";
import type { LoginArgs } from "./login-args";
import { Errorcodes } from "./login-errors";

export class StateManager
{
    private static STATE_COUNT: number = 1;
    private static username: string | null = null;
    private static passwordHash: string | null = null;

    public static GetStateCount(): number
    {
        return StateManager.STATE_COUNT;
    }

    public static GoNext(currentState: number, args: LoginArgs): number
    {
        let usernameValid = StateManager.SetUsername(args.username);
        let passwordValid = StateManager.SetPasswordHash(args.password);

        if(!usernameValid && !passwordValid)
        {
            throw new SigninError(Errorcodes.INVALID_USERNAME_PASSWORD);
        }
        else if(!usernameValid)
        {
            throw new SigninError(Errorcodes.INVALID_USERNAME);
        }
        else if(!passwordValid)
        {
            throw new SigninError(Errorcodes.INVALID_PASSWORD);
        }
        
        return currentState + 1;
    }

    private static SetUsername(username: string | null): boolean
    {
        if(username == null || username.length == 0)
        {
            return false;
        }

        if(username.includes(" "))
        {
            return false;
        }

        StateManager.username = username;

        return true;
    }

    private static SetPasswordHash(password: string | null): boolean
    {
        if(password == null || password.length < 0)
        {
            return false;
        }

        StateManager.passwordHash = password;

        return true;
    }

    public static async Login(): Promise<void>
    {
        let requestBodyObject =
        {
            name: StateManager.username,
            password_hash: StateManager.passwordHash,
        };

        let requestBodyString = JSON.stringify(requestBodyObject);

        console.log(requestBodyString);

        fetch("/api/consumer/login", 
        {
            method: "POST",
            headers:
            {
                "Content-Type": "application/json"
            },
            body: requestBodyString
        }).then(async(response: Response): Promise<void> =>
        {
            goto("/");
        });
    }
};
