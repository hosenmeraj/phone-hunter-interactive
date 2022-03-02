const error = document.getElementById('error');
const searchPhone = document.getElementById('search-phones')
const phoneDetails = document.getElementById('phone-details')
// spinner
const spinner = displayLoading => {
    document.getElementById('spinner').style.display = displayLoading;
}
const loadPhone = () => {
    const searchFeild = document.getElementById('input-value')
    const searchText = searchFeild.value;

    if (searchText === '') {
        error.innerText = 'Please, write a product name';
        searchFeild.value = '';
        spinner("none")
        searchPhone.textContent = '';

    } else if (isNaN(searchText) === false) {
        error.innerText = 'Product name can not be a Number!';
        searchFeild.value = '';
        spinner("none")
        searchPhone.textContent = '';
    } else {
        fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
            .then(response => response.json())
            .then(data => displayPhone(data.data))
        spinner("block")
        error.textContent = '';
        searchFeild.value = '';
    }
    searchFeild.value = '';


}
const displayPhone = phones => {
    if (phones.length === 0) {
        error.innerText = 'No Product Found!'
        spinner("none")
    } else {
        searchPhone.textContent = '';
        const twentyElement = phones.slice(0, 20)
        for (const phone of twentyElement) {
            // console.log(phone)
            const div = document.createElement('div')
            div.classList.add('col')
            div.innerHTML = `
        <div class="card h-100 rounded shadow"">
        <div class="d-flex justify-content-center p-2">
        <img src="${phone.image}" class="card-img-top img-fluid w-75 rounded" alt="...">
        </div>
        <div class="card-body text-center">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">${phone.brand}</p>
        </div>
        <div class="text-center">
            <button class="btn btn-danger my-3" onclick="loadPhoneDetails('${phone.slug}')">Details</button>
        </div>
        </div>
        `
            searchPhone.appendChild(div)
            spinner("none")
        }
        phoneDetails.textContent = '';
    }
}


const loadPhoneDetails = (phonId) => {
    const url = `https://openapi.programming-hero.com/api/phone/${phonId}`
    fetch(url)
        .then(response => response.json())
        .then(data => displayPhoneDetails(data.data))
    document.getElementById('phone-details').textContent = '';

}
const displayPhoneDetails = (detail) => {
    // console.log(detail);
    phoneDetails.textContent = '';
    const connection = detail.others
    // 
    const other = []
    for (const access in connection) {
        // console.log(access);
        other.push(access, connection[access])

    }
    const sensors = detail.mainFeatures.sensors;
    console.log(sensors);
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    const div = document.createElement('div')
    div.classList.add('row', 'w-100')
    div.innerHTML = `
        <div class="col-md-4 d-flex justy-content-center">
        <img src="${detail.image}" class="card-img-top p-4" alt="...">
        </div>
        <div class="col-md-4">
        <div class="card-body">
            <h5 class="card-title fw-bold mb-3">${detail.name}</h5>
            <h5 class="card-title">${detail.brand}</h5>
            <p class="card-text"><b>Release: </b>${detail.releaseDate ? detail.releaseDate : "No release date found!" }</p>
            <p class="card-text"><b>Chipset: </b>${detail.mainFeatures.chipSet }</p>
            <p class="card-text"><b>Memory: </b>${detail.mainFeatures.memory }</p>
            <p class="card-text"><b>Display: </b>${detail.mainFeatures.displaySize }</p>
            <p class="card-text"><b>Storage: </b>${detail.mainFeatures.storage }</p>   
        </div>
    </div>

        <div class="col-md-4">
        <div class="card-body">
            <h5 class="card-title fw-bold mb-3"></h5>
            <p class="card-text"><b>Sensors: </b>${sensors.join('','')}</p>
            <p class="card-text"><b>WAN: </b>${detail.others ?.WAN? detail.others.WAN : "WAN is not available" }</p>
            <p class="card-text"><b>Bluetooth: </b>${detail.others ?.Bluetooth ? detail.others.Bluetooth  :"Bluetooth  is not available" }</p>
            <p class="card-text"><b>GPS: </b>${detail.others ?.GPS ? detail.others.GPS  :"GPS  is not available" }</p>
            <p class="card-text"><b>NFC: </b>${detail.others ?.NFC ? detail.others.NFC  :"NFC  is not available" }</p>
            <p class="card-text"><b>Radio: </b>${detail.others ?.Radio ? detail.others.Radio  :"Radio  is not available" }</p>
            <p class="card-text"><b>USB: </b>${detail.others ?.USB ? detail.others.USB  :"USB  is not available" }</p>
               
        </div>
    </div>
    
    `
    phoneDetails.appendChild(div)


}