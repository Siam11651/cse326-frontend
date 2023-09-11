<script lang="ts">
    export let image: string;
    export let text: string;
    export let imageLeft: boolean = false;
</script>

<div class="service-info d-flex justify-content-between align-items-center mb-5">
    {#if imageLeft}
        <div>
            <img class="service-image rounded flex-fill" height="350px" src={image} alt="">
        </div>
        <div class="flex-fill d-flex flex-row-reverse">
            <div class="service-info-text text-end fs-3 text-body-secondary m-0">
                {text}
            </div>
        </div>
    {:else}
        <div class="flex-fill">
            <div class="service-info-text fs-3 text-body-secondary flex-fill m-0">
                {text}
            </div>
        </div>
        <div>
            <img class="service-image rounded flex-fill" height="350px" src={image} alt="">
        </div>
    {/if}
</div>

<style lang="scss">
    .service-info
    {
        padding-left: 20%;
        padding-right: 20%;
    }

    .service-info-text
    {
        max-width: 75%;
    }

    .service-image
    {
        object-fit: contain;
    }
</style>