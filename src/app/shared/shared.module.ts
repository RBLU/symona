import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {
  MatButtonModule, MatIconModule, MatListModule, MatToolbarModule, MatChipsModule,
  MatMenuModule,
  MatAutocompleteModule,
  MatInputModule
} from '@angular/material';

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
    MatInputModule]

})
export class SharedModule {
}
