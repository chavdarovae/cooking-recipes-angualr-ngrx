import { Routes } from '@angular/router';
import { RecipeListComponent } from './features/recipe-list/recipe-list.component';

export const RECIPE_ROUTES: Routes = [
    {
        path: '',
        component: RecipeListComponent,
    },
];
