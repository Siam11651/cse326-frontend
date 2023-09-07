<script lang="ts">
    export let placeholder: boolean = false;
    export let label: string;
    export let info: string;
</script>

<label for={label}>
    {label}
</label>
<div id={label} class="card card-body p-2 placeholder-glow mb-2">
    <p class="m-0">
        {#if placeholder}
            <span class="placeholder col-4"></span>
        {:else}
            {info}
        {/if}
    </p>
</div>