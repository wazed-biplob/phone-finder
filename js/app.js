const loadPhone = async (searchString, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchString}`;

    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}


const displayPhones = (phones, dataLimit) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerHTML = '';
    // no phone

    const noPhone = document.getElementById('no-phone');

    if (!(phones.length)) {
        noPhone.classList.remove('d-none');
    } else {
        noPhone.classList.add('d-none');
    }


    // display fixed numbers of phones
    const showAll = document.getElementById('show-all');

    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);        
        showAll.classList.remove('d-none');
    } else {                
        showAll.classList.add('d-none');
    }


    

    phones.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col', true);
        
        const {image, brand, phone_name, slug} = phone;
        div.innerHTML = `
        
    
        <div class="card p-2">
          <img src="${image}" class="card-img-top" alt="image">
          <div class="card-body">
            <h5 class="card-title">${phone_name}</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <button onclick="loadPhoneDetails('${slug}')" class="btn btn-primary" >Details</button>
          </div>
        </div>
     
        `
        phoneContainer.appendChild(div);
    })
    // stop loader
    toggleLoader(false);
} 

// search button handler
document.getElementById('btn-search').addEventListener('click', (e) => {
    processSearch(10)
})
// search input

document.getElementById('input-search').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
         processSearch(10);
    }
})


// spinner function
const toggleLoader = isLoading => {
    const loader = document.getElementById('loader');
    if (isLoading) {
        loader.classList.remove('d-none');
    } else {
        loader.classList.add('d-none');
    }
}


const processSearch = (dataLimit) => {
        // start loader
        toggleLoader(true);
        // gets search string
        const searchString = document.getElementById('input-search').value;
        loadPhone(searchString, dataLimit);
}

// not the best way


document.getElementById('btn-show-all').addEventListener('click', () => {
    processSearch();
})


const loadPhoneDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;

    const res = await fetch(url);
    const data = await res.json();
    console.log(data.data);

}


