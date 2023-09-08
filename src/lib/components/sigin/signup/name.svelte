<script lang="ts">
    import { fade } from "svelte/transition";

    export let usernameValue: string;
    export let emailValue: string;
    export let usernameInvalid: boolean;
    export let emailInvalid: boolean;
    export let type: string;
</script>

<div class="signup-name-root" in:fade={{duration: 500}}>
    <h5 class="card-subtitle mb-2">
        Enter name:
    </h5>
    
    <div class="form-floating mb-3">
        <input type="text" class="form-control {usernameInvalid ? "is-invalid" : ""}" id="signup-username-input" placeholder="Username" bind:value={usernameValue}>
        <label for="signup-username-input">Username</label>
    </div>
    
    <div class="form-floating mb-3">
        <input type="text" class="form-control {emailInvalid ? "is-invalid" : ""}" id="signup-email-input" placeholder="Email" bind:value={emailValue}>
        <label for="signup-email-input">Email</label>
    </div>
    
    <div class="d-flex justify-content-end p-2">
        <a class="link-primary link-offset-1 link-underline-opacity-75 link-underline-opacity-100-hover" href="/{type}/login">Already Have an Account</a>
    </div>
</div>