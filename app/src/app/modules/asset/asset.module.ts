import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* Modules */
import { RouterModule } from '@angular/router';
import { UIModule } from '../ui/ui.module';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatSortModule } from '@angular/material/sort';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyRadioModule as MatRadioModule } from '@angular/material/legacy-radio';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';


/* Pages */
import { FormPageComponent } from './pages/form/form.component';
import { PositionsPageComponent } from './pages/positions/positions.component';
import { SearchPageComponent } from './pages/search/search.component';
import { ShowPageComponent } from './pages/show/show.component';

/* Components */
import { PositionsComponent } from './components/positions/positions.component';
import { ShowComponent } from './components/show/show.component';
import { ShowContactsComponent } from './components/show-contacts/show-contacts.component';
import { ShowMobileTerminalComponent } from './components/show-mobile-terminal/show-mobile-terminal.component';
import { ShowNotesComponent } from './components/show-notes/show-notes.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UIModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatSlideToggleModule,
  ],
  declarations: [
    // Page-components
    FormPageComponent,
    PositionsPageComponent,
    SearchPageComponent,
    ShowPageComponent,
    // Components
    PositionsComponent,
    ShowComponent,
    ShowContactsComponent,
    ShowMobileTerminalComponent,
    ShowNotesComponent
  ]
})

export class AssetModule { }
