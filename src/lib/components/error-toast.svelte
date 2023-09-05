<script lang="ts">
    import { Toast } from "bootstrap";
    import { onMount } from "svelte";

    let toastElement: HTMLDivElement;
    export let toast: Toast;
    export let header: string;
    export let messege: string;

    onMount(() =>
    {
        toast = new Toast(toastElement);
    });
</script>

<div class="toast text-bg-danger" role="alert" aria-live="assertive" aria-atomic="true" bind:this={toastElement}>
    <div class="toast-header">
        <strong class="me-auto">
            {header}
        </strong>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body">
        {messege}
    </div>
</div>