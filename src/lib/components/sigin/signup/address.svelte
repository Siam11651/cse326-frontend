<script lang="ts">
    import { fade } from "svelte/transition";

    export let regions: string[];
    export let address: string;
    export let region: string;
</script>

<div class="signup-contact-root" in:fade={{duration: 500}}>
    <h5 class="card-subtitle mb-2">
        Enter address:
    </h5>
    <div class="form-floating mb-3">
        <input type="text" class="form-control" id="address-input" placeholder="Address" bind:value={address}>
        <label for="address-input">Address</label>
    </div>
    <div class="form-floating">
        <select class="form-select" id="region-selector" aria-label="Region" bind:value={region}>
            <option value="" selected>Select Region</option>
            {#each regions as region}
                <option value={region}>{region}</option>
            {/each}
        </select>
        <label for="region-selector">Region</label>
    </div>
    <span class="p-2"></span>
</div>