<script lang="ts">
    import Names from "$lib/components/sigin/signup/name.svelte";
    import Password from "$lib/components/sigin/signup/password.svelte";
    import { fade } from "svelte/transition";
    import bg from "$lib/assets/home-delivery-man.webp"

    let state: number = 0;
    const MAX_STATES: number = 2;
    let stateContainer: HTMLDivElement;

    $: stateContainerHeight = stateContainer?.offsetHeight ?? 0;

    function GoNext(): void
    {
        ++state;
    }

    function GoBack(): void
    {
        --state;
    }

    function SignUp(): void
    {

    }
</script>

<div class="signup-root">
    <div class="bg-image-container" in:fade={{delay: 200, duration: 500}}>
        <img class="bg-image" src={bg} alt="background">
    </div>
    <div class="d-flex flex-column justify-content-center align-items-center" style="height: 100%;">
        <div class="card" style="width: 50ex;">
            <div class="card-body">
                <div class="d-flex align-item-center justify-content-between p-1">
                    <h4 class="card-title mb-3">Sign Up</h4>
                    <a type="button" class="btn-close" href="/"><span /></a>
                </div>
                <div class="p-1" style="height: {stateContainerHeight}px; overflow: hidden; transition: height 300ms ease">
                    {#if state == 0}
                        <div bind:this={stateContainer}>
                            <Names />
                        </div>
                    {:else if state == 1}
                        <div bind:this={stateContainer}>
                            <Password />
                        </div>
                    {/if}
                </div>
            </div>
            <div class="d-flex justify-content-end p-3">
                {#if state > 0}
                    <button type="button" class="btn btn-secondary me-1" on:click={GoBack}>Back</button>
                {/if}

                {#if state == MAX_STATES - 1}
                <button type="button" class="btn btn-primary" on:click={GoNext}>Sign Up</button>
                {:else}
                    <button type="button" class="btn btn-primary" on:click={GoNext}>Next</button>
                {/if}
            </div>
        </div>
    </div>
</div>

<style lang="scss">
    .signup-root
    {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }
    .bg-image-container
    {
        position: absolute;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }
    .bg-image
    {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
</style>