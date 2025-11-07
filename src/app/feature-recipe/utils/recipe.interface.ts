import { IBackendErrors } from '@app/utils';

export interface ICreateRecipe {
    title: string;
    ingredients: string;
    instructions: string;
    description: string;
    image: string;
    recommendList?: { _id: string }[];
}

export interface IRecipe extends ICreateRecipe {
    _id?: string;
    owner: string;
}

export interface IRecipeQuery {
    search?: string;
    owner?: string;
}

export interface IRecipeState {
    isLoading: boolean;
    validatonErrors: IBackendErrors | null;
    recipeList: IRecipe[] | null;
}
