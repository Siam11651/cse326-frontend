<script lang="ts">
    export let imageSrc: string;
    export let serviceText: string;
</script>

<div class="card ms-1 me-2" role="button" style="min-width: 18rem;">
    <img src={imageSrc} class="card-img-top" alt={imageSrc}>
    <div class="card-body">
        <span class="fs-5">{serviceText}</span>
    </div>
</div>