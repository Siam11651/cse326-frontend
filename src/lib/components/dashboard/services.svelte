<script lang="ts">
    import { fade } from "svelte/transition";
</script>

<div class="services-root flex-fill d-flex flex-column justify-content-between" in:fade={{duration: 200}}>
    <h4 class="header">Services:</h4>
    <div class="services-list">
        <div class="list-group">
            {#each [...Array(15).keys()] as i}
                <div class="d-flex align-items-center list-group-item">
                    <div class="flex-grow-1 d-flex justify-content-between align-items-center">
                        <div class="m-1">
                            <a href="/" class="link-primary link-offset-1 link-underline-opacity-0">
                                <h5>
                                    {Math.random().toString(36).substring(5)}
                                </h5>
                            </a>
                            <p class="service-details text-body-secondary">
                                {Math.random().toString(36).substring(5)}
                            </p>
                        </div>
                    </div>
                    <button type="button" class="btn btn-outline-secondary btn-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                        </svg>
                    </button>
                </div>
            {/each}
        </div>
    </div>
    <div class="d-flex flex-row-reverse mt-3">
        <button type="button" class="btn btn-success">
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