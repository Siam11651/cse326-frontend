<script lang="ts">
    import { fade } from "svelte/transition";

    export let pfpValues: FileList;
    export let contactValue: string;
    export let nidValue: string;
</script>

<div class="signup-contact-root" in:fade={{duration: 500}}>
    <h5 class="card-subtitle mb-2">
        Enter details:
    </h5>

    <div class="mb-3">
        <label for="pp-selector" class="form-label">Profile Picture</label>
        <input type="file" class="form-control" id="pp-selector" bind:files={pfpValues}>
    </div>
    
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