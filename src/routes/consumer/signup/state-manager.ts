import phone, { type PhoneResult } from "phone";
import type { SignupArgs } from "./signup-args";
import { goto } from "$app/navigation";
import { Errorcodes } from "./signup-errors";
import { SigninError } from "../../../lib/errors/signin-error";
import * as EmailValidator from "email-validator";
import { ConsumerFetchState, ConsumerLoginData } from "$lib/consumer/profile";

export class StateManager
{
    private static STATE_COUNT: number = 4;
    private static username: string | null = null;
    private static email: string | null = null;
    private static passwordHash: string | null = null;
    private static pfp: Uint8Array | null = null;
    private static contact: string | null = null;
    private static address: string | null = null;
    private static region: string | null = null;

    public static GetStateCount(): number
    {
        return StateManager.STATE_COUNT;
    }

    public static async GoNext(currentState: number, args: SignupArgs): Promise<number>
    {
        if(currentState === 0)
        {
            let usernameValid = StateManager.SetUsername(args.username);
            let emailValid = StateManager.SetEmail(args.email);

            if(!usernameValid && !emailValid)
            {
                throw new SigninError(Errorcodes.INVALID_USERNAME_EMAIL);
            }
            else if(!usernameValid)
            {
                throw new SigninError(Errorcodes.INVALID_USERNAME);
            }
            else if(!emailValid)
            {
                throw new SigninError(Errorcodes.INVALID_EMAIL);
            }
        }
        else if(currentState === 1)
        {
            let returnValue: number = StateManager.SetPasswordHash(args.password0, args.password1);

            if(returnValue === -1)
            {
                throw new SigninError(Errorcodes.PASSWORD_TOO_SMALL);
            }
            else if(returnValue === -2)
            {
                throw new SigninError(Errorcodes.PASSWORDS_DONT_MATCH);
            }
        }
        else if(currentState === 2)
        {
            let pfpValid = await StateManager.SetPfp(args.pfp);
            let contactValid = StateManager.SetContact(args.contact);

            if(!pfpValid && !contactValid)
            {
                throw new SigninError(Errorcodes.INVALID_PFP_CONTACT);
            }

            if(!pfpValid)
            {
                throw new SigninError(Errorcodes.INVALID_PFP);
            }

            if(!contactValid)
            {
                throw new SigninError(Errorcodes.INVALID_CONTACT);
            }
        }
        else if(currentState === 3)
        {
            let addressValid: boolean = StateManager.SetAddress(args.address);
            let regionValid: boolean = StateManager.SetRegion(args.region);

            if(!addressValid && !regionValid)
            {
                throw new SigninError(Errorcodes.INVALID_ADDRESS_REGION);
            }
             
            if(!addressValid)
            {
                throw new SigninError(Errorcodes.INVALID_ADDRESS);
            }

            if(!regionValid)
            {
                throw new SigninError(Errorcodes.INVALID_REGION);
            }
        }
        
        return currentState + 1;
    }

    public static GoBack(currentState: number, args: any): number
    {
        return currentState - 1;
    }

    private static SetUsername(username: string | null): boolean
    {
        if(username == null)
        {
            return false;
        }

        if(username.length == 0)
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

    private static SetEmail(email: string | null): boolean
    {
        if(email == null)
        {
            return false;
        }

        if(!EmailValidator.validate(email))
        {
            return false;
        }

        StateManager.email = email;

        return true;
    }

    private static SetPasswordHash(password0: string | null, password1: string | null): number
    {
        if(password0 == null || password0.length < 8)
        {
            return -1; // password too small
        }

        if(password1 != null && !password0.match(password1))
        {
            return -2;  // passwords don't match
        }

        StateManager.passwordHash = password0;

        return 0; // success
    }

    private static async SetPfp(pfp: File | null): Promise<boolean>
    {
        if(pfp == null)
        {
            return true;
        }

        let arrayBuffer: ArrayBuffer = await pfp.arrayBuffer();
        StateManager.pfp = new Uint8Array(arrayBuffer);

        return true;
    }

    private static SetContact(contact: string | null): boolean
    {
        if(contact == null)
        {
            return false;
        }

        let phoneResult: PhoneResult = phone(contact, 
        {
            country: "BD"
        });

        if(!phoneResult.isValid)
        {
            return false;
        }

        StateManager.contact = phoneResult.phoneNumber;

        return true;
    }

    private static SetAddress(address: string | null): boolean
    {
        if(address === null || address.length === 0)
        {
            return false;
        }

        StateManager.address = address;

        return true;
    }

    private static SetRegion(region: string | null): boolean
    {
        if(region)
        {
            if(region.length === 0)
            {
                return false;
            }
        }
        else
        {
            return false;
        }

        StateManager.region = region;

        return true;
    }

    public static async SignUp(): Promise<void>
    {
        let requestBodyObject =
        {
            name: StateManager.username,
            email: StateManager.email,
            password_hash: StateManager.passwordHash,
            pfp: StateManager.pfp,
            contact: StateManager.contact,
            address: StateManager.address,
            region: StateManager.region
        };

        let requestBodyString = JSON.stringify(requestBodyObject);

        fetch("/api/consumer/signup", 
        {
            method: "POST",
            headers:
            {
                "Content-Type": "application/json"
            },
            body: requestBodyString
        }).then(async (response: Response): Promise<void> =>
        {
            let responseObject = await response.json();

            if(responseObject.errorcode == 0)
            {
                ConsumerLoginData.fetchState = ConsumerFetchState.FETCHING;
                
                goto("/");
            }
            // else gule pore, vallagena
        });
    }
};