import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { InputFieldComponent, InputTextareaComponent } from '@app/ui';
import { IRecipe } from '@app/feature-recipe/utils/recipe.interface';
import { RecipeCreateItem } from '@app/feature-recipe/utils/recipe.models';
import { Store } from '@ngrx/store';
import { combineLatest, tap } from 'rxjs';
import {
    selectRecipe,
    selectIsLoading,
} from '@app/feature-recipe/store/recipe-reducers';
import { recipeActions } from '@app/feature-recipe/store/recipe-actions';

type RecipeUserInteractionType = 'create' | 'update';

@Component({
    selector: 'app-recipe-create',
    standalone: true,
    templateUrl: './recipe-create.component.html',
    styleUrl: './recipe-create.component.scss',
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        InputFieldComponent,
        InputTextareaComponent,
    ],
})
export class RecipeCreateComponent {
    private store = inject(Store);

    // main entity
    currRecipe!: IRecipe | RecipeCreateItem;
    allowedAction!: RecipeUserInteractionType;
    data$ = combineLatest({
        isLoading: this.store.select(selectIsLoading),
        recipe: this.store.select(selectRecipe),
    }).pipe(
        tap((data) => {
            this.currRecipe = data.recipe
                ? { ...data.recipe }
                : new RecipeCreateItem();
            this.allowedAction = (this.currRecipe as IRecipe)?._id
                ? 'update'
                : 'create';
        }),
    );

    onSubmit(action: RecipeUserInteractionType) {
        const recipe = { ...this.currRecipe };
        switch (action) {
            case 'update':
                this.store.dispatch(recipeActions.updateRecipeById({ recipe }));
                break;
            case 'create':
                this.store.dispatch(recipeActions.createRecipe({ recipe }));
                break;
        }
    }
}
