import { RecipeService } from './../data-access/recipe.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { recipeActions } from './recipe-actions';
import { inject } from '@angular/core';
import { catchError, map, of, switchMap } from 'rxjs';
import { IRecipe } from '../utils/recipe.interface';
import { HttpErrorResponse } from '@angular/common/http';

export const recipeEffect = createEffect(
    (actions$ = inject(Actions), recipeService = inject(RecipeService)) => {
        return actions$.pipe(
            ofType(recipeActions.getAllRecipes),
            switchMap(({ query }) => {
                return recipeService.getAllRecipes(query).pipe(
                    map((recipeList: IRecipe[]) => {
                        return recipeActions.getAllRecipesSuccess({
                            recipeList,
                        });
                    }),
                    catchError((err: HttpErrorResponse) => {
                        return of(
                            recipeActions.getAllRecipesFailure({
                                errors: err?.error?.errors,
                            }),
                        );
                    }),
                );
            }),
        );
    },
    { functional: true },
);
