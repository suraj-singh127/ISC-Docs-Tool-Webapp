let navbar = document.querySelector('.navbar');

function myFunction(x) {    
    navbar.classList.toggle('expand');
    x.classList.toggle('change');
    let main = document.getElementsByTagName('main');
    main[0].classList.toggle('sendBack');
    let linkText = document.querySelectorAll('.link-text');
    for(i=0;i<linkText.length;i++){
        linkText[i].classList.toggle('expandLinkText');
    }
}
