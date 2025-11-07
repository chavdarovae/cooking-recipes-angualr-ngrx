import { createFeature, createReducer, on } from '@ngrx/store';
import { IRecipeState } from '../utils/recipe.interface';
import { recipeActions } from './recipe-actions';
import { routerNavigatedAction } from '@ngrx/router-store';

const initalState: IRecipeState = {
    isLoading: false,
    validatonErrors: null,
    recipeList: null,
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
        // restores the state back to minimal information in memory
        on(routerNavigatedAction, () => initalState),
    ),
});

export const {
    name: recipeFeatureKey,
    reducer: recipeReducer,
    selectIsLoading,
    selectRecipeList,
    selectValidatonErrors,
} = recipeFeature;
