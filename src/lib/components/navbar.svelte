<script lang="ts">
    import { Dropdown } from "bootstrap";
    import logo from "$lib/assets/logo.webp";
    import { ConsumerFetchState, ConsumerLoginData } from "$lib/consumer/profile";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";

    export let showSignIn: boolean = true;

    $: fetchState = ConsumerLoginData.fetchState;
    $: username = ConsumerLoginData.username;
    $: pfpPath = ConsumerLoginData.pfpPath;

    onMount((): void =>
    {
        if(fetchState !== ConsumerFetchState.FETCHING)
        {
            return;
        }

        fetch("/api/consumer/info",
        {
            method: "POST",
            headers:
            {
                "Content-Type": "application/json"
            }
        }).then(async (response: Response): Promise<void> =>
        {
            let responseObject = await response.json();

            if(responseObject.errorcode)
            {
                ConsumerLoginData.fetchState = ConsumerFetchState.NOT_LOGGED_IN;
            }
            else
            {
                ConsumerLoginData.username = responseObject._cname;
                ConsumerLoginData.pfpPath = responseObject.pfp;
                ConsumerLoginData.fetchState = ConsumerFetchState.LOGGED_IN;
            }
        });
    });

    function Logout(): void
    {
        fetch("/api/consumer/logout",
        {
            method: "POST",
            headers:
            {
                "Content-Type": "application/json"
            }
        }).then(async (response: Response): Promise<void> =>
        {
            let responseObject = await response.json();

            if(responseObject.logged_out)
            {   
                ConsumerLoginData.fetchState = ConsumerFetchState.FETCHING;

                location.href = "/";
            }
        });
    }
</script>

<nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-toggler" aria-controls="navbar-toggler" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbar-toggler">
            <a class="navbar-brand align-items-center me-auto" href="/">
                <img src={logo} alt="logo" height="28" class="d-inline-block align-text-top">
                Online Utility and Handyman
            </a>
            {#if showSignIn}
                {#if fetchState == ConsumerFetchState.FETCHING}
                    <div class="spinner-border text-primary" role="status" />
                {:else if fetchState == ConsumerFetchState.LOGGED_IN}
                    <div class="dropdown">
                        <!-- svelte-ignore a11y-invalid-attribute -->
                        <a class="" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src={"/pfp/consumer/" + pfpPath} alt="logo" class="pfp img-thumbnail">
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li>
                                <h5 class="dropdown-item">
                                    {username}
                                </h5>
                            </li>
                            <li><hr class="dropdown-divider"></li>
                            <li>
                                <a class="dropdown-item" href="/consumer/dashboard">Dashboard</a>
                            </li>
                            <li>
                                <!-- svelte-ignore a11y-invalid-attribute -->
                                <a class="dropdown-item" href="#" on:click={Logout}>Logout</a>
                            </li>
                        </ul>
                    </div>
                {:else}
                    <a type="button" class="btn btn-dark" href="/consumer/login">Sign In</a>
                {/if}
            {/if}
        </div>
    </div>
</nav>

<style lang="scss">
    .navbar
    {
        height: 6vh;
    }

    .pfp
    {
        height: 40px;
    }
</style>