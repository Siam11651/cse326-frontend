<script lang="ts">
    import LocationTag from "./location-tag.svelte";
    import PriceTag from "./price-tag.svelte";
    import RateTag from "./rate-tag.svelte";

    export let id: number;
</script>

<a class="list-group-item list-group-item-action" href="/provider/{id}?service={69 + id}">
    <h5 class="mb-3">Kuddus Miah {id}</h5>
    <div class="d-flex flex-row-reverse">
        <PriceTag providerId={id} price={69} />
        <RateTag providerId={id} rate={4.2} />
        <LocationTag providerId={id} location={"Kallyanpur"} />
    </div>
</a>