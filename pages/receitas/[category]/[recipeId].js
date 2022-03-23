import slugify from "slugify";
import { RecipeService } from "../../../services/RecipeService";

export async function getStaticPaths(){
   const recipes = await RecipeService.listAll();

  const paths = recipes.map(recipe => {
       return {
            params: {
                category: slugify(recipe.category).toLowerCase(),
                recipeId: `${recipe.id}-${slugify(recipe.name).toLowerCase()}`
            }
        }      
    });

   return {paths, fallback:false};
}

export async function getStaticProps({params}){
    const recipeId = params.recipeId.replace(/^([a-z\d]+)-.*/gi, '$1');
    const recipe = await RecipeService.get(recipeId);

    return {
        props:{
            recipe
        }
    }
}

export default function RecipeContainer({recipe}){
    return(
        <div>
            {recipe.name}
        </div>
    )
}