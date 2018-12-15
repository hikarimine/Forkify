import axios from 'axios';
import {key, proxy} from '../config';

export default class Search{
    constructor(query){
        this.query = query;
    }

    async getResults(){
        const proxt = 'https://cors-anywhere.herokuapp.com/';
        const key = '462b1cc8d4f2730081462fbc65136320';
        try{
            const res = await axios ('${proxy}https://www.food2fork.com/api/search?key=${key}&q=${this.query}');
            this.result = res.data.recipes;
            console.log(recipes);
        } catch (error){
            alert(error);
        }
    }

}