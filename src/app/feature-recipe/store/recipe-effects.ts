import { IRecipe } from '@app/feature-recipe/utils/recipe.interface';
import { RecipeService } from './../data-access/recipe.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { recipeActions } from './recipe-actions';
import { inject } from '@angular/core';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertService } from '@app/data-access';

export const getAllRecipesEffect = createEffect(
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

export const getRecipeByIdEffect = createEffect(
    (actions$ = inject(Actions), recipeService = inject(RecipeService)) => {
        return actions$.pipe(
            ofType(recipeActions.getRecipeById),
            switchMap(({ recipeId }) => {
                return recipeService.getRecipeById(recipeId).pipe(
                    map((recipe: IRecipe) => {
                        return recipeActions.getRecipeByIdSuccess({ recipe });
                    }),
                    catchError((err: HttpErrorResponse) => {
                        return of(
                            recipeActions.getRecipeByIdFailure({
                                errors: err?.error?.error,
                            }),
                        );
                    }),
                );
            }),
        );
    },
    {
        functional: true,
    },
);

export const deleteRecipeByIdEffect = createEffect(
    (actions$ = inject(Actions), recipeService = inject(RecipeService)) => {
        return actions$.pipe(
            ofType(recipeActions.deleteRecipeById),
            switchMap(({ recipeId }) => {
                return recipeService.delete(recipeId).pipe(
                    map(() => {
                        return recipeActions.deleteRecipeByIdSuccess();
                    }),
                    catchError((err: HttpErrorResponse) => {
                        return of(
                            recipeActions.deleteRecipeByIdFailure({
                                errors: err?.error?.error,
                            }),
                        );
                    }),
                );
            }),
        );
    },
    {
        functional: true,
    },
);

export const redirectAndAlertEffectAfterDeleteRecipeByIdSuccess = createEffect(
    (
        actions$ = inject(Actions),
        router = inject(Router),
        alertService = inject(AlertService),
    ) => {
        return actions$.pipe(
            ofType(recipeActions.deleteRecipeByIdSuccess),
            tap(() => {
                alertService.showSuccessAlert('recipe', 'recommended');
                router.navigateByUrl('/recipes');
            }),
        );
    },
    { functional: true, dispatch: false },
);

export const createRecipeEffect = createEffect(
    (actions$ = inject(Actions), recipeService = inject(RecipeService)) => {
        return actions$.pipe(
            ofType(recipeActions.createRecipe),
            switchMap(({ recipe }) => {
                return recipeService.create(recipe).pipe(
                    map((recipe: IRecipe) => {
                        return recipeActions.createRecipeSuccess({
                            recipe,
                        });
                    }),
                    catchError((err: HttpErrorResponse) => {
                        return of(
                            recipeActions.createRecipeFailure({
                                errors: err?.error?.error,
                            }),
                        );
                    }),
                );
            }),
        );
    },
    {
        functional: true,
    },
);

export const redirectAndAlertEffectAfterCreatedRecipeSuccess = createEffect(
    (
        actions$ = inject(Actions),
        router = inject(Router),
        alertService = inject(AlertService),
    ) => {
        return actions$.pipe(
            ofType(recipeActions.createRecipeSuccess),
            tap(() => {
                alertService.showSuccessAlert('recipe', 'created');
                router.navigateByUrl('/recipes');
            }),
        );
    },
    { functional: true, dispatch: false },
);

export const updateRecipeByIdEffect = createEffect(
    (actions$ = inject(Actions), recipeService = inject(RecipeService)) => {
        return actions$.pipe(
            ofType(recipeActions.updateRecipeById),
            switchMap(({ recipe }) => {
                return recipeService.update(recipe).pipe(
                    map((recipe: IRecipe) => {
                        return recipeActions.updateRecipeByIdSuccess({
                            recipe,
                        });
                    }),
                    catchError((err: HttpErrorResponse) => {
                        return of(
                            recipeActions.updateRecipeByIdFailure({
                                errors: err?.error?.error,
                            }),
                        );
                    }),
                );
            }),
        );
    },
    {
        functional: true,
    },
);

export const redirectAndAlertEffectAfterUpdateRecipeByIdSuccess = createEffect(
    (
        actions$ = inject(Actions),
        router = inject(Router),
        alertService = inject(AlertService),
    ) => {
        return actions$.pipe(
            ofType(recipeActions.updateRecipeByIdSuccess),
            tap(({ recipe }) => {
                alertService.showSuccessAlert('recipe', 'updated');
                router.navigateByUrl(`/recipes/${recipe._id}`);
            }),
        );
    },
    { functional: true, dispatch: false },
);

export const recommendRecipeByIdEffect = createEffect(
    (actions$ = inject(Actions), recipeService = inject(RecipeService)) => {
        return actions$.pipe(
            ofType(recipeActions.recommendRecipeById),
            switchMap(({ recipeId }) => {
                return recipeService.recommend(recipeId).pipe(
                    map((recipe: IRecipe) => {
                        return recipeActions.recommendRecipeByIdSuccess({
                            recipe,
                        });
                    }),
                    catchError((err: HttpErrorResponse) => {
                        return of(
                            recipeActions.recommendRecipeByIdFailure({
                                errors: err?.error?.error,
                            }),
                        );
                    }),
                );
            }),
        );
    },
    {
        functional: true,
    },
);

export const showAlertEffectRecommendRecipeByIdSuccess = createEffect(
    (actions$ = inject(Actions), alertService = inject(AlertService)) => {
        return actions$.pipe(
            ofType(recipeActions.recommendRecipeByIdSuccess),
            tap(() => {
                alertService.showSuccessAlert('recipe', 'recommended');
            }),
        );
    },
    { functional: true, dispatch: false },
);
