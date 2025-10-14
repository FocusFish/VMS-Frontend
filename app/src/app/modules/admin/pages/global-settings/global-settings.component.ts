import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { State } from "@app/app-reducer";
import { AdminActions, AdminSelectors } from "@data/admin";
import { GlobalItem } from "@data/admin/admin.types";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { filter, takeUntil } from "rxjs/operators";
import { GlobalSettingsHelper } from "./global-settings.helper";

@Component({
  selector: "app-global-settings",
  templateUrl: "./global-settings.component.html",
  styleUrl: "./global-settings.component.scss",
  standalone: false,
})
export class GlobalSettingsComponent implements OnInit, OnDestroy {
  private unmount$: Subject<boolean> = new Subject<boolean>();

  public globalSettingsForm: FormGroup;

  public globalSettings: GlobalItem[] = [];

  constructor(
    private store: Store<State>,
    public helper: GlobalSettingsHelper
  ) {}

  ngOnInit(): void {
    this.store.dispatch(AdminActions.loadGlobals());

    this.store
      .select(AdminSelectors.getGlobals)
      .pipe(
        filter((globals) => Object.values(globals).length > 0),
        takeUntil(this.unmount$)
      )
      .subscribe((globals) => {
        this.globalSettings = globals;

        const formGroupObject = {};

        Object.values(this.globalSettings).forEach((item) => {
          if (item.key === "availableLanguages") {
            formGroupObject[item.key] = new FormArray([]);
            const languages = item.value.split(",");
            languages.forEach((lang) => {
              console.log("LANG", lang);
              formGroupObject[item.key].push(new FormControl(lang));
            });

            console.log("MegaNinjaSuperArr", formGroupObject[item.key]);
          } else {
            formGroupObject[item.key] = new FormControl(item.value);
          }
        });

        this.globalSettingsForm = new FormGroup(formGroupObject);
      });
  }

  ngOnDestroy(): void {
    this.unmount$.next(true);
    this.unmount$.unsubscribe();
  }

  addLanguage() {
    const languages = this.globalSettingsForm.get(
      "availableLanguages"
    ) as FormArray;
    languages.push(new FormControl(""));
  }

  getKeyValuePairs() {
    return this.globalSettings.map((x) => ({ key: x.key, value: x.value }));
  }
}
