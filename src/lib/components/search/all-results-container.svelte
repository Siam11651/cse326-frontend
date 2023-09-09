<script lang="ts">
    import { fade } from "svelte/transition";
</script>

<div class="all-results-container" in:fade={{duration: 200}}>
    <ul class="list-group list-group-flush">
        <slot></slot>
    </ul>
</div>

<style lang="scss">
    .all-results-container
    {
        max-height: 100%;
        overflow-y: auto;
    }
</style>