<script lang="ts">
    import Navbar from "$lib/components/navbar.svelte";
    import ServiceCard from "$lib/components/service-card.svelte";
    import handyman from "$lib/assets/handyman.webp";
    import stove from "$lib/assets/stove.webp"
    import plumbing from "$lib/assets/plumbing.webp"
    import painting from "$lib/assets/painting.webp"
    import cleaning from "$lib/assets/cleaning.webp"
    import shifting from "$lib/assets/shifting.webp"
    import { onMount } from 'svelte';
    import Footer from '$lib/components/footer.svelte';
    import { fade, slide } from 'svelte/transition';
    import type { Recommendation } from './recommendation';
    import { goto } from "$app/navigation";
    import ServiceInfo from "$lib/components/service-info.svelte";

    let searchDFlexElement: HTMLDivElement;
    let searchTerm: string;
    let recommendations: Recommendation[] = [];

    onMount((): void =>
    {
        let consumerAuth: string | null = window.localStorage.getItem("consumer_auth");

        if(consumerAuth === null)
        {
            return;
        }
    });

    function StartSearch(): void
    {
        searchDFlexElement.scrollIntoView(
            {
                behavior: "smooth"
            }
        );
    }

    function ShowRecommendations(): void
    {
        if(searchTerm == null || searchTerm.length == 0)
        {
            recommendations = [];
        }
        else
        {
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
                let responseObject = await response.json();
                recommendations = new Array<Recommendation>(responseObject.length);

                for(let i: number = 0; i < recommendations.length && i < 5; ++i)
                {
                    recommendations[i] =
                    {
                        title: responseObject[i].s_title,
                        href: "/service/" + responseObject[i].s_serviceid
                    }
                }
            });
        }
    }

    function OnSearchFocus()
    {
        ShowRecommendations();
    }

    function OnSearchBlur(): void
    {
        recommendations = [];
    }

    function SearchInputUpdate(): void
    {   
        ShowRecommendations();
    }

    function Search(): void
    {
        if(searchTerm && searchTerm.length > 0)
        {
            goto("/search?" + encodeURI("q=" + searchTerm));
        }
    }
</script>

<Navbar />

<div class="home-root">
    <div class="intro-container">
        <div class="intro d-flex shadow-lg p-3 mb-5 bg-white rounded">
            <div class="d-flex flex-column align-items-start m-4">
                <img class="intro-image rounded" src="/root/intro-2.jpg" alt="">
            </div>
            <div class="flex-fill d-flex flex-column justify-content-center align-items-start ms-5">
                <div class="intro-right">
                    <div class="fs-1">
                        Get quality work done quickly
                    </div>
                    <div class="fs-5 text-body-secondary">
                        Hand your project over to a talented freelancer in minutes, get long-lasting results.
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="search-box mb-2" on:focus={OnSearchFocus} on:blur={OnSearchBlur}>
        <div class="d-flex pt-2" bind:this={searchDFlexElement}>
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Search Service" aria-label="Search Service" aria-describedby="search-service-button" bind:value={searchTerm} on:click={StartSearch} on:input={SearchInputUpdate}>
                <button class="btn btn-secondary" type="button" on:click={Search}>Search</button>
            </div>
        </div>
        <div class="list-group">
            {#each recommendations as {title, href}}
                <a type="button" class="list-group-item list-group-item-action" href={href} transition:slide={{duration: 500, axis: "y"}}>{title}</a>
            {/each}
        </div>
    </div>
    <h1 class="d-flex justify-content-center my-5">
        One-stop solution to all your services
    </h1>
    <ServiceInfo imageLeft={false} image="stove" />
    <ServiceInfo imageLeft={true} image="painting" />
    <ServiceInfo imageLeft={false} image="plumbing" />
    <ServiceInfo imageLeft={true} image="shifting" />
    <Footer />
</div>

<!-- <div class="home-root">
    <div class="d-flex flex-column align-items-center">
        <div class="home-image-container mt-5">
            <img src={handyman} class="home-image rounded" alt="handyman" in:fade={{duration: 200}}>
            <div class="home-image-content">
                <p class="home-image-heading fw-semibold fs-1">One-stop solution to all your services</p>
                <div class="d-flex align-items-center">
                    <button type="button" class="btn btn-outline-light me-3">Checkout Services</button>
                    <a class="link-light link-offset-1 link-underline-opacity-75 link-underline-opacity-100-hover" href="/">Learn More</a>
                </div>
            </div>
        </div>
    </div>
    <div class="ps-3 pe-3 mt-5" on:focus={OnSearchFocus} on:blur={OnSearchBlur}>
        <div class="d-flex" bind:this={searchDFlexElement}>
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Search Service" aria-label="Search Service" aria-describedby="search-service-button" bind:value={searchTerm} on:click={StartSearch} on:input={SearchInputUpdate}>
                <button class="btn btn-secondary" type="button" on:click={Search}>Search</button>
            </div>
        </div>
        <div class="list-group">
            {#each recommendations as {title, href}}
                <a type="button" class="list-group-item list-group-item-action" href={href} transition:slide={{duration: 500, axis: "y"}}>{title}</a>
            {/each}
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
</div> -->

<style lang="scss">
    .home-root
    {
        position: absolute;
        top: 6vh;
        bottom: 0;
        left: 0;
        right: 0;
        overflow-y: auto;
    }

    .intro-container
    {
        height: 90%;
        padding-top: 5vh;
        padding-bottom: 5vh;
        padding-left: 15%;
        padding-right: 15%;
    }

    .intro
    {
        height: 100%;
    }

    .intro-image
    {
        height: 100%;
    }

    .intro-right
    {
        width: 50%;
    }

    .search-box
    {
        padding-left: 15%;
        padding-right: 15%;
    }
</style>