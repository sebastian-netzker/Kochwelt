// Creates entry for ingredients or preparation steps. Specify the destination to add the node and give a protoype to clone
function createEntry(parentNodeId, prototypeId) {

    // Clone node

    parentNode = document.getElementById(parentNodeId);
    childNode = document.getElementById(prototypeId).cloneNode('deep');

    // Clean values and id (only first level of children is cleaned)

    childNode.removeAttribute('id');
    childNode.value = '';

    if (childNode.children.length > 0) {
        for (let i = 0; i < childNode.children.length; i++) {
            childNode.children[i].value = '';
            childNode.children[i].removeAttribute('id');
        }
    }

    // Insert

    lastChild = parentNode.children[parentNode.children.length - 2];
    parentNode.insertBefore(childNode, lastChild);

}

// Removes entry for ingredients or preparation steps
function removeEntry(parentNodeId) {
    parentNode = document.getElementById(parentNodeId);
    if (parentNode.children.length <= 4) {
        return;
    }
    else {
        parentNode.children[parentNode.children.length - 3].remove();
    }

}

// Returns an array of objects for all ingredients
function getIngredients() {
    let array = [];
    let ingredientNames = document.getElementsByName('ingredientName');
    let ingredientUnits = document.getElementsByName('ingredientUnit');
    let ingredientPortions = document.getElementsByName('ingredientPortion');

    for (let i = 0; i < ingredientNames.length; i++) {
        let ingredient = {
            portion: ingredientPortions[i].value,
            unit: ingredientUnits[i].value,
            name: ingredientNames[i].value
        };
        array.push(ingredient);
    }

    return array;

}

// Returns an array of objects for all preparation steps
function getPreparationSteps() {
    let array = [];
    let preparations = document.getElementsByName('preparation');

    for (let i = 0; i < preparations.length; i++) {
        let preparation = {
            //lets match (wrong) spelling in JSON here
            preperation_step: preparations[i].value,
        };
        array.push(preparation);
    }

    return array;
}

// Returns all recipe data as object
function getRecipeObject() {
    let recipe = {
        recepy: document.getElementById('recepy').value,
        ingredients: getIngredients(),
        difficulty: document.getElementById('difficulty').value,
        preparation_time: document.getElementById('preparation_time').value,
        calories: document.getElementById('calories').value,
        category: document.getElementById('category').value,
        price: document.getElementById('price').value,
        //lets match (wrong) spelling in JSON here
        preperation: getPreparationSteps(),
        creator: document.getElementById('creator').value
    };
    return recipe;
}


// Send recipe data and image as POST request and handle the response
function saveRecipe() {
    updateStatus('Rezept wird gespeichert');
    let formData = new FormData();
    let url = '/send_mail/write_recepy.php';
    let json = JSON.stringify(getRecipeObject());
    let image = document.getElementById('image').files[0];
    formData.append('recipe', json);
    formData.append('image', image);
    fetch(url, {
        method: 'POST',
        body: formData,
    }).then((response) => {
        if (response.status === 201) {
            updateStatus('Rezept erfolgreich gespeichert');
        }
        else if (response.status === 415) {
            updateStatus('Bildformat darf nur jpg, gif oder png und nicht größer als 5 MB sein!');
        }
        else {
            updateStatus('Fehler beim Speichern :(');
        }
        console.log(response)
    })
    return false;
}

function updateStatus(status) {
    let result = document.getElementById('status');
    result.innerHTML = status;
}
