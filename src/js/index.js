import Search from './models/Search';
import Search from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { elements, renderLoader, clearLoader } from './views/base';

/*
Global State of the app
- Search object
- Current recipe object
- Shopping list object
- Linked recipes
*/

const state = {};

/*
**
**SEARCH CONTROLLER
**
*/

const Controlsearch = async () => {
    //1. get query from view
    const query = searchView.getResults();

    if(query){
        //2. new search object and add to state
        state.search = new Search(query);

        //3. Prep UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try{
            //4. Search for recipes
            await state.search.getResults();

            //5. render results on UI
            clearLoader();
            searchView.renderResults(state.search.result);
        } catch (err){
            alert('somethign went wrong');
        }

    }

}
document.querySelector('.search').addEventListener('submit', e => {
    e.preventDefault();
    Controlsearch();
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closet('.btn-inline');
    
    if(btn){
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
        console.log(goToPage);
    }
});

/*
**
**RECIPE CONTROLLER
**
*/
const controlRecipe = async () => {
    //get id from url
    const id = window.location.hash.replace('#', '');

    if(id){
        //prepare ui fpr changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        //highlight selected search item
        if(state.search) searchView.hightlightSelected(id);

        //create new recipe object
        state.recipe = new Recipe(id);

        try{
            //get recipe data
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            //calculate servings and time 
            state.recipe.calcTime();
            state.recipe.calcServings();

            //render recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe);
        } catch (err) {
            alert('something went wrong');
        }
        

    }
};


['hashchange', 'load'].forEach(event => window.addEventListener(event,controlRecipe));

//Handling recipe button clicks
elements.recipe.addEventListener('click', e => {
    if(e.target.mathces('.btn-decrease, .btn-decrease *')){
        if(state.recipe.servings > 1){
            state.recipe.updateServings('dec');
            recipeView.upadateServingsIngredients(state.recipe);
        }
        
        // button is clicked
    } else if (e.target.matchs('.btn-increase, .btn-increase *')){

        state.recipe.updateServings('inc');
        recipeView.upadateServingsIngredients(state.recipe);
    }
});