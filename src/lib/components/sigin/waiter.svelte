<script lang="ts">
    export let messege: string;
</script>

<div class="login-waiter-root">
    <div class="d-flex justify-content-between align-items-center">
        {messege}
        <div class="spinner-border text-primary" role="status" />
    </div>
    <span class="p-2"></span>
</div>