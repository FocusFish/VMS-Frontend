import { waitForAsync, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { provideMockStore } from "@ngrx/store/testing";

import { LoginLayoutComponent } from "./login.component";

// Components
import { NotificationsComponent } from "../../components/notifications/notifications.component";

describe("LoginLayoutComponent", () => {
  // let store: MockStore<{ }>;
  const initialState = {};

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [LoginLayoutComponent, NotificationsComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
  }));

  const setup = () => {
    const fixture = TestBed.createComponent(LoginLayoutComponent);
    const component = fixture.componentInstance;
    return { fixture, component };
  };

  it("should create", () => {
    const { component } = setup();
    expect(component).toBeTruthy();
  });

  it("should have a continer with router-outlet in it", () => {
    const { fixture } = setup();
    const layoutElement: HTMLElement = fixture.nativeElement;
    const routerOutlet = layoutElement.querySelector(
      ".login-container router-outlet"
    );
    expect(routerOutlet).not.toBeNull();
  });
});
