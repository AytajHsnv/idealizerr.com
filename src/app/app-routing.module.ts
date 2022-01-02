import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CoreLayoutComponent } from "./modules/core/layout/core-layout/core-layout.component";
import { CoreModule } from "./modules/core/core.module";
import { CoreMainPageComponent } from "./modules/core/pages/core-main-page/core-main-page.component";
import { CoreCompetitionPageComponent } from "./modules/core/pages/core-competition-page/core-competition-page.component";
import { CoreAboutPageComponent } from "./modules/core/pages/core-about-page/core-about-page.component";
import { CoreStartupsPageComponent } from "./modules/core/pages/core-startups-page/core-startups-page.component";
import { AuthGuard } from "./modules/shared/guards/auth-guard.service";
import { NonAuthGuard } from "./modules/shared/guards/non-auth-guard.service";
import { CoreStartupDetailComponent } from "./modules/core/pages/core-startup-detail/core-startup-detail.component";
import { NewsComponent } from "./modules/core/pages/news/news.component";
//import { DetailComponent } from "./modules/core/pages/news/detail/detail.component";
import { TermsComponent } from "./modules/core/pages/terms/terms.component";
// import { HowItWorksComponent } from "./modules/core/pages/how-it-works/how-it-works.component";
// import { HowItWorksDetailComponent } from "./modules/core/pages/how-it-works/how-it-works-detail/how-it-works-detail.component";
// import { InvestorsComponent } from "./modules/core/pages/investors/investors.component";
import { LikedStartupsComponent } from "./modules/core/pages/liked-startups/liked-startups.component";
import { NotFoundComponent } from './modules/shared/pages/not-found/not-found.component';
import { DetailComponent } from "./modules/core/pages/news/detail/detail.component";
//======================================================================

const routes: Routes = [
  {
    path: "",
    component: CoreLayoutComponent,
    children: [
      { path: "", component: CoreMainPageComponent, data: { roles: ["user"] } },
      {
        path: "competition",
        component: CoreCompetitionPageComponent,
        data: { roles: ["user"] }
      },
      {
        path: "about",
        component: CoreAboutPageComponent,
        data: { roles: ["user"] }
      },
      {
        path: "startups",
        component: CoreStartupsPageComponent,
        data: { roles: ["user"] }
      },
      {
        path: "startup/:id",
        component: CoreStartupDetailComponent,
        data: { roles: ["user"] }
      },
      { path: "news", component: NewsComponent, data: { roles: ["user"] } },
      {
      path: "news/:id",
      component: DetailComponent,
      data: { roles: ["user"] }
      },
      { path: "terms", component: TermsComponent, data: { roles: ["user"] } },
      // {
      //   path: "investors",
      //   component: InvestorsComponent,
      //   data: { roles: ["user"] }
      // },
      // {
      //   path: "how-it-works",
      //   component: HowItWorksComponent,
      //   data: { roles: ["user"] }
      // },
      // {
      //   path: "how-it-works/:id",
      //   component: HowItWorksDetailComponent,
      //   data: { roles: ["user"] }
      // },
      {
        path: "following",
        component: LikedStartupsComponent,
        data: { roles: ["user"] }
      }
    ],
    data: { roles: ["user"] }
  },
  //LAZY LOADINGS
  {
    path: "auth",
    loadChildren: "../app/modules/auth/auth.module#AuthModule",
    canActivate: [NonAuthGuard]
  },
  {
    path: "dashboard",
    loadChildren: "../app/modules/dashboard/dashboard.module#DashboardModule",
    canActivate: [AuthGuard],
    data: { roles: ["user"] }
  },
  {
    path: "**",
    component: NotFoundComponent,
  }
];

//======================================================================
@NgModule({
  imports: [RouterModule.forRoot(routes), CoreModule],
  exports: [RouterModule]
})

//======================================================================
export class AppRoutingModule {}
