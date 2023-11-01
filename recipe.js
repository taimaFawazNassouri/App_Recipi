const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const container = document.querySelector('.container');
let serachQuery = '';
const app_Id = '8fe3f9c4';
const app_Key = '7fde4c2208e64183333b90b2e7ee3a84';



searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    serachQuery = e.target.querySelector('input').value;
    fetchAPI();



});
async function fetchAPI() {
    const baseUrl = `https://api.edamam.com/search?q=${serachQuery}&app_id=${app_Id}&app_key=${app_Key}&to=20`;
    const response = await fetch(baseUrl);
    const data = await response.json();
    generatedHtml(data.hits);
    console.log(data);

}

function generatedHtml(results) {
    container.classList.remove('initial');
    let generatedHtml = '';
    results.map(result => {
        generatedHtml +=
            `
        <div class="item">
                    <img src="${result.recipe.image}" alt="">
                    <div class="flex-container">
                        <h1 class="title">${result.recipe.label}</h1>
                        <a class="view-btn" href="${result.recipe.url}" target="_blank">View Recipe</a>
                    </div>
                    <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
                    <p class="item-data">Diet Label: ${result.recipe.dietLabels.length > 0 ? result.recipe.dietLabels :'No Data Found'}</p>
                    <p class="item-data">Health Label: ${result.recipe.healthLabels}</p>

        </div>
        
        `
    })
    searchResultDiv.innerHTML = generatedHtml;
}