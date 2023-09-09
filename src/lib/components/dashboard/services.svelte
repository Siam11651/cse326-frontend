<script lang="ts">
    import { fade } from "svelte/transition";
    import type { Service } from "../../../routes/provider/dashboard/service";
    import type { AddableService } from "../../../routes/provider/dashboard/addable-service";
    import DiscountInput from "./discount-input.svelte";
    import { onMount } from "svelte";

    let services: Service[];
    let servicesReady: boolean = false;
    let showAddableServices: boolean = false;
    let addableServices: AddableService[] = [];
    let addableServicesReady: boolean = false;

    onMount((): void =>
    {
        servicesReady = false;

        FetchServices();
    });

    function ShowAddableServices(): void
    {
        addableServicesReady = false;
        showAddableServices = true;

        FetchAddableServices();
    }

    function HideAddableServices(): void
    {
        showAddableServices = false;
    }

    function FetchServices(): void
    {
        fetch("/api/provider/service/service_list",
        {
            method: "POST",
            headers:
            {
                "Content-Type": "application/json"
            }
        }).then(async (response: Response): Promise<void> =>
        {
            let responseObject = await response.json();

            if(responseObject.errorcode == null)
            {
                services = new Array<Service>(responseObject.length);

                for(let i: number = 0; i < services.length; ++i)
                {
                    services[i] =
                    {
                        id: responseObject[i]._serviceid,
                        title: responseObject[i]._title,
                        description: responseObject[i]._description,
                        price: responseObject[i]._basecost,
                        discount: responseObject[i]._discount,
                    }
                }

                servicesReady = true;
            }
        });
    }

    function FetchAddableServices(): void
    {
        fetch("/api/provider/service/addable_services",
        {
            method: "POST",
            headers:
            {
                "Content-Type": "application/json"
            }
        }).then(async (response: Response): Promise<void> =>
        {
            let responseObject = await response.json();

            addableServices = new Array<AddableService>(responseObject.length);

            for(let i: number = 0; i < addableServices.length; ++i)
            {
                addableServices[i] =
                {
                    id: responseObject[i]._serviceid,
                    title: responseObject[i]._title,
                    handler: ()=>
                    {
                        let requestBody =
                        {
                            given_serviceid: responseObject[i]._serviceid
                        };

                        fetch("/api/provider/add_service_to_provider",
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

                            if(responseObject.data)
                            {
                                servicesReady = false;

                                FetchServices();
                            }
                        });
                    }
                };
            }

            addableServicesReady = true;
        });
    }
</script>

<div class="services-root" in:fade={{duration: 200}}>
    {#if showAddableServices}
        <div class="addable-services" in:fade={{duration: 500}}>
            <h4 class="addable-service-title d-flex align-items-center m-0">
                <!-- svelte-ignore a11y-invalid-attribute -->
                <a class="link-danger me-2" href="#" on:click={HideAddableServices}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                    </svg>
                </a>
                Addable Services
            </h4>
                {#if addableServicesReady}
                    <div class="addable-service-list list-group">
                        {#each addableServices as service}
                            <button class="list-group-item list-group-item-action" data-bs-dismiss="modal" on:click={service.handler}>
                                {service.title}
                            </button>
                        {/each}
                    </div>
                {:else}
                    <div class="addable-service-list list-group">
                        {#each [...Array(15).keys()] as i}
                            <button class="list-group-item list-group-item-action placeholder-glow">
                                <span class="placeholder col-4"></span>
                                <span class="placeholder col-2"></span>
                            </button>
                        {/each}
                    </div>
                {/if}
        </div>
    {:else}
        <div class="services" in:fade={{duration: 500}}>
            <div class="top-part">
                <h4 class="header">Services</h4>
            </div>
            <div class="middle-part mb-2">
                {#if servicesReady}
                    <div class="list-group" in:fade={{duration: 500}}>
                        {#each services as service}
                            <div class="list-group-item">
                                <div class="d-flex align-items-center">
                                    <div class="flex-grow-1 m-1">
                                        <a href="/" class="link-primary link-offset-1 link-underline-opacity-0">
                                            <h5>
                                                {service.title}
                                            </h5>
                                        </a>
                                        <p class="service-details text-body-secondary mb-1">
                                            {service.description}
                                        </p>
                                        <div class="d-flex align-items-center text-body-secondary ms-1">
                                            <div title="Discount" class="d-flex align-items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-graph-down-arrow" viewBox="0 0 16 16">
                                                    <path fill-rule="evenodd" d="M0 0h1v15h15v1H0V0Zm10 11.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 0-1 0v2.6l-3.613-4.417a.5.5 0 0 0-.74-.037L7.06 8.233 3.404 3.206a.5.5 0 0 0-.808.588l4 5.5a.5.5 0 0 0 .758.06l2.609-2.61L13.445 11H10.5a.5.5 0 0 0-.5.5Z"/>
                                                </svg>
                                                <span class="ms-1">
                                                    {service.discount}%
                                                </span>
                                            </div>
                                            <div class="mx-2">
                                                •
                                            </div>
                                            <div title="Total Price" class="d-flex align-items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tags" viewBox="0 0 16 16">
                                                    <path d="M3 2v4.586l7 7L14.586 9l-7-7H3zM2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2z"/>
                                                    <path d="M5.5 5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm0 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM1 7.086a1 1 0 0 0 .293.707L8.75 15.25l-.043.043a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 0 7.586V3a1 1 0 0 1 1-1v5.086z"/>
                                                </svg>
                                                <span class="ms-1">
                                                    {service.price}৳
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- svelte-ignore a11y-invalid-attribute -->
                                    <a class="link-secondary" href="#" title="More Options" data-bs-toggle="collapse" data-bs-target="#service-options-{service.id}" aria-expanded="false" aria-controls="service-options-{service.id}">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                                        </svg>
                                    </a>
                                </div>
                                <div class="collapse" id="service-options-{service.id}">
                                    <div class="card card-body d-flex flex-row-reverse">
                                        <!-- svelte-ignore a11y-invalid-attribute -->
                                        <a class="link-danger" href="#" title="Delete Service">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                                            </svg>
                                        </a>
                                        <!-- svelte-ignore a11y-invalid-attribute -->
                                        <a class="link-secondary me-3" href="#" title="Edit Service" data-bs-toggle="modal" data-bs-target="#edit-service-modal-{service.id}">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                                <div class="modal fade" id="edit-service-modal-{service.id}" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
                                    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                                        <div class="modal-content">
                                            <div class="modal-body">
                                                <div class="d-flex align-item-center justify-content-between p-2">
                                                    <h4 class="card-title">Set Service Discount</h4>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <DiscountInput serviceId={service.id} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        {/each}
                    </div>
                {:else}
                    <div class="list-group">
                        {#each [...Array(4).keys()] as i}
                            <div class="list-group-item">
                                <div class="placeholder-glow m-1">
                                    <a href="/" class="link-primary link-offset-1 link-underline-opacity-0">
                                        <h5>
                                            <span class="placeholder col-4"></span>
                                        </h5>
                                    </a>
                                    <p class="service-details text-body-secondary mb-1">
                                        <span class="placeholder col-7"></span>
                                        <span class="placeholder col-4"></span>
                                        <span class="placeholder col-2"></span>
                                    </p>
                                    <div class="d-flex align-items-center text-body-secondary ms-1">
                                        <div class="d-flex align-items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-graph-down-arrow" viewBox="0 0 16 16">
                                                <path fill-rule="evenodd" d="M0 0h1v15h15v1H0V0Zm10 11.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 0-1 0v2.6l-3.613-4.417a.5.5 0 0 0-.74-.037L7.06 8.233 3.404 3.206a.5.5 0 0 0-.808.588l4 5.5a.5.5 0 0 0 .758.06l2.609-2.61L13.445 11H10.5a.5.5 0 0 0-.5.5Z"/>
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
                            </div>
                        {/each}
                    </div>
                {/if}
            </div>
            <div class="bottom-part">
                <div class="d-flex flex-row-reverse">
                    <button type="button" class="btn btn-success" title="Add New Service" on:click={ShowAddableServices}>
                    <!-- <button type="button" class="btn btn-success" title="Add New Service" data-bs-toggle="modal" data-bs-target="#add-service-modal" on:click={FetchAddableServices}> -->
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    {/if}
</div>

<div class="modal fade" id="add-service-modal" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-body">
                <div class="d-flex align-item-center justify-content-between p-2">
                    <h4 class="card-title">Addable Services</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="list-group">
                    <!-- {#if waitingToAdd}
                        waiting
                    {:else}
                        {#each addableServices as service}
                            <button class="list-group-item list-group-item-action" data-bs-dismiss="modal" on:click={service.handler}>
                                {service.title}
                            </button>
                        {/each}
                    {/if} -->
                </div>
            </div>
        </div>
    </div>
</div>

<style lang="scss">
    .services-root
    {
        height: 100%;
    }

    .services
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

    .service-details
    {
        margin: 0;
    }

    .addable-services
    {
        height: 100%;
    }

    .addable-service-title
    {
        height: 5%;
    }

    .addable-service-list
    {
        height: 95%;
        overflow-y: hidden;
    }
</style>