<script lang="ts">
    import intro1 from "$lib/assets/root/intro-1.jpg";
    import intro2 from "$lib/assets/root/intro-2.jpg";
    import intro3 from "$lib/assets/root/intro-3.jpg";
    import stove from "$lib/assets/root/stove.webp";
    import plumbing from "$lib/assets/root/plumbing.webp";
    import painting from "$lib/assets/root/painting.webp";
    import shifting from "$lib/assets/root/shifting.webp";
    import Navbar from "$lib/components/navbar.svelte";
    import { onMount } from 'svelte';
    import Footer from '$lib/components/footer.svelte';
    import { fade, slide } from 'svelte/transition';
    import type { Recommendation } from './recommendation';
    import { goto } from "$app/navigation";
    import ServiceInfo from "$lib/components/service-info.svelte";

    let chapas: {img: string, header: string, body: string}[] =
    [
        {
            img: intro1,
            header: "Stick to your budget",
            body: "Find the right service for every price point."
        },
        {
            img: intro2,
            header: "Get quality work done quickly",
            body: "Hand your job over to a talented service provider in minutes, get long-lasting results."
        },
        {
            img: intro3,
            header: "Count on 24/7 support",
            body: "Our round-the-clock service providers are available to help anytime, anywhere."
        }
    ];
    let chapaKey = {};
    let chapaIndex: number = 0;
    let chapa: {img: string, header: string, body: string} = chapas[0];
    let searchDFlexElement: HTMLDivElement;
    let searchTerm: string;
    let recommendations: Recommendation[] = [];

    setInterval((): void =>
    {
        chapaIndex = (++chapaIndex) % 3;
        chapa = chapas[chapaIndex];
        chapaKey = {};
    }, 5000);

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
        {#key chapaKey}
            <div class="intro d-flex shadow-lg p-3 mb-5 bg-white rounded">
                <div class="d-flex flex-column align-items-start m-4" in:fade={{duration: 500}}>
                    <img class="intro-image rounded" src={chapa.img} alt="">
                </div>
                <div class="flex-fill d-flex flex-column justify-content-center align-items-start ps-5 ms-5" in:slide={{duration: 500}}>
                    <div class="intro-right">
                        <div class="fs-1">
                            {chapa.header}
                        </div>
                        <div class="fs-5 text-body-secondary">
                            {chapa.body}
                        </div>
                    </div>
                </div>
            </div>
        {/key}
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
    <h1 class="d-flex justify-content-center my-5" in:fade={{duration: 500}}>
        One-stop solution to all your services
    </h1>
    <ServiceInfo imageLeft={false} image={stove} text="Best workmen ensure safe cooking environment." />
    <ServiceInfo imageLeft={true} image={painting} text="We do not provide painters, we provide artists." />
    <ServiceInfo imageLeft={false} image={plumbing} text="Skilled service providers for a stable plumbing facility." />
    <ServiceInfo imageLeft={true} image={shifting} text="Shifting has never been easier." />
    <Footer />
</div>

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