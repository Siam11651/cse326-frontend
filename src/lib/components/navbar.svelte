<script lang="ts">
    import logo from "$lib/assets/logo.webp";
    import AccountButton from "./account-button.svelte";

    export let show_signin: boolean = true;
</script>

<nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
        <a class="navbar-brand align-items-center" href="/">
            <img src={logo} alt="Logo" height="24" class="d-inline-block align-text-top me-1">
            Online Utility and Handyman
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        {#if show_signin}
            <AccountButton/>
        {/if}
    </div>
</nav>