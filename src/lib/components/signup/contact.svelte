<script lang="ts">
    import { fade } from "svelte/transition";

    export let contactValue: string;
    export let nidValue: string;
</script>

<div class="signup-contact-root" in:fade={{duration: 500}}>
    <p>
        Enter details:
    </p>
    
    <div class="form-floating mb-3">
        <input type="tel" class="form-control" id="signup-cellno-input" placeholder="Contact" bind:value={contactValue}>
        <label for="signup-cellno-input">Contact</label>
    </div>

    <div class="form-floating mb-3">
        <input type="text" class="form-control" id="signup-nid-input" placeholder="NID Number" bind:value={nidValue}>
        <label for="signup-nid-input">NID Number</label>
    </div>

    <span class="p-2"></span>
</div>