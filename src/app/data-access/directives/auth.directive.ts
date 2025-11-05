import {
    Directive,
    effect,
    ElementRef,
    input,
    Renderer2,
    inject,
} from '@angular/core';
import { UserRolesEnum } from '@app/utils';

@Directive({
    selector: '[rcpIsAuthorised]',
    standalone: true,
})
export class IsAuthorisedDirective {
    // services
    private elementRef = inject(ElementRef);
    private renderer = inject(Renderer2);
    // directive inputs
    rcpIsAuthorised = input.required<UserRolesEnum[]>();
    role = input<UserRolesEnum>();

    constructor() {
        effect(() => {
            const currRole = this.role() ?? UserRolesEnum.GUEST;
            if (this.rcpIsAuthorised().includes(currRole)) {
                this.renderer.setStyle(
                    this.elementRef.nativeElement,
                    'display',
                    '',
                );
            } else {
                this.renderer.setStyle(
                    this.elementRef.nativeElement,
                    'display',
                    'none',
                );
            }
        });
    }
}
