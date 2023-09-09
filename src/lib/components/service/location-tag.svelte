<script lang="ts">
    export let providerId: number;
    export let location: string;
</script>

<div class="info-tag input-group mb-3 ms-2">
    <span class="input-group-text" id="address-{providerId}" title="Location of Service">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
        </svg>
    </span>
    <input type="text" class="form-control" aria-label="location" aria-describedby="location-{providerId}" value="{location}" disabled>
</div>

<style lang="scss">
    .info-tag
    {
        max-width: 10em;
    }
</style>