<script lang="ts">
    import { goto } from "$app/navigation";
    import PageHeader from "$lib/components/page-header.svelte";
    import { Modal } from "bootstrap";
    import { onMount } from "svelte";

    let modalHtmlElement: HTMLElement;
    let pageLoaded: boolean = false;
    let redirect_path: string;

    onMount((): void => 
    {
        if(!pageLoaded)
        {
            let modal: Modal = new Modal(modalHtmlElement);
        
            modal.show();

            modalHtmlElement.addEventListener("hidden.bs.modal", (): void =>
            {
                goto(redirect_path);
            });

            pageLoaded = true;
        }
    });

    function GotoHome(): void
    {
        redirect_path = "/";
    }

    function GotoLogin(): void
    {
        redirect_path = "/login";
    }
</script>

<svelte:head>
    <PageHeader/>
</svelte:head>

<div class="signup-root">
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="false" bind:this={modalHtmlElement}>
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">Sign Up</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" on:click={GotoHome}></button>
            </div>
            <div class="modal-body">
                
            </div>
            <div class="modal-footer">
                <a class="link-primary link-offset-1 link-underline-opacity-75 link-underline-opacity-100-hover me-3" data-bs-dismiss="modal" href="/signup" on:click={GotoLogin}>Login</a>
                <button type="button" class="btn btn-primary">Sign Up</button>
            </div>
            </div>
        </div>
    </div>
</div>