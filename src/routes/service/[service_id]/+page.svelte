<script lang="ts">
    import Navbar from "$lib/components/navbar.svelte";
    import acRepairman from "$lib/assets/ac-repairman.webp";
    import { fade } from "svelte/transition";
    import ProviderComponent from "../../../lib/components/service/provider.svelte";
    import { onMount } from "svelte";
    import { _serviceId } from "./+page";
    import { Service } from "./service";
    import Overview from "$lib/components/service/overview.svelte";
    import { Provider } from "./provider";
    import { SortMethod, SORT_ROUTES, SORT_NAMES } from "./sort";

    let overviewMode: boolean = true;
    let serviceReady: boolean = false;
    let providerListReady: boolean = false;
    let fetchingProviderList: boolean = false;
    let service: Service = new Service();
    let providersList: Provider[] = [];
    let sortName: string = "Rate (Asc)";

    onMount(() =>
    {
        let requestObject =
        {
            service_id: _serviceId
        };

        let requestBodyString: string = JSON.stringify(requestObject);

        fetch("/api/service/service_details",
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
            
            service.title = responseObject[0].title;
            service.description = responseObject[0].description;
            serviceReady = true;
        });

        FetchProviderList(SortMethod.RATE, false);
    });

    function FetchProviderList(sortMethod: SortMethod, sortAsc: boolean): void
    {
        if(fetchingProviderList)
        {
            return;
        }

        fetchingProviderList = true;
        providerListReady = false;
        sortName = SORT_NAMES[sortMethod] + (sortAsc) ? " (Asc)" : " (Desc)";
        let requestObject =
        {
            service_id: _serviceId
        };

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

            providersList = new Array<Provider>(responseObject.length);

            for(let i: number = 0; i < providersList.length; ++i)
            {
                providersList[i] =
                {
                    id: responseObject[i].pid,
                    name: responseObject[i].pname,
                    rate: responseObject[i].ratingrank,
                    cost: responseObject[i].totalcost,
                    area: responseObject[i].plocal_area
                }
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

    function SortRateAsc(): void
    {
        FetchProviderList(SortMethod.RATE, true);
    }

    function SortRateDesc(): void
    {
        FetchProviderList(SortMethod.RATE, false);
    }

    function SwitchToProviderList(): void
    {
        overviewMode = false;
    }

    function SwitchToOverview(): void
    {
        overviewMode = true;
    }
</script>

<div class="service-root">
    <!-- <Navbar /> -->
    <div class="banner-container">
        <img src={acRepairman} class="banner img-fluid" alt="">
        <div class="banner-content">
            <div class="partition-container d-flex">
                <div class="left-part" />
                <div class="mid-part m-5 p-5">
                    <h4 class="text-white opacity-75 mx-1">AC Repair Service</h4>
                    {#if serviceReady}
                        <h1 class="fw-bold text-white">{service.title}</h1>
                    {:else}
                        <h1 class="fw-bold text-white placeholder-glow"><span class="placeholder col-6"></span></h1>
                    {/if}
                </div>
                <div class="right-part" />
            </div>
        </div>
    </div>

    <div class="info-root">
        <div class="info-padder">
            <div class="info-container shadow-lg bg-white p-3 mb-5 rounded">
                <ul class="nav nav-pills justify-content-center">
                    <li class="nav-item">
                        <button class="nav-link {overviewMode ? "active" : ""}" aria-current="page" on:click={SwitchToOverview}>Overview</button>
                    </li>
                    <li class="nav-item">
                        <button class="nav-link {overviewMode ? "" : "active"}" aria-current="page" on:click={SwitchToProviderList}>Providers</button>
                    </li>
                </ul>
                {#if overviewMode}
                    <div class="m-5" in:fade={{duration: 500}}>
                        <Overview serviceReady={serviceReady} service={service} />
                    </div>
                {:else}
                    <div class="m-5" in:fade={{duration: 500}}>
                        <h2>Available Providers</h2>
                        <div class="d-flex flex-row-reverse align-items-center mb-3">
                            <div class="dropdown">
                                <div class="input-group">
                                    <span class="input-group-text">Sort By:</span>
                                    <button type="button" class="btn btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
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
                        </div>
                        <div class="list-group list-group">
                            {#if providerListReady}
                                {#each providersList as provider}
                                    <ProviderComponent serviceId={_serviceId} provider={provider} />
                                {/each}
                            {:else}
                                {#each [...Array(5).keys()] as i}
                                    <ProviderComponent placeholder={true} serviceId={-1} provider={new Provider()} />
                                {/each}
                            {/if}
                        </div>
                    </div>
                {/if}
            </div>
        </div>
    </div>
    <div class="nav-root">
        <Navbar />
    </div>
</div>

<style lang="scss">
    .banner-container
    {
        position: absolute;
        top: 5%;
    }

    .banner
    {
        filter: brightness(50%);
    }

    .banner-content
    {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }

    .partition-container
    {
        height: 100%;
    }

    .left-part
    {
        width: 15%;
    }
    
    .mid-part
    {
        width: 70%;
        height: 100%;
    }

    .right-part
    {
        width: 15%;
    }

    .info-root
    {
        position: absolute;
        top: 5%;
        bottom: 0;
        left: 0;
        right: 0;
    }

    .info-padder
    {
        padding-top: 16%;
        height: 100%;
        padding-left: 15%;
        padding-right: 15%;
        overflow-y: auto;
    }

    .info-padder::-webkit-scrollbar
    {
        display: none;
    }

    .info-container
    {
        min-height: 102%;
        width: 100%;
    }

    .nav-root
    {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
    }
</style>
