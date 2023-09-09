<script lang="ts">
    import type { Service } from "$lib/service/service";

    export let service: Service;
    export let serviceReady: boolean;
</script>

<h2>Intro</h2>

{#if serviceReady}
    <p class="fs-5 mb-5">
        {service.description}
    </p>
{:else}
    <p class="placeholder-glow fs-5 mb-5">
        <span class="placeholder col-7"></span>
        <span class="placeholder col-4"></span>
        <span class="placeholder col-4"></span>
    </p>
{/if}

<h2>Order Service</h2>
<div class="input-group mb-5">
    <span class="input-group-text">Quantity</span>
    <input type="number" class="form-control" placeholder="0" aria-label="Quantity" min="0">
    <button class="btn btn-outline-secondary" type="button">Checkout</button>
</div>
<h2>FAQ</h2>
<div class="p-3">
    <div class="accordion accordion-flush" id="faq-accordion">
        {#each [...Array(5).keys()] as i}
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse-{i}" aria-expanded="false" aria-controls="flush-collapse-{i}">
                        FAQ #{i + 1}
                    </button>
                </h2>
                <div id="flush-collapse-{i}" class="accordion-collapse collapse" data-bs-parent="#faq-accordion">
                    <div class="accordion-body">
                        Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the second item's accordion body. Let's imagine this being filled with some actual content.
                    </div>
                </div>
            </div>
        {/each}
    </div>
</div>