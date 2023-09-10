<script lang="ts">
    export let image: string;
    export let imageLeft: boolean = false;
</script>

<div class="service-info d-flex justify-content-between align-items-center mb-5">
    {#if imageLeft}
        <img class="service-image flex-fill rounded" src="/root/{image}.webp" alt="">
        <div class="flex-fill d-flex flex-row-reverse">
            <div class="service-info-text text-end fs-3 text-body-secondary m-0">
                Best services to keep your stove safe and healthy
            </div>
        </div>
    {:else}
        <div class="flex-fill">
            <div class="service-info-text fs-3 text-body-secondary flex-fill m-0">
                Best services to keep your stove safe and healthy
            </div>
        </div>
        <img class="service-image flex-fill rounded" src="/root/{image}.webp" alt="">
    {/if}
</div>

<style lang="scss">
    .service-info
    {
        padding-left: 15%;
        padding-right: 15%;
    }

    .service-info-text
    {
        max-width: 75%;
    }

    .service-image
    {
        height: 350px;
        object-fit: contain;
    }
</style>