<script lang="ts">
    import type { Provider } from "$lib/service/provider";
    import LocationTag from "./location-tag.svelte";
    import PriceTag from "./price-tag.svelte";
    import RateTag from "./rate-tag.svelte";

    export let serviceId: number;
    export let provider: Provider;
</script>

<a class="list-group-item list-group-item-action" href="/provider/{provider.id}/{serviceId}">
    <h5 class="mb-3">{provider.name}</h5>
    <div class="d-flex flex-row-reverse">
        <PriceTag providerId={provider.id} price={provider.cost.toString()} />
        <RateTag providerId={provider.id} rate={provider.rate.toFixed(2).toString()} />
        <LocationTag providerId={provider.id} location={"Kallyanpur"} />
    </div>
</a>