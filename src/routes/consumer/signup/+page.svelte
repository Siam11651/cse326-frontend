<script lang="ts">
    import Names from "$lib/components/signup/name.svelte";
    import Password from "$lib/components/signup/password.svelte";
    import { fade } from "svelte/transition";
    import bg from "$lib/assets/home-delivery-man.webp"
    import Contact from "$lib/components/signup/contact.svelte";
    import { StateManager } from "./state-manager";
    import { Toast } from "bootstrap";
    import { onMount } from "svelte";
    import { SignupErrorHandler } from "./signup-error-handler";
    import { InputValidityStatus } from "./input-validity-status";

    let stateContainer: HTMLDivElement;
    let invalidUsernameToastElement: HTMLDivElement;
    let invalidEmailToastElement: HTMLDivElement;
    let userNameValue: string;
    let emailValue: string;
    let passwordValue0: string;
    let passwordValue1: string;
    let pfpValues: FileList;
    let contactValue: string;
    let nidValue: string;
    let state: number = 0;
    let inputValidityStatus: InputValidityStatus = new InputValidityStatus();

    $: stateContainerHeight = stateContainer?.offsetHeight ?? 0;

    onMount(() =>
    {
        SignupErrorHandler.SetInvalidUsernameToast(new Toast(invalidUsernameToastElement));
        SignupErrorHandler.SetInvalidEmailToast(new Toast(invalidEmailToastElement));
    });

    async function GoNext(): Promise<void>
    {
        inputValidityStatus.Reset();

        try
        {
            state = await StateManager.GoNext(state,
            {
                username: userNameValue,
                email: emailValue,
                password0: passwordValue0,
                password1: passwordValue1,
                pfp: pfpValues?.item(0) ?? null,
                contact: contactValue,
                nid: nidValue
            });
        }
        catch(err: any)
        {
            inputValidityStatus = SignupErrorHandler.HandleError(err);
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
            username: userNameValue,
            email: emailValue,
            password: passwordValue0,
            pfp: pfpValues?.item(0) ?? null,
            contact: contactValue,
            nid: nidValue
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
                <div class="d-flex align-item-center justify-content-between p-1">
                    <h4 class="card-title mb-3">Sign Up</h4>
                    <a type="button" class="btn-close" href="/"><span /></a>
                </div>
                <div class="p-1" style="height: {stateContainerHeight}px; overflow: hidden; transition: height 300ms ease">
                    {#if state == 0}
                        <div bind:this={stateContainer}>
                            <Names nameInvalid={inputValidityStatus.nameInvalid} emailInvalid={inputValidityStatus.emailInvalid} bind:userNameValue={userNameValue} bind:emailValue={emailValue} />
                        </div>
                    {:else if state == 1}
                        <div bind:this={stateContainer}>
                            <Password bind:passwordValue0={passwordValue0} bind:passwordValue1={passwordValue1} />
                        </div>
                    {:else if state == 2}
                        <div bind:this={stateContainer}>
                            <Contact bind:pfpValues={pfpValues} bind:contactValue={contactValue} bind:nidValue={nidValue} />
                        </div>
                    {/if}
                </div>
            </div>
            <div class="d-flex justify-content-end p-3">
                {#if state > 0}
                    <button type="button" class="btn btn-secondary me-1" on:click={GoBack}>Back</button>
                {/if}

                {#if state == StateManager.GetStateCount() - 1}
                    <button type="button" class="btn btn-primary" on:click={GoNext}>Sign Up</button>
                {:else}
                    <button type="button" class="btn btn-primary" on:click={GoNext}>Next</button>
                {/if}
            </div>
        </div>
    </div>
</div>

<div class="toast-container bottom-0 end-0 p-3">
    <div class="toast text-bg-danger" role="alert" aria-live="assertive" aria-atomic="true" bind:this={invalidUsernameToastElement}>
        <div class="toast-header">
          <strong class="me-auto">Invalid Username</strong>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
            Username must be non-empty and should have no spaces
        </div>
    </div>

    <div class="toast text-bg-danger" role="alert" aria-live="assertive" aria-atomic="true" bind:this={invalidEmailToastElement}>
        <div class="toast-header">
          <strong class="me-auto">Invalid Email</strong>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
            Input valid email
        </div>
    </div>
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