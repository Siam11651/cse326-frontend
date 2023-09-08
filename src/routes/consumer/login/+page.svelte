<script lang="ts">
    import bg from "$lib/assets/home-delivery-man.webp"
    import Creds from "$lib/components/sigin/login/creds.svelte";
    import Waiter from "$lib/components/sigin/waiter.svelte";
    import Title from "$lib/components/sigin/title.svelte";
    import { fade } from "svelte/transition";
    import { StateManager } from "./state-manager";
    import { InputValidityStatus } from "./input-validity-status";
    import { LoginErrorHandler } from "./login-error-handler";
    import { onMount } from "svelte";
    import type { Toast } from "bootstrap";
    import ErrorToast from "$lib/components/error-toast.svelte";
    import { SigninError } from "../../../lib/errors/signin-error";
    import Navbar from "$lib/components/navbar.svelte";

    let stateContainerElement: HTMLDivElement;
    let invalidUsernameToast: Toast;
    let invalidPasswordToast: Toast;
    let state: number = 0;
    let usernameValue: string;
    let passwordValue: string;
    let inputValidityStatus: InputValidityStatus = new InputValidityStatus();

    $: stateContainerHeight = stateContainerElement?.offsetHeight ?? 0;

    onMount((): void =>
    {
        LoginErrorHandler.SetInvalidUsernameToast(invalidUsernameToast);
        LoginErrorHandler.SetInvalidPasswordToast(invalidPasswordToast);
    });

    function GoNext(): void
    {
        try
        {
            state = StateManager.GoNext(state,
            {
                username: usernameValue,
                password: passwordValue
            });
        }
        catch(err)
        {
            if(err instanceof SigninError)
            {
                inputValidityStatus = LoginErrorHandler.HandleError(err);
            }
        }

        if(state == 1)
        {
            StateManager.Login();
        }
    }
</script>

<Navbar showSignIn={false} />

<div class="bg-image-container" in:fade={{delay: 200, duration: 500}}>
    <img class="bg-image img-fuil" src={bg} alt="background">
</div>

<div class="login-root">
    <div class="d-flex flex-column justify-content-center align-items-center" style="height: 100%;">
        <div class="login-input bg-white shadow-lg rounded p-3" style="width: 50ex;">
            <Title title="Login" />
            <div class="p-1" style="height: {stateContainerHeight}px; overflow: hidden; transition: height 300ms ease">
                {#if state == 0}
                    <div bind:this={stateContainerElement}>
                        <Creds usernameInvalid={inputValidityStatus.usernameInvalid} passwordInvalid={inputValidityStatus.passwordInvalid} bind:usernameValue={usernameValue} bind:passwordValue={passwordValue} />
                    </div>
                {:else if state == 1}
                    <div bind:this={stateContainerElement}>
                        <Waiter messege="Logging in..."/>
                    </div>
                {/if}
            </div>
            <div class="d-flex justify-content-end p-3">
                {#if state == 0}
                    <button type="button" class="btn btn-primary" on:click={GoNext}>Login</button>
                {/if}
            </div>
        </div>
    </div>
</div>

<div class="toast-container bottom-0 end-0 p-3">
    <ErrorToast header="Invalid Username" messege="Input a valid username with no spaces" bind:toast={invalidUsernameToast} />
    <ErrorToast header="Invalid Password" messege="Input a valid password of minimum length 8" bind:toast={invalidPasswordToast} />
</div>

<style lang="scss">
    .login-root
    {
        position: absolute;
        top: 6vh;
        bottom: 0;
        left: 0;
        right: 0;
    }

    .bg-image-container
    {
        position: absolute;
        top: 6vh;
        bottom: 0;
        left: 0;
        right: 0;
    }

    .bg-image
    {
        width: 100%;
        height: 100%;
    }
</style>