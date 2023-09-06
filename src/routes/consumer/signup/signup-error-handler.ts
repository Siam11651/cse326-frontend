import type { Toast } from "bootstrap";
import { Errorcodes } from "./signup-errors";
import { InputValidityStatus } from "./input-validity-status";
import type { SigninError } from "../../../lib/signin-error";

export class SignupErrorHandler
{
    private static invalidUsernameToast: Toast;
    private static invalidEmailToast: Toast;
    private static invalidPasswordToast: Toast;
    private static passwordsDontMatchToast: Toast;
    private static invalidPfpToast: Toast;
    private static invalidContactToast: Toast;
    private static invalidAddressToast: Toast;
    private static invalidRegionToast: Toast;

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

    public static SetInvalidPfpToast(invalidPfpToast: Toast): void
    {
        SignupErrorHandler.invalidPfpToast = invalidPfpToast;
    }

    public static SetInvalidContactToast(invalidContactToast: Toast): void
    {
        SignupErrorHandler.invalidContactToast = invalidContactToast;
    }

    public static SetInvalidAddressToast(invalidAddressToast: Toast): void
    {
        SignupErrorHandler.invalidAddressToast = invalidAddressToast;
    }

    public static SetInvalidRegionToast(invalidRegionToast: Toast): void
    {
        SignupErrorHandler.invalidRegionToast = invalidRegionToast;
    }

    public static HandleError(err: SigninError): InputValidityStatus
    {
        let inputValidityStatus: InputValidityStatus = new InputValidityStatus();

        if(err.GetErrorcode() === Errorcodes.INVALID_USERNAME)
        {
            inputValidityStatus.usernameInvalid = true;

            SignupErrorHandler.invalidUsernameToast.show();
        }
        else if(err.GetErrorcode() === Errorcodes.INVALID_EMAIL)
        {
            inputValidityStatus.emailInvalid = true;

            SignupErrorHandler.invalidEmailToast.show();
        }
        else if(err.GetErrorcode() === Errorcodes.INVALID_USERNAME_EMAIL)
        {
            inputValidityStatus.usernameInvalid = true;
            inputValidityStatus.emailInvalid = true;

            SignupErrorHandler.invalidUsernameToast.show();
            SignupErrorHandler.invalidEmailToast.show();
        }
        else if(err.GetErrorcode() === Errorcodes.PASSWORD_TOO_SMALL)
        {
            inputValidityStatus.password0Invalid = true;

            SignupErrorHandler.invalidPasswordToast.show();
        }
        else if(err.GetErrorcode() === Errorcodes.PASSWORDS_DONT_MATCH)
        {
            inputValidityStatus.password1Invalid = true;

            SignupErrorHandler.passwordsDontMatchToast.show();
        }
        else if(err.GetErrorcode() === Errorcodes.INVALID_PFP)
        {
            inputValidityStatus.pfpInvalid = true;

            SignupErrorHandler.invalidPfpToast.show();
        }
        else if(err.GetErrorcode() === Errorcodes.INVALID_CONTACT)
        {
            inputValidityStatus.contactInvalid = true;

            SignupErrorHandler.invalidContactToast.show();
        }
        else if(err.GetErrorcode() === Errorcodes.INVALID_PFP_CONTACT)
        {
            inputValidityStatus.pfpInvalid = true;
            inputValidityStatus.contactInvalid = true;

            SignupErrorHandler.invalidPfpToast.show();
            SignupErrorHandler.invalidContactToast.show();
        }
        else if(err.GetErrorcode() === Errorcodes.INVALID_ADDRESS)
        {
            inputValidityStatus.addressInvalid = true;

            SignupErrorHandler.invalidAddressToast.show();
        }
        else if(err.GetErrorcode() === Errorcodes.INVALID_REGION)
        {
            inputValidityStatus.regionInvalid = true;

            SignupErrorHandler.invalidRegionToast.show();
        }
        else if(err.GetErrorcode() === Errorcodes.INVALID_ADDRESS_REGION)
        {
            inputValidityStatus.addressInvalid = true;
            inputValidityStatus.regionInvalid = true;

            SignupErrorHandler.invalidAddressToast.show();
            SignupErrorHandler.invalidRegionToast.show();
        }

        return inputValidityStatus;
    }
}