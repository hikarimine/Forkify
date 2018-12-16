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

    parseIngredients(){
        const unitsLong = ['tablespoons', 'tablespoon', 'ounce', 'ounces','teaspoon', 'teaspoons', 'cups', 'pounds' ];
        const unitShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];

        const newIngredients = this.ingredients.map(el => {
            //1 uninformed units
            let ingredient = el.tolowerCase();
            unitsLong.forEach((unit,1)=> {
                ingredient = ingredient.replace(unit, unitShort[i]);
            });
    
            //2 remvoe parenthese
            ingredient = ingredient.replace(/[{()}]/g, ' ');
        
            //3 parse ingredients into count, unit and ingredient
            const arrIng = ingredient.split();
            const unitIndex = arrIng.gindIndex(el2 => unitsShort.includes(el2));

            let objIng;
            if(unitIndex > -1){
                //there is a unit
                const arrCount = arrIng.slice(0, unitIndex);
                let count;
                if(arrCount.length === 1){
                    count = eval(arrIng[0].replace('-', '+'));
                } else {
                    count = eval(arrIng.slice(0, unitIndex).join('+'));
                }

                objIng = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).joing(' ')
                }
            } else if (parseInt(arrIng[0], 10)){
                //there is no unit, but 1st element is number
                objIng = {
                    count: parseInt(arrIng[0],10),
                    unit: '',
                    ingredient: arrIng.slice(1).join('  ')
                }
            } else if (unitIndex === -1){
                //there is no unit and no number in 1st position
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient
                }
            }

            return ingredient;
        });
    this.ingredients = newIngredients;
    }
   
}