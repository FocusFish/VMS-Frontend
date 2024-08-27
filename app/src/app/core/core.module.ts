import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatRippleModule } from '@angular/material/core';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';

import { UIModule } from '@modules/ui/ui.module';

// Guards
import { AuthGuard } from './guards/auth.guard';
import { FishingGuard } from './guards/fishing.guard';

// Layouts
import { AssetLayoutComponent } from './layouts/asset/asset.component';
import { DefaultLayoutComponent } from './layouts/default/default.component';
import { FullLayoutComponent } from './layouts/full/full.component';
import { LoginLayoutComponent } from './layouts/login/login.component';
import { MobileTerminalLayoutComponent } from './layouts/mobile-terminal/mobile-terminal.component';

// Pages
import { LoginComponent } from './pages/login/login.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { NotFoundComponent } from './pages/404/404.component';

// Components
import { LoggedOutDialogComponent } from './components/logged-out-dialog/logged-out-dialog.component';
import { LogoutTimerComponent } from './components/logout-timer/logout-timer.component';
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { TypescriptTranslationsComponent } from './components/typescript-translations/typescript-translations.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    UIModule,
    MatDialogModule,
    MatButtonModule,
    MatRippleModule,
    MatSlideToggleModule,
  ],
  declarations: [
    // Layouts
    AssetLayoutComponent,
    DefaultLayoutComponent,
    FullLayoutComponent,
    LoginLayoutComponent,
    MobileTerminalLayoutComponent,

    // Components
    LoginComponent,
    UnauthorizedComponent,
    LogoutComponent,
    TopMenuComponent,
    TypescriptTranslationsComponent,
    NotificationsComponent,
    NotFoundComponent,
    LoggedOutDialogComponent,
    LogoutTimerComponent,
  ],
  exports: [
    LoggedOutDialogComponent,
  ],
  providers: [
    AuthGuard,
    FishingGuard
  ]
})

export class CoreModule { }
