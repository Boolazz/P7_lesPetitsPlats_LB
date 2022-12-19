//////////// DÉCLARATION DES TABLEAUX FILTRES DROPDOWN

var ingredientsArray = [];
var ustensilsArray = [];
var applianceArray = [];







//////////// FONCTION D'AFFICHAGE DES RECETTES SUR LA PAGE


//Récupération des éléments dans le fichier recipes.js

function receiptsFactory (data) {
    const { name, image, ingredients, time, description, ustensils, appliance } = data


    //Création des divs

        const card = document.createElement('div')
        const img = document.createElement('div')
        const info = document.createElement('div')
        const text = document.createElement('div')
        const title = document.createElement('h2')
        const temps = document.createElement('div')
        const clock = document.createElement('i')
        const duration = document.createElement('p')
        const details = document.createElement('div')
        const ingredientsList = document.createElement('ul')
        const desc = document.createElement('p')


        //Association des classes

        card.classList.add('result__card')

        img.classList.add('result__card--img')
        img.setAttribute('alt', 'image')
        img.setAttribute('src', image)

        info.classList.add('result__card__info')

        text.classList.add('result__card__text')

        title.classList.add('result__card__text--title')
        title.textContent = name

        temps.classList.add('result__card__text--time')

        clock.classList.add('fa-regular')
        clock.classList.add('fa-clock')

        duration.classList.add('result__card__text--time--text')
        duration.textContent = time + 'min'

        details.classList.add('result__card__text--details')


        //Affichage et récupération des ingredients dans les tableaux

        ingredientsList.classList.add('result__card__text--details--ingredients')
        ingredients.forEach(element => {
                const { ingredient, quantity, unit } = element

                ingredientsArray.push(ingredient)

                let ingredientDetails = document.createElement('li')
                ingredientDetails.innerHTML = '<strong>' + ingredient + ': </strong>' 

                if (quantity != undefined) {
                    ingredientDetails.innerHTML += quantity
                }

                if (unit != undefined) {
                    ingredientDetails.innerHTML += ' ' + unit
                }

                ingredientsList.appendChild(ingredientDetails)
        });

        desc.classList.add('result__card__text--details--description')
        desc.textContent = description

        applianceArray.push(appliance)

        ustensils.forEach(element => {
                ustensilsArray.push(element)
        });


        //Hierarchisation des divs

        card.appendChild(img)
        card.appendChild(info)
        info.appendChild(text)
        info.appendChild(details)
        text.appendChild(title)
        text.appendChild(temps)
        temps.appendChild(clock)
        temps.appendChild(duration)
        details.appendChild(ingredientsList)
        details.appendChild(desc)
        
        document.querySelector('.result').appendChild(card)
}


//Aplication de la fonction pour chaques éléments du fichier js

recipes.forEach(element => {
    receiptsFactory (element)
});






////////// UTILISATION DES TABLEAUX DANS LES FILTRES


//Création des tableaux sans doublons

var doublonIngredient = ingredientsArray.filter((x, i) => ingredientsArray.indexOf(x) === i);
var doublonAppliance = applianceArray.filter((x, i) => applianceArray.indexOf(x) === i);
var doublonUstensil = ustensilsArray.filter((x, i) => ustensilsArray.indexOf(x) === i);

// Itération des éléments des tableaux dans une liste

const ingredientsDiv = document.querySelector('.filters__dropdown--listblue')
const ingredientsDisplay = document.createElement('ul')
const appliancesDiv = document.querySelector('.filters__dropdown--listgreen')
const appliancesDisplay = document.createElement('ul')
const ustensilsDiv = document.querySelector('.filters__dropdown--listred')
const ustensilsDisplay = document.createElement('ul')

doublonIngredient.forEach(element => {
    const ingredientsLi = document.createElement('li')
    ingredientsLi.classList.add('filters__dropdown--listblue--ingredients')
    ingredientsLi.textContent = element
    ingredientsDisplay.appendChild(ingredientsLi)
})

ingredientsDisplay.style.display = 'none'
ingredientsDiv.appendChild(ingredientsDisplay)


doublonAppliance.forEach(element => {
    const appliancesLi = document.createElement('li')
    appliancesLi.classList.add('filters__dropdown--listgreen--appliances')
    appliancesLi.textContent = element
    appliancesDisplay.appendChild(appliancesLi)
})

appliancesDiv.style.display = 'none'
appliancesDisplay.style.display = 'none'
appliancesDiv.appendChild(appliancesDisplay)


doublonUstensil.forEach(element => {
    const ustensilsLi = document.createElement('li')
    ustensilsLi.classList.add('filters__dropdown--listred--ustensils')
    ustensilsLi.textContent = element
    ustensilsDisplay.appendChild(ustensilsLi)
})

ustensilsDiv.style.display = 'none'
ustensilsDisplay.style.display = 'none'
ustensilsDiv.appendChild(ustensilsDisplay)



//Eventlistener d'ouverture des dropdown filtres

const filterDropdownIngredients = document.querySelector('.ingredients')
const dropdownTextBlue = document.querySelector('.filters__dropdown--text.blue')
const dropdownArrowBlue = document.querySelector('.filters__dropdown--icon.blue')
const dropdownSearch = document.querySelector('.filters__dropdown--search')
const filterDropdownAppliances = document.querySelector('.appliance')
const dropdownTextGreen = document.querySelector('.filters__dropdown--text.green')
const dropdownArrowGreen = document.querySelector('.filters__dropdown--icon.green')
const filterDropdownUstensils = document.querySelector('.ustensils')
const dropdownTextRed = document.querySelector('.filters__dropdown--text.red')
const dropdownArrowRed = document.querySelector('.filters__dropdown--icon.red')


dropdownArrowBlue.addEventListener("click", function() {

    if (ingredientsDisplay.style.display == 'none'){
        ingredientsDisplay.style.display = 'block'
        dropdownTextBlue.style.display = 'none'
        dropdownArrowBlue.classList.add('filters__dropdown--icon--open')
        dropdownSearch.style.display = 'block'
    }
    else {
        ingredientsDisplay.style.display = 'none'
        dropdownTextBlue.style.display = 'block'
        dropdownArrowBlue.classList.remove('filters__dropdown--icon--open')
        dropdownSearch.style.display = 'none'
    }  
})

dropdownArrowGreen.addEventListener("click", function() {

    if (appliancesDisplay.style.display == 'none'){
        appliancesDiv.style.display = 'block'
        appliancesDisplay.style.display = 'block'
        dropdownTextGreen.style.display = 'none'
        dropdownArrowGreen.classList.add('filters__dropdown--icon--open')
    }
    else {
        appliancesDiv.style.display = 'none'
        appliancesDisplay.style.display = 'none'
        dropdownTextGreen.style.display = 'block'
        dropdownArrowGreen.classList.remove('filters__dropdown--icon--open')
    }  
})

dropdownArrowRed.addEventListener("click", function() {

    if (ustensilsDisplay.style.display == 'none'){
        ustensilsDiv.style.display = 'block'
        ustensilsDisplay.style.display = 'block'
        dropdownTextRed.style.display = 'none'
        dropdownArrowRed.classList.add('filters__dropdown--icon--open')
    }
    else {
        ustensilsDiv.style.display = 'none'
        ustensilsDisplay.style.display = 'none'
        dropdownTextRed.style.display = 'block'
        dropdownArrowRed.classList.remove('filters__dropdown--icon--open')
    }  
})


////////// SÉLECTION DES FILTRES

// Création de l'objet filtres actifs

var activeFilters = {
    ingredients : [],
    ustensils : [],
    appliances : [],
}

// Fonction affichage des filtres

function ingredientsFiltersDisplay() {

    activeFilters.ingredients.forEach(element => {

        const activeFilterContainer = document.querySelector('.filters__active')
        const activeFilter = document.createElement('div')
        const activeFilterContent = document.createElement('div')
        const activeFilterText = document.createElement('p')
        const activeFilterClose = document.createElement('i')
    
        activeFilterContainer.style.display = 'block'
        activeFilter.classList.add('filters__active--box', 'blue')
        activeFilterContent.classList.add('filters__active--content')
        activeFilterText.textContent = element
        activeFilterText.classList.add('filters__active--text')
        activeFilterClose.classList.add('fa-regular', 'fa-circle-xmark')
        
        activeFilterContainer.appendChild(activeFilter)
        activeFilter.appendChild(activeFilterContent)
        activeFilterContent.appendChild(activeFilterText)
        activeFilterContent.appendChild(activeFilterClose)

        activeFilterClose.addEventListener("click", function(event) {
            activeFilters.ingredients = activeFilters.ingredients.filter(ing => ing != element)
            document.querySelector('.filters__active').innerHTML = ''
            ingredientsFiltersDisplay()
            appliancesFiltersDisplay()
            ustensilsFiltersDisplay()
            research()
        })
    })
}

function appliancesFiltersDisplay() {

    activeFilters.appliances.forEach(element => {

        const activeFilterContainer = document.querySelector('.filters__active')
        const activeFilter = document.createElement('div')
        const activeFilterContent = document.createElement('div')
        const activeFilterText = document.createElement('p')
        const activeFilterClose = document.createElement('i')
        
        activeFilterContainer.style.display = 'block'
        activeFilter.classList.add('filters__active--box', 'green')
        activeFilterContent.classList.add('filters__active--content')
        activeFilterText.textContent = element
        activeFilterText.classList.add('filters__active--text')
        activeFilterClose.classList.add('fa-regular', 'fa-circle-xmark')
    
        activeFilterContainer.appendChild(activeFilter)
        activeFilter.appendChild(activeFilterContent)
        activeFilterContent.appendChild(activeFilterText)
        activeFilterContent.appendChild(activeFilterClose)

        activeFilterClose.addEventListener("click", function(event) {
            activeFilters.appliances = activeFilters.appliances.filter(ing => ing != element)
            document.querySelector('.filters__active').innerHTML = ''
            ingredientsFiltersDisplay()
            appliancesFiltersDisplay()
            ustensilsFiltersDisplay()
            research()
        })
    })
}

function ustensilsFiltersDisplay() {

    activeFilters.ustensils.forEach(element => {

        const activeFilterContainer = document.querySelector('.filters__active')
        const activeFilter = document.createElement('div')
        const activeFilterContent = document.createElement('div')
        const activeFilterText = document.createElement('p')
        const activeFilterClose = document.createElement('i')
        
        activeFilterContainer.style.display = 'block'
        activeFilter.classList.add('filters__active--box', 'red')
        activeFilterContent.classList.add('filters__active--content')
        activeFilterText.textContent = element
        activeFilterText.classList.add('filters__active--text')
        activeFilterClose.classList.add('fa-regular', 'fa-circle-xmark')
    
        activeFilterContainer.appendChild(activeFilter)
        activeFilter.appendChild(activeFilterContent)
        activeFilterContent.appendChild(activeFilterText)
        activeFilterContent.appendChild(activeFilterClose)

        activeFilterClose.addEventListener("click", function(event) {
            activeFilters.ustensils = activeFilters.ustensils.filter(ing => ing != element)
            document.querySelector('.filters__active').innerHTML = ''
            ingredientsFiltersDisplay()
            appliancesFiltersDisplay()
            ustensilsFiltersDisplay()
            research()
        })
    })
}



// Ajout des filtres dans les tableaux

const ingredientsLi = document.querySelectorAll('.filters__dropdown--listblue--ingredients')
const ustensilsLi = document.querySelectorAll('.filters__dropdown--listred--ustensils')
const appliancesLi = document.querySelectorAll('.filters__dropdown--listgreen--appliances')

ingredientsLi.forEach(element => {

    element.addEventListener("click", function(event) {

        // Réinitialisation des filtres au clic
        document.querySelector('.filters__active').innerHTML = ''

        if (!activeFilters.ingredients.includes(event.target.textContent))
        activeFilters.ingredients.push(event.target.textContent)

        ingredientsFiltersDisplay()
        appliancesFiltersDisplay()
        ustensilsFiltersDisplay()

        research ();
    })
})

appliancesLi.forEach(element => {

    element.addEventListener("click", function(event) {
        
        // Réinitialisation des filtres au clic
        document.querySelector('.filters__active').innerHTML = ''

        if (!activeFilters.appliances.includes(event.target.textContent))
        activeFilters.appliances.push(event.target.textContent);

        ingredientsFiltersDisplay()
        appliancesFiltersDisplay()
        ustensilsFiltersDisplay()

        research ();
    })
})

ustensilsLi.forEach(element => {

    element.addEventListener("click", function(event) {
        console.log('wesh');

        // Réinitialisation des filtres au clic
        document.querySelector('.filters__active').innerHTML = ''

        if (!activeFilters.ustensils.includes(event.target.textContent))
        activeFilters.ustensils.push(event.target.textContent);

        ingredientsFiltersDisplay()
        appliancesFiltersDisplay()
        ustensilsFiltersDisplay()

        research ();
    })
})

//Recherche des menus et réinitialisation des résultats

function research() {

    let listUpdate = [] 

    recipes.forEach(recette => {
        const ingRecette = recette.ingredients.map(a => a.ingredient)

        if (activeFilters.ingredients.every(e => ingRecette.includes(e))) {
            if (activeFilters.appliances.every(e => recette.appliance.includes(e))) {
                if (activeFilters.ustensils.every(e => recette.ustensils.includes(e))) {
                    listUpdate.push(recette)
                }
            }
        }
    })

    if (document.querySelector('.filters__active').innerHTML == '' )
    document.querySelector('.filters__active').style.display = 'none'

    document.querySelector('.result').innerHTML = ''

    listUpdate.forEach(element => {
        receiptsFactory(element);
    })
}

// Recherche au clavier dans une liste

document.querySelector('.bluesearch').addEventListener('keyup', researchListBlue)
document.querySelector('.bluesearch').addEventListener('keyup', researchListBlue)
document.querySelector('.bluesearch').addEventListener('keyup', researchListBlue)

function researchListBlue(e) {

    let filtersList = document.querySelectorAll('.filters__dropdown--listblue--ingredients')
    let rechercheIng = e.target.value

    filtersList.forEach(tri => {

        if (tri.innerHTML.toLowerCase().includes(rechercheIng.toLowerCase()) || rechercheIng == '') {
            tri.style.display = 'block'
        } else {
            tri.style.display = 'none'
        }
    })
}


    // au click sur un tag, cacher les éléments qui ne son plus concernés

    //formater json + 3xrecherche + mettre de côté les ingredients des recettes affichées ('1 fois chaq) + input dans chaques dropdown