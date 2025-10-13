import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatTableModule } from "@angular/material/table";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "@app/routing/app-routing.module";
import { CoreModule } from "@app/core/core.module";
import { MatAnchor } from "@angular/material/button";

// Pages
import { AssetsComponent } from "./pages/assets/assets.component";
import { ExchangeComponent } from "./pages/exchange/exchange.component";
import { GlobalSettingsComponent } from "./pages/global-settings/global-settings.component";
import { PingsComponent } from "./pages/pings/pings.component";

// Components
import { ConfigurationMenuComponent } from "./components/configuration-menu/configuration-menu.component";

@NgModule({
  declarations: [
    ConfigurationMenuComponent,
    AssetsComponent,
    ExchangeComponent,
    GlobalSettingsComponent,
    PingsComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    MatTableModule,
    AppRoutingModule,
    RouterModule,
    MatAnchor,
  ],
})
export class AdminModule {}
