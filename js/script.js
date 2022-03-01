const loadPhone = () => {
    const error = document.getElementById('error');
    const searchFeild = document.getElementById('input-value')
    const searchText = searchFeild.value;
    if (searchText === '') {
        error.innerText = 'Please, write a product name';
        searchFeild.value = '';

    } else {
        fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
            .then(response => response.json())
            .then(data => displayPhone(data.data))
    }

}
const displayPhone = phones => {
    const searchPhone = document.getElementById('search-phones')
    const twentyElement = phones.slice(0, 20)
    for (const phone of twentyElement) {
        console.log(phone)
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = `
        <div class="card h-100">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">${phone.brand}</p>
        </div>
        <div class="text-center">
            <button class="btn btn-danger my-3">Details</button>
        </div>
        </div>
        `
        searchPhone.appendChild(div)
    }
}