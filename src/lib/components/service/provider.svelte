<script lang="ts">
    import { fade } from "svelte/transition";
    import type { Provider } from "../../../routes/service/[service_id]/provider";

    export let placeholder: boolean = false;
    export let serviceId: number;
    export let provider: Provider;
</script>

<a class="list-group-item list-group-item-action" href="/provider/{provider.id}/{serviceId}">
    {#if placeholder}
        <h5 class="mb-3 placeholder-glow">
            <span class="placeholder col-2"></span>
        </h5>
    {:else}
        <h5 class="mb-3">
            {provider.name}
        </h5>
    {/if}
    <div class="d-flex align-items-center text-body-secondary placeholder-glow ms-1">
        <div title="Discount" class="d-flex align-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-graph-down-arrow" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M0 0h1v15h15v1H0V0Zm10 11.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 0-1 0v2.6l-3.613-4.417a.5.5 0 0 0-.74-.037L7.06 8.233 3.404 3.206a.5.5 0 0 0-.808.588l4 5.5a.5.5 0 0 0 .758.06l2.609-2.61L13.445 11H10.5a.5.5 0 0 0-.5.5Z"/>
            </svg>
            {#if placeholder}
                <p class="m-0 ms-1">
                    <span class="placeholder" style="width: 50px;"></span>
                </p>
            {:else}
                <p class="m-0 ms-1">
                    {provider.discount}%
                </p>
            {/if}
        </div>
        <div class="mx-2">
            •
        </div>
        <div title="Price" class="d-flex align-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tags" viewBox="0 0 16 16">
                <path d="M3 2v4.586l7 7L14.586 9l-7-7H3zM2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2z"/>
                <path d="M5.5 5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm0 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM1 7.086a1 1 0 0 0 .293.707L8.75 15.25l-.043.043a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 0 7.586V3a1 1 0 0 1 1-1v5.086z"/>
            </svg>
            {#if placeholder}
                <p class="m-0 ms-1">
                    <span class="placeholder" style="width: 50px;"></span>
                </p>
            {:else}
                <p class="m-0 ms-1">
                    {provider.cost}৳
                </p>
            {/if}
        </div>
        <div class="mx-2">
            •
        </div>
        <div title="Region" class="d-flex align-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt" viewBox="0 0 16 16">
                <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"/>
                <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
            </svg>
            {#if placeholder}
                <p class="m-0 ms-1">
                    <span class="placeholder" style="width: 50px;"></span>
                </p>
            {:else}
                <p class="m-0 ms-1" in:fade={{duration: 200}}>
                    {provider.area}
                </p>
            {/if}
        </div>
    </div>
</a>