let changeTheme = document.getElementById('pageStyle');
let changeLink = document.getElementById('changeLink');

//Function to swap style sheets to change the color scheme of the document
document.getElementById('changeTheme').addEventListener('click', () => {
    attribute = changeTheme.getAttribute('href');
    if (attribute == "css/darkmode.css") {
        changeTheme.setAttribute("href", "css/styles.css");
        changeLink.firstElementChild.setAttribute('src','img/icon-moon.svg');
    }
    else {
        changeTheme.setAttribute("href", "css/darkmode.css");
        changeLink.firstElementChild.setAttribute('src','img/icon-sun.svg');
    }
});



