
//Adding all the materials on refresh
addElement();

document.getElementById('showButtons').addEventListener('click',(e)=>{
    document.querySelector('.buttonsContainer').classList.toggle('showAddandDelete');
});

function showMaterialForm() {
    document.querySelector('.materialFormContainer').classList.toggle('showForm');
    document.getElementById('materialForm').reset();
}

//Creating a material object using ES6 classes
class material {
    constructor(materialName, subjectName, subjectCode, semester, gDriveUrl, materialType) {
        this.materialName = materialName;
        this.subjectName = subjectName;
        this.subjectCode = subjectCode;
        this.semester = semester;
        this.gDriveUrl = gDriveUrl;
        this.materialType = materialType;
    };

    //Validation is pending
    validate(material) {
        return true;
    };
}


//Creating a display object to add and display items in UI
function Display() {

}

Display.prototype.clear = function () {
    let createMaterial = document.getElementById('materialForm');
    createMaterial.reset();
}

//A prototype of display object to display message that our section has been added
Display.prototype.show = function (command, showMessage) {
    let html = "";
    html = `
            <div class="warning${command}">
                <span>${showMessage}</span>
                <button id="closeMessage">&#10006;</button>
            </div>
            `;

    message.innerHTML += html;
    setTimeout(() => {
        message.innerHTML = "";
    }, 2000);
}

//Function to check the local storage
function checkLocalStorage() {
    let materialLocal = localStorage.getItem('materials');
    if (materialLocal == null) {
        materialsLocalObj = [];
    }
    else {
        materialsLocalObj = JSON.parse(materialLocal);
    }
    return materialsLocalObj;
}

//A function to dynmically generate elements in the DOM
function createHtml(materialsLocalObj, type) {
    let html = '';
    materialsLocalObj.forEach(function (material, index) {
        //Creating the material article using backticks literal property
        if (material.materialType == type) {
            html += `<article class="material-container ${material.subjectName}">
         <button class="deleteMaterial" id="${index}" onclick="deleteMaterial(this.id)">Delete Material</button>
         <a href="${material.gDriveUrl}" class="thumbnail" target="_blank">
               <img class="thumbnail-image" src="img/${type}.jpg" alt="">
            </a>
            <div class="material-bottom-section">
                <a href="${material.gDriveUrl}" target="_blank">
                    <img class="section-icon" src="img/downloadIcon.jpg" />
                </a>
            <div class="material-details">
                <a href="#" class="material-title">${material.materialName}</a>
                <a href="#" class="material-combination-name">${material.subjectName}</a>
                <div class="material-meta">
                    <span>Sem - ${material.semester}</span>
                    •
                    <span>Sub-code - ${material.subjectCode}</span>
                </div>
            </div>
        </div>
    </article>`
        }
    });
    return html;
}

//Function to replace the existing element with a new element
function createAndReplace(id,toBeReplacedId,html) {
    let section = document.createElement('div');
    section.className = 'materialDiv';
    section.id = id;
    section.innerHTML = html;
    let lastChild = document.getElementById(toBeReplacedId).lastElementChild;
    document.getElementById(toBeReplacedId).replaceChild(section,lastChild);
}

//Function to add elements to the DOM
function addElement() {
    let materialsLocalObj = checkLocalStorage();
    let materialsArray = ['questionPaper','notes','books','others'];
    for(i = 1;i<5;i++){
        let html = createHtml(materialsLocalObj,materialsArray[i-1]);
        createAndReplace(i,"s"+i,html);
    }
}

//Function to check the type of material being added
function checkTypeOfMaterial() {
    let questionPaper = document.getElementById('questionPaper');
    let notes = document.getElementById('notes');
    let books = document.getElementById('books');
    if (questionPaper.checked) {
        return questionPaper.value;
    }
    else if (notes.checked) {
        return notes.value;
    }
    else if (books.checked) {
        return books.value;
    }
    else {
        return "others";
    }

}

//Function to create materials from the entries submitted from the form
let createMaterial = document.getElementById('materialForm');
createMaterial.addEventListener('submit', materialFormSubmit);

//Function to create materials
function materialFormSubmit(e) {

    e.preventDefault();
    let materialsLocalObj = checkLocalStorage();

    let materialName = document.getElementById('materialName').value;
    let subjectName = document.getElementById('subjectName').value;
    let subjectCode = document.getElementById('subjectCode').value;
    let semester = document.getElementById('semester').value;
    let gDriveUrl = document.getElementById('gDriveUrl').value;


    let typeOfMaterial = checkTypeOfMaterial();
    let newMaterial = new material(materialName, subjectName, subjectCode, semester, gDriveUrl, typeOfMaterial);

    let display = new Display();
    let validation = newMaterial.validate(newMaterial);
    if (validation) {
        display.clear();
        materialsLocalObj.push(newMaterial);
        localStorage.setItem('materials', JSON.stringify(materialsLocalObj));
        addElement();
        display.show(validation, '<strong style="font-size:2rem">Message</strong> - Your section has been added Succesfully.');
    }
    else {
        display.show(validation, '<strong style="font-size:2rem">Message</strong> - Sorry, some of the feilds you entered are wrong.');
    }
    console.log(newMaterial);
}

//Deleting the Materials from the existing ones
let showDeleteButton = document.querySelector('.show-deleteBtn');
showDeleteButton.addEventListener('click', triggerDelete);

function triggerDelete() {
    let deleteButtons = document.querySelectorAll('.deleteMaterial');
    for (i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].classList.toggle('showDeleteButton');
    }
}

//Function to splice a single element from the materials local array
function deleteMaterial(index) {
    let materialsLocalObj = checkLocalStorage();
    //Removing the element from the array
    materialsLocalObj.splice(index, 1);
    localStorage.setItem('materials', JSON.stringify(materialsLocalObj));
    //To show the remaining notes.
    addElement();
}



