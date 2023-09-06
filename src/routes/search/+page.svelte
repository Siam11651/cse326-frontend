<script lang="ts">
    import Navbar from "$lib/components/navbar.svelte";
    import { onMount } from "svelte";
    import { fade, scale } from "svelte/transition";
    import type { SearchResult } from "./search-result";
    import Result from "$lib/components/search/result.svelte";
    import Placeholder from "$lib/components/search/placeholder.svelte";
    import { SorterType, type Sorter, SorterImplementation } from "./sorter";
    import AllResultsContainer from "$lib/components/search/all-results-container.svelte";

    let searchResults: SearchResult[] = []; 
    let searchResultsReady: boolean = false;
    // let searchResults: SearchResult[] = new Array<SearchResult>(10);

    // for(let i: number = 0; i < 10; ++i)
    // {
    //     searchResults[i] =
    //     {
    //         id: i,
    //         title: "Service " + (i + 1),
    //         description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pretium ultrices nibh in scelerisque. Proin facilisis dolor a est eleifend, congue egestas lorem convallis. Nam porta aliquam mi. Nullam ligula tellus, aliquam vitae magna congue, dignissim feugiat sapien. Sed vulputate commodo eros tempus mollis. Ut vestibulum blandit ornare. Sed id semper massa. Ut augue libero, efficitur a orci eget, commodo volutpat augue. Proin in neque turpis. Nullam pretium iaculis nisl, non pellentesque purus feugiat a. Vivamus malesuada augue vel nisl faucibus, eu bibendum purus posuere. Suspendisse tristique ut libero volutpat auctor.",
    //         price: 69
    //     };
    // }

    let sortMethod: string = SorterImplementation.GetSorterName(SorterType.NAME_ASC);
    let sorters: Sorter[] =
    [
        {
            name: SorterImplementation.GetSorterName(SorterType.NAME_ASC),
            handler: (): void =>
            {
                searchResultsReady = false;
                sortMethod = SorterImplementation.GetSorterName(SorterType.NAME_ASC);
                searchResults = SorterImplementation.ApplyFilter(searchResults, SorterType.NAME_ASC)
                searchResultsReady = true;
            }
        },
        {
            name: SorterImplementation.GetSorterName(SorterType.NAME_DESC),
            handler: (): void =>
            {
                searchResultsReady = false;
                sortMethod = SorterImplementation.GetSorterName(SorterType.NAME_DESC);
                searchResults = SorterImplementation.ApplyFilter(searchResults, SorterType.NAME_DESC)
                searchResultsReady = true;
            }
        },
        {
            name: SorterImplementation.GetSorterName(SorterType.PRICE_ASC),
            handler: (): void =>
            {
                searchResultsReady = false;
                sortMethod = SorterImplementation.GetSorterName(SorterType.PRICE_ASC);
                searchResults = SorterImplementation.ApplyFilter(searchResults, SorterType.PRICE_ASC)
                searchResultsReady = true;
            }
        },
        {
            name: SorterImplementation.GetSorterName(SorterType.PRICE_DESC),
            handler: (): void =>
            {
                searchResultsReady = false;
                sortMethod = SorterImplementation.GetSorterName(SorterType.PRICE_DESC);
                searchResults = SorterImplementation.ApplyFilter(searchResults, SorterType.PRICE_DESC)
                searchResultsReady = true;
            }
        }
    ]

    onMount((): void =>
    {
        let urlParams: URLSearchParams = new URLSearchParams(window.location.search);
        let encodedTerm: string | null = urlParams.get("q");

        if(encodedTerm)
        {
            let searchTerm: string = decodeURI(encodedTerm);
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
                searchResults = new Array<SearchResult>(responseObject.length);

                for(let i: number = 0; i < searchResults.length; ++i)
                {
                    searchResults[i] =
                    {
                        id: responseObject[i].s_serviceid,
                        title: responseObject[i].s_title,
                        description: responseObject[i].s_description,
                        price: responseObject[i].s_basecost
                    };
                }

                searchResultsReady = true;
            });
        }
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
            <div class="search-result m-5 pe-5">
                <div class="d-flex justify-content-between align-items-center mb-3 ms-3 me-3">
                    <div class="fs-5">Top Results</div>
                    <div class="dropdown">
                        <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Sort By: {sortMethod}
                        </button>
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
                </div>
                <div class="all-results-padder shadow-lg p-3 me-5 rounded" in:scale={{duration: 500, start: 0.95}}>
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
        top: 7%;
        bottom: 0;
        right: 0;
        left: 0;
    }
</style>