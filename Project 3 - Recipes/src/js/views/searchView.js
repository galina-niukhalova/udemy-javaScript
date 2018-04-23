
import { elements } from './base';

export const getInput = () => elements.searchInput.val();

export const clearInput = () => {
    elements.searchInput.val('');
};

export const clearResult = () => {
    elements.searchResultList.html('');
    elements.searchResPages.html('');
};

export const highlightSelected = id => {
    document.querySelectorAll('.results__link').forEach(el => el.classList.remove('results__link--active'));
    
    const item = document.querySelector(`a[href="#${id}"]`);
    if(item) item.classList.add('results__link--active');
}

const limitRecipeTitle = (title, limit = 17) => {
    if (title.length > limit) {

        let newTitle = [];

        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return (acc + cur.length);
        }, 0);

        return `${newTitle.join(' ')} ...`;
    }

    return title;
}

const renderRecipe = recipe => {
    const markup = `<li>
                        <a class="results__link" href="#${recipe.recipe_id}">
                            <figure class="results__fig">
                                <img src="${recipe.image_url}" alt="${recipe.title}"> 
                            </figure>
                            <div class="results__data">
                                <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                                <p class="results__author">${recipe.publisher}</p>
                            </div>
                        </a>
                    </li>`;

    elements.searchResultList.append(markup);
}

// type: 'prev' or 'next'
const createBtn = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
    </button >
`;

const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);
    let button;

    if (pages > 1) {
        if (page === 1) {
            // Button to go to next page
            button = createBtn(page, 'next');
        }
        else if (page < pages) {
            // Both buttons
            button = `
            ${createBtn(page, 'prev')}
            ${createBtn(page, 'next')}
            `;
        }
        else if (page === pages) {
            // Button to go to prev page
            button = createBtn(page, 'prev');
        }
    }

    elements.searchResPages.append(button);
};

export const renderResult = (recipes, page = 1, resPerPage = 10) => {
    // render results of current page
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    recipes.slice(start, end).forEach(renderRecipe);
    
    // render pagination buttons
    renderButtons(page, recipes.length, resPerPage);
}