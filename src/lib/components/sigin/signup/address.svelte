<script lang="ts">
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";

    export let address: string;
    export let region: string;

    let regionsSet: boolean = false;
    let regions: string[] = [];

    onMount((): void =>
    {
        fetch("/api/area/get_area",
        {
            method: "POST",
            headers:
            {
                "Content-Type": "application/json"
            }
        }).then(async (response: Response): Promise<void> =>
        {
            let responseObject = await response.json();

            regions = new Array<string>(responseObject.length);

            for(let i: number = 0; i < regions.length; ++i)
            {
                regions[i] = responseObject[i].area_name;
            }

            regionsSet = true;
        });
    });
</script>

<div class="signup-contact-root" in:fade={{duration: 500}}>
    <h5 class="card-subtitle mb-2">
        Enter address:
    </h5>
    <div class="form-floating mb-3">
        <input type="text" class="form-control" id="address-input" placeholder="Address" bind:value={address}>
        <label for="address-input">Address</label>
    </div>
    <div class="d-flex align-items-center">
        <div class="flex-fill form-floating">
            <select class="form-select" id="region-selector" aria-label="Region" bind:value={region} disabled={!regionsSet}>
                <option value="" selected>Select Region</option>
                {#each regions as region}
                    <option value={region}>{region}</option>
                {/each}
            </select>
            <label for="region-selector">Region</label>
        </div>
        {#if !regionsSet}
            <div class="spinner-border spinner-border-sm text-primary ms-2" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        {/if}
    </div>
    <span class="p-2"></span>
</div>