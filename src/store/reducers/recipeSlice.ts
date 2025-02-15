import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define types
interface Bookmark {
    idMeal: string;
    strMeal: string;
    strCategory: string;
    strMealThumb: string;
}

interface Recipe {
    id: string;
    title: string;
    description: string;
    ingredients: string;
    image: string;
}

interface RecipeState {
    bookMarks: Bookmark[];
    myRecipe: Recipe[];
}

// Initial state
const initialState: RecipeState = {
    bookMarks: [],
    myRecipe: [],
};

// Create slice
const recipeSlice = createSlice({
    name: 'recipe',
    initialState,
    reducers: {
        addToBookmarks: (state, action: PayloadAction<Bookmark>) => {
            state.bookMarks.push(action.payload);
        },
        removeFromBookmarks: (state, action: PayloadAction<{ id: string }>) => {
            state.bookMarks = state.bookMarks.filter(item => item.idMeal !== action.payload.id);
        },
        addToMyRecipe: (state, action: PayloadAction<Recipe>) => {
            state.myRecipe.push(action.payload);
        },
        removeFromMyRecipe: (state, action: PayloadAction<{ id: string }>) => {
            state.myRecipe = state.myRecipe.filter(item => item.id !== action.payload.id);
        }
    },
});

// Export actions & reducer
export const { addToBookmarks, removeFromBookmarks, addToMyRecipe, removeFromMyRecipe } = recipeSlice.actions;
export default recipeSlice.reducer;
