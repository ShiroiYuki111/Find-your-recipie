const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

// event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});

// get meal list that matches with the search input
function getMealList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    let searchType = document.getElementById('search-type').value;
    
    // Choose correct API endpoint based on dropdown selection
    let url = "";
    if(searchType === "area") {
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${searchInputTxt}`;
    } else {
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`;
    }

    fetch(url)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                    <div class="meal-item" data-id="${meal.idMeal}">
                        <div class="meal-img">
                            <img src="${meal.strMealThumb}" alt="food">
                        </div>
                        <div class="meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href="#" class="recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                `;
            });
            mealList.classList.remove('notFound');
        } else {
            // Updated error message to guide the user
            html = "No results found! Tip: Try 'Turkish', 'Mexican', or 'Italian' for country searches.";
            mealList.classList.add('notFound');
        }

        mealList.innerHTML = html;
    })
    .catch(err => {
        console.error("API error:", err);
        mealList.innerHTML = "Error connecting to the database. Please try again later.";
    });
}

// get recipe of the meal
function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;
        // Fetch specific meal details using ID
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals));
    }
}

// create a modal with the recipe details
function mealRecipeModal(meal){
    meal = meal[0];
    let html = `
        <h2 class="recipe-title">${meal.strMeal}</h2>
        <p class="recipe-category">${meal.strCategory}</p>
        <div class="recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class="recipe-meal-img">
            <img src="${meal.strMealThumb}" alt="">
        </div>
        <div class="recipe-link">
            <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}
