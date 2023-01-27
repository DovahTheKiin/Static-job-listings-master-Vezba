const jobCards = document.querySelector(".job-cards")

fetch("./data.json")
    .then(function (response) {
        return response.json();
    })
    .then(function (jobs) {
    let out = "";
    for (let job of jobs) {
        let languageItems = "";
        let toolItems = "";
            if (job.languages.length > 0) {
              for (let lang of job.languages) {
                  languageItems += `<p class="filter">${lang}</p>`;
            }
         }
         if (job.tools.length > 0) {
            for (let tool of job.tools) {
                toolItems += `<p class="filter">${tool}</p>`;
          }
       }
        out += `
        <div class="job-card" data-id="${job.id}">
            <div class="job-info">
                <img src="${job.logo}" alt="${job.company} Logo" class="logo-img">
                <div class="desktop-flex-div">
                    <div class="cname-new-featured">
                        <p class="company-name">${job.company}</p>
                        <p class="new ${job.new}">NEW!</p>
                        <p class="featured ${job.featured}">FEATURED</p>
                    </div>
                    <h1 class="job-title">${job.position}</h1>
                    <div class="job-details">
                        <ul class="details-list">
                            <li>${job.postedAt}</li>
                            <li>${job.contract}</li>
                            <li>${job.location}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="filters">
                <p class="filter">${job.role}</p>
                <p class="filter">${job.level}</p>
                ${languageItems}
                ${toolItems}
            </div>
        </div>
        `;
    }
    jobCards.innerHTML = out;
    mainScript();
    });

function mainScript() {

    const filterBox = document.querySelector(".filter-box")
    const filtersDiv = document.querySelectorAll(".filter")
    const container = document.querySelector(".container")
    const clearButton = document.querySelector(".clear-btn")
    const newAlert = document.querySelectorAll(".new")
    const featuredAlert = document.querySelectorAll(".featured")
    const jobCard = document.querySelectorAll(".job-card")
    const selectedFilters = document.querySelector(".selected-filters")

    let selectedFiltersArray = [];
    let cardFiltersArray = [];
    const jobCardsArray = [];

    for(let i=0;i<filtersDiv.length;i++) {
        let selectedFilter;
        let filterOut;
        // let filterOutPlus = "";
        let clickCounter = 0;
        filtersDiv[i].addEventListener('click', () => {
            clickCounter = 0;
            filterBox.classList.add('active-flex');
            container.style.top = "-90px";
            selectedFilter = filtersDiv[i].innerHTML;
            filterOut = document.createElement('div');
            filterOut.classList.add('selected-filter-unit');
            filterOut.classList.add('active-filter');
            filterOut.innerHTML = `
            <p class="selected-filter">${selectedFilter}</p>
                <button class="remove-filter"><img src="images/icon-remove.svg" alt="Remove icon"></button>
            `;
            // filterOutPlus = `
            // <div class="selected-filter-unit active-filter">
            //     <p class="selected-filter">${selectedFilter}</p>
            //     <button class="remove-filter"><img src="images/icon-remove.svg" alt="Remove icon"></button>
            // </div>
            // `;
            if(selectedFiltersArray.includes(selectedFilter)) {
                clickCounter = 1;
            }
            if(selectedFilters.innerHTML === "") {
                clickCounter = 0;
                selectedFiltersArray = [];
            }
            if(clickCounter === 0) {
            // selectedFilters.innerHTML = selectedFilters.innerHTML + filterOut;
            selectedFilters.appendChild(filterOut);
            clickCounter = clickCounter + 1;
            selectedFiltersArray.push(selectedFilter);
            } else if (clickCounter > 0) {
                const selectedFilterParagraph = document.querySelector(".selected-filter")
                for(let j=0;j<selectedFilterParagraph.length;j++){
                    if(selectedFilterParagraph[j].innerHTML === selectedFilter) {
                        return;
                    } else {
                        // selectedFilters.innerHTML = selectedFilters.innerHTML + filterOut;
                        selectedFilters.appendChild(filterOut);
                        selectedFiltersArray.push(selectedFilter);
                    }
                }
            }
                cardFilter();
                removeFilterScript();
            })
    }
    let filterCountCount = 0;
    let counter = 0;
    for(let i=0;i<jobCard.length;i++){
        let filterCount = jobCard[i].lastElementChild.childElementCount;
        filterCountCount = filterCountCount + filterCount;
        cardFiltersArray = [];
        for(j=counter;j<filterCountCount;j++){
           cardFiltersArray.push(filtersDiv[j].innerHTML);
        }
        jobCardsArray.push(cardFiltersArray);
        counter = counter + filterCount;
    }
    function removeFilterScript() {
        const removeFilter = document.querySelectorAll(".remove-filter")
        const selectedFilterUnit = document.querySelectorAll(".selected-filter-unit")
        const selectedFilterParagraph = document.querySelectorAll(".selected-filter")

        for(let i=0;i<removeFilter.length;i++) {
            removeFilter[i].addEventListener('click', () => {
                selectedFilters.removeChild(selectedFilterUnit[i]);
                console.log(removeFilter);
                if(selectedFilters.childElementCount == 0) {
                    filterBox.classList.remove('active-flex');
                    container.style.top = "0px";
                }

                let fromIndex = selectedFiltersArray.indexOf(selectedFilterParagraph[i].innerHTML);
                let toIndex = 0;
                let element = selectedFiltersArray.splice(fromIndex, 1)[0];
                selectedFiltersArray.splice(toIndex, 0, element);
                selectedFiltersArray.shift();
                console.log(selectedFiltersArray);
                console.log('works')
                cardFilterSecond();
            })
        }
    };
    function cardFilter() {

        for(let i=0;i<jobCardsArray.length;i++){
            if(!selectedFiltersArray.every(val => jobCardsArray[i].includes(val))){
                console.log(!selectedFiltersArray.every(val => jobCardsArray[i].includes(val)))
                jobCard[i].classList.remove('active')
                jobCard[i].classList.add('hidden')
                // setTimeout(function(){
                //     jobCard[i].classList.add('hidden-final');
                // }, 500);
            }
        }
    };
    function cardFilterSecond() {

        for(let i=0;i<jobCardsArray.length;i++){
            if(selectedFiltersArray.every(val => jobCardsArray[i].includes(val))){
                console.log(!selectedFiltersArray.every(val => jobCardsArray[i].includes(val)))
                if(jobCard[i].classList.contains('hidden')) {
                    jobCard[i].classList.remove('hidden')
                    jobCard[i].classList.add('active')
                }
            }
        }
    }
    console.log(jobCardsArray)
    clearButton.addEventListener('click', () => {
        filterBox.classList.remove('active-flex');
        container.style.top = "0px";
        selectedFilters.innerHTML = "";
        selectedFiltersArray = [];
        for(let i=0;i<jobCard.length;i++){
            if(jobCard[i].classList.contains('hidden')) {
                jobCard[i].classList.remove('hidden');
                jobCard[i].classList.add('active')
            }
        }
        selectedFiltersArray = [];
        console.log(selectedFiltersArray)
    })
    for(let i=0;i<newAlert.length;i++) {
        if (newAlert[i].classList.contains("true")) {
            newAlert[i].classList.add("active-flex");
        }
    }
    for(let i=0;i<featuredAlert.length;i++) {
        if (featuredAlert[i].classList.contains("true")) {
            featuredAlert[i].classList.add("active-flex");
            jobCard[i].style.borderLeft = "5px solid var(--primary-cyan-600)";
        }
    }
}