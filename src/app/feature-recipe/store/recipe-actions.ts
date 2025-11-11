import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
    ICreateRecipe,
    IRecipe,
    IRecipeQuery,
    IUpdateRecipe,
} from '../utils/recipe.interface';
import { IBackendErrors } from '@app/utils';

export const recipeActions = createActionGroup({
    source: 'recipeActions',
    events: {
        getAllRecipes: props<{ query: IRecipeQuery }>(),
        getAllRecipesSuccess: props<{ recipeList: IRecipe[] }>(),
        getAllRecipesFailure: props<{ errors: IBackendErrors }>(),

        getRecipeById: props<{ recipeId: string }>(),
        getRecipeByIdSuccess: props<{ recipe: IRecipe }>(),
        getRecipeByIdFailure: props<{ errors: IBackendErrors }>(),

        createRecipe: props<{ recipe: ICreateRecipe }>(),
        createRecipeSuccess: props<{ recipe: IRecipe }>(),
        createRecipeFailure: props<{ errors: IBackendErrors }>(),

        deleteRecipeById: props<{ recipeId: string }>(),
        deleteRecipeByIdSuccess: emptyProps(),
        deleteRecipeByIdFailure: props<{ errors: IBackendErrors }>(),

        updateRecipeById: props<{ recipe: IUpdateRecipe }>(),
        updateRecipeByIdSuccess: props<{ recipe: IRecipe }>(),
        updateRecipeByIdFailure: props<{ errors: IBackendErrors }>(),

        recommendRecipeById: props<{ recipeId: string }>(),
        recommendRecipeByIdSuccess: props<{ recipe: IRecipe }>(),
        recommendRecipeByIdFailure: props<{ errors: IBackendErrors }>(),
    },
});
