import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabsPage } from './tabs.page';


const routes: Routes = [
  {
      path: '',
      redirectTo: 'tabs/dashboard',
      pathMatch: 'full'
  },
  {
      path: 'tabs',
      component: TabsPage,
      children : [
        {
          path: 'dashboard',
          loadChildren: () => import('../dashboard/dashboard.module').then( m => m.DashboardPageModule)
        },
        {
          path: 'settings',
          loadChildren: () => import('../settings/settings.module').then( m => m.SettingsPageModule)
        }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
