import slugify from "slugify";
import { RecipeService } from "../../../services/RecipeService";
import Footer from "../../../components/Footer/Footer";
import Header from "../../../components/Header/Header";
import RecipeCategory from "../../../components/RecipeCategory/RecipeCategory";

export async function getStaticPaths(){
    let categories = {};

    const recipes = (await RecipeService.listAll());

    recipes.forEach(recipe => {
        categories[recipe.category] = true
    });

    const paths = Object.keys(categories).map(category => {
        return {
            params: {
                category: slugify(category).toLowerCase()
            }
        }
    })

    return {paths, fallback:false};
}

export async function getStaticProps(context){
    const {category} = context.params;
    const recipes = (await RecipeService.listAll()).filter(recipe => slugify(recipe.category).toLowerCase() === category);
    
    return{
      props:{
        recipes
      }
    }
  }

export default function RecipeCategoryPage({recipes = []}){

    if(recipes.length === 0){
        return <div>Nenhuma receita</div>
    }

    return (
    <div>
        <Header title={`Na Cozinha`} />
        <RecipeCategory category={recipes[0].category} recipeList={recipes}/>
        <Footer/>
    </div>
    );
}