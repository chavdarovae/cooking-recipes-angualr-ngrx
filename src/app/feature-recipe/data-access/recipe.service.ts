import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { UtilService } from '@app/utils';
import { environment } from '@env/environment';
import { filter, Observable, shareReplay, Subject, switchMap } from 'rxjs';
import {
    ICreateRecipe,
    IRecipe,
    IRecipeQuery,
    IUpdateRecipe,
} from '../utils/recipe.interface';

@Injectable({
    providedIn: 'root',
})
export class RecipeService {
    private http = inject(HttpClient);
    private utilService = inject(UtilService);

    //auxiliary variables
    accountApi = environment.backendUrl + '/api/recipes';

    // service state recipe list
    private relaodRecipesSubj: Subject<IRecipeQuery> = new Subject();
    recipes$: Observable<IRecipe[]> = this.relaodRecipesSubj
        .asObservable()
        .pipe(
            switchMap((query: IRecipeQuery) => {
                const params =
                    this.utilService.transformQueryIntoParams<IRecipeQuery>(
                        query,
                    );

                return this.http.get<IRecipe[]>(this.accountApi, { params });
            }),
            shareReplay(),
        );
    recipesSig = toSignal(this.recipes$, { initialValue: [] as IRecipe[] });

    // service state selected recipe
    private selectedRecipeSubj: Subject<string> = new Subject();
    private selectedRecipe$: Observable<IRecipe> = this.selectedRecipeSubj
        .asObservable()
        .pipe(
            filter((id: string) => !!id),
            switchMap((id: string) =>
                this.http.get<IRecipe>(`${this.accountApi}/${id}`),
            ),
        );
    selectedRecipeSig = toSignal(this.selectedRecipe$, { initialValue: null });

    reloadRecipes(query: IRecipeQuery) {
        this.relaodRecipesSubj.next(query);
    }

    selectRecipe(id: string) {
        this.selectedRecipeSubj.next(id);
    }

    getAllRecipes(query: IRecipeQuery): Observable<IRecipe[]> {
        const params =
            this.utilService.transformQueryIntoParams<IRecipeQuery>(query);
        return this.http.get<IRecipe[]>(this.accountApi, { params });
    }

    getRecipeById(recipeId: string): Observable<IRecipe> {
        return this.http.get<IRecipe>(`${this.accountApi}/${recipeId}`);
    }

    create(newRecipe: ICreateRecipe): Observable<IRecipe> {
        return this.http.post<IRecipe>(this.accountApi, newRecipe);
    }

    update(updatedRecipe: IUpdateRecipe) {
        return this.http.put<IRecipe>(
            `${this.accountApi}/${updatedRecipe._id}`,
            updatedRecipe,
        );
    }

    recommend(id?: string) {
        return this.http.get<IRecipe>(`${this.accountApi}/${id}/recommend`);
    }

    delete(id?: string) {
        return this.http.delete<any>(`${this.accountApi}/${id}`);
    }
}
