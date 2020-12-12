
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

function removeEntry(parentNodeId) {
    parentNode = document.getElementById(parentNodeId);
    if (parentNode.children.length <= 4) {
        return;
    }
    else {
        parentNode.children[parentNode.children.length - 3].remove();
    }

}

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

function getPreparationSteps() {
    let array = [];
    let preparations = document.getElementsByName('preparation');

    for (let i = 0; i < preparations.length; i++) {
        array.push(preparations[i].value);
    }

    return array;
}

function getRecipeObject() {
    let recipe = {
        recepy: document.getElementById('recepy').value,
        ingredients: getIngredients(),
        difficulty: document.getElementById('difficulty').value,
        preparation_time: document.getElementById('preparation_time').value,
        calories: document.getElementById('calories').value,
        category: document.getElementById('category').value,
        price: document.getElementById('price').value,
        preparation: getPreparationSteps(),
        creator: document.getElementById('creator').value
    };
    return recipe;
}

function saveRecipe() {
    let formData = new FormData();
    let url = '/send_mail/write_recepy.php';
    let json = JSON.stringify(getRecipeObject());
    let image = document.getElementById('image').files[0];
    formData.append('recipe',json);
    formData.append('image',image);
    fetch(url, {
        method: 'POST',
        body: formData,
      }).then((response) => {
        console.log(response)
      })
    return false;
}

function updateStatus(status) {
    let result = document.getElementById('status');
    result.innerHTML = status;
}
