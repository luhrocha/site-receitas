import { Button, Grid, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Paper, TextField } from "@material-ui/core"
import Head from "next/head";
import { useState } from "react";
import {RecipeService} from '../../services/RecipeService';

export default function cadastro(){
    const [img, setImg] = useState(''),
          [name, setName] = useState(''),
          [category, setCategory] = useState(''),
          [servings, setServings] = useState(''),
          [time, setTime] = useState(''),
          [ingredients, setIngredients] = useState([]),
          [newIngredient, setNewIngredient] = useState(''),
          [directions, setDirections] = useState([]),
          [newDirection, setNewDirection] = useState('');

    function resertForm(){
        setImg('');
        setName('');
        setCategory('');
        setServings('');
        setTime('');
        setIngredients([]);
        setNewIngredient('');
        setDirections([]);
        setNewDirection('');
    }

    async function addRecipe(){
        const fieldsLength = [
            img,
            name,
            category,
            servings,
            time,
            ingredients,
            directions,
        ].map(item => item.length);

        if(fieldsLength.includes(0)){
            return false;
        }

        const newRecipe = await RecipeService.create({
            img,
            name,
            category,
            servings,
            time,
            ingredients,
            directions,
        });

        resertForm();
    }

    function addIngredient(){
            if(newIngredient && ingredients.indexOf(newIngredient) === -1){
                setIngredients([...ingredients, newIngredient]);
                setNewIngredient('');
            }
    }

    function removeIngredient(ingredientToRemove){
        setIngredients(ingredients.filter(ingredient => ingredient !== ingredientToRemove));
    }

    function addDirection(){
        if(newDirection && directions.indexOf(newDirection) === -1){
            setDirections([...directions, newDirection]);
            setNewDirection('');
        }
    }

    function removeDirection(directionToRemove){
        setDirections(directions.filter(direction => direction !== directionToRemove));
    }

    return(
        <div>
            <Head>
                <title>Cadastro de receita</title>
                <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet"></link>
            </Head>
            <h1>Cadastro de Receita</h1>

            <Paper style={{margin: '24px auto', maxWidth:'800px', padding:'12px'}}>
                <Grid container spacing={2}>
                    <Grid item container justify={'center'}>
                        <img width={250}  src={img}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Imagem" value={img} onChange={event => setImg(event.target.value)} fullWidth/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Nome" value={name} onChange={event => setName(event.target.value)} fullWidth/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Categoria" value={category} onChange={event => setCategory(event.target.value)} fullWidth/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField label="Tempo de Preparo" value={time} onChange={event => setTime(event.target.value)} fullWidth/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField label="Rendimento" value={servings} onChange={event => setServings(event.target.value)} fullWidth/>
                    </Grid>

                    <Grid item xs={12} container spacing={2}>
                        <Grid item xs={12}><h2>Ingredientes</h2></Grid>
                        <Grid item xs={12} container>
                            <List>
                                {ingredients.map(ingredient => (
                                    <ListItem key={ingredient}>
                                        <ListItemText>{ingredient}</ListItemText>
                                        <ListItemSecondaryAction>
                                            <IconButton edge='end' aria-label="delete" color={'secondary'} onClick={() => removeIngredient(ingredient)}>X</IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                ))}
                            </List>
                        </Grid>
                        <Grid item xs={12} container spacing={2}>
                            <Grid item xs={10}>
                                <TextField label="Novo Ingrediente" value={newIngredient} onChange={event => setNewIngredient(event.target.value)} fullWidth/>
                            </Grid>
                            <Grid item xs={2}>
                                <Button variant="outlined" onClick={addIngredient}>Adicionar</Button>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} container spacing={2}>
                        <Grid item xs={12}><h2>Modo de Preparo</h2></Grid>
                        <Grid item xs={12} container>
                            <List>
                                {directions.map(direction => (
                                    <ListItem key={direction}>
                                        <ListItemText>{direction}</ListItemText>
                                        <ListItemSecondaryAction>
                                            <IconButton edge='end' aria-label="delete" color={'secondary'} onClick={() => removeDirection(direction)}>X</IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                ))}
                            </List>
                        </Grid>
                        <Grid item xs={12} container spacing={2}>
                            <Grid item xs={10}>
                                <TextField label="Novo passo" value={newDirection} onChange={event => setNewDirection(event.target.value)} fullWidth/>
                            </Grid>
                            <Grid item xs={2}>
                                <Button variant="outlined" onClick={addDirection}>Adicionar</Button>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} container spacing={2} justify={'center'}>
                        <Grid item>
                            <Button onClick={resertForm}>Reiniciar</Button>
                        </Grid>
                        <Grid item>
                            <Button color={'primary'} variant={'contained'} onClick={addRecipe}>Cadastrar</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
} 