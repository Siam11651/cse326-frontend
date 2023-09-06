<script lang="ts">
    import type { Provider } from "$lib/service/provider";
    import LocationTag from "./location-tag.svelte";
    import PriceTag from "./price-tag.svelte";
    import RateTag from "./rate-tag.svelte";

    export let placeholder: boolean = false;
    export let serviceId: number;
    export let provider: Provider;
</script>

<a class="list-group-item list-group-item-action" href="/provider/{provider.id}/{serviceId}">
    {#if placeholder}
        <h5 class="placeholder-glow mb-3">
            <span class="placeholder col-4" />
        </h5>
        <div class="d-flex flex-row-reverse">
            <PriceTag providerId={provider.id} price="" />
            <RateTag providerId={provider.id} rate="" />
            <LocationTag providerId={provider.id} location="" />
        </div>
    {:else}
        <h5 class="mb-3">{provider.name}</h5>
        <div class="d-flex flex-row-reverse">
            <PriceTag providerId={provider.id} price={provider.cost > 0 ? provider.cost.toString() : ""} />
            <RateTag providerId={provider.id} rate={provider.rate > 0 ? provider.rate.toFixed(2).toString() : ""} />
            <LocationTag providerId={provider.id} location={provider.area} />
        </div>
    {/if}
</a>