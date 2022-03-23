import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import RecipeCategory from './components/RecipeCategory/RecipeCategory'
import {RecipeService} from '../services/RecipeService';
import { useState, useEffect, useMemo } from 'react';

export async function getStaticProps(context){
  const totalItems = 3;
  const recipes = (await RecipeService.listAll()).slice(0, totalItems);
  return{
    props:{
      recipes
    }
  }
}

export default function Home({recipes}) {
  
  const categories = useMemo(() => {
    const categoriesList = {};
    recipes.forEach(recipe => categoriesList[recipe.category] = true);
    return Object.keys(categoriesList).sort();
  }, [recipes])  

  return (
    <div>    
      <Header title="Na Cozinha"></Header> 
      {categories.map(category => (
         <RecipeCategory key={category} recipeList={recipes} category={category} />
      ))}      
        
      <Footer></Footer>      
    </div>
  )
}
