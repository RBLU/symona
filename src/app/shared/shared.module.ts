import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {
  MatButtonModule, MatIconModule, MatListModule, MatToolbarModule, MatChipsModule,
  MatMenuModule,
  MatAutocompleteModule,
  MatInputModule, MatDatepickerModule, MatPaginatorModule, MatCardModule, MatSelectModule, MatProgressSpinnerModule,
  MatSlideToggleModule, MatExpansionModule
} from '@angular/material';
import {MatMomentDateModule} from "@angular/material-moment-adapter";
import {FormatValuePipe} from "./formatValue.pipe";

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    FormatValuePipe
  ],
  providers: [],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormatValuePipe,

    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatChipsModule,
    MatMenuModule,
    MatAutocompleteModule,
    MatExpansionModule,
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
