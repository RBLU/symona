import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";

import {MatButtonModule, MatIconModule, MatListModule, MatToolbarModule, MatChipsModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [],
  providers: [
  ],
  exports:      [
    CommonModule,
    FormsModule,

    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatChipsModule]

})
export class SharedModule { }
