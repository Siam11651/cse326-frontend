<script lang="ts">
    import { fade } from "svelte/transition";
    import { onMount } from "svelte";
    import { Bid } from "$lib/tender/bid";
    import BidComponent from "./bid.svelte";

    export let tenderId: number;
    let bidListReady: boolean = false;
    let bidList: Bid[] = [];

    onMount((): void =>
    {
        FetchBidList();
    });

    async function FetchBidList(): Promise<void>
    {
        bidListReady = false;

        let requestObject =
        {
            tender_id: tenderId
        };

        let requestBodyString: string = JSON.stringify(requestObject);

        fetch("/api/tender/tender_bids",
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
            bidList = new Array<Bid>(responseObject.length);

            for(let i: number = 0; i < bidList.length; ++i)
            {
                bidList[i] =
                {
                    id: responseObject[i].bidid,
                    bidTitle: responseObject[i].title,
                    tenderTitle: responseObject[i].tenderid,
                    service: "",
                    description: responseObject[i].description,
                    cost: responseObject[i].estimated_cost,
                    created: responseObject[i].created_at,
                    ends: ""
                }
            }

            bidListReady = true;
        });
    }
</script>

<div class="m-5" in:fade={{duration: 200}}>
    <h2>Available Providers</h2>
    {#if bidListReady}
        <div class="list-group list-group pt-3" in:fade={{duration: 200}}>
            {#each bidList as bid}
                <BidComponent bid={bid} />
            {/each}
        </div>
    {:else}
        <div class="list-group list-group pt-3">
            {#each [...Array(5).keys()] as i}
                <BidComponent placeholder bid={new Bid()} />
            {/each}
        </div>
    {/if}
</div>