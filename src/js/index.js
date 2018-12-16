import Search from './models/Search';
import Search from './models/Recipe';
import * as searchView from './views/SearchView';
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

        //4. Search for recipes
        await state.search.getResults();

        //5. render results on UI
        clearLoader();
        searchView.renderResults(state.search.result);
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
        //prepare io fpr changes

        //create new recipe object
        state.recipe = new Recipe(id);

        //get recipe data
        await state.recipe.getRecipe();

        //calculate servings and time 
        state.recipe.calcTime();
        state.recipe.calcServings();
        //render recipe

    }
};
window.addEventListener('hashchange', controlRecipe);