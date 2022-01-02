import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
//COMPONENTS
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderNavComponent } from "./components/header/header-nav/header-nav.component";
import { HeaderAuthComponent } from "./components/header/header-auth/header-auth.component";
import { FooterNavComponent } from "./components/footer/footer-nav/footer-nav.component";
import { FooterSubscribeComponent } from "./components/footer/footer-subscribe/footer-subscribe.component";
import { FooterSocialComponent } from "./components/footer/footer-social/footer-social.component";
import { StartupCardComponent } from "./components/startup-card/startup-card.component";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { SafeUrlPipe } from "./pipes/safe-url.pipe";
import { ClickOutsideModule } from "ng-click-outside";
import { StartupDetailComponent } from "./pages/startup-detail/startup-detail.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { LinearNotificationComponent } from "./components/linear-notification/linear-notification.component";
import { LangDropdownComponent } from "./components/lang-dropdown/lang-dropdown.component";
import { TermsComponent } from "./components/terms/terms.component";
import { SelectComponent } from "./components/select/select.component";
import { DatepickerComponent } from "./components/datepicker/datepicker.component";
import { LoaderComponent } from "./components/loader/loader.component";
import { MultiSelectComponent } from "./components/multi-select/multi-select.component";
import { SafeHtmlPipe } from "./pipes/safe-html.pipe";
import { StartupCardHomeComponent } from "./components/startup-card-home/startup-card-home.component";
import { StartupCardFormComponent } from "./components/startup-card-form/startup-card-form.component";
import { TranslateModule } from "@ngx-translate/core";
import { StartupCardVoiceComponent } from "./components/startup-card-voice/startup-card-voice.component";
import { LoadingComponent } from "./components/loading/loading.component";
import { TimelineComponent } from "./components/timeline/timeline.component";
import {Title} from '@angular/platform-browser';
//======================================================================

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HeaderNavComponent,
    HeaderAuthComponent,
    FooterNavComponent,
    FooterSubscribeComponent,
    FooterSocialComponent,
    StartupCardComponent,
    StartupCardHomeComponent,
    StartupCardVoiceComponent,
    StartupCardFormComponent,
    LinearNotificationComponent,
    TermsComponent,
    //PIPE
    SafeUrlPipe,
    SafeHtmlPipe,

    StartupDetailComponent,

    NotFoundComponent,

    LangDropdownComponent,

    SelectComponent,

    DatepickerComponent,

    LoaderComponent,

    MultiSelectComponent,

    LoadingComponent,

    TimelineComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ClickOutsideModule
  ],
  providers: [
      Title
  ],
  exports: [
    TranslateModule,
    HeaderAuthComponent,
    HeaderComponent,
    FooterComponent,
    StartupCardComponent,
    StartupCardHomeComponent,
    StartupCardFormComponent,
    StartupCardVoiceComponent,
    FormsModule,
    ReactiveFormsModule,
    ClickOutsideModule,
    LinearNotificationComponent,
    //PIPE
    SafeUrlPipe,
    SafeHtmlPipe,

    TermsComponent,
    StartupDetailComponent,
    SelectComponent,
    DatepickerComponent,
    LoaderComponent,
    TimelineComponent,
    MultiSelectComponent,
    LoadingComponent
  ]
})

//======================================================================
export class SharedModule {}

//======================================================================
