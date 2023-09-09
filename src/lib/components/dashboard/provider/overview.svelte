<script lang="ts">
    import { fade } from "svelte/transition";
    import LabeledInfoTag from "../labeled-info-tag.svelte";
    import type { PersonalInfo } from "../../../../routes/provider/dashboard/personal-info";

    export let placeholder: boolean = false;
    export let personalInfo: PersonalInfo;
</script>

<div class="overview-root" in:fade={{duration: 200}}>
    <div class="card mb-2">
        <div class="card-body">
            <h4>Personal Data:</h4>
            <div class="row">
                <div class="col">
                    <LabeledInfoTag placeholder={placeholder} label="Email" info={personalInfo.email} />
                </div>
                <div class="col">
                    <LabeledInfoTag placeholder={placeholder} label="Contact" info={personalInfo.contact} />
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <LabeledInfoTag placeholder={placeholder} label="NID Number" info={personalInfo.nidNumber} />
                </div>
                <div class="col">
                    <LabeledInfoTag placeholder={placeholder} label="Region" info={personalInfo.region} />
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <LabeledInfoTag placeholder={placeholder} label="Contact Address" info={personalInfo.fullAddress} />
                </div>
            </div>
        </div>
        <div class="d-flex flex-row-reverse me-3 mb-3">
            <!-- svelte-ignore a11y-invalid-attribute -->
            <a class="link-primary" href="javascript:" title="Edit Info">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                </svg>
            </a>
        </div>
    </div>
    
    <div class="card">
        <div class="card-body">
            <h4>Activities:</h4>
            <div class="row">
                <div class="col">
                    <LabeledInfoTag placeholder={placeholder} label="Services Completed" info={"420"} />
                </div>
                <div class="col">
                    <LabeledInfoTag placeholder={placeholder} label="Rate" info={personalInfo.rate} />
                </div>
            </div>
        </div>
    </div>
</div>