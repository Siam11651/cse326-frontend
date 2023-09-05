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
    import { onMount } from 'svelte';
    import { Collapse } from 'bootstrap';
    import Footer from '$lib/components/footer.svelte';
    import { fade } from 'svelte/transition';
    import type { Recommendation } from './Recommendation';
    import { json } from '@sveltejs/kit';

    let searchTerm: string;
    let searchDFlexElement: HTMLDivElement;
    let searchRecommendationCollapseElement: HTMLDivElement;
    let searchRecommendationCollapse: Collapse;
    let recommendationArrived: boolean = false;
    let recommendations: Recommendation[] = [];

    onMount((): void =>
    {
        searchRecommendationCollapse = new Collapse(searchRecommendationCollapseElement,
        {
            toggle: false
        });
    });

    function StartSearch(): void
    {
        searchDFlexElement.scrollIntoView();
    }

    function SearchInputUpdate(event: Event): void
    {
        if(searchTerm.length == 0)
        {
            searchRecommendationCollapse.hide();
        }
        else
        {
            recommendationArrived = false;
            searchRecommendationCollapse.show();

            let requestObject = 
            {
                recommendation: true,
                search_term: searchTerm
            };

            let requestBodyString = JSON.stringify(requestObject);

            fetch("/api/search",
            {
                method: "POST",
                headers:
                {
                    "Content-Type": "application/json"
                },
                body: requestBodyString
            }).then(async (response: Response): Promise<void> =>
            {
                recommendationArrived = true;
                let responseObject = await response.json();
                recommendations = new Array<Recommendation>(5);

                for(let i: number = 0; i < 5; ++i)
                {
                    recommendations[i] =
                    {
                        title: responseObject[i].title,
                        href: "/service/" + responseObject[i].serviceid
                    }
                }
            });
        }
    }
</script>

<svelte:head>
    <PageHeader/>
</svelte:head>

<Navbar/>

<div class="home-root">
    <div class="d-flex flex-column align-items-center">
        <div class="home-image-container mt-5">
            <img src={handyman} class="home-image rounded" alt="handyman" in:fade={{duration: 500}}>
            <div class="home-image-content">
                <p class="home-image-heading fw-semibold fs-1">One-stop solution to all your services</p>
                <div class="d-flex align-items-center">
                    <button type="button" class="btn btn-outline-light me-3">Checkout Services</button>
                    <a class="link-light link-offset-1 link-underline-opacity-75 link-underline-opacity-100-hover" href="/">Learn More</a>
                </div>
            </div>
        </div>
    </div>
    <div class="ps-3 pe-3 mt-5">
        <div class="d-flex" bind:this={searchDFlexElement}>
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Search Service" aria-label="Search Service" aria-describedby="search-service-button" bind:value={searchTerm} on:click={StartSearch} on:input={SearchInputUpdate}>
                <a class="btn btn-secondary" type="button" id="search-service-button">Search</a>
            </div>
        </div>
        <div class="collapse" id="search-recommendation-collapse" bind:this={searchRecommendationCollapseElement}>
            {#if recommendationArrived}
                <div class="list-group">
                    {#each recommendations as {title, href}}
                        <a type="button" class="list-group-item list-group-item-action placeholder-wave" href={href}>{title}</a>
                    {/each}
                </div>
            {:else}
                <div class="list-group">
                    {#each [...Array(5).keys()] as i}
                        <!-- svelte-ignore a11y-missing-attribute -->
                        <a type="button" class="list-group-item list-group-item-action placeholder-wave"><span class="placeholder col-4"></span></a>
                    {/each}
                </div>
            {/if}
        </div>
    </div>
    <div class="mt-1">
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

<Footer />

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
        overflow-x: auto;
    }
</style>