<script lang="ts">
    import Provider from "../service/provider.svelte";

    export let serviceId: number;
    let discountValue: number;

    function SetDiscount(): void
    {
        let requestBody =
        {
            serviceid: serviceId,
            discount: discountValue
        }

        fetch("/api/provider/service/modify_discount",
        {
            method: "POST",
            headers:
            {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        }).then(async (response: Response): Promise<void> =>
        {
            let responseObject = await response.json();

            console.log(responseObject);
        });
    }
</script>

<label for="new-discount-input" class="form-label">New Discount</label>
<div class="input-group">
    <input type="number" id="new-discount-input" class="form-control" placeholder="Discount Value" bind:value={discountValue}>
    <button class="btn btn-secondary" type="button" on:click={SetDiscount}>Confirm</button>
</div>