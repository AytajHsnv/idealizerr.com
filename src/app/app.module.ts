
import { BrowserModule } from "@angular/platform-browser";
import { NgModule, APP_INITIALIZER, Injector } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import {
  TranslateModule,
  TranslateLoader,
  TranslateService
} from "@ngx-translate/core";
import { HTTP_INTERCEPTORS, HttpClient } from "@angular/common/http";
import { LanguageInterceptor } from "./modules/shared/interceptors/language.interceptors";
import { AuthInterceptor } from "./modules/shared/interceptors/auth.interceptors";
import { AuthGuard } from "./modules/shared/guards/auth-guard.service";
import { NonAuthGuard } from "./modules/shared/guards/non-auth-guard.service";
import { SharedModule } from "./modules/shared/shared.module";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { LOCATION_INITIALIZED } from "@angular/common";
import { variables } from "src/environments/variables";
//======================================================================



export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}
export function appInitializerFactory(
  translate: TranslateService,
  injector: Injector
) {
  return () =>
    new Promise<any>((resolve: any) => {
      const locationInitialized = injector.get(
        LOCATION_INITIALIZED,
        Promise.resolve(null)
      );

      locationInitialized.then(() => {
        translate
          .use(localStorage.getItem(variables.local_storage.language) || "en")
          .subscribe(
            () => {},
            err => {},
            () => {
              resolve(null);
            }
          );
      });
    });
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    AuthGuard,
    NonAuthGuard,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [TranslateService, Injector],
      multi: true
    },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LanguageInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})

//======================================================================
export class AppModule {}
