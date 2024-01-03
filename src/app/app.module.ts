import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppFlexModule } from './flex';
import { LineClampDirective } from './core/line-clamp.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CodeHighlighterComponent } from './code-highlighter/code-highlighter.component';
import { SafePipe } from './core/safeHtml.pipe';

@NgModule({
    declarations: [AppComponent, LineClampDirective, CodeHighlighterComponent, SafePipe],
    imports: [
        BrowserModule,
        AppFlexModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatButtonModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
