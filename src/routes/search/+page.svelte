<script lang="ts">
    import Navbar from "$lib/components/navbar.svelte";
    import { onMount } from "svelte";
    import { fade, scale } from "svelte/transition";
    import type { SearchResult } from "./search-result";
    import Result from "$lib/components/search/result.svelte";
    import Placeholder from "$lib/components/search/placeholder.svelte";
    import { Sorter, SorterImplementation, SorterType } from "./sorter";
    import AllResultsContainer from "$lib/components/search/all-results-container.svelte";
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";

    let searchResults: SearchResult[] = []; 
    let searchResultsReady: boolean = false;
    let searchTerm: string;
    let minPriceFilter: number;
    let maxPriceFilter: number;
    let minPrice: number = 0;
    let maxPrice: number = Infinity;
    let sortType: SorterType = SorterType.NAME_ASC;
    let sorters: Sorter[] = 
    [
        {
            name: SorterImplementation.GetSorterName(SorterType.NAME_ASC),
            handler: (): void =>
            {
                sortType = SorterType.NAME_ASC,
                SortFilter();
            }
        },
        {
            name: SorterImplementation.GetSorterName(SorterType.NAME_DESC),
            handler: (): void =>
            {
                sortType = SorterType.NAME_DESC,
                SortFilter();
            }
        },
        {
            name: SorterImplementation.GetSorterName(SorterType.PRICE_ASC),
            handler: (): void =>
            {
                sortType = SorterType.PRICE_ASC,
                SortFilter();
            }
        },
        {
            name: SorterImplementation.GetSorterName(SorterType.PRICE_DESC),
            handler: (): void =>
            {
                sortType = SorterType.PRICE_DESC,
                SortFilter();
            }
        }
    ];


    $: sortTypeName = SorterImplementation.GetSorterName(sortType);

    function PriceFilter(): void
    {
        if(minPriceFilter)
        {
            minPrice = minPriceFilter;
        }

        if(maxPriceFilter)
        {
            maxPrice = maxPriceFilter;
        }

        SortFilter();
    }

    async function SortFilter(): Promise<void>
    {
        let query: string = "q=" + searchTerm + "&sort=" + sortType;

        if(minPrice > 0)
        {
            query += "&min_price=" + minPrice;
        }

        if(maxPrice < Infinity)
        {
            query += "&max_price=" + maxPrice;
        }

        let encodedQuery = encodeURI(query); 

        await goto("/search?" + encodedQuery);
        LoadResult();
    }

    function LoadResult(): void
    {
        searchResultsReady = false;
        let decodedParams = decodeURI($page.url.search);
        let urlParams: URLSearchParams = new URLSearchParams(decodedParams);
        let queryTerm: string | null = urlParams.get("q");
        let querySortTypeString: string | null = urlParams.get("sort");
        let queryMinPrice: string | null = urlParams.get("min_price");
        let queryMaxPrice: string | null = urlParams.get("max_price");

        if(querySortTypeString)
        {
            sortType = parseInt(querySortTypeString);
        }

        if(queryMinPrice)
        {
            minPrice = parseInt(queryMinPrice);
        }

        if(queryMaxPrice)
        {
            maxPrice = parseInt(queryMaxPrice);
        }

        if(queryTerm == null)
        {
            goto("/");

            return;
        }

        searchTerm = queryTerm;
        let requestObject = 
        {
            recommendation: false,
            search_term: searchTerm
        };

        let requestBodyString = JSON.stringify(requestObject);

        fetch("/api/search",
        {
            method: "POST",
            headers:
            {
                "Content-Type": "application/json"
            },
            body: requestBodyString
        }).then(async (response: Response): Promise<void> =>
        {
            let responseObject = await response.json();
            let tempSearchResults: SearchResult[] = new Array<SearchResult>(responseObject.length);

            for(let i: number = 0; i < tempSearchResults.length; ++i)
            {
                tempSearchResults[i] =
                {
                    id: responseObject[i].s_serviceid,
                    title: responseObject[i].s_title,
                    description: responseObject[i].s_description,
                    price: responseObject[i].s_basecost
                };
            }

            tempSearchResults = SorterImplementation.ApplySort(tempSearchResults, sortType);
            searchResults = [];

            for(let i: number = 0; i < tempSearchResults.length; ++i)
            {
                if(minPrice <= tempSearchResults[i].price && tempSearchResults[i].price <= maxPrice)
                {
                    searchResults.push(tempSearchResults[i]);
                }
            }

            searchResultsReady = true;
        });
    }

    onMount((): void =>
    {
        LoadResult();
    });
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
            <div class="search-result mt-4 mb-4 ms-5 me-5 pe-5">
                <div class="ms-3 me-3 mb-2">
                    <div class="input-group input-group-sm me-5">
                        <input type="text" class="form-control" placeholder="Search Service" aria-label="Search Service" aria-describedby="search-service-button" bind:value={searchTerm}>
                        <button class="btn btn-secondary" type="button" id="search-service-button">Search</button>
                    </div>
                </div>
                <div class="d-flex justify-content-between align-items-center mb-1 ms-3 me-3">
                    <div class="fs-5">Top Results</div>
                    <div class="d-flex align-items-center">
                        <span class="text-body-secondary me-1">
                            Sort By:
                        </span>
                        <div class="dropdown-center me-2 pe-2 border-end">
                            <!-- svelte-ignore a11y-invalid-attribute -->
                            <a class="link-secondary btn-sm link-underline-opacity-0 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" href="javascript:">
                                {sortTypeName}
                            </a>
                            <ul class="dropdown-menu">
                                {#each sorters as {name, handler}}
                                    <li>
                                        <button class="dropdown-item" on:click={handler}>
                                            {name}
                                        </button>
                                    </li>
                                {/each}
                            </ul>
                        </div>
                        <div class="dropdown-center">
                            <!-- svelte-ignore a11y-invalid-attribute -->
                            <a class="link-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" href="javascript:">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-funnel-fill" viewBox="0 0 16 16">
                                    <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2z"/>
                                </svg>
                            </a>
                            <div class="dropdown-menu p-2">
                                <h6>Price Range:</h6>
                                <div class="mb-2">
                                    <label for="range-from" class="form-label text-body-secondary">From</label>
                                    <input type="number" class="form-control form-control-sm" id="range-from" bind:value={minPriceFilter}>
                                </div>
                                <div class="mb-2">
                                    <label for="range-to" class="form-label text-body-secondary">To</label>
                                    <input type="number" class="form-control form-control-sm" id="range-to" bind:value={maxPriceFilter}>
                                </div>
                                <div class="d-flex flex-row-reverse">
                                    <button class="btn btn-primary btn-sm" type="button" on:click={PriceFilter}>
                                        Apply
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="all-results-padder shadow-lg p-3 me-5 rounded" in:scale={{start: 0.975, duration: 500}}>
                    {#if searchResultsReady}
                        <AllResultsContainer>
                            {#each searchResults as {id, title, description, price}}
                                <Result id={id} title={title} description={description} price={price} />
                            {/each}
                        </AllResultsContainer>
                    {:else}
                        <AllResultsContainer>
                            {#each [...Array(4).keys()] as i}
                                <Placeholder index={i} />
                            {/each}
                        </AllResultsContainer>
                    {/if}
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
        top: 10%;
        bottom: 0;
        right: 0;
        left: 0;
    }
</style>