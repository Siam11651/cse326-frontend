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
                                            <a class="list-group-item list-group-item-action" href="#">Service {i + 1}-a</a>
                                            <a class="list-group-item list-group-item-action" href="#">Service {i + 1}-b</a>
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
                                <a class="list-group-item list-group-item-action" href="#">
                                    <h6>Service {i + 1}</h6>
                                    <p class="text-body-secondary text-truncate">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eget libero posuere, aliquet elit sit amet, lacinia urna. Quisque id tellus sed libero dictum efficitur. Etiam quis euismod leo. Vestibulum nec velit vel nunc sodales consectetur. Fusce facilisis ut elit ac cursus. Sed tempor fermentum tortor, fermentum facilisis nisi ullamcorper ac. Maecenas sapien diam, fermentum sit amet dictum quis, sollicitudin in quam. Donec rutrum ipsum sit amet mi malesuada, vitae egestas quam convallis. Donec eu mattis libero. Pellentesque in viverra sapien. Etiam sagittis elit eget tristique ornare. Sed in urna in neque efficitur laoreet. Etiam non est ac erat efficitur placerat.
                                    </p>
                                    <div class="d-flex flex-row-reverse">
                                        <div class="price-tag input-group mb-3">
                                            <span class="input-group-text" id="price-{i}">৳</span>
                                            <input type="number" class="form-control" aria-label="৳" aria-describedby="price-{i}" value={69} disabled>
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

    .price-tag
    {
        max-width: 10em;
    }
</style>