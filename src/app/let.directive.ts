import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

/**
 * This interface represents context of the directive.
 *
 * It defines two properties ($implicit and appLet) which enables same behavior with different syntax.
 * It is not required to have both, it is just a way to provide support for both syntax.
 */
interface LetContext<T> {
  /**
   * Current item exposed in implicit value variable.
   * This enables us to use the let syntax
   *
   * @example
   * <ng-container *appLet="data$ | async; let data">
   *   Data: {{data}}
   * </ng-container>
   */
  $implicit?: T; // current item exposed as implicit value
  /**
   * Current item exposed as key matching the directive name.
   * This adds support for `as` syntax in template.
   *
   * @example
   * <ng-container *appLet="data$ | async as data">
   *   Data: {{data}}
   * </ng-container>
   */
  appLet?: T;
}

@Directive({
  selector: '[appLet]',
})
export class LetDirective<T> {
  private readonly context: LetContext<T> = {
    $implicit: undefined,
    appLet: undefined,
  };

  constructor(
    private readonly viewRef: ViewContainerRef,
    private readonly templateRef: TemplateRef<LetContext<T>>,
  ) {
    this.viewRef.createEmbeddedView(this.templateRef, this.context);
  }

  @Input()
  set appLet(value: T) {
    this.context.appLet = this.context.$implicit = value;
  }
}
