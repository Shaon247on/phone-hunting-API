const loadPhone = async(phoneName='13', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${phoneName}`)
    const data = await res.json()
    const phone = data.data
    displayPhones(phone, isShowAll)
}

const displayPhones = (phone, isShowAll)=>{
    // console.log(phone)

    const phoneContainer =document.getElementById('phone-container')
    // 1.Clear phone container cards before adding new cards
    phoneContainer.textContent=""

    // Display show all button if there are more than 12 phones
    const showAllContainer = document.getElementById('show-all-container')
    if(phone.length > 12 && !isShowAll){
        showAllContainer.classList.remove('hidden')
    }
    else{
        showAllContainer.classList.add('hidden')
    }
    console.log('is show all', isShowAll)
    //display first 12 phones if now show all
    if(!isShowAll){
        phone=phone.slice(0,12)
    }
    
    phone.forEach(element => {
        console.log(element)
        // 2. Create a div
        const phoneCard = document.createElement('div')
        phoneCard.classList = `card bg-gray-100 shadow-xl p-4`
        // 3. Set inner HTML
        phoneCard.innerHTML =`
        <figure><img src="${element.image}"
        alt="Shoes" /></figure>
            <div class="card-body">
                <h2 class="card-title">${element.phone_name
                }</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div class="card-actions justify-center">
                    <button class="btn btn-primary" onclick="handleShowDetails('${element.slug
                    }'); showDetailsModel.showModal()">Show Details</button>
                </div>
            </div>
        `
        // 4. Append chield
        phoneContainer.appendChild(phoneCard)
        //hide loadingSpinner
        toggleLoadingSpinner(false)
    });
}



// handle search button
const handleSearch = (isShowAll) =>{
    toggleLoadingSpinner(true)
    console.log('hoice button tipa')
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value
    console.log(searchText)
    loadPhone(searchText, isShowAll)
}

// Handle search recap 
// const handleSearch2 = () => {
//     toggleLoadingSpinner(true)
//     const searchField = document.getElementById('search2-field')
//     const searchText = searchField.value
//     loadPhone(searchText)
// }

const toggleLoadingSpinner = (isLoading)=> {
    const loadSpinner = document.getElementById('loading-spnnier')
    if(isLoading){
        loadSpinner.classList.remove('hidden')
    }
    else{loadSpinner.classList.add('hidden')}
}

//handle show all
const handleShowAll = ()=> {
    handleSearch(true)
}


const handleShowDetails = async(id)=> {
    console.log('clicked details', id)
    // load particular phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json()
    const phone = data.data
    showPhoneDetails(phone)
}

const showPhoneDetails = (phone) => {
    console.log(phone)

    const phoneName = document.getElementById('phone-name')
    phoneName.innerText = phone.name
    const showDetailsContainer = document.getElementById('show-details-container')
    showDetailsContainer.innerHTML= `
    <img src="${phone.image}" alt="">
    <p><span><strong>Release Date:</strong></span> ${phone.releaseDate}</p>
    <p><span><strong>Memory:</strong></span> ${phone.mainFeatures.memory}</p>
    <p><span><strong>Display Size:</strong></span> ${phone.mainFeatures.displaySize}</p>
    <p><span><strong>Chipset:</strong></span> ${phone.mainFeatures.chipSet}</p>
    <p><span><strong>Storage:</strong></span> ${phone.mainFeatures.storage}</p>
    

    `
    //show the modal
    showDetailsModel.showModal()
}


loadPhone()

