import type { Toast } from "bootstrap";
import { EmptyPasswordField0, EmptyPasswordField1, EmptyPasswordFieldBoth, InvalidEmailError, InvalidUserNameError, InvalidUsernameEmailError, PasswordsDontMatch } from "./signup-errors";
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
        else if(err instanceof EmptyPasswordField0)
        {
            inputValidityStatus.password0Invalid = true;
        }
        else if(err instanceof EmptyPasswordField1)
        {
            inputValidityStatus.password1Invalid = true;
        }
        else if(err instanceof EmptyPasswordFieldBoth)
        {
            inputValidityStatus.password0Invalid = true;
            inputValidityStatus.password1Invalid = true;
        }
        else if(err instanceof PasswordsDontMatch)
        {

        }

        return inputValidityStatus;
    }
}