const loadPhone = async(phoneName) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${phoneName}`)
    const data = await res.json()
    const phone = data.data
    displayPhones(phone)
}

const displayPhones = (phone)=>{
    // console.log(phone)

    const phoneContainer =document.getElementById('phone-container')
    // 1.Clear phone container cards before adding new cards
    phoneContainer.textContent=""

    // Display show all button if there are more than 12 phones
    const showAllContainer = document.getElementById('show-all-container')
    if(phone.length > 12){
        showAllContainer.classList.remove('hidden')
    }
    else{
        showAllContainer.classList.add('hidden')
    }

    //display first 12 phones
    phone=phone.slice(0,12)
    
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
                <div class="card-actions justify-end">
                    <button class="btn btn-primary">Buy Now</button>
                </div>
            </div>
        `
        // 4. Append chield
        phoneContainer.appendChild(phoneCard)
    });
}



// handle search button
const handleSearch = () =>{
    toggleLoadingSpinner()
    console.log('hoice button tipa')
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value
    console.log(searchText)
    loadPhone(searchText)
}

// Handle search recap 
const handleSearch2 = () => {
    toggleLoadingSpinner(true)
    const searchField = document.getElementById('search2-field')
    const searchText = searchField.value
    loadPhone(searchText)
}

const toggleLoadingSpinner = (isLoading)=> {
    const loadSpinner = document.getElementById('loading-spnnier')
    if(isLoading){
        loadSpinner.classList.remove('hidden')
    }
}


// loadPhone()

