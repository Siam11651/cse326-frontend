<script lang="ts">
    import { fade } from "svelte/transition";

    export let passwordValue: string;
</script>

<div class="signup-password-root" in:fade={{duration: 500}}>
    <p>
        Enter password:
    </p>
    
    <div class="form-floating mb-3">
        <input type="text" class="form-control" id="signup-password-input" placeholder="Password" bind:value={passwordValue}>
        <label for="signup-password-input">Password</label>
    </div>
    
    <div class="form-floating mb-3">
        <input type="text" class="form-control" id="signup-password-confirm-input" placeholder="Confirm Password">
        <label for="signup-password-confirm-input">Confirm Password</label>
    </div>
    
    <span class="p-2"></span>
</div>