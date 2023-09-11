<script lang="ts">
    import { fade } from "svelte/transition";
    import type { Tender } from "$lib/tender/tender";

    export let tender: Tender;
    export let tenderReady: boolean;
</script>

<div class="m-5" in:fade={{duration: 200}}>
    <h2>Service</h2>
    {#if tenderReady}
        <p class="fs-5 mb-5" in:fade={{duration: 200}}>
            {tender.service}
        </p>
    {:else}
        <p class="placeholder-glow fs-5 mb-5">
            <span class="placeholder col-4"></span>
            <span class="placeholder col-2"></span>
        </p>
    {/if}
    <h2>Description</h2>
    {#if tenderReady}
        <p class="fs-5 mb-5" in:fade={{duration: 200}}>
            {tender.description}
        </p>
    {:else}
        <p class="placeholder-glow fs-5 mb-5">
            <span class="placeholder col-7"></span>
            <span class="placeholder col-4"></span>
            <span class="placeholder col-4"></span>
        </p>
    {/if}
    <h2>Creation Date</h2>
    {#if tenderReady}
        <p class="fs-5 mb-5" in:fade={{duration: 200}}>
            {(new Date(tender.created)).toDateString()}
        </p>
    {:else}
        <p class="placeholder-glow fs-5 mb-5">
            <span class="placeholder col-3">
        </p>
    {/if}
    <h2>End Date</h2>
    {#if tenderReady}
        <p class="fs-5 mb-5" in:fade={{duration: 200}}>
            {(new Date(tender.ends)).toDateString()}
        </p>
    {:else}
        <p class="placeholder-glow fs-5 mb-5">
            <span class="placeholder col-3">
        </p>
    {/if}
</div>