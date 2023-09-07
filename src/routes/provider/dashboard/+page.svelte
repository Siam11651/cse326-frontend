<script lang="ts">
    import Navbar from "$lib/components/navbar.svelte";
    import mikasa from "$lib/assets/mikasa.webp"
    import { fly } from "svelte/transition";
    import Overview from "$lib/components/dashboard/overview.svelte";
    import Services from "$lib/components/dashboard/services.svelte";
    import { onMount } from "svelte";
    import { PersonalInfo } from "./PersonalInfo";

    let menuButtons: HTMLButtonElement[] = new Array<HTMLButtonElement>(5);
    let menuSelection: number = 0;
    let personalInfo: PersonalInfo = new PersonalInfo();
    let personalInfoSet: boolean = false;

    onMount((): void =>
    {
        fetch("/api/provider/info",
        {
            method: "POST",
            headers:
            {
                "Content-Type": "application/json"
            }
        }).then(async (response: Response): Promise<void> =>
        {
            let responseObject = await response.json();

            personalInfo =
            {
                username: responseObject.pname,
                email: responseObject.mail,
                contact: responseObject.contactnumber,
                nidNumber: responseObject.nidnumber,
                region: responseObject.local_area,
                fullAddress: responseObject.contactaddress
            }

            personalInfoSet = true;
        });
    });

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

    function OnHistoryClick(): void
    {
        ResetSelection();

        menuButtons[3].classList.add("active");
        menuSelection = 3;
    }

    function OnReviewsClick(): void
    {
        ResetSelection();

        menuButtons[4].classList.add("active");
        menuSelection = 4;
    }
</script>

<div class="dashboard-root d-flex flex-column">
    <Navbar />
    <div class="main-partition d-flex flex-column align-item-center justify-content-center">
        <div class="dashboard-container d-flex align-items-center shadow-lg rounded" in:fly={{duration: 500}}>
            <div class="side-menu d-flex flex-column align-items-center justify-content-between border-end">
                <div class="d-flex flex-column align-items-center mt-3">
                    <img class="profile-picture rounded mb-1" src={mikasa} alt="pp"/>
                    <!-- svelte-ignore a11y-invalid-attribute -->
                    <a class="link-primary" href="javascript:" title="Edit Profile Picture">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                        </svg>
                    </a>
                    <h5 class="placeholder-glow mb-5">
                        {#if personalInfoSet}
                            {personalInfo.username}
                        {:else}
                            <span class="placeholder col-4"></span>
                        {/if}
                    </h5>
                </div>
                <div class="menu-list-container ps-3 mb-3 mt-5">
                    <div class="list-group list-group-flush border border-end-0 rounded-start">
                        <button type="button" class="menu-button list-group-item list-group-item-action fs-5 active" bind:this={menuButtons[0]} on:click={OnOverviewMenuClick}>Overview</button>
                        <button type="button" class="menu-button list-group-item list-group-item-action fs-5" bind:this={menuButtons[1]} on:click={OnServicesMenuClick}>Services</button>
                        <button type="button" class="menu-button list-group-item list-group-item-action fs-5" bind:this={menuButtons[2]} on:click={OnTasksMenuClick}>Tasks</button>
                        <button type="button" class="menu-button list-group-item list-group-item-action fs-5" bind:this={menuButtons[3]} on:click={OnHistoryClick}>History</button>
                        <button type="button" class="menu-button list-group-item list-group-item-action fs-5" bind:this={menuButtons[4]} on:click={OnReviewsClick}>Reviews</button>
                    </div>
                </div>
            </div>
            <div class="menu-details d-flex flex-column align-items-stretch p-5">
                {#if menuSelection == 0}
                    <Overview placeholder={!personalInfoSet} personalInfo={personalInfo} />
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

    .main-partition
    {
        height: 90%;
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
        overflow-y: auto;
    }

    .menu-button
    {
        height: 6ex;
    }

    .menu-details
    {
        height: 100%;
        width: 80%;
        margin-left: auto;
        margin-right: auto;
    }
</style>