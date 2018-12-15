import Search from './models/Search';
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

const search = new Search('pizza');
console.log(search);

search.getResults();