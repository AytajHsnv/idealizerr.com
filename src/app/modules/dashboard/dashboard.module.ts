import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardLayoutComponent } from "./layout/dashboard-layout/dashboard-layout.component";
import { DashboardMainComponent } from "./pages/dashboard-main/dashboard-main.component";
import { DashboardSettingsComponent } from "./pages/dashboard-settings/dashboard-settings.component";
import { DashboardNotificationsComponent } from "./pages/dashboard-notifications/dashboard-notifications.component";
import { DashboardStartupsComponent } from "./pages/dashboard-startups/dashboard-startups.component";
import { DashboardNewStartupComponent } from "./pages/dashboard-new-startup/dashboard-new-startup.component";
import { DashboardHeaderComponent } from "./components/dashboard-header/dashboard-header.component";
import { DashboardSidebarComponent } from "./components/dashboard-sidebar/dashboard-sidebar.component";
import { SharedModule } from "../shared/shared.module";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { ProfileInformationComponent } from "./pages/dashboard-settings/profile-information/profile-information.component";
import { ProfileInformationFormComponent } from "./pages/dashboard-settings/profile-information-form/profile-information-form.component";
import { ProfileMobileNumberFormComponent } from "./pages/dashboard-settings/profile-mobile-number-form/profile-mobile-number-form.component";
import { ProfileEmailFormComponent } from "./pages/dashboard-settings/profile-email-form/profile-email-form.component";
import { ProfilePasswordFormComponent } from "./pages/dashboard-settings/profile-password-form/profile-password-form.component";
import { NgxEaIntlTelInputModule } from "../lib/components/inputs/ngx-ea-intl-tel-input/ngx-ea-intl-tel-input.module";
import { AddStartupCardComponent } from "./pages/dashboard-startups/add-startup-card/add-startup-card.component";
import { NewFilesFormComponent } from "./pages/dashboard-new-startup/new-files-form/new-files-form.component";
import { NewQuestionFormComponent } from "./pages/dashboard-new-startup/new-question-form/new-question-form.component";
import { NewProgramComponent } from "./pages/dashboard-new-startup/new-program/new-program.component";
import { NewVideoFormComponent } from "./pages/dashboard-new-startup/new-video-form/new-video-form.component";
import {DashboardVoiceGivingComponent} from './pages/dashboard-main/dashboard-voice-giving/dashboard-voice-giving.component';
import {DashboardJuryVoiceGivingComponent} from './pages/dashboard-main/dashboard-jury-voice-giving/dashboard-jury-voice-giving.component';
import {JuryGuard} from './guards/jury-guard.service';
import {JuryVoicesLocalStorageService} from './services/jury-voices-local-storage.service';
import { NewJoinCompetitionComponent } from './pages/dashboard-new-startup/new-join-competition/new-join-competition.component';
import { StepDetailComponent } from './pages/dashboard-main/step-detail/step-detail.component';
//======================================================================

@NgModule({
  declarations: [
    DashboardLayoutComponent,
    DashboardMainComponent,
    DashboardSettingsComponent,
    DashboardNotificationsComponent,
    DashboardStartupsComponent,
    DashboardNewStartupComponent,
    DashboardHeaderComponent,
    DashboardSidebarComponent,
    ProfileInformationComponent,
    ProfileInformationFormComponent,
    ProfileMobileNumberFormComponent,
    ProfileEmailFormComponent,
    ProfilePasswordFormComponent,
    AddStartupCardComponent,
    NewFilesFormComponent,
    NewQuestionFormComponent,
    NewProgramComponent,
    NewVideoFormComponent,
    DashboardVoiceGivingComponent,
    DashboardJuryVoiceGivingComponent,
    NewJoinCompetitionComponent,
    StepDetailComponent
  ],
  providers: [
      JuryGuard,
      JuryVoicesLocalStorageService
  ],
  imports: [
    SharedModule,
    DashboardRoutingModule,
    CommonModule,
    NgxEaIntlTelInputModule
  ]
})

//======================================================================
export class DashboardModule {}

//======================================================================
