const searchBTN = document.querySelector(".search-button");
const input = document.querySelector(".input");
const formSubmit = document.querySelector(".submit-form");
const infoMeal = document.querySelector(".meals");
const resulstHeading = document.querySelector(".results-heading");
const singleMeal = document.querySelector(".single-meal");
const randomBtn = document.querySelector(".random-btn");

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
                input.value = ``;
            });
    } else {
        alert("please text ");
    }
}

//add meal to DOM for single meal
function addMealToDOM(data) {
    const meal = data.meals[0];
    let redient = ''
    for (let i = 1; i <= 20; i++) {
        const strRedient = `strIngredient${i}`;
        console.log(strRedient)
        const strMeasure = `strMeasure${i}`;
        if (meal[strRedient]) {
            redient += `<li>` + meal[strRedient] + `-` + meal[strMeasure];
        }
    }
    redient = redient + '</li>';
    console.log(redient);
    singleMeal.innerHTML = `<h1>${meal.strMeal}</h1>
    <img src="${meal.strMealThumb}" class="single-meal-img">
    <div class="single-meal-info">
        <p>${meal.strArea}</p>
        <p>${meal.strCategory}</p>
    </div>
    <div class="main-meal">
        <p>${meal.strInstructions}</p>
        <h2>Ingredients</h2>
        <div class="ingredients">
            <ul>
                ${redient}
            </ul>
        </div>
    </div>`
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

function displayRandomMeal() {
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
        .then(response => response.json()).then(data => {
            resulstHeading.innerHTML = ``;
            infoMeal.innerHTML = ``;
            getMealByIdMeal(data.meals[0].idMeal)
        })
}


formSubmit.addEventListener("submit", getMeal);
infoMeal.addEventListener("click", displaySingleMeal);
randomBtn.addEventListener("click", displayRandomMeal);