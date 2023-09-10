<script lang="ts">
    import Navbar from "$lib/components/navbar.svelte";
    import { onMount } from "svelte";
    import { fade, scale } from "svelte/transition";
    import type { SearchResult } from "./search-result";
    import Result from "$lib/components/search/result.svelte";
    import { SorterImplementation, SorterType } from "./sorter";
    import AllResultsContainer from "$lib/components/search/all-results-container.svelte";
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";
    import ParentService from "$lib/components/search/parent-service.svelte";

    let allParentServicesReady: boolean = false;
    let allParentServices: {id: number, name: string}[] = [];
    let searchResults: SearchResult[] = []; 
    let searchResultsReady: boolean = false;
    let searchTerm: string;
    let minPrice: number = 0;
    let maxPrice: number = Infinity;
    let sortType: SorterType = SorterType.NAME_ASC;

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

        fetch("/api/primary_services/get_all_pservices",
        {
            method: "POST",
            headers:
            {
                "Content-Type": "application/json"
            }
        }).then(async (response: Response): Promise<void> =>
        {
            let responseObject = await response.json();

            allParentServices = new Array<{id: number, name: string}>(responseObject.length);

            for(let i: number = 0; i < allParentServices.length; ++i)
            {
                allParentServices[i] =
                {
                    id: responseObject[i]._pserviceid,
                    name: responseObject[i]._title
                }
            }

            allParentServicesReady = true;
        });
    });
</script>

<Navbar />

<div class="search-root">
    <div class="d-flex">
        <div class="partition-left p-5">
            <div class="all-services-container shadow-lg p-4 mb-5 bg-white rounded" in:scale={{duration: 500, start: 0.95}}>
                <h5>All Services:</h5>
                {#if allParentServicesReady}
                    <div class="all-services-accordion-container" in:fade={{duration: 200}}>
                        {#each allParentServices as {id, name}}
                            <div class="accordion accordion-flush p-1" id="all-services-accordion">
                                <ParentService parentServiceId={id} name={name} />
                            </div>
                        {/each}
                    </div>
                {:else}
                    <div class="all-services-accordion-container">
                        {#each [...Array(5).keys()] as i}
                            <div class="accordion accordion-flush p-1" id="all-services-accordion">
                                <ParentService placeholder={true} parentServiceId={i} name="" />
                            </div>
                        {/each}
                    </div>
                {/if}
            </div>
        </div>
        <div class="partition-right p-5">
            <div class="accessories-container p-3">
                <div class="input-group input-group-sm">
                    <input type="text" class="form-control" placeholder="Search Service" aria-label="Search Service" aria-describedby="search-service-button" bind:value={searchTerm}>
                    <button class="btn btn-dark" type="button" id="search-service-button">Search</button>
                </div>
            </div>
            <div class="search-result-container shadow-lg p-4 mb-5 bg-white rounded" in:scale={{duration: 500, start: 0.95}}>
                {#if searchResultsReady}
                    <AllResultsContainer>
                        {#each searchResults as {id, title, description, price}}
                            <Result id={id} title={title} description={description} price={price} />
                        {/each}
                    </AllResultsContainer>
                {:else}
                    <AllResultsContainer>
                        {#each [...Array(5).keys()] as i}
                            <Result placeholder={true} />
                        {/each}
                    </AllResultsContainer>
                {/if}
            </div>
        </div>
    </div>
</div>

<style lang="scss">
    .search-root
    {
        position: absolute;
        top: 6vh;
        bottom: 0;
        left: 2%;
        right: 2%;
    }

    .partition-left
    {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 75%;
    }

    .partition-right
    {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 25%;
        right: 0;
    }

    .all-services-container
    {
        width: 100%;
        height: 100%;
    }

    .accessories-container
    {
        height: 10%;
    }

    .search-result-container
    {
        height: 90%;
    }

    .all-services-accordion-container
    {
        max-height: 95%;
        overflow-y: auto;
    }
</style>