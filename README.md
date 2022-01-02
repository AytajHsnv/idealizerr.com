

# Used languages
* HTML
* CSS(SCSS)
* Javascript
* Typescript

# Used framework
* Version:7.2.0 [Angular](https://angular.io/)

## Install dependencies
`npm install`

## Start development server with hot reload
* `ng serve` [localhost:4200](http://localhost:4200)
* `ng serve --open` [localhost:4200](http://localhost:4200) open at default browser 
* `ng serve --host 0.0.0.0` [localhost:4200](http://localhost:4200) or [ip:4200](http://localhost:4200) for testing on mobil [acces all devices connect same wifi]

## Build for production and view the bundle analyzer report
* `ng build --prod`
* `ng build --prod --vendor-chunk=true`

## Used dependencies
* [ngx-translate](https://github.com/ngx-translate/core)
* [jquery](https://www.npmjs.com/package/jquery)
* [bootstrap-grid](https://getbootstrap.com/)
* [semantic-ui](https://semantic-ui.com/)
* [slick-carousel](https://kenwheeler.github.io/slick/)
* [countdow-flipclockjs](http://flipclockjs.com/)
* [aos-animate-scroll](https://github.com/michalsnik/aos)
* [flipclock](https://www.npmjs.com/package/flipclock)

## Used fonts
* [Inter](https://rsms.me/inter/)
* [Materialdesignicons](https://materialdesignicons.com/)

## Structure 
    .
    ├── app 
    │   └── modules
    │        ├── dashboard
    │        ├── auth
    │        ├── core
    │        └── shared
    │
    ├── assets 
    │   ├── favicon
    │   ├── fonts
    │   ├── i18n
    │   ├── images
    │   ├── json
    │   └── scss
    └── ...


## Angular Pipes
* --

## Angular Guards
* Auth
* NonAuth

## Angular Interceptors
* Auth
* Language

## Angular Services
* Auth
* Cookie
* Language
* Urls

## Git commit categories
* DONE:
* FIX:
* UPDATE:
* PERF:
* REFACTOR:
* TEST:
* NEW: 


## Naming convention
* Functions : `getData()`
* Variables :  `user_surname`
* Dependency injections : `LOCATION_SERVICE: LocationService`


## Set olunan `cookie` və `localStorage` nameləri
* LocalStorage ve Cookie name(key)-ləri `src/app/environments/variables.ts` => `variables`-da saxlanılır. 
* Əgər hərhansı name(key)-i dəyişmək lazım olsa qeyd olunan sourcedən dəyişmək kifayətdir.

## Tərcümələr
* Tərcümələr `assets/i18n/**.json` fayllarının altındadır və [ngx-translate](https://github.com/ngx-translate/core) ilə tənzimlənir. 
* "app.component.ts" faylında ctor-da `private LANGUAGE :LanguageService` kimi injection məcburidirki translate funksiyaları işlək hala düşsün. 
* Lazy loading modullarda `TranslateModule`-u importlara əlavə etmək lazımdır.
* "language.service.ts" servisi `current_lang = 'en';` ilə applicationun ilkin yüklənmədə istifadə edəcəyi dili seçə bilərsiniz.
* "language.interceptors.ts" interceptoru hər göndərilər requestin header-inə `Accept-Language=en` set edir və api headerdə göndərilən dilə uygun response qaytarır.
* Language interceptorumuz app.module.ts faylında `providers:[]` arrayında `{ provide: HTTP_INTERCEPTORS, useClass: LanguageInterceptor, multi: true}` şəkildə təyin olunmalıdır.
* `/settings/integrations` url-i atlında dil istifadə üçün dil dəyişmək select-i var. və bu select "language.service.ts" - dəki `switchLang(language: string)` funksiyasını işlədir.
* Page title-larıda öz mətnlərini tərcümə edilmiş şəkildə istifadə etməlidirlər. İstifadə edəcəyimiz componentdə `private LANGUAGE: LanguageService` injection olunmalıdır və `ngAfterViewInit()` funksiyasında "language.service.ts" - dəki `SetPageTitle(translate_key:string)` funksiyası vasitəsilə page title əlavə etmək olur.
* Language `localStorage`-də saxlanılır və key `src/app/environments/variables/ts` => `variables.local_storage.language` de qeyd olunub. Əgər localStorage keyini dəyişmək lazım olsa qeyd olunan sourcedən dəyişmək kifayətdir.
"# idealizerr.com" 
