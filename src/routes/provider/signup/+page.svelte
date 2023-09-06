<script lang="ts">
    import Names from "$lib/components/sigin/signup/name.svelte";
    import Password from "$lib/components/sigin/signup/password.svelte";
    import { fade } from "svelte/transition";
    import bg from "$lib/assets/home-delivery-man.webp"
    import Contact from "$lib/components/sigin/signup/contact.svelte";
    import { StateManager } from "./state-manager";
    import type { Toast } from "bootstrap";
    import { onMount } from "svelte";
    import { SignupErrorHandler } from "./signup-error-handler";
    import { InputValidityStatus } from "./input-validity-status";
    import Title from "$lib/components/sigin/title.svelte";
    import Waiter from "$lib/components/sigin/waiter.svelte";
    import ErrorToast from "$lib/components/error-toast.svelte";
    import Address from "$lib/components/sigin/signup/address.svelte";
    import { SigninError } from "../../../lib/signin-error";
    import Nid from "$lib/components/sigin/signup/nid.svelte";

    let stateContainerElement: HTMLDivElement;
    let invalidUsernameToast: Toast;
    let invalidEmailToast: Toast;
    let invalidPasswordToast: Toast;
    let passwordsDontMatchToast: Toast;
    let invalidPfpToast: Toast;
    let invalidContactToast: Toast;
    let invalidNidToast: Toast;
    let invalidAddressToast: Toast;
    let invalidRegionToast: Toast;
    let usernameValue: string;
    let emailValue: string;
    let passwordValue0: string;
    let passwordValue1: string;
    let pfpValues: FileList;
    let contactValue: string;
    let nidNumberValue: number;
    let nidValues: FileList;
    let addressValue: string;
    let regionValue: string;
    let state: number = 0;
    let inputValidityStatus: InputValidityStatus = new InputValidityStatus();
    let regions: string[] = ["Kallyanpur", "Uttara", "Mohammadpur"];

    $: stateContainerHeight = stateContainerElement?.offsetHeight ?? 0;

    onMount(() =>
    {
        SignupErrorHandler.SetInvalidUsernameToast(invalidUsernameToast);
        SignupErrorHandler.SetInvalidEmailToast(invalidEmailToast);
        SignupErrorHandler.SetInvalidPasswordToast(invalidPasswordToast);
        SignupErrorHandler.SetPasswordsDontMatchToast(passwordsDontMatchToast);
        SignupErrorHandler.SetInvalidPfpToast(invalidPfpToast);
        SignupErrorHandler.SetInvalidContactToast(invalidContactToast);
        SignupErrorHandler.SetInvalidAddressToast(invalidAddressToast);
        SignupErrorHandler.SetInvalidRegionToast(invalidRegionToast);
    });

    async function GoNext(): Promise<void>
    {
        try
        {
            state = await StateManager.GoNext(state,
            {
                username: usernameValue,
                email: emailValue,
                password0: passwordValue0,
                password1: passwordValue1,
                pfp: pfpValues?.item(0) ?? null,
                contact: contactValue,
                nidNumber: nidNumberValue,
                nid: nidValues?.item(0) ?? null,
                address: addressValue,
                region: regionValue
            });
        }
        catch(err: any)
        {
            if(err instanceof SigninError)
            {
                inputValidityStatus = SignupErrorHandler.HandleError(err);
            }
        }

        if(state == StateManager.GetStateCount())
        {
            StateManager.SignUp();
        }
    }

    function GoBack(): void
    {
        state = StateManager.GoBack(state,
        {
            username: usernameValue,
            email: emailValue,
            password: passwordValue0,
            pfp: pfpValues?.item(0) ?? null,
            contact: contactValue
        });
    }
</script>

<div class="signup-root">
    <div class="bg-image-container" in:fade={{delay: 200, duration: 500}}>
        <img class="bg-image" src={bg} alt="background">
    </div>
    <div class="d-flex flex-column justify-content-center align-items-center" style="height: 100%;">
        <div class="card" style="width: 50ex;">
            <div class="card-body">
                <Title title="Sign Up" />
                <div class="p-1" style="height: {stateContainerHeight}px; overflow: hidden; transition: height 300ms ease">
                    {#if state == 0}
                        <div bind:this={stateContainerElement}>
                            <Names usernameInvalid={inputValidityStatus.usernameInvalid} emailInvalid={inputValidityStatus.emailInvalid} bind:usernameValue={usernameValue} bind:emailValue={emailValue} />
                        </div>
                    {:else if state == 1}
                        <div bind:this={stateContainerElement}>
                            <Password password0Invalid={inputValidityStatus.password0Invalid} password1Invalid={inputValidityStatus.password1Invalid} bind:passwordValue0={passwordValue0} bind:passwordValue1={passwordValue1} />
                        </div>
                    {:else if state == 2}
                        <div bind:this={stateContainerElement}>
                            <Contact pfpInvalid={inputValidityStatus.pfpInvalid} contactInvalid={inputValidityStatus.contactInvalid} bind:pfpValues={pfpValues} bind:contactValue={contactValue} />
                        </div>
                    {:else if state == 3}
                        <div bind:this={stateContainerElement}>
                            <Nid nidNumberInvalid={inputValidityStatus.nidNumberInvalid} nidInvalid={inputValidityStatus.nidInvalid} bind:nidNumberValue={nidNumberValue} bind:nidValues={nidValues} />
                        </div>
                    {:else if state === 4}
                        <div bind:this={stateContainerElement}>
                            <Address regions={regions} bind:address={addressValue} bind:region={regionValue} />
                        </div>
                    {:else if state == StateManager.GetStateCount()}
                        <div bind:this={stateContainerElement}>
                            <Waiter messege="Signing up..." />
                        </div>
                    {/if}
                </div>
            </div>
            <div class="d-flex justify-content-end p-3">
                {#if 0 < state && state < StateManager.GetStateCount()}
                    <button type="button" class="btn btn-secondary me-1" on:click={GoBack}>Back</button>
                {/if}

                {#if state < StateManager.GetStateCount() - 1}
                    <button type="button" class="btn btn-primary" on:click={GoNext}>Next</button>
                {:else if state == StateManager.GetStateCount() - 1}
                    <button type="button" class="btn btn-primary" on:click={GoNext}>Sign Up</button>
                {/if}
            </div>
        </div>
    </div>
</div>

<div class="toast-container bottom-0 end-0 p-3">
    <ErrorToast header="Invalid Username" messege="Input a valid username with no spaces" bind:toast={invalidUsernameToast} />
    <ErrorToast header="Invalid Email" messege="Input a valid email" bind:toast={invalidEmailToast} />
    <ErrorToast header="Invalid Password" messege="Input a valid password of minimum length 8" bind:toast={invalidPasswordToast} />
    <ErrorToast header="Passwords don't Match" messege="Input the same password" bind:toast={passwordsDontMatchToast} />
    <ErrorToast header="Invalid Profile Picture" messege="Input a valid file" bind:toast={invalidPfpToast} />
    <ErrorToast header="Invalid Contant" messege="Input a valid Bangladeshi contact" bind:toast={invalidContactToast} />
    <ErrorToast header="Invalid Address" messege="Input a valid address in Dhaka" bind:toast={invalidAddressToast} />
    <ErrorToast header="Invalid Region" messege="Select a valid region from list" bind:toast={invalidRegionToast} />
    <ErrorToast header="Invalid NID" messege="Select a valid pdf file for NID" bind:toast={invalidNidToast} />
</div>

<style lang="scss">
    .signup-root
    {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }

    .bg-image-container
    {
        position: absolute;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }

    .bg-image
    {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
</style>