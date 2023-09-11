<script lang="ts">
    import { fade } from "svelte/transition";
    import type { Provider } from "../../../routes/service/[service_id]/provider";
    import { onMount } from "svelte";
    import LabeledInfoTag from "../dashboard/labeled-info-tag.svelte";

    export let placeholder: boolean = false;
    export let provider: Provider;
    let email: string = "";
    let contact: string = "";
    let address: string = "";
    let img: string = "";
    let detailsReady: boolean = false;

    onMount((): void =>
    {
        if(placeholder)
        {
            return;
        }

        let requestObject =
        {
            pid: provider.id
        };

        fetch("/api/provider/details",
        {
            method: "POST",
            headers:
            {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestObject)
        }).then(async (response: Response): Promise<void> =>
        {
            let responseObject = await response.json();
            email = responseObject.mail;
            address = responseObject.contactaddress;
            contact = responseObject.contactnumber;
            img = responseObject.pfp;
            detailsReady = true;
        });
    });
</script>

<!-- svelte-ignore a11y-invalid-attribute -->
<div class="list-group-item">
    <div class="d-flex align-items-center">
        <div class="flex-fill">
            {#if placeholder}
                <h5 class="mb-3 placeholder-glow">
                    <span class="placeholder col-2"></span>
                </h5>
            {:else}
                <h5 class="mb-3">
                    {provider.name}
                </h5>
            {/if}
            <div class="d-flex align-items-center text-body-secondary placeholder-glow ms-1">
                <div title="Discount" class="d-flex align-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-graph-down-arrow" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M0 0h1v15h15v1H0V0Zm10 11.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 0-1 0v2.6l-3.613-4.417a.5.5 0 0 0-.74-.037L7.06 8.233 3.404 3.206a.5.5 0 0 0-.808.588l4 5.5a.5.5 0 0 0 .758.06l2.609-2.61L13.445 11H10.5a.5.5 0 0 0-.5.5Z"/>
                    </svg>
                    {#if placeholder}
                        <p class="m-0 ms-1">
                            <span class="placeholder" style="width: 50px;"></span>
                        </p>
                    {:else}
                        <p class="m-0 ms-1">
                            {provider.discount}%
                        </p>
                    {/if}
                </div>
                <div class="mx-2">
                    •
                </div>
                <div title="Price" class="d-flex align-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tags" viewBox="0 0 16 16">
                        <path d="M3 2v4.586l7 7L14.586 9l-7-7H3zM2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2z"/>
                        <path d="M5.5 5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm0 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM1 7.086a1 1 0 0 0 .293.707L8.75 15.25l-.043.043a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 0 7.586V3a1 1 0 0 1 1-1v5.086z"/>
                    </svg>
                    {#if placeholder}
                        <p class="m-0 ms-1">
                            <span class="placeholder" style="width: 50px;"></span>
                        </p>
                    {:else}
                        <p class="m-0 ms-1">
                            {provider.cost}৳
                        </p>
                    {/if}
                </div>
                <div class="mx-2">
                    •
                </div>
                <div title="Region" class="d-flex align-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt" viewBox="0 0 16 16">
                        <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"/>
                        <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                    </svg>
                    {#if placeholder}
                        <p class="m-0 ms-1">
                            <span class="placeholder" style="width: 50px;"></span>
                        </p>
                    {:else}
                        <p class="m-0 ms-1" in:fade={{duration: 200}}>
                            {provider.area}
                        </p>
                    {/if}
                </div>
                <div class="mx-2">
                    •
                </div>
                <div title="Rate" class="d-flex align-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                    </svg>
                    {#if placeholder}
                        <p class="m-0 ms-1">
                            <span class="placeholder" style="width: 50px;"></span>
                        </p>
                    {:else}
                        <p class="m-0 ms-1" in:fade={{duration: 200}}>
                            {provider.rate.toFixed(2)}
                        </p>
                    {/if}
                </div>
            </div>
        </div>
        <a type="button" class="link-secondary" href="#" data-bs-toggle="collapse" role="button" data-bs-target="#details-collapse-{provider.id}" aria-expanded="false" aria-controls="details-collapse-{provider.id}">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
            </svg>
        </a>
    </div>
    {#if !placeholder}
        <div class="collapse" id="details-collapse-{provider.id}">
            <div class="card card-body">
                <div class="d-flex" in:fade={{duration: 200}}>
                    {#if detailsReady}
                        <img src="/pfp/provider/{img}" class="profile-picture rounded mb-1" alt="" in:fade={{duration: 200}}>
                    {:else}
                        <div class="placeholder-glow mb-1">
                            <span class="profile-picture-placeholder rounded placeholder"></span>
                        </div>
                    {/if}
                    <div class="flex-fill ms-3">
                        <div class="row">
                            <div class="col">
                                <LabeledInfoTag placeholder={!detailsReady} label="Email" info={email} />
                            </div>
                            <div class="col">
                                <LabeledInfoTag placeholder={!detailsReady} label="Contact" info={contact} />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <LabeledInfoTag placeholder={!detailsReady} label="Address" info={address} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    {/if}
</div>

<style lang="scss">
    .profile-picture
    {
        height: 96px;
        width: 96px;
    }

    .profile-picture-placeholder
    {
        height: 96px;
        width: 96px;
    }
</style>