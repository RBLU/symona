import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";

import {MatButtonModule, MatIconModule, MatListModule, MatToolbarModule} from '@angular/material';

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
    MatToolbarModule]

})
export class SharedModule { }
