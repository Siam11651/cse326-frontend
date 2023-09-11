<script lang="ts">
    import Navbar from "$lib/components/navbar.svelte";
    import { fade } from "svelte/transition";
    import { onMount } from "svelte";
    import { _tenderId } from "./+page";
    import Overview from "$lib/components/tender/overview.svelte";
    import BidList from "$lib/components/tender/bid-list.svelte";
    import { Tender } from "$lib/tender/tender";

    let overviewMode: boolean = true;
    let tenderReady: boolean = false;
    let tender: Tender = new Tender();

    onMount(() =>
    {
        let requestObject =
        {
            tender_id: _tenderId
        };

        let requestBodyString: string = JSON.stringify(requestObject);

        fetch("/api/tender/tender_details",
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
            
            tender =
            {
                id: responseObject[0]._tenderid,
                title: responseObject[0]._title,
                service: responseObject[0]._servicetitle,
                description: responseObject[0]._description,
                created: responseObject[0]._created_at,
                ends: responseObject[0]._ends_at
            };

            tenderReady = true;
        });
    });

    function SwitchToBidsList(): void
    {
        overviewMode = false;
    }

    function SwitchToOverview(): void
    {
        overviewMode = true;
    }
</script>

<div class="tender-root">
    <Navbar />
    <div class="title">
        <div class="mid-part d-flex flex-column align-items-center justify-content-center">
            <div>
                {#if tenderReady}
                    <h1 class="fw-bold" in:fade={{duration: 200}}>{tender.title}</h1>
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
                    <button class="nav-link {overviewMode ? "" : "active"}" aria-current="page" on:click={SwitchToBidsList}>Bids</button>
                </li>
            </ul>
            {#if overviewMode}
                <Overview tenderReady={tenderReady} tender={tender} />
            {:else}
                <BidList tenderId={_tenderId} />
            {/if}
        </div>
    </div>
</div>

<style lang="scss">    
    .mid-part
    {
        width: 100%;
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

    .info-container
    {
        min-height: 102%;
    }
</style>