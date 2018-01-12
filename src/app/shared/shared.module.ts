import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {
  MatButtonModule, MatIconModule, MatListModule, MatToolbarModule, MatChipsModule,
  MatMenuModule,
  MatAutocompleteModule,
  MatInputModule, MatDatepickerModule, MatPaginatorModule, MatCardModule, MatSelectModule, MatProgressSpinnerModule,
  MatSlideToggleModule
} from '@angular/material';
import {MatMomentDateModule} from "@angular/material-moment-adapter";

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [],
  providers: [],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatChipsModule,
    MatMenuModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatPaginatorModule,
    MatCardModule]

})
export class SharedModule {
}
