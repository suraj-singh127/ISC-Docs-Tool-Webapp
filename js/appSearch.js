//Searching notes from the existing notes
let searchBtn = document.getElementById('searchBtn');
let search = document.getElementById('searchBar');
searchBar.addEventListener('input', searchMaterial);
searchBtn.addEventListener('click', searchMaterial);

function searchMaterial() {
    let searchBar = document.getElementById('searchBar');
    let keyword = searchBar.value;
    keyword = keyword.toLowerCase();
    let materials = document.getElementsByClassName('material-title');
    Array.from(materials).forEach(function (element) {
        let text = element.innerText;
        text = text.toLowerCase();
        if (!text.includes(keyword)) {
            element.parentElement.parentElement.parentElement.style.display = 'none';
        }
        else {
            element.parentElement.parentElement.parentElement.style.display = 'block';
        }
    });
}