import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { tap } from "rxjs/operators";
import { Title } from "@angular/platform-browser";
import { routerNavigatedAction } from "@ngrx/router-store";

@Injectable()
export class TitleEffects {
  constructor(
    private readonly actions$: Actions,
    private titleService: Title
  ) {}

  updateTitle$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(routerNavigatedAction),
        tap((action) => {
          const routerState = action.payload.routerState as any;

          let titleText = routerState.url.replaceAll("/", " ");

          let textReplace = Object.values(routerState.params).join("");
          this.titleService.setTitle(
            titleText.replace(textReplace, "") + " UVMS"
          );
        })
      ),
    { dispatch: false }
  );
}
