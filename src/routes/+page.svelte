<script lang="ts">
    import PageHeader from '$lib/components/page-header.svelte'
    import Navbar from "$lib/components/navbar.svelte";
    import ServiceCard from "$lib/components/service-card.svelte";
    import handyman from "$lib/assets/handyman.webp";
    import stove from "$lib/assets/stove.webp"
    import plumbing from "$lib/assets/plumbing.webp"
    import painting from "$lib/assets/painting.webp"
    import cleaning from "$lib/assets/cleaning.webp"
    import shifting from "$lib/assets/shifting.webp"
</script>

<svelte:head>
    <PageHeader/>
</svelte:head>

<Navbar/>

<div class="home-root">
    <div class="home-image-container mt-5">
        <img src={handyman} class="home-image rounded" alt="Handyman">
        <div class="home-image-content">
            <p class="home-image-heading fw-semibold fs-1">One-stop solution to all your services</p>
            <div class="d-flex align-items-center">
                <button type="button" class="btn btn-outline-light me-3">Checkout Services</button>
                <a class="link-light link-offset-1 link-underline-opacity-75 link-underline-opacity-100-hover" href="/">Learn More</a>
            </div>
        </div>
    </div>
    <div class="mt-5">
        <p class="fs-3 mb-1">For your home</p>
        <div class="home-services-list d-flex">
            <ServiceCard imageSrc={stove} serviceText={"Stove Services"}/>
            <ServiceCard imageSrc={plumbing} serviceText={"Plumbing Services"}/>
            <ServiceCard imageSrc={painting} serviceText={"Painting Services"}/>
            <ServiceCard imageSrc={cleaning} serviceText={"Cleaning Services"}/>
            <ServiceCard imageSrc={shifting} serviceText={"Shifting Services"}/>
        </div>
    </div>
</div>

<style lang="scss">
    .home-root
    {
        margin: auto;
        width: 70%;
    }

    .home-image-container
    {
        position: relative;
        // width: 100%;
    }

    .home-image
    {
        max-width: 100%;
    }

    .home-image-content
    {
        position: absolute;
        left: 5%;
        bottom: 5%;
    }

    .home-image-heading
    {
        width: 70%;
        color: white;
    }

    .home-services-list
    {
        // max-width: 100%;
        overflow-x: auto;
    }
</style>