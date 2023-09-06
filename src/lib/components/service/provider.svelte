<script lang="ts">
    import Tag from "./tag.svelte";

    export let id: number;
</script>

<a class="list-group-item list-group-item-action" href="/provider/{id}?service={69 + id}">
    <h5>Kuddus Miah {id}</h5>
    <div class="d-flex flex-row-reverse">
        
    </div>
</a>