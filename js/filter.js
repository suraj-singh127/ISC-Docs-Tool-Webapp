let combinations = document.getElementsByClassName('combination');
//Function to toggle and display various elements under different categories
function showMaterial(material) {
    for (i = 0; i < combinations.length; i++) {
        if (combinations[i].innerText == material.innerText) {
            combinations[i].classList.add('active');
        }
        else {
            combinations[i].classList.remove('active');
        }
    }

    let materials = document.querySelectorAll("." + material.innerText);
    let articles = document.getElementsByTagName('article');
    if (material.innerText != 'All') {
        for (i = 0; i < articles.length; i++) {
            articles[i].style.display = 'none';
        }
        for (i = 0; i < materials.length; i++) {
            materials[i].style.display = 'block';
        }
    }
    else{addElement();}

}