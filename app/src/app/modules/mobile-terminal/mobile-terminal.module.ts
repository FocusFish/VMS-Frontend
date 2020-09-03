import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* Modules */
import { RouterModule } from '@angular/router';
import { UIModule } from '../ui/ui.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { DatetimePickerModule } from 'ngx-moment-tz-picker';

/* Pages */
import { AttachPageComponent } from './pages/attach/attach.component';
import { FormPageComponent } from './pages/form/form.component';
import { ListPageComponent } from './pages/list/list.component';
import { ShowByAssetPageComponent } from './pages/show-by-asset/show-by-asset.component';

/* Components */
import { HistoryComponent } from './components/history/history.component';
import { ListForAssetComponent } from './components/list-for-asset/list-for-asset.component';
import { SaveDialogComponent } from './components/save-dialog/save-dialog.component';
import { SaveUnmatchedMemberNumbersDialogComponent } from './components/save-unmatched-member-numbers-dialog/save-unmatched-member-numbers-dialog.component';


@NgModule({
  imports: [
    CommonModule,
    DatetimePickerModule,
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
    AttachPageComponent,
    FormPageComponent,
    ListPageComponent,
    ShowByAssetPageComponent,
    /* Components */
    HistoryComponent,
    ListForAssetComponent,
    SaveDialogComponent,
    SaveUnmatchedMemberNumbersDialogComponent,
  ]
})

export class MobileTerminalModule { }
