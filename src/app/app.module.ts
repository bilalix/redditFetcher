import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RedditFeedComponent } from './components/reddit-feed/reddit-feed.component';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { MarkdownModule } from 'ngx-markdown';
import { FormsModule } from '@angular/forms';
import { SafePipe } from './pipes/safe.pipe';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

@NgModule({
  declarations: [
    AppComponent,
    RedditFeedComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    MarkdownModule.forRoot(),
    FormsModule,
    AngularFontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
