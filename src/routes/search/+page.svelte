<script lang="ts">
    import Navbar from "$lib/components/navbar.svelte";
    import { fade, scale } from "svelte/transition";
</script>

<div class="search-root">
    <Navbar />
    <div class="d-flex flex-row-reverse">
        <div class="all-services-container">
            <div class="all-services shadow-lg m-4 p-3 rounded" in:fade={{duration: 250}}>
                <h5>All Services:</h5>
                <div class="all-services-accordion-container">
                    <div class="accordion accordion-flush p-1" id="all-services-accordion">
                        {#each [...Array(5).keys()] as i}
                            <div class="accordion-item">
                                <h2 class="accordion-header">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#service-{i}" aria-expanded="false" aria-controls="service-{i}">
                                        Service {i + 1}
                                    </button>
                                </h2>
                                <div id="service-{i}" class="accordion-collapse collapse" data-bs-parent="#all-services-accordion">
                                    <div class="accordion-body p-2">
                                        <ul class="list-group">
                                            <!-- svelte-ignore a11y-invalid-attribute -->
                                            <a class="list-group-item list-group-item-action" href="#">Service {i + 1}-a</a>
                                            <!-- svelte-ignore a11y-invalid-attribute -->
                                            <a class="list-group-item list-group-item-action" href="#">Service {i + 1}-b</a>
                                            <!-- svelte-ignore a11y-invalid-attribute -->
                                            <a class="list-group-item list-group-item-action" href="#">Service {i + 1}-c</a>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        {/each}
                    </div>
                </div>
            </div>
        </div>
        <div class="search-result-container">
            <div class="search-result m-5 pe-5">
                <div class="d-flex justify-content-between align-items-center mb-3 ms-3 me-3">
                    <div class="fs-5">Top Results</div>
                    <div class="dropdown">
                        <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Sort By: {"Name"}
                        </button>
                        <ul class="dropdown-menu">
                          <li><button class="dropdown-item">Name</button></li>
                          <li><button class="dropdown-item">Created</button></li>
                          <li><button class="dropdown-item">Popularity</button></li>
                        </ul>
                    </div>
                </div>
                <div class="all-results-padder shadow-lg p-3 me-5 rounded" in:scale={{duration: 500, start: 0.95}}>
                    <div class="all-results-container">
                        <ul class="list-group list-group-flush">
                            {#each [...Array(10).keys()] as i}
                                <!-- svelte-ignore a11y-invalid-attribute -->
                                <a class="list-group-item list-group-item-action" href="#">
                                    <h6>Service {i + 1}</h6>
                                    <p class="text-body-secondary text-truncate">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eget libero posuere, aliquet elit sit amet, lacinia urna. Quisque id tellus sed libero dictum efficitur. Etiam quis euismod leo. Vestibulum nec velit vel nunc sodales consectetur. Fusce facilisis ut elit ac cursus. Sed tempor fermentum tortor, fermentum facilisis nisi ullamcorper ac. Maecenas sapien diam, fermentum sit amet dictum quis, sollicitudin in quam. Donec rutrum ipsum sit amet mi malesuada, vitae egestas quam convallis. Donec eu mattis libero. Pellentesque in viverra sapien. Etiam sagittis elit eget tristique ornare. Sed in urna in neque efficitur laoreet. Etiam non est ac erat efficitur placerat.
                                    </p>
                                    <div class="d-flex flex-row-reverse">
                                        <div class="info-tag input-group mb-3 ms-2">
                                            <span class="input-group-text" id="address-{i}" title="Location of Service">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                                                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                                                </svg>
                                            </span>
                                            <input type="text" class="form-control" aria-label="address" aria-describedby="address-{i}" value={"Kauyerchor"} disabled>
                                        </div>
                                        <div class="info-tag input-group mb-3 ms-2">
                                            <span class="input-group-text" id="rate-{i}" title="Rate of Service">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                                </svg>
                                            </span>
                                            <input type="number" class="form-control" aria-label="rate" aria-describedby="rate-{i}" value={4.2} disabled>
                                        </div>
                                        <div class="info-tag input-group mb-3">
                                            <span class="input-group-text" id="price-{i}" title="Price of Service">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tags-fill" viewBox="0 0 16 16">
                                                    <path d="M2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2zm3.5 4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
                                                    <path d="M1.293 7.793A1 1 0 0 1 1 7.086V2a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l.043-.043-7.457-7.457z"/>
                                                </svg>
                                            </span>
                                            <input type="text" class="form-control" aria-label="price" aria-describedby="price-{i}" value="৳{69}" disabled>
                                        </div>
                                    </div>
                                </a>
                            {/each}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style lang="scss">
    .all-services
    {
        position: absolute;
        top: 7%;
        bottom: 0;
        left: 0;
        right: 80%;
    }

    .all-services-accordion-container
    {
        max-height: 95%;
        overflow-y: auto;
    }

    .search-result-container
    {
        width: 80%;
    }

    .search-result
    {
        position: absolute;
        top: 7%;
        bottom: 0;
        left: 20%;
        right: 0;
    }

    .all-results-padder
    {
        position: absolute;
        top: 7%;
        bottom: 0;
        right: 0;
        left: 0;
    }

    .all-results-container
    {
        max-height: 100%;
        overflow-y: auto;
    }

    .info-tag
    {
        max-width: 10em;
    }
</style>