import RecipeCategoryStyled from './RecipeCategory.styled';
import RecipeCard from '../RecipeCard/RecipeCard';
import slugify from 'slugify';
import Link from 'next/link';

function slugifyCategory(category){
    return slugify(category).toLocaleLowerCase();
}

function createUrl(recipe){
    const category = slugifyCategory(recipe.category);
    const recipeId = slugify(`${recipe.id}-${recipe.name}`).toLocaleLowerCase();

    return `/receitas/${category}/${recipeId}`;
}

export default function RecipeCategory({category, recipeList, maxElements =3}){
    
    const recipes = recipeList.filter(recipe => recipe.category === category).slice(0,maxElements);


    return(
        <div className='recipe-category'>
            <style jsx>{RecipeCategoryStyled}</style>
            <Link href={`/receitas/${slugifyCategory(category)}`}>
                <a>
                    <h2 className='category-name'>{category}</h2>
                </a>
            </Link>
            <div className='recipes'>
            {recipes.map(recipe => (
                <RecipeCard keys={recipe.id} picture={recipe.img} name={recipe.name} category={recipe.category} link={createUrl(recipe)}/>
            ))}
            </div>
        </div>
    )
}