<script lang="ts">
    import { fade } from "svelte/transition";

    export let passwordValue0: string;
    export let passwordValue1: string;
</script>

<div class="signup-password-root" in:fade={{duration: 500}}>
    <h5 class="card-subtitle mb-2">
        Enter password:
    </h5>
    
    <div class="form-floating mb-3">
        <input type="password" class="form-control" id="signup-password-input" placeholder="Password" bind:value={passwordValue0}>
        <label for="signup-password-input">Password</label>
    </div>
    
    <div class="form-floating mb-3">
        <input type="password" class="form-control" id="signup-password-confirm-input" placeholder="Confirm Password" bind:value={passwordValue1}>
        <label for="signup-password-confirm-input">Confirm Password</label>
    </div>
    
    <span class="p-2"></span>
</div>