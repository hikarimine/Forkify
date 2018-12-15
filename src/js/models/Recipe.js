import axios from 'axios';
import {key, proxy} from '../config';

export default class Recipe{
    constructor(query){
        this.query = query;
    }

    async getRecipe(){
        try{
            const res = await axios('${proxy}https://www.food2fork.com/api/get?key=${key}&rId=${this.id}');
            this.title = res.data.recipes.title;
            this.author = res.data.recipes.publisher;
            this.img = res.data.recipes.image_url;
            this.url = res.data.recipes.source_url;
            this.ingredients = res.data.recipes.ingredients;
            
        } catch (error){
            alert(error);
            alert('Something went wrong.');
        }
    }

    calcTime(){
        // Assuming that we need 15 mins for each 3 ingredients
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    }
    calcServings(){
        this.servings = 4;
    }
   
};