import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IRecipe } from '@app/feature-recipe/utils/recipe.interface';

@Component({
    selector: 'rcp-card',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './card.component.html',
    styleUrl: './card.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
    recipe = input<IRecipe>();
}
