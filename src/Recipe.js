import React from 'react';
import style from "./recipe.module.css"

const Recipe = ({title, calories ,image, key,type,ingredients})=>  {

  return(
    <div className={style.recipe}>
        
        <h1 >{title}</h1>
        <h5>calories :{calories}</h5>
        <h5>Dish type : {type}</h5>
        
        <ol>
          {ingredients.map(ingredient=>(
            <li>{ingredient.text}</li>

          ))}

        </ol>
 
        <img className={style.image} src={image} alt="" />

    </div>
  )

}


export default Recipe;