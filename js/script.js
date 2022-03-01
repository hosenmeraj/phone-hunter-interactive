const loadPhone = () => {
    const error = document.getElementById('error');
    const searchFeild = document.getElementById('input-value')
    const searchText = searchFeild.value;
    if (searchText == '') {
        error.innerText = 'Please, write a product name';
        searchFeild.value = '';
    } else {
        fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
            .then(response => response.json())
            .then(data => console.log(data.data))
    }

}