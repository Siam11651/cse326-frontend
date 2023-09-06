<script lang="ts">
    export let id: number;
    export let title: string;
    export let description: string;
    export let price: number;
</script>

<a class="list-group-item list-group-item-action" href="/service/{id}">
    <h6>{title}</h6>
    <p class="text-body-secondary text-truncate">
        {description}
    </p>
    <div class="d-flex flex-row-reverse">
        <div class="info-tag input-group mb-3 ms-2">
            <span class="input-group-text" id="address-{id}" title="Location of Service">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                </svg>
            </span>
            <input type="text" class="form-control" aria-label="address" aria-describedby="address-{id}" value={"Kauyerchor"} disabled>
        </div>
        <div class="info-tag input-group mb-3 ms-2">
            <span class="input-group-text" id="rate-{id}" title="Rate of Service">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                </svg>
            </span>
            <input type="number" class="form-control" aria-label="rate" aria-describedby="rate-{id}" value={4.2} disabled>
        </div>
        <div class="info-tag input-group mb-3">
            <span class="input-group-text" id="price-{id}" title="Price of Service">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tags-fill" viewBox="0 0 16 16">
                    <path d="M2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2zm3.5 4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
                    <path d="M1.293 7.793A1 1 0 0 1 1 7.086V2a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l.043-.043-7.457-7.457z"/>
                </svg>
            </span>
            <input type="text" class="form-control" aria-label="price" aria-describedby="price-{id}" value="৳{price}" disabled>
        </div>
    </div>
</a>

<style lang="scss">
    .info-tag
    {
        max-width: 10em;
    }
</style>