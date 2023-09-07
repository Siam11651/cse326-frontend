<script lang="ts">
    import logo from "$lib/assets/logo.webp";
    import { ConsumerFetchState, ConsumerLoginData } from "$lib/consumer/profile";
    import { onMount } from "svelte";

    $: fetchState = ConsumerLoginData.fetchState;
    $: username = ConsumerLoginData.username;

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
                ConsumerLoginData.username = responseObject.cname;
                ConsumerLoginData.fetchState = ConsumerFetchState.LOGGED_IN;
            }
        });
    });
</script>

<nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
            <a class="navbar-brand align-items-center me-auto" href="/">
                <img src={logo} alt="logo" height="24" class="d-inline-block align-text-top me-1">
                Online Utility and Handyman
            </a>
            {#if fetchState == ConsumerFetchState.FETCHING}
                <div class="spinner-border text-primary" role="status" />
            {:else if fetchState == ConsumerFetchState.LOGGED_IN}
                <div class="dropdown">
                    <button class="btn btn-outline-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {username}
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li>
                            <a class="dropdown-item" href="/consumer/dashboard">Dashboard</a>
                        </li>
                        <li>
                            <!-- svelte-ignore a11y-invalid-attribute -->
                            <a class="dropdown-item" href="#">Logout</a>
                        </li>
                    </ul>
                </div>
            {:else}
                <a type="button" class="btn btn-primary" href="/consumer/login">Sign In</a>
            {/if}
        </div>
    </div>
</nav>

<style lang="scss">
    .navbar
    {
        height: 6%;
    }
</style>