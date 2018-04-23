
import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { elements, renderLoader, clearLoader } from './views/base';

/** Global state of the app
| * - Search obj
| * - Current recipe obj
| * - Shooping list obj
| * - Liked recipe
| */
const state = {};

/**
 * Search controller
 */
const controlSearch = async () => {
    // get query from view
    const query = searchView.getInput();

    if (query) {
        // New search obj + add state
        state.search = new Search(query);

        // Prepare UI for result
        searchView.clearInput();
        searchView.clearResult();
        renderLoader(elements.searchResult);

        try {
            // Search for recipes
            await state.search.getResult();

            // Render results on UI
            clearLoader();
            searchView.renderResult(state.search.result);

        } catch (error) {
            alert('Something wrong with the search ...');
            clearLoader();
        }
    }
}

elements.searchForm.submit((event) => {
    event.preventDefault();
    controlSearch();
});


elements.searchResPages.click((e) => {
    // go to the next page;
    const target = e.target.closest('.btn-inline');

    if (target) {
        searchView.clearResult();
        searchView.renderResult(state.search.result, parseInt(target.dataset.goto, 10));
    }
});


/**
 * Recipe controller
 */
const controlRecipe = async () => {
    // window.location = URL
    const ID = window.location.hash.replace('#', '');

    if (ID) {
        // Prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        // Create new recipe obj
        state.recipe = new Recipe(ID);
        // Hightlight selected search item
        if(state.search) searchView.highlightSelected(ID);

        try {
            // Get recipe data
            await state.recipe.getResult();

            // Calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();
            state.recipe.parseIngredients();

            // Render the recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe);
        } catch (error) {
            alert('Error processing recipe!');
        }
    }
};

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);
['hashchange', 'load'].forEach(e => window.addEventListener(e, controlRecipe));