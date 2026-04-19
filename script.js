const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

// --- MOCK API DATA ---
const localMeals = [
    // FINLAND
    { idMeal: "F1", strMeal: "Lohikeitto (Salmon Soup)", strArea: "Finland", strCategory: "Seafood", strMealThumb: "https://www.valio.fi/media/7623/lohikeitto.jpg", strInstructions: "Sauté onions, add potatoes and stock, then salmon and cream. Garnish with dill.", ingredients: ["Salmon - 500g", "Potatoes - 4 large", "Heavy Cream - 200ml", "Dill - 1 bunch"], strYoutube: "" },
    { idMeal: "F2", strMeal: "Karjalanpiirakka", strArea: "Finland", strCategory: "Pastry", strMealThumb: "https://www.myllynparas.fi/sites/default/files/styles/recipe_main_image/public/karjalanpiirakka_0.jpg", strInstructions: "Fill rye crust with rice porridge, bake, and brush with egg butter.", ingredients: ["Rye flour - 200g", "Rice - 150g", "Butter - 50g"], strYoutube: "" },
    { idMeal: "F3", strMeal: "Lihapullat", strArea: "Finland", strCategory: "Meat", strMealThumb: "https://img.delicious.com.au/R_A-f_fL/del/2015/10/finnish-meatballs-14300-1.jpg", strInstructions: "Mix meat with breadcrumbs and cream, fry and serve with lingonberry jam.", ingredients: ["Ground Beef - 400g", "Breadcrumbs - 50g", "Cream - 100ml"], strYoutube: "" },
    // NEPAL
    { idMeal: "N1", strMeal: "Momo", strArea: "Nepal", strCategory: "Appetizer", strMealThumb: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb", strInstructions: "Fill dough with spiced meat/veg and steam for 10 minutes.", ingredients: ["Flour - 500g", "Minced Meat - 400g", "Ginger/Garlic - 2 tbsp"], strYoutube: "" },
    { idMeal: "N2", strMeal: "Dal Bhat", strArea: "Nepal", strCategory: "Main", strMealThumb: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Dal_Bhat_Tarun_Basnet.jpg", strInstructions: "Cook lentils and rice separately, serve with vegetable curry.", ingredients: ["Lentils - 200g", "Rice - 300g", "Turmeric - 1 tsp"], strYoutube: "" },
    { idMeal: "N3", strMeal: "Sel Roti", strArea: "Nepal", strCategory: "Dessert", strMealThumb: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Sel_Roti.jpg", strInstructions: "Deep fry rice flour rings until golden brown.", ingredients: ["Rice flour - 500g", "Sugar - 100g", "Ghee - 2 tbsp"], strYoutube: "" },
    // TURKEY
    { idMeal: "T1", strMeal: "Baklava", strArea: "Turkey", strCategory: "Dessert", strMealThumb: "https://images.unsplash.com/photo-1519676867240-f031ee04a703", strInstructions: "Layer phyllo with nuts, bake, and soak in honey syrup.", ingredients: ["Phyllo dough - 1 pack", "Walnuts - 200g", "Honey - 150ml"], strYoutube: "" },
    { idMeal: "T2", strMeal: "Turkish Kofte", strArea: "Turkey", strCategory: "Meat", strMealThumb: "https://images.unsplash.com/photo-1529692236671-f1f6e9460272", strInstructions: "Mix lamb with spices, shape, and grill.", ingredients: ["Lamb - 500g", "Cumin - 1 tsp", "Parsley - 1 bunch"], strYoutube: "" },
    { idMeal: "T3", strMeal: "Menemen", strArea: "Turkey", strCategory: "Breakfast", strMealThumb: "https://upload.wikimedia.org/wikipedia/commons/6/63/Menemen.jpg", strInstructions: "Sauté peppers and tomatoes, then gently whisk in eggs.", ingredients: ["Eggs - 3", "Tomatoes - 2", "Green Peppers - 2"], strYoutube: "" },
    // ITALY
    { idMeal: "I1", strMeal: "Mushroom Risotto", strArea: "Italy", strCategory: "Rice", strMealThumb: "https://images.unsplash.com/photo-1476124369491-e7addf5db371", strInstructions: "Slowly add stock to toasted arborio rice and mushrooms.", ingredients: ["Arborio Rice - 300g", "Mushrooms - 200g", "Stock - 1L", "Parmesan - 50g"], strYoutube: "" },
    { idMeal: "I2", strMeal: "Classic Lasagna", strArea: "Italy", strCategory: "Pasta", strMealThumb: "https://images.unsplash.com/photo-1551183053-bf91a1d81141", strInstructions: "Layer pasta, bolognese, and béchamel, then bake.", ingredients: ["Lasagna Sheets - 250g", "Bolognese Sauce - 500g", "Mozzarella - 200g"], strYoutube: "" }
];

// Event Listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});

function getMealList(){
    let searchInputTxt = document.getElementById('search-input').value.trim().toLowerCase();
    let searchType = document.getElementById('search-type').value;
    
    // Check Local Data
    let foundLocal = localMeals.filter(meal => {
        if(searchType === "area") return meal.strArea.toLowerCase() === searchInputTxt;
        return meal.strMeal.toLowerCase().includes(searchInputTxt);
    });

    let url = searchType === "area" ? 
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${searchInputTxt}` : 
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`;

    fetch(url)
    .then(res => res.json())
    .then(data => renderMeals([...foundLocal, ...(data.meals || [])]))
    .catch(() => renderMeals(foundLocal)); // Basic error handling
}

function renderMeals(meals){
    let html = "";
    if(meals.length > 0){
        meals.forEach(meal => {
            html += `
                <div class="meal-item" data-id="${meal.idMeal}">
                    <div class="meal-img"><img src="${meal.strMealThumb}" alt="food"></div>
                    <div class="meal-name">
                        <h3>${meal.strMeal}</h3>
                        <a href="#" class="recipe-btn">Get Recipe</a>
                    </div>
                </div>
            `;
        });
        mealList.classList.remove('notFound');
    } else {
        html = "No meals found! Try 'Finland', 'Nepal', 'Turkey', or 'Italy'.";
        mealList.classList.add('notFound');
    }
    mealList.innerHTML = html;
}

function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealId = e.target.parentElement.parentElement.dataset.id;
        let localMatch = localMeals.find(m => m.idMeal === mealId);
        
        if(localMatch) {
            mealRecipeModal([localMatch]);
        } else {
            fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
            .then(res => res.json())
            .then(data => mealRecipeModal(data.meals));
        }
    }
}

function mealRecipeModal(meal){
    meal = meal[0];
    let ingredientsList = [];
    
    // Check if it's mock data or API data
    if(meal.ingredients) {
        ingredientsList = meal.ingredients;
    } else {
        for(let i = 1; i <= 20; i++){
            if(meal[`strIngredient${i}`]){
                ingredientsList.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`] || ''}`);
            }
        }
    }

    mealDetailsContent.innerHTML = `
        <h2 class="recipe-title">${meal.strMeal}</h2>
        <p class="recipe-category">${meal.strArea || meal.strCategory}</p>
        <div class="recipe-ingredients">
            <h3>Ingredients:</h3>
            <ul>${ingredientsList.map(ing => `<li>${ing}</li>`).join('')}</ul>
        </div>
        <div class="recipe-instruct"><h3>Instructions:</h3><p>${meal.strInstructions}</p></div>
        <div class="recipe-meal-img"><img src="${meal.strMealThumb}" alt=""></div>
        <div class="recipe-link"><a href="${meal.strYoutube}" target="_blank">Watch Video</a></div>
    `;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}
