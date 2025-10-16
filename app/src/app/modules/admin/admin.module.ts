import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatOptionModule } from "@angular/material/core";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "@app/routing/app-routing.module";
import { CoreModule } from "@app/core/core.module";
import { MatAnchor, MatButtonModule } from "@angular/material/button";

// Pages
import { AssetsComponent } from "./pages/assets/assets.component";
import { ExchangeComponent } from "./pages/exchange/exchange.component";
import { GlobalSettingsComponent } from "./pages/global-settings/global-settings.component";
import { MovementComponent } from "./pages/movement/movement.component";
import { MovementRulesComponent } from "./pages/movement-rules/movement-rules.component";
import { PingsComponent } from "./pages/pings/pings.component";
import { ReportingComponent } from "./pages/reporting/reporting.component";

// Components
import { CatalogItemListComponent } from "./components/catalog-item-list/catalog-item-list.component";
import { ConfigurationMenuComponent } from "./components/configuration-menu/configuration-menu.component";

@NgModule({
  declarations: [
    CatalogItemListComponent,
    ConfigurationMenuComponent,
    AssetsComponent,
    ExchangeComponent,
    GlobalSettingsComponent,
    MovementComponent,
    MovementRulesComponent,
    ReportingComponent,
    PingsComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    MatAnchor,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatOptionModule,
    MatRadioModule,
    MatSelectModule,
    MatTableModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class AdminModule {}
