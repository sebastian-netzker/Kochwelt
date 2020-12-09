
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
        let ingredient = {};
        ingredient.portion = ingredientPortions[i].value;
        ingredient.unit = ingredientUnits[i].value;
        ingredient.name = ingredientNames[i].value;
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
    recipe = {};
    recipe.recepy = document.getElementById('recepy').value;
    recipe.ingredients = getIngredients();
    recipe.difficulty = document.getElementById('difficulty').value;
    recipe.preparation_time = document.getElementById('preparation_time').value;
    recipe.calories = document.getElementById('calories').value;
    recipe.category = document.getElementById('category').value;
    recipe.price = document.getElementById('price').value;
    recipe.preparation = getPreparationSteps();
    recipe.creator = document.getElementById('creator').value;
    return recipe;
}


function saveRecipe() {
    let input = getRecipeObject();
    updateStatus('Rezept wird gespeichert');
    loadJSONFromServer()
        .then(function (result) {
            myJSON = JSON.parse(result);
            myJSON.push(input);
            console.log(myJSON);
            saveJSONToServer(myJSON);
            updateStatus('Speichern erfolgreich!');
        })
        .catch(function (error) {
            updateStatus('Fehler beim Speichern');
            console.error('error', error);
        });
    return false;
}

const BASE_SERVER_URL = 'http://gruppe-49.developerakademie.com/dirkv2/Kochwelt/js/'; // Place of the backend

/**
* Saves a JSON or JSON Array to the Server
* payload {JSON | Array} - The payload you want to store
*/
function saveJSONToServer(payload) {
    return new Promise(function (resolve, reject) {
        let xhttp = new XMLHttpRequest();
        let proxy = determineProxySettings();
        let serverURL = proxy + BASE_SERVER_URL + 'save_json.php';
        xhttp.open('POST', serverURL);

        xhttp.onreadystatechange = function (oEvent) {
            if (xhttp.readyState === 4) {
                if (xhttp.status >= 200 && xhttp.status <= 399) {
                    resolve(xhttp.responseText);
                } else {
                    reject(xhttp.statusText);
                }
            }
        };

        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.send(JSON.stringify(payload));

    });
}

/**
 * Loads a JSON or JSON Array to the Server
 * payload {JSON | Array} - The payload you want to store
 */
function loadJSONFromServer() {
    return new Promise(function (resolve, reject) {
        let xhttp = new XMLHttpRequest();
        let proxy = determineProxySettings();
        let serverURL = proxy + BASE_SERVER_URL + 'my_json.json';
        xhttp.open('GET', serverURL);

        xhttp.onreadystatechange = function (oEvent) {
            if (xhttp.readyState === 4) {
                if (xhttp.status >= 200 && xhttp.status <= 399) {
                    resolve(xhttp.responseText);
                } else {
                    reject(xhttp.statusText);
                }
            }
        };

        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.send();

    });
}

function updateStatus(status) {
    let result = document.getElementById('status');
    result.innerHTML = status;
}

function determineProxySettings() {
    if (window.location.href.indexOf('.developerakademie.com') > -1) {
        return '';
    } else {
        return 'https://cors-anywhere.herokuapp.com/';
    }
}
