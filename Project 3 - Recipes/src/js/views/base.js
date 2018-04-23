import $ from 'jquery';

export const elements = {
    searchForm: $('.search'),
    searchInput: $('.search__field'),
    searchResultList: $('.results__list'),
    searchResult: $('.results'), 
    searchResPages: $('.results__pages'),
    recipe: $('.recipe')
};

export const elementsStrings = {
    loader: 'loader'
}

export const renderLoader = (parent) => {
    const loader = `
        <div class="${elementsStrings.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw">
            </svg>
    `;
    parent.append(loader);
};

export const clearLoader = () => {
    $(`.${elementsStrings.loader}`).remove();
}