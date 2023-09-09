<script lang="ts">
    import { fade } from "svelte/transition";

    export let nidNumberValue: number;
    export let nidValues: FileList;
    export let nidNumberInvalid: boolean;
    export let nidInvalid: boolean;
</script>

<div class="signup-contact-root" in:fade={{duration: 500}}>
    <h5 class="card-subtitle mb-2">
        Enter NID info:
    </h5>

    <div class="form-floating mb-3">
        <input type="number" class="form-control {nidNumberInvalid ? "is-invalid" : ""}" id="nid-number-input" placeholder="NID Number" bind:value={nidNumberValue}>
        <label for="nid-number-input">NID Number</label>
    </div>

    <div class="mb-3">
        <label for="nid-selector" class="form-label">NID</label>
        <input type="file" class="form-control {nidInvalid ? "is-invalid" : ""}" id="nid-selector" bind:files={nidValues}>
    </div>

    <span class="p-2"></span>
</div>