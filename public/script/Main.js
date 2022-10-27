// COMMANDE FETCH RECETTES

async function getReceipts () {
    await fetch('./data/receipts.json')
        .then((res) => res.json())
        .then((data) => (receips = data.receipts))

    return {
        receipts: [...receipts]
    }
}

let ingredientsArray = [];
let ustensilsArray = [];
let applianceArray = [];




function receiptsFactory (data) {
    const { name, image, ingredients, time, description, ustensils, appliance } = data

    function getReceiptsCard () {
        const img = document.createElement('div')
        const title = document.createElement('h2')
        const duration = document.createElement('p')
        const ingredientsList = document.createElement('ul')
        const 

        img.setAttribute('href', image)
        title.textContent = name
        duration.textContent = time
        ingredients.forEach(element => {
            const ingredientDetails = document.createElement('li')
        });
    }

}

receipts.forEach(element => {
    receiptsFactory (element)
});

init ()