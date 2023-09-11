<script lang="ts">
    import ProviderComponent from "../../../lib/components/service/provider.svelte";
    import { SORT_NAMES, SORT_ROUTES, SortMethod } from "../../../routes/service/[service_id]/sort";
    import { Provider } from "../../../routes/service/[service_id]/provider";
    import { Filter } from "../../../routes/service/[service_id]/filter";
    import { fade } from "svelte/transition";
    import { onMount } from "svelte";

    export let serviceId: number;

    let fetchingProviderList: boolean = false;
    let sortMethod: SortMethod = SortMethod.RATE;
    let sortAsc: boolean = false;
    let providerListReady: boolean = false;
    let providersList: Provider[] = [];
    let sortName: string = "Rate (Asc)";
    let filter: Filter = new Filter();

    onMount((): void =>
    {
        FetchProviderList(SortMethod.RATE, false);
    });

    async function FetchProviderList(_sortMethod: SortMethod, _sortAsc: boolean): Promise<void>
    {
        if(fetchingProviderList)
        {
            return;
        }

        fetchingProviderList = true;
        providerListReady = false;
        sortMethod = _sortMethod;
        sortAsc = _sortAsc;
        sortName = SORT_NAMES[sortMethod] + ((sortAsc) ? " (Asc)" : " (Desc)");

        let requestObject =
        {
            service_id: serviceId,
            longitude: 0,
            latitude: 0
        };

        if(sortMethod === SortMethod.DIST)
        {
            function GetPosition(): Promise<GeolocationPosition>
            {
                return new Promise((resolve: (position: GeolocationPosition) => void) => navigator.geolocation.getCurrentPosition(resolve));
            }

            let position: GeolocationPosition = await GetPosition();
            requestObject.longitude = position.coords.longitude;
            requestObject.latitude = position.coords.latitude;
        }

        let requestBodyString: string = JSON.stringify(requestObject);

        fetch(SORT_ROUTES[sortMethod],
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
            providersList = [];

            for(let i: number = 0; i < responseObject.length; ++i)
            {
                let cost: number = responseObject[i].totalcost;
                let rate: number = responseObject[i].ratingrank;
                let discount: number = responseObject[i].discountpercentage;

                if(!(filter.minPrice <= cost && cost <= filter.maxPrice))
                {
                    continue;
                }
                else if(!(filter.minRate <= rate && rate <= filter.maxRate))
                {
                    continue;
                }
                else if(!(filter.minDiscount <= discount && discount <= filter.maxDiscount))
                {
                    continue;
                }

                providersList.push(
                {
                    id: responseObject[i].pid,
                    name: responseObject[i].pname,
                    rate: rate,
                    cost: cost,
                    area: responseObject[i].local_area,
                    discount: discount
                });
            }

            if(sortAsc)
            {
                providersList.reverse();
            }

            providerListReady = true;
            fetchingProviderList = false;
        });
    }

    function SortCostAsc(): void
    {
        FetchProviderList(SortMethod.COST, true);
    }

    function SortCostDesc(): void
    {
        FetchProviderList(SortMethod.COST, false);
    }

    function SortDiscAsc(): void
    {
        FetchProviderList(SortMethod.DISC, true);
    }

    function SortDiscDesc(): void
    {
        FetchProviderList(SortMethod.DISC, false);
    }

    function SortDistAsc(): void
    {
        FetchProviderList(SortMethod.DIST, true);
    }

    function SortDistDesc(): void
    {
        FetchProviderList(SortMethod.DIST, false);
    }

    function SortRateAsc(): void
    {
        FetchProviderList(SortMethod.RATE, true);
    }

    function SortRateDesc(): void
    {
        FetchProviderList(SortMethod.RATE, false);
    }

    function ApplyFilter()
    {
        filter.minPrice = filter.minPrice ? filter.minPrice : 0;
        filter.maxPrice = filter.maxPrice ? filter.maxPrice : Infinity;
        filter.minDiscount = filter.minDiscount ? filter.minDiscount : 0;
        filter.maxDiscount = filter.maxDiscount ? filter.maxDiscount : 100;
        filter.minRate = filter.minRate ? filter.minRate : 0;
        filter.maxRate = filter.maxRate ? filter.maxRate : 5;

        FetchProviderList(sortMethod, sortAsc);
    }
</script>

<div class="m-5" in:fade={{duration: 200}}>
    <h2>Available Providers</h2>
    <div class="d-flex flex-row-reverse align-items-center pb-3">
        <div class="dropdown">
            <div class="input-group">
                <span class="input-group-text">Sort By:</span>
                <button type="button" class="btn btn-outline-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    {sortName}
                </button>
                <ul class="dropdown-menu">
                    <!-- cost ascending -->
                    <li>
                        <button class="dropdown-item" on:click={SortCostAsc}>
                            {"Cost (Asc)"}
                        </button>
                    </li>
                    <!-- cost descending -->
                    <li>
                        <button class="dropdown-item" on:click={SortCostDesc}>
                            {"Cost (Desc)"}
                        </button>
                    </li>
                    <!-- discount ascending -->
                    <li>
                        <button class="dropdown-item" on:click={SortDiscAsc}>
                            {"Discount (Asc)"}
                        </button>
                    </li>
                    <!-- discount descending -->
                    <li>
                        <button class="dropdown-item" on:click={SortDiscDesc}>
                            {"Discount (Desc)"}
                        </button>
                    </li>
                    <!-- distance ascending -->
                    <li>
                        <button class="dropdown-item" on:click={SortDistAsc}>
                            {"Distance (Asc)"}
                        </button>
                    </li>
                    <!-- distance descending -->
                    <li>
                        <button class="dropdown-item" on:click={SortDistDesc}>
                            {"Distance (Desc)"}
                        </button>
                    </li>
                    <!-- rate ascending -->
                    <li>
                        <button class="dropdown-item" on:click={SortRateAsc}>
                            {"Rate (Asc)"}
                        </button>
                    </li>
                    <!-- rate descending -->
                    <li>
                        <button class="dropdown-item" on:click={SortRateDesc}>
                            {"Rate (Desc)"}
                        </button>
                    </li>
                </ul>
            </div>
        </div>
        <!-- svelte-ignore a11y-invalid-attribute -->
        <a class="link-secondary me-2" href="#" data-bs-toggle="collapse" role="button" aria-expanded="false" data-bs-target="#filer-options-collapse" aria-controls="filer-options-collapse">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-funnel-fill" viewBox="0 0 16 16">
                <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2z"/>
            </svg>
        </a>
    </div>
    <div class="collapse" id="filer-options-collapse">
        <div class="card card-body">
            <h5>Filters</h5>
            <label for="cost-range-input" class="form-label">Cost</label>
            <div id="cost-range-input" class="input-group mb-3">
                <span class="input-group-text" id="price-from">From</span>
                <input type="number" class="form-control" placeholder="From" aria-describedby="price-from" bind:value={filter.minPrice} disabled={fetchingProviderList}>
                <span class="input-group-text" id="price-to">To</span>
                <input type="number" class="form-control" placeholder="To" aria-describedby="price-to" bind:value={filter.maxPrice} disabled={fetchingProviderList}>
            </div>
            <label for="rate-range-input" class="form-label">Rate</label>
            <div id="rate-range-input" class="input-group mb-3">
                <span class="input-group-text" id="rate-from">From</span>
                <input type="number" class="form-control" placeholder="From" aria-describedby="rate-from" min="0" max="5" bind:value={filter.minRate} disabled={fetchingProviderList}>
                <span class="input-group-text" id="rate-to">To</span>
                <input type="number" class="form-control" placeholder="To" aria-describedby="rate-to" min="0" max="500" bind:value={filter.maxRate} disabled={fetchingProviderList}>
            </div>
            <label for="discount-range-input" class="form-label">Discount</label>
            <div id="discount-range-input" class="input-group mb-3">
                <span class="input-group-text" id="discount-from">From</span>
                <input type="number" class="form-control" placeholder="From" aria-describedby="discount-from" min="0" max="100" bind:value={filter.minDiscount} disabled={fetchingProviderList}>
                <span class="input-group-text" id="discount-to">To</span>
                <input type="number" class="form-control" placeholder="To" aria-describedby="discount-to" min="0" max="100" bind:value={filter.maxDiscount} disabled={fetchingProviderList}>
            </div>
            <div class="d-flex flex-row-reverse">
                <button type="button" class="btn btn-primary" on:click={ApplyFilter} disabled={fetchingProviderList}>Apply</button>
            </div>
        </div>
    </div>
    {#if providerListReady}
        <div class="list-group list-group pt-3" in:fade={{duration: 200}}>
            {#each providersList as provider}
                <ProviderComponent provider={provider} />
            {/each}
        </div>
    {:else}
        <div class="list-group list-group pt-3">
            {#each [...Array(5).keys()] as i}
                <ProviderComponent placeholder={true} provider={new Provider()} />
            {/each}
        </div>
    {/if}
</div>