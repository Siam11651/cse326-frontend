<script lang="ts">
    import { fade } from "svelte/transition";
</script>

<div class="overview-root" in:fade={{duration: 200}}>
    <div class="card mb-3">
        <div class="card-body">
            <h4>Personal Data:</h4>
            <div class="row">
                <div class="col">
                    <label for="first-name" class="form-label">First Name</label>
                    <input id="first-name" type="text" class="form-control" aria-label="First name" value={"Abdul"} disabled>
                </div>
                <div class="col">
                    <label for="last-name" class="form-label">Last Name</label>
                    <input id="last-name" type="text" class="form-control" aria-label="Last name" value={"Motin"} disabled>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <label for="date-of-birth" class="form-label">Date of Birth</label>
                    <input id="date-of-birth" type="text" class="form-control" aria-label="Date of Birth" value={"16 October 2011"} disabled>
                </div>
                <div class="col">
                    <label for="gender" class="form-label">Gender</label>
                    <input id="gender" type="text" class="form-control" aria-label="Last name" value={"Female"} disabled>
                </div>
            </div>
        </div>
        <div class="d-flex flex-row-reverse me-3 mb-3">
            <button type="button" class="btn btn-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                </svg>
            </button>
        </div>
    </div>
    
    <div class="card">
        <div class="card-body">
            <h4>Activities:</h4>
            <div class="d-flex">
                <div class="flex-fill ps-3 pe-3">
                    <div class="m-2">
                        Followers: 69420
                    </div>
                </div>
                <div class="flex-fill border-start border-end ps-3 pe-3">
                    <div class="m-2">
                        Services Done: 1234
                    </div>
                </div>
                <div class="flex-fill ps-3 pe-3">
                    <div class="m-2">
                        Average Rate: 4.9
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>