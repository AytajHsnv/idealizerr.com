import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { CoreLayoutComponent } from "./layout/core-layout/core-layout.component";
import { RouterModule } from "@angular/router";
import { SingleElementCoverSliderComponent } from "./components/single-element-cover-slider/single-element-cover-slider.component";
import { CoreMainPageComponent } from "./pages/core-main-page/core-main-page.component";
import { CoreCompetitionPageComponent } from "./pages/core-competition-page/core-competition-page.component";
import { CoreAboutPageComponent } from "./pages/core-about-page/core-about-page.component";
import { CoreStartupsPageComponent } from "./pages/core-startups-page/core-startups-page.component";
import { CoreMainEventsSectionComponent } from "./pages/core-main-page/core-main-events-section/core-main-events-section.component";
import { CoreMainCompetitionSectionComponent } from "./pages/core-main-page/core-main-competition-section/core-main-competition-section.component";
import { CoreMainStartupsSectionComponent } from "./pages/core-main-page/core-main-startups-section/core-main-startups-section.component";
import { VideoPlayerComponent } from "./components/video-player/video-player.component";
import { PageNavigationComponent } from "./components/page-navigation/page-navigation.component";
import { CoreCompetitionAboutSectionComponent } from "./pages/core-competition-page/core-competition-about-section/core-competition-about-section.component";
import { CoreCompetitionRulesSectionComponent } from "./pages/core-competition-page/core-competition-rules-section/core-competition-rules-section.component";
import { CoreCompetitionPlansSectionComponent } from "./pages/core-competition-page/core-competition-plans-section/core-competition-plans-section.component";
import { CoreCompetitionJurySectionComponent } from "./pages/core-competition-page/core-competition-jury-section/core-competition-jury-section.component";
import { CoreCompetitionParticipantsSectionComponent } from "./pages/core-competition-page/core-competition-participants-section/core-competition-participants-section.component";
import { CoreAboutMainSectionComponent } from "./pages/core-about-page/core-about-main-section/core-about-main-section.component";
import { CoreAboutSponsorsSliderComponent } from "./pages/core-about-page/core-about-sponsors-slider/core-about-sponsors-slider.component";
import { CoreAboutTeamSectionComponent } from "./pages/core-about-page/core-about-team-section/core-about-team-section.component";
import { PageInsideNavigationComponent } from "./components/page-inside-navigation/page-inside-navigation.component";
import { StartupsFilterComponent } from "./pages/core-startups-page/startups-filter/startups-filter.component";
import { CoreStartupDetailComponent } from "./pages/core-startup-detail/core-startup-detail.component";
import { NewsComponent } from "./pages/news/news.component";
 import { DetailComponent } from "./pages/news/detail/detail.component";
import { TermsComponent } from "./pages/terms/terms.component";
// import { HowItWorksComponent } from "./pages/how-it-works/how-it-works.component";
// import { HowItWorksDetailComponent } from "./pages/how-it-works/how-it-works-detail/how-it-works-detail.component";
// import { InvestorsComponent } from "./pages/investors/investors.component";
import { LikedStartupsComponent } from './pages/liked-startups/liked-startups.component';
//======================================================================

@NgModule({
  declarations: [
    CoreLayoutComponent,
    SingleElementCoverSliderComponent,
    CoreMainPageComponent,
    CoreCompetitionPageComponent,
    CoreAboutPageComponent,
    CoreStartupsPageComponent,
    CoreMainCompetitionSectionComponent,
    CoreMainStartupsSectionComponent,
    CoreMainEventsSectionComponent,
    VideoPlayerComponent,
    PageNavigationComponent,
    CoreCompetitionAboutSectionComponent,
    CoreCompetitionRulesSectionComponent,
    CoreCompetitionPlansSectionComponent,
    CoreCompetitionJurySectionComponent,
    CoreCompetitionParticipantsSectionComponent,
    CoreAboutMainSectionComponent,
    CoreAboutSponsorsSliderComponent,
    CoreAboutTeamSectionComponent,
    PageInsideNavigationComponent,
    StartupsFilterComponent,
    CoreStartupDetailComponent,
    NewsComponent,
    DetailComponent,
    TermsComponent,
    // HowItWorksComponent,
    // HowItWorksDetailComponent,
    // InvestorsComponent,
    LikedStartupsComponent
  ],
  imports: [CommonModule, RouterModule, SharedModule],
  exports: [CoreLayoutComponent]
})

//======================================================================
export class CoreModule {}

//======================================================================
