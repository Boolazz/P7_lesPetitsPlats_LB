//////////// DÉCLARATION DES TABLEAUX FILTRES DROPDOWN ////////////

var ingredientsArray = [];
var ustensilsArray = [];
var applianceArray = [];





//////////// FONCTION D'AFFICHAGE DES RECETTES SUR LA PAGE ////////////


// Récupération des éléments dans le fichier recipes.js

function receiptsFactory (data) {
    const { name, image, ingredients, time, description, ustensils, appliance } = data


    // Création des divs necessaires à la création des cards

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


        // Personnalisation des divs

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


        // Affichage et récupération des ingredients dans les tableaux

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


// Création des tableaux sans doublons

function doublonClear (list) {
    return list.filter((x, i) => list.indexOf(x) === i);
}

var doublonIngredient = doublonClear(ingredientsArray)
var doublonAppliance = doublonClear(applianceArray)
var doublonUstensil = doublonClear(ustensilsArray)


function tri(a,b) {
    
        if (a.nom < b.nom) return -1;
        else if (a.nom == b.nom) return 0;
        else return 1;
    
}
    
doublonIngredient = doublonIngredient.sort();
doublonAppliance = doublonAppliance.sort();
doublonUstensil = doublonUstensil.sort();


// Itération des éléments des tableaux dans une liste

    const ingredientsDiv = document.querySelector('.filters__dropdown--listblue')
    const ingredientsDisplay = document.createElement('ul')
    const appliancesDiv = document.querySelector('.filters__dropdown--listgreen')
    const appliancesDisplay = document.createElement('ul')
    const ustensilsDiv = document.querySelector('.filters__dropdown--listred')
    const ustensilsDisplay = document.createElement('ul')

function recupFilters() {

    ingredientsDisplay.innerHTML = ''
    appliancesDisplay.innerHTML = ''
    ustensilsDisplay.innerHTML = ''


    doublonIngredient.forEach(element => { //pour chaque éléments 
        const ingredientsLi = document.createElement('li') //je crée un élément li
        ingredientsLi.classList.add('filters__dropdown--listblue--ingredients') //je lui assigne une classe
        ingredientsLi.textContent = element //je lui donnes le contenu
        ingredientsDisplay.appendChild(ingredientsLi) //je hierarchise

        ingredientsLi.addEventListener("click", function(event) {
    
            document.querySelector('.filters__active').innerHTML = '' // Réinitialisation des filtres au clic
    
            if (!activeFilters.ingredients.includes(event.target.textContent)) // J'ajoute chaques recette qui contient l'élément sélectionné
            activeFilters.ingredients.push(event.target.textContent) // puis je l'ajoute au tableau des recettes 
    
            ingredientsFiltersDisplay()
            appliancesFiltersDisplay()
            ustensilsFiltersDisplay()
    
            research ();
        })
    })

    ingredientsDisplay.style.display = 'none' // état initial
    ingredientsDiv.appendChild(ingredientsDisplay)


    doublonAppliance.forEach(element => {
        const appliancesLi = document.createElement('li')
        appliancesLi.classList.add('filters__dropdown--listgreen--appliances')
        appliancesLi.textContent = element
        appliancesDisplay.appendChild(appliancesLi)

        appliancesLi.addEventListener("click", function(event) {
    
            document.querySelector('.filters__active').innerHTML = '' // Réinitialisation des filtres au clic
    
            if (!activeFilters.appliances.includes(event.target.textContent)) // J'ajoute chaques recette qui contient l'élément sélectionné
            activeFilters.appliances.push(event.target.textContent) // puis je l'ajoute au tableau des recettes 
    
            ingredientsFiltersDisplay()
            appliancesFiltersDisplay()
            ustensilsFiltersDisplay()
    
            research ();
        })
    })

    appliancesDiv.style.display = 'none'
    appliancesDisplay.style.display = 'none'
    appliancesDiv.appendChild(appliancesDisplay)


    doublonUstensil.forEach(element => {
        const ustensilsLi = document.createElement('li')
        ustensilsLi.classList.add('filters__dropdown--listred--ustensils')
        ustensilsLi.textContent = element
        ustensilsDisplay.appendChild(ustensilsLi)

        ustensilsLi.addEventListener("click", function(event) {
    
            document.querySelector('.filters__active').innerHTML = '' // Réinitialisation des filtres au clic
    
            if (!activeFilters.ustensils.includes(event.target.textContent)) // J'ajoute chaques recette qui contient l'élément sélectionné
            activeFilters.ustensils.push(event.target.textContent) // puis je l'ajoute au tableau des recettes 
    
            ingredientsFiltersDisplay()
            appliancesFiltersDisplay()
            ustensilsFiltersDisplay()
    
            research ();
        })
    })

    ustensilsDiv.style.display = 'none'
    ustensilsDisplay.style.display = 'none'
    ustensilsDiv.appendChild(ustensilsDisplay)

}

recupFilters();




//////////// EVENTLISTENER D'OUVERTURE DES DROPDOWNS FILTRES ////////////


// Déclaration des éléments du DOM

const filterDropdownIngredients = document.querySelector('.ingredients')
const dropdownTextBlue = document.querySelector('.filters__dropdown--text.blue')
const dropdownArrowBlue = document.querySelector('.filters__dropdown--icon.blue')
const dropdownSearchIng = document.querySelector('.filters__dropdown--search.bluesearch')
const filterDropdownAppliances = document.querySelector('.appliance')
const dropdownTextGreen = document.querySelector('.filters__dropdown--text.green')
const dropdownArrowGreen = document.querySelector('.filters__dropdown--icon.green')
const dropdownSearchApp = document.querySelector('.filters__dropdown--search.greensearch')
const filterDropdownUstensils = document.querySelector('.ustensils')
const dropdownTextRed = document.querySelector('.filters__dropdown--text.red')
const dropdownArrowRed = document.querySelector('.filters__dropdown--icon.red')
const dropdownSearchUst = document.querySelector('.filters__dropdown--search.redsearch')
//const ingredientsDisplay = document.querySelector('.')


//création des fonctions de fermeture des dropdowns

function closeIngDropdown() {
    ingredientsDisplay.style.display = 'none'
    dropdownTextBlue.style.display = 'block'
    dropdownArrowBlue.classList.remove('filters__dropdown--icon--open')
    dropdownSearchIng.style.display = 'none'
}

function closeAppDropdown() {
    appliancesDiv.style.display = 'none'
    appliancesDisplay.style.display = 'none'
    dropdownTextGreen.style.display = 'block'
    dropdownArrowGreen.classList.remove('filters__dropdown--icon--open')
    dropdownSearchApp.style.display = 'none'
}

function closeUstDropdown() {
    ustensilsDiv.style.display = 'none'
    ustensilsDisplay.style.display = 'none'
    dropdownTextRed.style.display = 'block'
    dropdownArrowRed.classList.remove('filters__dropdown--icon--open')
    dropdownSearchUst.style.display = 'none'
}


//addeventlistener des menus dropdown

dropdownArrowBlue.addEventListener("click", function() {

    if (ingredientsDisplay.style.display == 'none'){
        ingredientsDisplay.style.display = 'block'
        dropdownTextBlue.style.display = 'none'
        dropdownArrowBlue.classList.add('filters__dropdown--icon--open')
        dropdownSearchIng.style.display = 'block'
        closeAppDropdown(); // je viens fermer les autres dropdowns lorsque j'en ouvre une
        closeUstDropdown();
    }
    else {
        closeIngDropdown();
    }  
})

dropdownArrowGreen.addEventListener("click", function() {

    if (appliancesDisplay.style.display == 'none'){
        appliancesDiv.style.display = 'block'
        appliancesDisplay.style.display = 'block'
        dropdownTextGreen.style.display = 'none'
        dropdownArrowGreen.classList.add('filters__dropdown--icon--open')
        dropdownSearchApp.style.display = 'block'
        closeIngDropdown();
        closeUstDropdown();
    }
    else {
        closeAppDropdown();
    }  
})

dropdownArrowRed.addEventListener("click", function() {

    if (ustensilsDisplay.style.display == 'none'){
        ustensilsDiv.style.display = 'block'
        ustensilsDisplay.style.display = 'block'
        dropdownTextRed.style.display = 'none'
        dropdownArrowRed.classList.add('filters__dropdown--icon--open')
        dropdownSearchUst.style.display = 'block'
        closeIngDropdown();
        closeAppDropdown();
    }
    else {
        closeUstDropdown();
    }  
})





////////// AFFICHAGE DES FILTRES ACTIFS ////////////


// Création de l'objet filtres actifs composé de trois tableaux 

var activeFilters = {
    ingredients : [],
    ustensils : [],
    appliances : [],
}


// Fonction affichage des filtres actifs pour les ingrédients

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


// Fonction affichage des filtres actifs pour les appareils

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


// Fonction affichage des filtres actifs pour les ustensils

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

        document.querySelector('.filters__active').innerHTML = '' // Réinitialisation des filtres au clic

        if (!activeFilters.ingredients.includes(event.target.textContent)) // J'ajoute chaques recette qui contient l'élément sélectionné
        activeFilters.ingredients.push(event.target.textContent) // puis je l'ajoute au tableau des recettes 

        ingredientsFiltersDisplay()
        appliancesFiltersDisplay()
        ustensilsFiltersDisplay()

        research ();
    })
})

appliancesLi.forEach(element => {

    element.addEventListener("click", function(event) {
        
        document.querySelector('.filters__active').innerHTML = ''// Réinitialisation des filtres au clic

        if (!activeFilters.appliances.includes(event.target.textContent)) // J'ajoute chaques recette qui contient l'élément sélectionné
        activeFilters.appliances.push(event.target.textContent); // puis je l'ajoute au tableau des recettes 

        ingredientsFiltersDisplay()
        appliancesFiltersDisplay()
        ustensilsFiltersDisplay()

        research ();
    })
})

ustensilsLi.forEach(element => {

    element.addEventListener("click", function(event) {

        // Réinitialisation des filtres au clic
        document.querySelector('.filters__active').innerHTML = ''

        if (!activeFilters.ustensils.includes(event.target.textContent)) // J'ajoute chaques recette qui contient l'élément sélectionné
        activeFilters.ustensils.push(event.target.textContent); // puis je l'ajoute au tableau des recettes 

        ingredientsFiltersDisplay()
        appliancesFiltersDisplay()
        ustensilsFiltersDisplay()

        research ();
    })
})

//Recherche des menus et réinitialisation des résultats

let listUpdate = [] 
let listClavier = recipes

// création d'une fonction qui met à jour les filtres en fonction des résultats

function resetTags(list) {

    let updateFilters = {
        ingredients : [],
        appliances : [],
        ustensils : [],
    }
    
    list.forEach(recette => {
        recette.ingredients.forEach(ingredient => {
            updateFilters.ingredients.push(ingredient.ingredient)
        })
        updateFilters.appliances.push(recette.appliance)
        recette.ustensils.forEach(ustensil => {
            updateFilters.ustensils.push(ustensil)
        })
    }) 
    
    doublonIngredient = doublonClear(updateFilters.ingredients)
    doublonAppliance = doublonClear(updateFilters.appliances)
    doublonUstensil = doublonClear(updateFilters.ustensils)

    function tri(a,b) {
    
        if (a.nom < b.nom) return -1;
        else if (a.nom == b.nom) return 0;
        else return 1;
    
    }
    
    doublonIngredient = doublonIngredient.sort();
    doublonAppliance = doublonAppliance.sort();
    doublonUstensil = doublonUstensil.sort();

    recupFilters();
}

// Fonction de recherche dans l'input principal

document.querySelector('.search__input').addEventListener('keyup', researchInput)

function researchInput(e) {

    listClavier = [] //on reinitialise
    
    let researchAll = e.target.value

    if (researchAll.length >= 3) {

        for (let i = 0; i < listUpdate.length; i++) { // pour les element (du premier au dernier) du tableau
    
            const ingRecipe = listUpdate[i].ingredients.map(a => a.ingredient)
            const titreRecipe = listUpdate[i].name
            const descRecipe = listUpdate[i].description
    
            for (let j = 0; j < ingRecipe.length; j++) { // on met une boucle car c'est un tableau
                if (ingRecipe[j].toLowerCase().includes(researchAll.toLowerCase())) {
                    listClavier.push(listUpdate[i])
                }
            } 
            if (titreRecipe.toLowerCase().includes(researchAll.toLowerCase())) {
                listClavier.push(listUpdate[i])
            }
            if (descRecipe.toLowerCase().includes(researchAll.toLowerCase())) {
                listClavier.push(listUpdate[i])
            }
        }
    
        listClavier = doublonClear(listClavier)

    } else {
        listClavier = recipes // si < 3 on remet recipes
    }

    document.querySelector('.result').innerHTML = ''

    listClavier.forEach(r => { // on affiche les recette dans listeClavier
        receiptsFactory(r);
    })

    resetTags(listClavier);
    research();
}

//

function research() {

    listUpdate = []

    listClavier.forEach(recette => {
        const ingRecette = recette.ingredients.map(a => a.ingredient) // ??

        if (activeFilters.ingredients.every(e => ingRecette.includes(e))) { // Si tous les ingrédients sélectionnés sont contenus dans la recette
            if (activeFilters.appliances.every(e => recette.appliance.includes(e))) { // ET Si tous les appareils sélectionnés sont contenus dans la recette
                if (activeFilters.ustensils.every(e => recette.ustensils.includes(e))) {  // ET Si tous les ustenciles sélectionnés sont contenus dans la recette
                    listUpdate.push(recette) // Alors je push la recette dans la listUpdate
                }
            }
        }
    })

    if (document.querySelector('.filters__active').innerHTML == '' ) // enlever la div si aucun filtre n'et sélectionné
    document.querySelector('.filters__active').style.display = 'none'

    document.querySelector('.result').innerHTML = ''

    listUpdate.forEach(element => { // puis je viens afficher la nouvelle liste avec la fonction d'affichage des résultats
        receiptsFactory(element);
    })

    resetTags(listUpdate);

    closeIngDropdown();
    closeUstDropdown();
    closeAppDropdown();

}





//////////// INPUTS DES MENUS DROPDOWN ////////////


// Recherche au clavier INSTANTANÉE dans une liste

document.querySelector('.bluesearch').addEventListener('keyup', researchListBlue)   
document.querySelector('.greensearch').addEventListener('keyup', researchListGreen)
document.querySelector('.redsearch').addEventListener('keyup', researchListRed)

function researchListBlue(e) {

    let filtersListIng = document.querySelectorAll('.filters__dropdown--listblue--ingredients') 
    let rechercheIng = e.target.value

    filtersListIng.forEach(tri => {

        if (tri.innerHTML.toLowerCase().includes(rechercheIng.toLowerCase()) || rechercheIng == '') {
            tri.style.display = 'block'
        } else {
            tri.style.display = 'none'
        }
    })
}

function researchListGreen(e) {

    let filtersListApp = document.querySelectorAll('.filters__dropdown--listgreen--appliances')
    let rechercheApp = e.target.value

    filtersListApp.forEach(tri => {

        if (tri.innerHTML.toLowerCase().includes(rechercheApp.toLowerCase()) || rechercheApp == '') {
            tri.style.display = 'block'
        } else {
            tri.style.display = 'none'
        }
    })
}

function researchListRed(e) {

    let filtersListUst = document.querySelectorAll('.filters__dropdown--listred--ustensils')
    let rechercheUst = e.target.value

    filtersListUst.forEach(tri => {

        if (tri.innerHTML.toLowerCase().includes(rechercheUst.toLowerCase()) || rechercheUst == '') {
            tri.style.display = 'block'
        } else {
            tri.style.display = 'none'
        }
    })
}


   



 