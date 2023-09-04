import type { Toast } from "bootstrap";
import { InvalidEmailError, InvalidUserNameError, InvalidUsernameEmailError } from "./signup-errors";
import { InputValidityStatus } from "./input-validity-status";

export class SignupErrorHandler
{
    private static invalidUsernameToast: Toast;
    private static invalidEmailToast: Toast;

    public static SetInvalidUsernameToast(invalidUsernameToast: Toast): void
    {
        SignupErrorHandler.invalidUsernameToast = invalidUsernameToast;
    }

    public static SetInvalidEmailToast(invalidEmailToast: Toast): void
    {
        SignupErrorHandler.invalidEmailToast = invalidEmailToast;
    }

    public static HandleError(err: any): InputValidityStatus
    {
        let inputValidityStatus: InputValidityStatus = new InputValidityStatus();

        if(err instanceof InvalidUserNameError)
        {
            inputValidityStatus.nameInvalid = true;

            SignupErrorHandler.invalidUsernameToast.show();
        }
        else if(err instanceof InvalidEmailError)
        {
            inputValidityStatus.emailInvalid = true;

            SignupErrorHandler.invalidEmailToast.show();
        }
        else if(err instanceof InvalidUsernameEmailError)
        {
            inputValidityStatus.nameInvalid = true;
            inputValidityStatus.emailInvalid = true;

            SignupErrorHandler.invalidUsernameToast.show();
            SignupErrorHandler.invalidEmailToast.show();
        }

        return inputValidityStatus;
    }
}