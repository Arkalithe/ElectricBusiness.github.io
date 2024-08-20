import {importProvidersFrom} from "@angular/core";
import {AppComponent} from "./app/app.component";
import {provideRouter, Routes} from "@angular/router";
import {InMemoryDataService} from "./app/services/in-memory-data.service";
import {HttpClientInMemoryWebApiModule} from "angular-in-memory-web-api";

import {
  withInterceptorsFromDi,
  provideHttpClient,
} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {BrowserModule, bootstrapApplication} from "@angular/platform-browser";

const routes: Routes = [
  {path: "", redirectTo: "home", pathMatch: "full"},
  {
    path: "",
    loadChildren: () => import("./app/app.routes")
  },

  {
    path: "**",
    title: "Page not Found",
    loadComponent: () => import("./app/page-not-found/page-not-found.component").then(
      (module) => module.PageNotFoundComponent,
    ),
  },
];

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(
      BrowserModule,
      FormsModule,
      HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
        dataEncapsulation: false,
      }),
    ),

    provideRouter(routes),
  ],
}).catch((err) => console.error(err));
