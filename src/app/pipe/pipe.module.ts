import { NgModule } from '@angular/core';
import { SimplifyTransformPipe } from './simplify-transform.pipe';

@NgModule({
  declarations: [
    SimplifyTransformPipe
  ],
  exports: [
    SimplifyTransformPipe
  ]
})
export class PipeModule { }
