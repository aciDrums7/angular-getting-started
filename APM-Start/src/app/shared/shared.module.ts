import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StarComponent} from './star/star.component';
import {FormsModule} from '@angular/forms';
import {ConvertToSpacesPipe} from './convert-to-spaces.pipe';

@NgModule({
  declarations: [
    StarComponent,
    ConvertToSpacesPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    StarComponent,
    ConvertToSpacesPipe
  ]
})
export class SharedModule { }
