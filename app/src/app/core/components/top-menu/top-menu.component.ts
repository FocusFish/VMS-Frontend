import {
  Component,
  Input,
  OnInit,
  OnChanges,
  OnDestroy,
  ViewEncapsulation,
} from "@angular/core";

// @ts-ignore
import moment from "moment-timezone";
import { formatUnixtimeWithoutDate } from "@app/helpers/datetime-formatter";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { State } from "@app/app-reducer";
import { AuthActions, AuthSelectors } from "@data/auth";
import { filter, take, takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { User } from "@data/auth/auth.types";

@Component({
  selector: "core-top-menu-component",
  templateUrl: "./top-menu.component.html",
  styleUrls: ["./top-menu.component.scss"],
  encapsulation: ViewEncapsulation.None,
  standalone: false,
})
export class TopMenuComponent implements OnInit, OnChanges, OnDestroy {
  private unmount$: Subject<boolean> = new Subject<boolean>();

  @Input() appVersion: string;
  @Input() isAdmin: boolean;
  @Input() setTimezone: (timezone: string) => void;
  @Input() currentTimezone: string;
  @Input() fishingActivityUnlocked: boolean;
  @Input() timeToLogout: number | null;
  @Input() url: string;
  @Input() userName: string;

  public baseUrl = window.location.origin;
  public timezones: string[];
  public assetTabActive: boolean;
  public commonTimezones = ["Europe/Stockholm", "UTC"];
  public currentTime: string;

  public availableContexts: any;
  public user: User;

  private intervalId: number;

  constructor(private router: Router, private store: Store<State>) {}

  ngOnInit() {
    // Remove afew timezones. GMT because moment.js inverts GMT timezones.
    // Remove ETC/ because they are duplicates.
    // Remove UCT to prevent user from picking wrong when going for UTC.
    this.timezones = moment.tz
      .names()
      .filter(
        (name: string) =>
          !name.toLowerCase().includes("gmt") &&
          !name.toLowerCase().includes("uct") &&
          !name.toLowerCase().includes("etc/") &&
          !this.commonTimezones.includes(name)
      );

    this.intervalId = window.setInterval(() => {
      this.currentTime = formatUnixtimeWithoutDate(new Date().getTime());
    }, 1000);

    this.store
      .select(AuthSelectors.getAvailableContexts)
      .pipe(
        filter((contexts) => contexts !== null),
        take(1)
      )
      .subscribe((contexts) => {
        if (this.isAdmin) {
          this.availableContexts = contexts;
        }
      });

    this.store
      .select(AuthSelectors.getUser)
      .pipe(takeUntil(this.unmount$))
      .subscribe((user: User) => {
        this.user = user;
      });
  }

  ngOnChanges() {
    this.assetTabActive = this.url.match(/^\/mobileTerminal(s)?.*$/g) !== null;
  }

  ngOnDestroy() {
    window.clearInterval(this.intervalId);
    this.unmount$.next(true);
    this.unmount$.unsubscribe();
  }

  getTimeToLogout() {
    return Math.ceil(this.timeToLogout / 60);
  }

  setRoleAndScope(chosenContext: any) {
    if (this.isAdmin) {
      this.store.dispatch(AuthActions.setRoleAndScope(chosenContext));
    }
  }

  navigateTo(url: string) {
    this.router.navigate([url]);
  }
}
