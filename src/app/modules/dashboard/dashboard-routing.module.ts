import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardLayoutComponent } from "./layout/dashboard-layout/dashboard-layout.component";
import { DashboardMainComponent } from "./pages/dashboard-main/dashboard-main.component";
import { DashboardStartupsComponent } from "./pages/dashboard-startups/dashboard-startups.component";
import { DashboardSettingsComponent } from "./pages/dashboard-settings/dashboard-settings.component";
import { DashboardNotificationsComponent } from "./pages/dashboard-notifications/dashboard-notifications.component";
import { DashboardNewStartupComponent } from "./pages/dashboard-new-startup/dashboard-new-startup.component";
import {JuryGuard} from './guards/jury-guard.service';
//======================================================================

const routes: Routes = [
  {
    path: "",
    component: DashboardLayoutComponent,
    children: [
      { path: "", component: DashboardMainComponent },
      { path: "startups", component: DashboardStartupsComponent, canActivate: [JuryGuard] },
      { path: "settings", component: DashboardSettingsComponent },
      { path: "notifications", component: DashboardNotificationsComponent },
      { path: "startup/:id", component: DashboardStartupsComponent },
      { path: "new/startup", component: DashboardNewStartupComponent },
      { path: "new/startup/:id", component: DashboardNewStartupComponent }
    ]
  }
];

//======================================================================

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

//======================================================================
export class DashboardRoutingModule {}

//======================================================================
