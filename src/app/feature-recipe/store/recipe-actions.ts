import { createActionGroup, props } from '@ngrx/store';
import { IRecipe, IRecipeQuery } from '../utils/recipe.interface';
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
    },
});
