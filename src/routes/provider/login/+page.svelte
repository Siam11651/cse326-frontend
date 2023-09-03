<script lang="ts">
    import PageHeader from "$lib/components/page-header.svelte";
    import bg from "$lib/assets/home-delivery-man.webp"
    import { fade } from "svelte/transition";
    import Navbar from "$lib/components/navbar.svelte";
    import Footer from "$lib/components/footer.svelte";

    let infoContainer: HTMLDivElement;

    $: infoContainerHeight = infoContainer?.offsetHeight ?? 0;
</script>

<svelte:head>
    <PageHeader/>
</svelte:head>

<div class="login-root">
    <div class="bg-image-container" in:fade={{delay: 200, duration: 500}}>
        <img class="bg-image" src={bg} alt="background">
    </div>
    <div class="d-flex flex-column justify-content-center align-items-center" style="height: 100%;">
        <div class="card shadow-lg" style="width: 50ex;">
            <div class="card-body">
                <div class="d-flex align-item-center justify-content-between">
                    <h4 class="card-title">Login</h4>
                    <a type="button" class="btn-close" href="/"><span /></a>
                </div>
                <div class="p-1" style="height: {infoContainerHeight}px; overflow: hidden; transition: height 300ms ease">
                    <div class="info-container" bind:this={infoContainer}>
                        <p>
                            Enter login info:
                        </p>
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" id="login-username-input" placeholder="Username">
                            <label for="login-username-input">Username</label>
                        </div>
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" id="login-password-input" placeholder="Password">
                            <label for="login-password-input">Password</label>
                        </div>
                        <div class="d-flex justify-content-end p-2">
                            <a class="link-primary link-offset-1 link-underline-opacity-75 link-underline-opacity-100-hover" href="/provider/signup">Create an Account</a>
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-end p-3">
                    <button type="button" class="btn btn-primary">Login</button>
                </div>
            </div>
        </div>
    </div>
</div>

<style lang="scss">
    .login-root
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