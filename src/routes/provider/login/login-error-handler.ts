import type { Toast } from "bootstrap";
import { Errorcodes } from "./login-errors";
import { InputValidityStatus } from "./input-validity-status";
import type { SigninError } from "../../../lib/errors/signin-error";

export class LoginErrorHandler
{
    private static invalidUserNameToast: Toast;
    private static invalidPasswordToast: Toast;

    public static SetInvalidUsernameToast(invalidUsernameToast: Toast): void
    {
        LoginErrorHandler.invalidUserNameToast = invalidUsernameToast;
    }

    public static SetInvalidPasswordToast(invalidPasswordToast: Toast): void
    {
        LoginErrorHandler.invalidPasswordToast = invalidPasswordToast;
    }

    public static HandleError(err: SigninError): InputValidityStatus
    {
        let inputValidityStatus: InputValidityStatus = new InputValidityStatus();

        if(err.GetErrorcode() === Errorcodes.INVALID_USERNAME)
        {
            inputValidityStatus.usernameInvalid = true;

            LoginErrorHandler.invalidUserNameToast.show();
        }
        else if(err.GetErrorcode() === Errorcodes.INVALID_PASSWORD)
        {
            inputValidityStatus.passwordInvalid = true;

            LoginErrorHandler.invalidPasswordToast.show();
        }
        else if(err.GetErrorcode() === Errorcodes.INVALID_USERNAME_PASSWORD)
        {
            inputValidityStatus.usernameInvalid = true;
            inputValidityStatus.passwordInvalid = true;

            LoginErrorHandler.invalidUserNameToast.show();
            LoginErrorHandler.invalidPasswordToast.show();
        }

        return inputValidityStatus;
    }
}