<script lang="ts">
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";

    export let placeholder: boolean = false;
    export let parentServiceId: number;
    export let name: string;
    let servicesReady: boolean = false;
    let services: {id: number, name: string}[] = [];

    onMount((): void =>
    {
        if(placeholder)
        {
            return;
        }

        let requestBody =
        {
            id: parentServiceId
        }

        fetch("/api/primary_services/get_pservice_services",
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

            services = new Array<{id: number, name: string}>(responseObject.length);

            for(let i: number = 0; i < services.length; ++i)
            {
                services[i] =
                {
                    id: responseObject[i].serviceid,
                    name: responseObject[i].title
                }
            }

            servicesReady = true;
        });
    });
</script>

<div class="accordion-item">
    <h2 class="accordion-header">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#parent-service-{parentServiceId}" aria-expanded="false" aria-controls="parent-service-{parentServiceId}">
            {#if placeholder}
                <div class="placeholder-glow">
                    <span class="placeholder" style="width: 100px;"></span>
                    <span class="placeholder" style="width: 50px;"></span>
                </div>
            {:else}
                <div>
                    {name}
                </div>
            {/if}
        </button>
    </h2>
    <div id="parent-service-{parentServiceId}" class="accordion-collapse collapse" data-bs-parent="#all-parent-services-accordion">
        <div class="accordion-body p-2">
            {#if servicesReady}
                <ul class="list-group" in:fade={{duration: 200}}>
                    {#each services as {id, name}}
                        <!-- svelte-ignore a11y-invalid-attribute -->
                        <a class="list-group-item list-group-item-action placeholder-glow" href="/service/{id}">
                            {name}
                        </a>
                    {/each}
                </ul>
            {:else}
                <ul class="list-group">
                    {#each [...Array(3).keys()] as i}
                        <!-- svelte-ignore a11y-invalid-attribute -->
                        <a class="list-group-item list-group-item-action placeholder-glow" href="#">
                            <span class="placeholder col-5"></span>
                            <span class="placeholder col-3"></span>
                        </a>
                    {/each}
                </ul>
            {/if}
        </div>
    </div>
</div>