<script lang="ts">
    import Navbar from "$lib/components/navbar.svelte";
    import PageHeader from "$lib/components/page-header.svelte";
    import mikasa from "$lib/assets/mikasa.webp"
    import { fly } from "svelte/transition";
    import Overview from "$lib/components/dashboard/overview.svelte";
    import Services from "$lib/components/dashboard/services.svelte";

    let menuButtons: HTMLButtonElement[] = new Array<HTMLButtonElement>(4);
    let menuSelection: number = 0;

    function ResetSelection(): void
    {
        menuButtons.forEach((button: HTMLButtonElement, index: number, array: HTMLButtonElement[]): void =>
        {
            button.classList.remove("active");
        });
    }

    function OnOverviewMenuClick(): void
    {
        ResetSelection();

        menuButtons[0].classList.add("active");
        menuSelection = 0;
    }

    function OnServicesMenuClick(): void
    {
        ResetSelection();

        menuButtons[1].classList.add("active");
        menuSelection = 1;
    }

    function OnTasksMenuClick(): void
    {
        ResetSelection();

        menuButtons[2].classList.add("active");
        menuSelection = 2;
    }

    function OnReviewsClick(): void
    {
        ResetSelection();

        menuButtons[3].classList.add("active");
        menuSelection = 3;
    }
</script>

<svelte:head>
    <PageHeader/>
</svelte:head>

<div class="dashboard-root d-flex flex-column">
    <Navbar />
    <div class="d-flex flex-column align-item-center justify-content-center flex-fill">
        <div class="dashboard-container d-flex align-items-center shadow-lg rounded" in:fly={{duration: 500}}>
            <div class="side-menu d-flex flex-column align-items-center border-end">
                <img class="profile-picture rounded mb-1" src={mikasa} alt="pp"/>
                <button type="button" class="btn btn-primary btn-sm mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                </button>
                <h5 class="mb-5">Username</h5>
                <div class="menu-list-container ps-3 mt-5">
                    <div class="list-group list-group-flush border border-end-0 rounded-start">
                        <button type="button" class="menu-button list-group-item list-group-item-action active" bind:this={menuButtons[0]} on:click={OnOverviewMenuClick}>Overview</button>
                        <button type="button" class="menu-button list-group-item list-group-item-action" bind:this={menuButtons[1]} on:click={OnServicesMenuClick}>Services</button>
                        <button type="button" class="menu-button list-group-item list-group-item-action" bind:this={menuButtons[2]} on:click={OnTasksMenuClick}>Tasks</button>
                        <button type="button" class="menu-button list-group-item list-group-item-action" bind:this={menuButtons[3]} on:click={OnReviewsClick}>Reviews</button>
                    </div>
                </div>
            </div>
            <div class="menu-details d-flex flex-column align-items-stretch p-5">
                {#if menuSelection == 0}
                    <Overview />
                {:else if menuSelection == 1}
                    <Services />
                {/if}
            </div>
        </div>
    </div>
</div>

<style lang="scss">
    .dashboard-root
    {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }

    .dashboard-container
    {
        margin: auto;
        width: 70%;
        height: 90%;
    }

    .side-menu
    {
        width: 30%;
        height: 90%;
    }

    .profile-picture
    {
        height: 96px;
        width: 96px;
    }

    .menu-list-container
    {
        width: 100%;
    }

    .menu-button
    {
        height: 8ex;;
    }

    .menu-details
    {
        height: 100%;
        width: 80%;
        margin-left: auto;
        margin-right: auto;
    }
</style>