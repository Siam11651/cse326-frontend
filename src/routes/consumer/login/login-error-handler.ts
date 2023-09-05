import type { Toast } from "bootstrap";
import { InvalidUserNameError, InvalidPasswordError, InvalidUsernamePasswordError } from "./login-errors";
import { InputValidityStatus } from "./input-validity-status";

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

    public static HandleError(err: any): InputValidityStatus
    {
        let inputValidityStatus: InputValidityStatus = new InputValidityStatus();

        if(err instanceof InvalidUserNameError)
        {
            inputValidityStatus.usernameInvalid = true;

            LoginErrorHandler.invalidUserNameToast.show();
        }
        else if(err instanceof InvalidPasswordError)
        {
            inputValidityStatus.passwordInvalid = true;

            LoginErrorHandler.invalidPasswordToast.show();
        }
        else if(err instanceof InvalidUsernamePasswordError)
        {
            inputValidityStatus.usernameInvalid = true;
            inputValidityStatus.passwordInvalid = true;

            LoginErrorHandler.invalidUserNameToast.show();
            LoginErrorHandler.invalidPasswordToast.show();
        }

        return inputValidityStatus;
    }
}