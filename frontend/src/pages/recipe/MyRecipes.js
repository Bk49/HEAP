import { Fragment } from "react";
import HeadingOne from "../../components/common/heading/HeadingOne";
import TextIconButton from "../../components/common/button/TextIconButton";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import RecipeCard from "../../components/recipe/card/RecipeCard";

const recipes = [
    {
        id: 1,
        name: "Spaghetti Bolognese",
        type: "Italian",
        cost: 15,
        ingredients: [
            "spaghetti",
            "ground beef",
            "onion",
            "garlic",
            "tomato sauce",
            "olive oil",
        ],
        steps: [
            "Cook spaghetti according to package instructions.",
            "In a large pan, heat olive oil and sauté onion and garlic.",
            "Add ground beef and cook until browned.",
            "Pour in tomato sauce and simmer for 20 minutes.",
            "Serve sauce over cooked spaghetti.",
        ],
    },
    {
        id: 2,
        name: "Chicken Stir-Fry",
        type: "Asian",
        cost: 12,
        ingredients: [
            "chicken breast",
            "bell peppers",
            "broccoli",
            "soy sauce",
            "garlic",
            "ginger",
        ],
        steps: [
            "Slice chicken into strips.",
            "In a wok or large pan, heat oil and stir-fry chicken until cooked.",
            "Add chopped bell peppers and broccoli.",
            "Mix soy sauce, minced garlic, and grated ginger.",
            "Pour sauce over the stir-fry and cook for another 2 minutes.",
            "Serve hot with rice.",
        ],
    },
    {
        id: 3,
        name: "Caprese Salad",
        type: "Italian",
        cost: 8,
        ingredients: [
            "tomatoes",
            "mozzarella cheese",
            "fresh basil",
            "olive oil",
            "balsamic vinegar",
        ],
        steps: [
            "Slice tomatoes and mozzarella cheese into rounds.",
            "Arrange them on a plate, alternating between tomato and cheese slices.",
            "Sprinkle fresh basil leaves over the top.",
            "Drizzle olive oil and balsamic vinegar on the salad.",
            "Season with salt and pepper to taste.",
        ],
    },
    {
        id: 4,
        name: "Beef Tacos",
        type: "Mexican",
        cost: 10,
        ingredients: [
            "beef",
            "taco shells",
            "lettuce",
            "tomatoes",
            "cheese",
            "sour cream",
        ],
        steps: [
            "Cook beef in a skillet until browned.",
            "Warm taco shells in the oven.",
            "Chop lettuce, tomatoes, and grate cheese.",
            "Fill each taco shell with cooked beef and desired toppings.",
            "Add a dollop of sour cream.",
            "Serve immediately.",
        ],
    },
    {
        id: 5,
        name: "Mushroom Risotto",
        type: "Italian",
        cost: 9,
        ingredients: [
            "arborio rice",
            "mushrooms",
            "onion",
            "vegetable broth",
            "parmesan cheese",
            "butter",
        ],
        steps: [
            "Sauté mushrooms and onions in butter until tender.",
            "In a separate pan, toast the arborio rice until lightly golden.",
            "Add vegetable broth, one ladle at a time, stirring continuously.",
            "Continue adding broth and stirring until the rice is cooked and creamy.",
            "Stir in grated parmesan cheese.",
            "Serve hot.",
        ],
    },
    {
        id: 6,
        name: "Teriyaki Salmon",
        type: "Asian",
        cost: 14,
        ingredients: [
            "salmon fillets",
            "soy sauce",
            "honey",
            "ginger",
            "garlic",
            "sesame seeds",
        ],
        steps: [
            "Mix soy sauce, honey, minced ginger, and garlic in a bowl.",
            "Marinate salmon fillets in the mixture for 30 minutes.",
            "Heat oil in a skillet and cook the salmon for 4-5 minutes on each side.",
            "Sprinkle sesame seeds on top.",
            "Serve with steamed rice or vegetables.",
        ],
    },
    {
        id: 7,
        name: "Caesar Salad",
        type: "International",
        cost: 7,
        ingredients: [
            "romaine lettuce",
            "croutons",
            "parmesan cheese",
            "Caesar dressing",
        ],
        steps: [
            "Wash and chop romaine lettuce.",
            "Add croutons and shaved parmesan cheese.",
            "Pour Caesar dressing over the salad.",
            "Toss well to coat all ingredients.",
            "Serve immediately.",
        ],
    },
    {
        id: 8,
        name: "Hawaiian Pizza",
        type: "International",
        cost: 11,
        ingredients: [
            "pizza dough",
            "ham",
            "pineapple chunks",
            "mozzarella cheese",
            "tomato sauce",
        ],
        steps: [
            "Roll out pizza dough into a round shape.",
            "Spread tomato sauce evenly on the dough.",
            "Top with ham, pineapple chunks, and mozzarella cheese.",
            "Bake in a preheated oven at 400°F (200°C) for 15-20 minutes.",
            "Slice and serve hot.",
        ],
    },
    {
        id: 9,
        name: "Chicken Parmesan",
        type: "Italian",
        cost: 13,
        ingredients: [
            "chicken breast",
            "bread crumbs",
            "eggs",
            "marinara sauce",
            "mozzarella cheese",
            "parmesan cheese",
        ],
        steps: [
            "Pound chicken breast to an even thickness.",
            "Dip chicken in beaten eggs, then coat with bread crumbs.",
            "Fry chicken in oil until golden brown.",
            "Pour marinara sauce over the chicken and top with mozzarella and parmesan cheese.",
            "Bake in the oven at 350°F (175°C) for 20 minutes.",
            "Serve with pasta or a side salad.",
        ],
    },
    {
        id: 10,
        name: "Beef Stir-Fry",
        type: "Asian",
        cost: 11,
        ingredients: [
            "beef",
            "bell peppers",
            "carrots",
            "broccoli",
            "soy sauce",
            "hoisin sauce",
        ],
        steps: [
            "Slice beef into thin strips.",
            "In a wok or large pan, stir-fry beef until cooked.",
            "Add sliced bell peppers, julienned carrots, and broccoli florets.",
            "Mix soy sauce and hoisin sauce in a bowl.",
            "Pour the sauce over the stir-fry and cook for another 2 minutes.",
            "Serve hot with steamed rice.",
        ],
    },
    {
        id: 11,
        name: "Chicken Noodle Soup",
        type: "International",
        cost: 9,
        ingredients: [
            "chicken broth",
            "chicken breast",
            "carrots",
            "celery",
            "onion",
            "egg noodles",
        ],
        steps: [
            "In a large pot, bring chicken broth to a boil.",
            "Add chicken breast, chopped carrots, celery, and onion.",
            "Simmer for 20-25 minutes until chicken is cooked and vegetables are tender.",
            "Remove chicken, shred it, and return to the pot.",
            "Add egg noodles and cook according to package instructions.",
            "Season with salt and pepper.",
            "Serve hot.",
        ],
    },
    {
        id: 12,
        name: "Margherita Pizza",
        type: "Italian",
        cost: 10,
        ingredients: [
            "pizza dough",
            "tomatoes",
            "fresh basil",
            "mozzarella cheese",
            "olive oil",
        ],
        steps: [
            "Roll out pizza dough into a round shape.",
            "Slice tomatoes and mozzarella cheese into rounds.",
            "Arrange tomato and cheese slices on the dough.",
            "Sprinkle fresh basil leaves over the top.",
            "Drizzle olive oil over the pizza.",
            "Bake in a preheated oven at 450°F (230°C) for 12-15 minutes.",
            "Slice and serve hot.",
        ],
    },
    {
        id: 13,
        name: "Shrimp Scampi",
        type: "Italian",
        cost: 16,
        ingredients: [
            "shrimp",
            "linguine",
            "garlic",
            "butter",
            "lemon juice",
            "parsley",
        ],
        steps: [
            "Cook linguine according to package instructions.",
            "In a skillet, melt butter and sauté minced garlic.",
            "Add shrimp and cook until pink.",
            "Pour in lemon juice and sprinkle parsley.",
            "Toss cooked linguine with the shrimp scampi sauce.",
            "Serve hot.",
        ],
    },
    {
        id: 14,
        name: "Chicken Curry",
        type: "Asian",
        cost: 13,
        ingredients: [
            "chicken thighs",
            "onion",
            "garlic",
            "ginger",
            "curry powder",
            "coconut milk",
        ],
        steps: [
            "Heat oil in a large pot and sauté chopped onion, minced garlic, and grated ginger.",
            "Add chicken thighs and cook until browned.",
            "Stir in curry powder and cook for a minute.",
            "Pour in coconut milk and simmer for 20 minutes.",
            "Serve hot with rice or naan bread.",
        ],
    },
    {
        id: 15,
        name: "Classic Cheeseburger",
        type: "American",
        cost: 9,
        ingredients: [
            "ground beef",
            "hamburger buns",
            "cheese",
            "lettuce",
            "tomato",
            "onion",
        ],
        steps: [
            "Shape ground beef into patties and season with salt and pepper.",
            "Grill or cook the patties in a skillet until desired doneness.",
            "Place a slice of cheese on each patty to melt.",
            "Toast hamburger buns on the grill or in the oven.",
            "Assemble the burger with lettuce, tomato, onion, and condiments of your choice.",
            "Serve hot.",
        ],
    },
    {
        id: 16,
        name: "Chocolate Chip Cookies",
        type: "Dessert",
        cost: 7,
        ingredients: [
            "flour",
            "butter",
            "sugar",
            "brown sugar",
            "eggs",
            "chocolate chips",
        ],
        steps: [
            "Preheat oven to 375°F (190°C).",
            "In a bowl, cream butter, sugar, and brown sugar.",
            "Beat in eggs one at a time.",
            "Gradually add flour and mix well.",
            "Stir in chocolate chips.",
            "Drop spoonfuls of dough onto a baking sheet.",
            "Bake for 8-10 minutes until golden brown.",
            "Allow cookies to cool before serving.",
        ],
    },
    {
        id: 17,
        name: "Chicken Fajitas",
        type: "Mexican",
        cost: 12,
        ingredients: [
            "chicken breast",
            "bell peppers",
            "onion",
            "lime juice",
            "cumin",
            "tortillas",
        ],
        steps: [
            "Slice chicken breast into strips.",
            "In a large skillet, cook chicken with sliced bell peppers and onion.",
            "Mix lime juice and cumin in a small bowl.",
            "Pour the mixture over the chicken and vegetables.",
            "Cook for an additional 2-3 minutes.",
            "Serve hot with warm tortillas and desired toppings.",
        ],
    },
    {
        id: 18,
        name: "Vegetable Stir-Fry",
        type: "Asian",
        cost: 10,
        ingredients: [
            "mixed vegetables",
            "soy sauce",
            "sesame oil",
            "garlic",
            "ginger",
            "rice",
        ],
        steps: [
            "In a wok or large pan, heat sesame oil.",
            "Add minced garlic and grated ginger.",
            "Stir-fry mixed vegetables until tender-crisp.",
            "Mix soy sauce in a small bowl.",
            "Pour the sauce over the vegetables and cook for another 2 minutes.",
            "Serve hot over steamed rice.",
        ],
    },
];

const MyRecipes = () => {
    const navigate = useNavigate();

    return (
        <Fragment>
            <HeadingOne divider={true}>My Recipes</HeadingOne>
            <Grid container direction="row-reverse" alignItems="flex-end">
                <TextIconButton
                    type="primary"
                    onClick={() => navigate("/create-recipe")}
                >
                    Create
                </TextIconButton>
            </Grid>

            <br />
            <Grid container direction="row" columnGap={4} rowGap={5}>
                {recipes.map((recipe, index) => (
                    <Grid item>
                        <RecipeCard key={index} recipe={recipe} />
                    </Grid>
                ))}
            </Grid>
        </Fragment>
    );
};

export default MyRecipes;
