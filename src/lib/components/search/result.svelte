<script lang="ts">
    export let id: number = -1;
    export let title: string = "";
    export let description: string = "";
    export let price: number = -1;
    export let placeholder: boolean = false;
</script>

<a class="list-group-item list-group-item-action placeholder-glow" href="/service/{id}">
    <h6>
        {#if placeholder}
            <span class="placeholder col-4"></span>
            <span class="placeholder col-2"></span>
        {:else}
            {title}
        {/if}
    </h6>
    <p class="text-body-secondary text-truncate">
        {#if placeholder}
            <span class="placeholder col-3"></span>
            <span class="placeholder col-2"></span>
            <span class="placeholder col-4"></span>
        {:else}
            {description}
        {/if}
    </p>
    <div title="Price" class="text-body-secondary">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tags" viewBox="0 0 16 16">
            <path d="M3 2v4.586l7 7L14.586 9l-7-7H3zM2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2z"/>
            <path d="M5.5 5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm0 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM1 7.086a1 1 0 0 0 .293.707L8.75 15.25l-.043.043a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 0 7.586V3a1 1 0 0 1 1-1v5.086z"/>
        </svg>
        {#if placeholder}
            <span class="placeholder col-1"></span>
        {:else}
            {price}৳
        {/if}
    </div>
</a>