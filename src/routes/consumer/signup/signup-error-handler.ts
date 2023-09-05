import type { Toast } from "bootstrap";
import { InvalidEmailError, InvalidUserNameError, InvalidUsernameEmailError, PasswordTooSmallError, PasswordsDontMatchError } from "./signup-errors";
import { InputValidityStatus } from "./input-validity-status";

export class SignupErrorHandler
{
    private static invalidUsernameToast: Toast;
    private static invalidEmailToast: Toast;
    private static invalidPasswordToast: Toast;
    private static passwordsDontMatchToast: Toast;

    public static SetInvalidUsernameToast(invalidUsernameToast: Toast): void
    {
        SignupErrorHandler.invalidUsernameToast = invalidUsernameToast;
    }

    public static SetInvalidEmailToast(invalidEmailToast: Toast): void
    {
        SignupErrorHandler.invalidEmailToast = invalidEmailToast;
    }

    public static SetInvalidPasswordToast(invalidPasswordToast: Toast): void
    {
        SignupErrorHandler.invalidPasswordToast = invalidPasswordToast;
    }

    public static SetPasswordsDontMatchToast(passwordsDontMatchToast: Toast): void
    {
        SignupErrorHandler.passwordsDontMatchToast = passwordsDontMatchToast;
    }

    public static HandleError(err: any): InputValidityStatus
    {
        let inputValidityStatus: InputValidityStatus = new InputValidityStatus();

        if(err instanceof InvalidUserNameError)
        {
            inputValidityStatus.usernameInvalid = true;

            SignupErrorHandler.invalidUsernameToast.show();
        }
        else if(err instanceof InvalidEmailError)
        {
            inputValidityStatus.emailInvalid = true;

            SignupErrorHandler.invalidEmailToast.show();
        }
        else if(err instanceof InvalidUsernameEmailError)
        {
            inputValidityStatus.usernameInvalid = true;
            inputValidityStatus.emailInvalid = true;

            SignupErrorHandler.invalidUsernameToast.show();
            SignupErrorHandler.invalidEmailToast.show();
        }
        else if(err instanceof PasswordTooSmallError)
        {
            inputValidityStatus.password0Invalid = true;

            SignupErrorHandler.invalidPasswordToast.show();
        }
        else if(err instanceof PasswordsDontMatchError)
        {
            inputValidityStatus.password1Invalid = true;

            SignupErrorHandler.passwordsDontMatchToast.show();
        }

        return inputValidityStatus;
    }
}