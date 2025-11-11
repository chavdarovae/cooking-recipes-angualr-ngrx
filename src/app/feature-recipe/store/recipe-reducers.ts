import { createFeature, createReducer, on } from '@ngrx/store';
import { IRecipeState } from '../utils/recipe.interface';
import { recipeActions } from './recipe-actions';
import { routerNavigatedAction } from '@ngrx/router-store';

const initalState: IRecipeState = {
    isLoading: false,
    validatonErrors: null,
    recipeList: null,
    recipe: null,
};

const recipeFeature = createFeature({
    name: 'recipe',
    reducer: createReducer(
        initalState,
        on(recipeActions.getAllRecipes, (state) => ({
            ...state,
            isLoading: true,
        })),
        on(recipeActions.getAllRecipesSuccess, (state, action) => ({
            ...state,
            isLoading: false,
            recipeList: action.recipeList,
        })),
        on(recipeActions.getAllRecipesFailure, (state, action) => ({
            ...state,
            isLoading: false,
            validatonErrors: action.errors,
        })),

        // getRecipeById
        on(recipeActions.getRecipeById, (state) => ({
            ...state,
            isLoading: true,
        })),
        on(recipeActions.getRecipeByIdSuccess, (state, action) => ({
            ...state,
            isLoading: false,
            recipe: action.recipe,
        })),
        on(recipeActions.getRecipeByIdFailure, (state, action) => ({
            ...state,
            isLoading: false,
            validatonErrors: action.errors,
        })),

        // createRecipe
        on(recipeActions.createRecipe, (state) => ({
            ...state,
            isLoading: true,
        })),
        on(recipeActions.createRecipeSuccess, (state, action) => ({
            ...state,
            isLoading: false,
            recipe: action.recipe,
        })),
        on(recipeActions.createRecipeFailure, (state, action) => ({
            ...state,
            isLoading: false,
            validatonErrors: action.errors,
        })),

        // deleteRecipeById
        on(recipeActions.deleteRecipeById, (state) => ({
            ...state,
            isLoading: true,
        })),
        on(recipeActions.deleteRecipeByIdSuccess, (state) => ({
            ...state,
            isLoading: false,
            recipe: null,
        })),
        on(recipeActions.deleteRecipeByIdFailure, (state, action) => ({
            ...state,
            isLoading: false,
            validatonErrors: action.errors,
        })),

        // updateRecipeById
        on(recipeActions.updateRecipeById, (state) => ({
            ...state,
            isLoading: true,
        })),
        on(recipeActions.updateRecipeByIdSuccess, (state, action) => ({
            ...state,
            isLoading: false,
            recipe: action.recipe,
        })),
        on(recipeActions.updateRecipeByIdFailure, (state, action) => ({
            ...state,
            isLoading: false,
            validatonErrors: action.errors,
        })),

        // recommendRecipeById
        on(recipeActions.recommendRecipeById, (state) => ({
            ...state,
            isLoading: true,
        })),
        on(recipeActions.recommendRecipeByIdSuccess, (state, action) => ({
            ...state,
            isLoading: false,
            recipe: action.recipe,
        })),
        on(recipeActions.recommendRecipeByIdFailure, (state, action) => ({
            ...state,
            isLoading: false,
            validatonErrors: action.errors,
        })),
        // restores the state back to minimal information in memory
        on(routerNavigatedAction, (state, action) => {
            const url = action.payload.routerState.url;
            const isRecipeEditRoute = url.endsWith('/edit');
            return {
                ...initalState,
                recipe: isRecipeEditRoute ? state.recipe : null,
            };
        }),
    ),
});

export const {
    name: recipeFeatureKey,
    reducer: recipeReducer,
    selectIsLoading,
    selectRecipeList,
    selectRecipe,
    selectValidatonErrors,
} = recipeFeature;
