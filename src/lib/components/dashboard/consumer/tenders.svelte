<script lang="ts">
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";
    import type { Tender } from "$lib/tender/tender";
    import type { Bid } from "$lib/tender/bid";
    import LabeledInfoTag from "../labeled-info-tag.svelte";

    let showBids: boolean = false;
    let bidsReady: boolean = false;
    let bids: Bid[] = [];
    let tendersReady: boolean = false;
    let tenders: Tender[] = [];

    onMount((): void =>
    {
        tendersReady = false;

        FetchTenders();
    });

    function FetchTenders(): void
    {
        fetch("/api/tender/user_tender",
        {
            method: "POST",
            headers:
            {
                "Content-Type": "application/json"
            }
        }).then(async (response: Response): Promise<void> =>
        {
            let responseObject = await response.json();

            tenders = new Array<Tender>(responseObject.length);

            for(let i: number = 0; i < tenders.length; ++i)
            {
                tenders[i] =
                {
                    id: responseObject[i]._tenderid,
                    title: responseObject[i]._title,
                    service: responseObject[i]._servicetitle,
                    description: responseObject[i]._description,
                    created: responseObject[i]._created_at,
                    ends: responseObject[i]._ends_at
                }
            }

            tendersReady = true;
        });
    }

    function FetchBid(): void
    {
        fetch("/api/tender/user_tender_bids",
        {
            method: "POST",
            headers:
            {
                "Content-Type": "application/json"
            }
        }).then(async (response: Response): Promise<void> =>
        {
            let responseObject = await response.json();

            console.log(responseObject);

            bids = new Array<Bid>(responseObject.length);

            for(let i: number = 0; i < bids.length; ++i)
            {
                bids[i] =
                {
                    id: responseObject[i]._tenderid,
                    bidTitle: responseObject[i]._bid_title,
                    tenderTitle: responseObject[i]._title,
                    service: responseObject[i]._servicetitle,
                    cost: responseObject[i]._estimated_cost,
                    description: responseObject[i]._description,
                    created: responseObject[i]._created_at,
                    ends: responseObject[i]._ends_at
                }
            }

            bidsReady = true;
        });
    }    

    function ShowBids(): void
    {
        bidsReady = false;
        showBids = true;

        FetchBid();
    }

    function HideAllTenders(): void
    {
        showBids = false;
    }
</script>

<div class="tenders-root" in:fade={{duration: 200}}>
    {#if showBids}
        <div class="all-bids" in:fade={{duration: 200}}>
            <h4 class="all-bids-title d-flex align-items-center m-0">
                <!-- svelte-ignore a11y-invalid-attribute -->
                <a class="link-danger me-2" href="#" on:click={HideAllTenders}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                    </svg>
                </a>
                Bids
            </h4>
                {#if bidsReady}
                    <div class="all-bids-list list-group" in:fade={{duration: 200}}>
                        {#each bids as bid}
                            <!-- svelte-ignore a11y-invalid-attribute -->
                            <a role="button" class="list-group-item list-group-item-action" href="#">
                                <div class="m-1">
                                    <h5>
                                        {bid.bidTitle}
                                    </h5>
                                    <h6 class="text-body-secondary">
                                        Tender: {bid.bidTitle}
                                    </h6>
                                    <p class="tender-details text-body-secondary mb-1">
                                        {bid.description}
                                    </p>
                                    <div class="d-flex align-items-center text-body-secondary ms-1">
                                        <div title="Created Date" class="d-flex align-items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar3" viewBox="0 0 16 16">
                                                <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z"/>
                                                <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                                            </svg>
                                            <span class="ms-1">
                                                {(new Date(bid.created)).toDateString()}
                                            </span>
                                        </div>
                                        <div class="mx-2">
                                            •
                                        </div>
                                        <div title="End Date" class="d-flex align-items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar-check" viewBox="0 0 16 16">
                                                <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                                                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                                            </svg>
                                            <span class="ms-1">
                                                {(new Date(bid.ends)).toDateString()}
                                            </span>
                                        </div>
                                        <div class="mx-2">
                                            •
                                        </div>
                                        <div title="Bid Price" class="d-flex align-items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tags" viewBox="0 0 16 16">
                                                <path d="M3 2v4.586l7 7L14.586 9l-7-7H3zM2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2z"/>
                                                <path d="M5.5 5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm0 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM1 7.086a1 1 0 0 0 .293.707L8.75 15.25l-.043.043a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 0 7.586V3a1 1 0 0 1 1-1v5.086z"/>
                                            </svg>
                                            <span class="ms-1">
                                                {bid.cost}৳
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        {/each}
                    </div>
                {:else}
                    <div class="all-bids-list list-group">
                        {#each [...Array(3).keys()] as i}
                            <!-- svelte-ignore a11y-invalid-attribute -->
                            <a role="button" class="list-group-item list-group-item-action placeholder-glow" href="#">
                                <div class="placeholder-glow m-1">
                                    <h5>
                                        <span class="placeholder col-4"></span>
                                        <span class="placeholder col-2"></span>
                                    </h5>
                                    <h6 class="text-body-secondary">
                                        Tender:
                                        <span class="placeholder col-1"></span>
                                        <span class="placeholder col-2"></span>
                                    </h6>
                                    <p class="tender-details text-body-secondary mb-1">
                                        <span class="placeholder col-7"></span>
                                        <span class="placeholder col-4"></span>
                                        <span class="placeholder col-6"></span>
                                        <span class="placeholder col-2"></span>
                                    </p>
                                    <div class="d-flex align-items-center text-body-secondary ms-1">
                                        <div title="Created Date" class="d-flex align-items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar3" viewBox="0 0 16 16">
                                                <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z"/>
                                                <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                                            </svg>
                                            <span class="placeholder ms-1" style="width: 50px;"></span>
                                        </div>
                                        <div class="mx-2">
                                            •
                                        </div>
                                        <div title="End Date" class="d-flex align-items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar-check" viewBox="0 0 16 16">
                                                <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                                                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                                            </svg>
                                            <span class="placeholder ms-1" style="width: 50px;"></span>
                                        </div>
                                        <div class="mx-2">
                                            •
                                        </div>
                                        <div title="Bid Price" class="d-flex align-items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tags" viewBox="0 0 16 16">
                                                <path d="M3 2v4.586l7 7L14.586 9l-7-7H3zM2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2z"/>
                                                <path d="M5.5 5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm0 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM1 7.086a1 1 0 0 0 .293.707L8.75 15.25l-.043.043a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 0 7.586V3a1 1 0 0 1 1-1v5.086z"/>
                                            </svg>
                                            <span class="placeholder ms-1" style="width: 50px;"></span>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        {/each}
                    </div>
                {/if}
        </div>
    {:else}
        <div class="tenders" in:fade={{duration: 200}}>
            <div class="top-part">
                <h4 class="header">My Tenders</h4>
            </div>
            <div class="middle-part mb-2">
                {#if tendersReady}
                    <div class="list-group" in:fade={{duration: 200}}>
                        {#each tenders as tender}
                            <!-- svelte-ignore a11y-invalid-attribute -->
                            <a role="button" class="list-group-item list-group-item-action" href="#">
                                <div class="m-1">
                                    <h5>
                                        {tender.title}
                                    </h5>
                                    <p class="tender-details text-body-secondary mb-1">
                                        {tender.description}
                                    </p>
                                    <div class="d-flex align-items-center text-body-secondary ms-1">
                                        <div title="Created Date" class="d-flex align-items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar3" viewBox="0 0 16 16">
                                                <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z"/>
                                                <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                                            </svg>
                                            <span class="ms-1">
                                                {(new Date(tender.created)).toDateString()}
                                            </span>
                                        </div>
                                        <div class="mx-2">
                                            •
                                        </div>
                                        <div title="End Date" class="d-flex align-items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar-check" viewBox="0 0 16 16">
                                                <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                                                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                                            </svg>
                                            <span class="ms-1">
                                                {(new Date(tender.ends)).toDateString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        {/each}
                    </div>
                {:else}
                    <div class="list-group">
                        {#each [...Array(3).keys()] as i}
                            <!-- svelte-ignore a11y-invalid-attribute -->
                            <a role="button" class="list-group-item list-group-item-action" href="#">
                                <div class="placeholder-glow m-1">
                                    <h5>
                                        <span class="placeholder col-4"></span>
                                        <span class="placeholder col-2"></span>
                                    </h5>
                                    <p class="tender-details text-body-secondary mb-1">
                                        <span class="placeholder col-7"></span>
                                        <span class="placeholder col-4"></span>
                                        <span class="placeholder col-6"></span>
                                        <span class="placeholder col-2"></span>
                                    </p>
                                    <div class="d-flex align-items-center placeholder-glow text-body-secondary ms-1">
                                        <div class="d-flex align-items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar3" viewBox="0 0 16 16">
                                                <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z"/>
                                                <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                                            </svg>
                                            <span class="placeholder ms-1" style="width: 50px;"></span>
                                        </div>
                                        <div class="mx-2">
                                            •
                                        </div>
                                        <div class="d-flex align-items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tags" viewBox="0 0 16 16">
                                                <path d="M3 2v4.586l7 7L14.586 9l-7-7H3zM2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2z"/>
                                                <path d="M5.5 5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm0 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM1 7.086a1 1 0 0 0 .293.707L8.75 15.25l-.043.043a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 0 7.586V3a1 1 0 0 1 1-1v5.086z"/>
                                            </svg>
                                            <span class="placeholder ms-1" style="width: 50px;"></span>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        {/each}
                    </div>
                {/if}
            </div>
            <div class="bottom-part">
                <div class="d-flex flex-row-reverse">
                    <button type="button" class="btn btn-success" title="Add New Tender">
                    <!-- <button type="button" class="btn btn-success" title="Add New Service" data-bs-toggle="modal" data-bs-target="#add-service-modal" on:click={FetchAddableServices}> -->
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                        </svg>
                    </button>

                    <button type="button" class="btn btn-primary me-1" on:click={ShowBids}>
                        Show Bids
                    </button>
                </div>
            </div>
        </div>
    {/if}
</div>

<style lang="scss">
    .tenders-root
    {
        height: 100%;
    }

    .tenders
    {
        height: 100%;
    }

    .top-part
    {
        height: 5%;
    }

    .middle-part
    {
        height: 89%;
        overflow-y: auto;
    }

    .bottom-part
    {
        height: 6%;
    }

    .tender-details
    {
        margin: 0;
    }

    .all-bids
    {
        height: 100%;
    }

    .all-bids-title
    {
        height: 5%;
    }

    .all-bids-list
    {
        height: 95%;
        overflow-y: auto;
    }
</style>