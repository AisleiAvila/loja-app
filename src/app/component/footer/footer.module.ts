import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './footer.component';

@NgModule({
  declarations: [FooterComponent],
  exports: [FooterComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule
   ],
  providers: [],
  bootstrap: [FooterComponent]
})
export class FooterModule { }
