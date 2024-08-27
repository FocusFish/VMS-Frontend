import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* Modules */
import { RouterModule } from '@angular/router';
import { UIModule } from '../ui/ui.module';
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from '@angular/material/legacy-autocomplete';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatLegacyRadioModule as MatRadioModule } from '@angular/material/legacy-radio';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';

/* Pages */
import { AttachmentHistoryPageComponent } from './pages/attachment-history/attachment-history.component';
import { AttachPageComponent } from './pages/attach/attach.component';
import { FormPageComponent } from './pages/form/form.component';
import { HistoryPageComponent } from './pages/history/history.component';
import { ListPageComponent } from './pages/list/list.component';
import { ShowPageComponent } from './pages/show/show.component';
import { ShowByAssetPageComponent } from './pages/show-by-asset/show-by-asset.component';

/* Components */
import { AttachmentHistoryComponent } from './components/attachment-history/attachment-history.component';
import { HistoryComponent } from './components/history/history.component';
import { ListForAssetComponent } from './components/list-for-asset/list-for-asset.component';
import { SaveDialogComponent } from './components/save-dialog/save-dialog.component';
import { SaveUnmatchedMemberNumbersDialogComponent } from './components/save-unmatched-member-numbers-dialog/save-unmatched-member-numbers-dialog.component';
import { ShowComponent } from './components/show/show.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UIModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTabsModule,
    MatExpansionModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatSortModule,
    MatTableModule,
  ],
  declarations: [
    AttachmentHistoryPageComponent,
    AttachPageComponent,
    FormPageComponent,
    HistoryPageComponent,
    ListPageComponent,
    ShowPageComponent,
    ShowByAssetPageComponent,
    /* Components */
    AttachmentHistoryComponent,
    HistoryComponent,
    ListForAssetComponent,
    SaveDialogComponent,
    ShowComponent,
    SaveUnmatchedMemberNumbersDialogComponent,
  ]
})

export class MobileTerminalModule { }
