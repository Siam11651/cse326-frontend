<script lang="ts">
    import { fade } from "svelte/transition";
    import type { Service } from "../../../routes/provider/dashboard/service";

    export let services: Service[];
</script>

<div class="services-root flex-fill d-flex flex-column justify-content-between" in:fade={{duration: 200}}>
    <h4 class="header">Services:</h4>
    <div class="services-list">
        <div class="list-group">
            {#each services as service}
                <div class="list-group-item">
                    <div class="d-flex align-items-center">
                        <div class="flex-grow-1 d-flex justify-content-between align-items-center">
                            <div class="m-1">
                                <a href="/" class="link-primary link-offset-1 link-underline-opacity-0">
                                    <h5>
                                        {service.title}
                                    </h5>
                                </a>
                                <p class="service-details text-body-secondary">
                                    {service.description}
                                </p>
                            </div>
                        </div>
                        <!-- svelte-ignore a11y-invalid-attribute -->
                        <a class="link-secondary" href="javascript:" title="More Options" data-bs-toggle="collapse" data-bs-target="#service-options-{service.id}" aria-expanded="false" aria-controls="service-options-{service.id}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                            </svg>
                        </a>
                    </div>
                    <div class="collapse" id="service-options-{service.id}">
                        <div class="card card-body d-flex flex-row-reverse">
                            <!-- svelte-ignore a11y-invalid-attribute -->
                            <a class="link-danger" href="javascript:" title="Delete Service">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                                </svg>
                            </a>
                            <!-- svelte-ignore a11y-invalid-attribute -->
                            <a class="link-secondary me-3" href="javascript:" title="Edit Service">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
    <div class="d-flex flex-row-reverse mt-3">
        <button type="button" class="btn btn-success" title="Add New Service">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
            </svg>
        </button>
    </div>
</div>

<style lang="scss">
    .services-root
    {
        max-height: 100%;
    }

    .services-list
    {
        overflow-y: auto;
    }

    .service-details
    {
        margin: 0;
    }
</style>