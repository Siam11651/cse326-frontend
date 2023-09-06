<script lang="ts">
    import Navbar from "$lib/components/navbar.svelte";
    import acRepairman from "$lib/assets/ac-repairman.webp";
    import Overview from "$lib/components/service/overview.svelte";
    import { fade } from "svelte/transition";
    import Provider from "../../lib/components/service/provider.svelte";

    let overviewMode: boolean = false;

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
                    <h4 class="text-white opacity-75 mx-3">AC Repair Service</h4>
                    <h1 class="service-title fw-bold text-white">AC Jetwash</h1>
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
                        <Overview />
                    </div>
                {:else}
                    <div class="m-5" in:fade={{duration: 500}}>
                        <h2>Available Providers</h2>
                        <div class="list-group list-group-flush">
                            {#each [...Array(15).keys()] as i}
                                <Provider id={i} />
                            {/each}
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

    .service-title
    {
        font-size: 5em;
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
