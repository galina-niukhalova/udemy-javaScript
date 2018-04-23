import axios from 'axios';
import { KEY, PROXY } from '../config.js';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResult() {
        try {
            const URL = `${PROXY}http://food2fork.com/api/search?key=${KEY}`;
            const res = await axios(`${URL}&q=${this.query}`);
            this.result = res.data.recipes;

        } catch (error) {
            alert(error);
        }
    }
}