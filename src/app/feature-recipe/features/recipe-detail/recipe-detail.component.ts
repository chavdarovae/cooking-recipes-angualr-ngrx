import { AsyncPipe } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { combineLatest, tap } from 'rxjs';
import { ModalComponent } from '@app/ui';
import { selectCurrentUser } from '@app/data-access';
import { IRecipe } from '@app/feature-recipe/utils/recipe.interface';
import { Store } from '@ngrx/store';
import { recipeActions } from '@app/feature-recipe/store/recipe-actions';
import {
    selectIsLoading,
    selectRecipe,
    selectValidatonErrors,
} from '../../store/recipe-reducers';

type RecipeUserInteractionType = 'deleteDialog' | 'delete' | 'recommend';

@Component({
    selector: 'app-recipe-detail',
    standalone: true,
    templateUrl: './recipe-detail.component.html',
    styleUrl: './recipe-detail.component.scss',
    imports: [RouterLink, ModalComponent, AsyncPipe],
})
export class RecipeDetailComponent implements OnInit {
    // services
    private store = inject(Store);

    // implicit input from routing
    @Input() id!: string;

    // main entity
    currRecipe!: IRecipe | null;

    data$ = combineLatest({
        isLoading: this.store.select(selectIsLoading),
        recipe: this.store.select(selectRecipe),
        backendErrors: this.store.select(selectValidatonErrors),
        currUser: this.store.select(selectCurrentUser),
    }).pipe(
        tap((data) => {
            this.currRecipe = data.recipe;
            this.isRecommendedByCurrUser = !!data.recipe?.recommendList?.some(
                (x) => x._id === data.currUser?._id,
            );
        }),
    );

    // auxiliary variables
    showModal = false;
    isRecommendedByCurrUser!: boolean;

    ngOnInit(): void {
        this.store.dispatch(recipeActions.getRecipeById({ recipeId: this.id }));
    }

    onModalClosed(confirmation: boolean) {
        if (confirmation) {
            this.modifyEntity('delete');
        }
        this.showModal = false;
    }

    modifyEntity(action: RecipeUserInteractionType) {
        if (!this.currRecipe?._id) return;
        switch (action) {
            case 'deleteDialog':
                this.showModal = true;
                break;
            case 'delete':
                this.store.dispatch(
                    recipeActions.deleteRecipeById({
                        recipeId: this.currRecipe._id,
                    }),
                );
                break;
            case 'recommend':
                this.store.dispatch(
                    recipeActions.recommendRecipeById({
                        recipeId: this.currRecipe._id,
                    }),
                );
                break;
        }
    }
}
