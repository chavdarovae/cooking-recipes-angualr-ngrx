import { Routes } from '@angular/router';
import { RecipeListComponent } from './features/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './features/recipe-detail/recipe-detail.component';
import { createComponent } from '@angular/core';
import { RecipeCreateComponent } from './features/recipe-create/recipe-create.component';

export const RECIPE_ROUTES: Routes = [
    {
        path: '',
        component: RecipeListComponent,
    },
    {
        path: 'create',
        component: RecipeCreateComponent,
    },
    {
        path: ':id',
        component: RecipeDetailComponent,
    },
    {
        path: ':id/edit',
        component: RecipeCreateComponent,
    },
];
