import { waitForAsync, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { provideMockStore } from "@ngrx/store/testing";

import { FullLayoutComponent } from "./full.component";

// Components
import { LogoutTimerComponent } from "../../components/logout-timer/logout-timer.component";
import { TopMenuComponent } from "../../components/top-menu/top-menu.component";
import { NotificationsComponent } from "../../components/notifications/notifications.component";

describe("FullLayoutComponent", () => {
  // let store: MockStore<{ }>;
  const initialState = {};

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        FullLayoutComponent,
        LogoutTimerComponent,
        TopMenuComponent,
        NotificationsComponent,
      ],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
  }));

  const setup = () => {
    const fixture = TestBed.createComponent(FullLayoutComponent);
    const component = fixture.componentInstance;
    return { fixture, component };
  };

  it("should create", () => {
    const { component } = setup();
    expect(component).toBeTruthy();
  });

  it("should have a router-outlet", () => {
    const { fixture } = setup();
    const layoutElement: HTMLElement = fixture.nativeElement;
    const routerOutlet = layoutElement.querySelector("router-outlet");
    expect(routerOutlet).not.toBeNull();
  });
});
