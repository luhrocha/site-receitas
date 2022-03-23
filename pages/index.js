import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import RecipeCard from './components/RecipeCard/RecipeCard'
import {RecipeService} from '../services/RecipeService';
import { useState, useEffect } from 'react';

export default function Home() {
  const [list,setList] = useState([]);
  useEffect(() => {
    RecipeService.listAll().then(setList);
  },[]);

  return (
    <div>    
      <Header title="Na Cozinha"></Header> 
      {list.map(recipe => (
        <RecipeCard key={recipe.id} link={'/'} category={recipe.category} name={recipe.name} picture={recipe.img}></RecipeCard>
       ))}
      <Footer></Footer>      
    </div>
  )
}
