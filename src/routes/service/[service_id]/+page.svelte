<script lang="ts">
    import Navbar from "$lib/components/navbar.svelte";
    import acRepairman from "$lib/assets/ac-repairman.webp";
    import { fade } from "svelte/transition";
    import { onMount } from "svelte";
    import { _serviceId } from "./+page";
    import { Service } from "./service";
    import Overview from "$lib/components/service/overview.svelte";
    import ProviderList from "$lib/components/service/provider-list.svelte";

    let overviewMode: boolean = true;
    let serviceReady: boolean = false;
    let service: Service = new Service();

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
    });

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
    <Navbar />
    <div class="banner-container">
        <img src={acRepairman} class="banner" alt="">
        <div class="banner-content">
            <div class="partition-container d-flex justify-content-center">
                
            </div>
        </div>
    </div>

    <div class="title">
        <div class="mid-part d-flex flex-column justify-content-center">
            <div>
                <!-- <h4 class="text-white opacity-75 mx-1">AC Repair Service</h4> -->
                {#if serviceReady}
                    <h1 class="fw-bold text-white" in:fade={{duration: 200}}>{service.title}</h1>
                {:else}
                    <h1 class="fw-bold text-white placeholder-glow">
                        <span class="placeholder col-4"></span>
                        <span class="placeholder col-2"></span>
                    </h1>
                {/if}
            </div>
        </div>
    </div>

    <div class="info-root">
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
                <Overview serviceReady={serviceReady} service={service} />
            {:else}
                <ProviderList serviceId={_serviceId} />
            {/if}
        </div>
    </div>
</div>

<style lang="scss">
    .banner-container
    {
        position: absolute;
        top: 6vh;
        bottom: 44%;
        left: 0;
        right: 0;
    }

    .banner
    {
        width: 100%;
        height: 100%;
        filter: brightness(50%);
        object-fit: cover;
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
    
    .mid-part
    {
        width: 70%;
        height: 100%;
        padding-left: 5%;
        padding-right: 5%;
    }

    .title
    {
        position: absolute;
        top: 6vh;
        bottom: 0;
        left: 0;
        right: 0;
        padding-bottom: 69vh;
        padding-left: 15%;
        padding-right: 15%;
    }

    .info-root
    {
        position: absolute;
        padding-top: 25vh;
        padding-left: 15%;
        padding-right: 15%;
        top: 6vh;
        bottom: 0;
        left: 0;
        right: 0;
        overflow-y: auto;
    }
</style>
