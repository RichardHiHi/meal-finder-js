const searchBTN = document.querySelector(".search-button");
const input = document.querySelector(".input");
const formSubmit = document.querySelector(".submit-form");
const infoMeal = document.querySelector(".meals");
console.log(infoMeal);
const resulstHeading = document.querySelector(".results-heading");

//get meal by keyword
function getMeal(e) {
    e.preventDefault();

    const keySearch = input.value;

    if (keySearch.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${keySearch}`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                resulstHeading.innerHTML = `<span>resulst for "${keySearch}"</span>`;
                infoMeal.innerHTML = data.meals
                    .map((meal) => {
                        // display meal
                        return `<div class="meal">
                    <img class="img-meal" src="${meal.strMealThumb}">
                    <div class="meal-info  " meal-id="${meal.idMeal}">
                        <h3>${meal.strMeal}</h3>
                    </div>
                </div>`;
                    })
                    .join("");
                // input.value = ``;
            });
    } else {
        alert("please text ");
    }
}

//add meal to DOM for single meal
function addMealToDOM(data) {
    console.log(data.meals[0]);
}

//get meal by idMeal
function getMealByIdMeal(idMeal) {
    if (idMeal) {
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                addMealToDOM(data);
            });
    }
}

//display single meal
function displaySingleMeal(e) {
    const selectedMeal = e.path.find((element) => {
        return element.classList.contains("meal-info");
    });
    const mealID = selectedMeal.getAttribute("meal-id");
    console.log(mealID);
    getMealByIdMeal(mealID);
}

formSubmit.addEventListener("submit", getMeal);
infoMeal.addEventListener("click", displaySingleMeal);