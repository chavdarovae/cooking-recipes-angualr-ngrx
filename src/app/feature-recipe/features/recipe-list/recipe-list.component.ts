import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit, Signal } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RecipeService } from '@app/feature-recipe/data-access/recipe.service';
import { recipeActions } from '@app/feature-recipe/store/recipe-actions';
import {
    selectIsLoading,
    selectRecipeList,
    selectValidatonErrors,
} from '@app/feature-recipe/store/recipe-reducers';
import { CardComponent } from '@app/feature-recipe/ui/card-component.ts/card.component';
import { IRecipe } from '@app/feature-recipe/utils/recipe.interface';
import { RecipeQuery } from '@app/feature-recipe/utils/recipe.models';
import { InputFieldComponent } from '@app/ui';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';

@Component({
    selector: 'app-recipe-list',
    standalone: true,
    templateUrl: './recipe-list.component.html',
    styleUrl: './recipe-list.component.scss',
    imports: [AsyncPipe, CardComponent, InputFieldComponent],
    providers: [NgForm],
})
export class RecipeListComponent implements OnInit {
    // services
    private store = inject(Store);

    data$ = combineLatest({
        isLoading: this.store.select(selectIsLoading),
        recipeList: this.store.select(selectRecipeList),
        backendErrors: this.store.select(selectValidatonErrors),
    });

    // auxiliary variables
    query!: RecipeQuery;

    ngOnInit(): void {
        this.query = new RecipeQuery('');
        this.store.dispatch(recipeActions.getAllRecipes({ query: this.query }));
    }

    onSearchStringChange(searchStr: string) {
        const query = { ...this.query, search: searchStr };
        this.store.dispatch(recipeActions.getAllRecipes({ query }));
    }
}
