<script lang="ts">
    import { fade } from "svelte/transition";

    export let placeholder: boolean = false;
    export let label: string;
    export let info: string;
</script>

<label for={label}>
    {label}
</label>
<div id={label} class="card card-body p-2 placeholder-glow mb-2">
    {#if placeholder}
        <p class="m-0">
            <span class="placeholder col-4"></span>
        </p>
    {:else}
        <p class="m-0" in:fade={{duration: 200}}>
            {info}
        </p>
    {/if}
</div>