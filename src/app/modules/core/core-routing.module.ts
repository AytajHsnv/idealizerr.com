import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//======================================================================

const routes: Routes = [
  // {
  //   path: "",
  //   component: DashboardLayoutComponent,
  //   children: [
  //     { path: "", component: MainComponent, canActivate: [AuthGuard], data: {roles: ['user']}},
  //   ],
  //   canActivate: [AuthGuard], data: {roles: ['user']}
  // },
  //LAZY LOADINGS
  // { path: "***", loadChildren: '../app/modules/***.module#***Module',canActivate: [AuthGuard], data: {roles: ['user']}},
];


//======================================================================
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

//======================================================================
export class CoreRoutingModule { }
