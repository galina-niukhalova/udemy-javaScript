import axios from 'axios';
import { KEY, PROXY } from '../config.js';

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getResult() {
        try {
            const URL = `${PROXY}http://food2fork.com/api/get?key=${KEY}`;
            const res = await axios(`${URL}&rId=${this.id}`);

            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;

        } catch (error) {
            alert('Something went wrong!');
        }
    }

    calcTime() {
        // Assuming that we need 15 min for each 3 ingridients
        const numIng = this.ingredients.length;

        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    }

    calcServings() {
        this.servings = 4;
    }

    parseIngredients() {
        const unitsLong = ['tablespoons', 'tablespoon',
            'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        const units = [...unitShort, 'kg', 'g'];

        const newIngridients = this.ingredients.map(el => {
            // Uniform units
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitShort[i])
            });

            // Remove parenthenses
            ingredient = ingredient.trim().replace(/ *\([^)]*\) */g, ' ');

            // Parse ingredients into count, unit and ingredients

            ingredient = ingredient.split(' ');
            const unitIndx = ingredient.findIndex(ch => units.includes(ch));

            let objIng;

            if (unitIndx > -1) {
                const arrCount = ingredient.slice(0, unitIndx);
                

                let count;
                if(!arrCount.length) count = 1;
                else if (arrCount.length === 1) 
                    count = eval(arrCount[0].replace('-', '+'));
                else
                    count = eval(arrCount.join('+'));

                objIng = {
                    count: count,
                    unit: ingredient[unitIndx],
                    ingredient: ingredient.slice(unitIndx + 1).join(' ')
                };

            } else {
                if (parseInt(ingredient[0], 10)) {
                    objIng = {
                        count: eval(ingredient[0].replace('-', '+')),
                        unit: '',
                        ingredient: ingredient.slice(1).join(' ')
                    }
                } else {
                    objIng = {
                        count: 1,
                        unit: '',
                        ingredient: ingredient.join(' ')
                    }
                }
            }

            // console.log(objIng.count, ' = ', covertCount(objIng.count));
            return objIng;
        });

        this.ingredients = newIngridients;
    }
}