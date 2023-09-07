<script lang="ts">
    import { fade } from "svelte/transition";

    export let usernameValue: string;
    export let passwordValue: string;
    export let usernameInvalid: boolean;
    export let passwordInvalid: boolean;
</script>

<div class="login-input-root" in:fade={{duration: 500}}>
    <h5 class="card-subtitle mb-2">
        Enter login info:
    </h5>
    <div class="form-floating mb-3">
        <input type="text" class="form-control {usernameInvalid ? "is-invalid" : ""}" id="login-username-input" placeholder="Username" bind:value={usernameValue}>
        <label for="login-username-input">Username</label>
    </div>
    <div class="form-floating mb-3">
        <input type="password" class="form-control {passwordInvalid ? "is-invalid" : ""}" id="login-password-input" placeholder="Password" bind:value={passwordValue}>
        <label for="login-password-input">Password</label>
    </div>
    <div class="d-flex justify-content-end p-2">
        <a class="link-primary link-offset-1 link-underline-opacity-75 link-underline-opacity-100-hover" href="/consumer/signup">Create an Account</a>
    </div>
</div>