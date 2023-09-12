var recipes = [];
var id = 0;

function recipe(id, title, description) {
    this.id = id;
    this.title = title;
    this.description = description;
  }

const recipeList = document.querySelector(".recipe-list");
const recipeDetails = document.querySelector(".recipe-details");
const recipeTitle = document.querySelector("#recipe-title");
const recipeDescription = document.querySelector("#recipe-description");

const _title = document.querySelector("#title");
const _description = document.querySelector("#description");

const closeDetailsButton = document.querySelector("#close-details");
const addRecipeButton = document.querySelector("#btn-add-recipe");
const cancelAddRecipeButton = document.querySelector(".cancel ");
const formAddRecipe = document.querySelector(".form-new-recipe");
const btnFormSubmit = document.querySelector("#btn-submit");

function displayRecipes(){
    recipeList.innerHTML = "";

    recipes.forEach(recipe => {
        const recipeElement = document.createElement("div");
        recipeElement.classList.add("recipe");
        recipeElement.innerHTML = `
            <button class="delete-recipe" data-id="${recipe.id}"> Delete </button>
            <h2>${recipe.title}</h2>
            <p>${recipe.description}</p>
            <button class="view-recipe">View Recipe</button>
        `;
        recipeList.appendChild(recipeElement);

        // Attach event listeners to the delete buttons
        const deleteButtons = document.querySelectorAll(".delete-recipe");
        deleteButtons.forEach((button) => {
            button.addEventListener("click", handleDelete);
        });
    
        const viewRecipeButton = recipeElement.querySelector(".view-recipe");
        viewRecipeButton.addEventListener("click", () => {
            recipeTitle.textContent = recipe.title;
            recipeDescription.textContent = recipe.description;
            recipeList.style.display = "none";
            recipeDetails.style.display = "block";
        });
    });
}

function hideAddRecipeForm(){
    addRecipeButton.style.display = "flex";
    cancelAddRecipeButton.style.display = "none";
    _title.value = "";
    _description.value = ""; 
    formAddRecipe.style.display = "none";
}

function displayAddRecipeForm(){
    formAddRecipe.style.display = "flex";
    cancelAddRecipeButton.style.display = "flex";
    addRecipeButton.style.display = "none";
}

function handleDelete(event) {
    const itemId = event.target.getAttribute("data-id");
  
    // Find the index of the item to delete
    const index = recipes.findIndex((item) => item.id == itemId);
  
    // Remove the item from the array
    if (index !== -1) {
    recipes.splice(index, 1);
        displayRecipes(); // Update the display
    }
  }

addRecipeButton.addEventListener("click", () => {
    displayAddRecipeForm();
});

btnFormSubmit.addEventListener("click", () => {
    var currentRecipe = new recipe(id + 1, _title.value, _description.value);
    recipes.push(currentRecipe);
    displayRecipes();
    id++;
    hideAddRecipeForm();
})

cancelAddRecipeButton.addEventListener("click", () => {
    hideAddRecipeForm();
})

closeDetailsButton.addEventListener("click", () => {
    recipeDetails.style.display = "none";
    recipeList.style.display = "flex";
});