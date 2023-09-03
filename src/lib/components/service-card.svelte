<script lang="ts">
    import { fade } from "svelte/transition";

    export let imageSrc: string;
    export let serviceText: string;
</script>

<div class="card ms-1 me-2 mb-1" role="button" style="min-width: 18rem;">
    <img src={imageSrc} class="card-img-top" alt={imageSrc} in:fade={{duration:500}}>
    <div class="card-body">
        <span class="fs-5">{serviceText}</span>
    </div>
</div>