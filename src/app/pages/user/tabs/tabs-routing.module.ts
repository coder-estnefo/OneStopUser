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
        },
        {
          path: 'chats/:id',
          loadChildren: () => import('../chats/chats.module').then( m => m.ChatsPageModule)
        },
        {
          path: 'profile',
          loadChildren: () => import('../profile/profile.module').then( m => m.ProfilePageModule)
        },
        {
          path: 'confirm',
          loadChildren: () => import('../confirm/confirm.module').then( m => m.ConfirmPageModule)
        },
        {
          path: 'favorites',
          loadChildren: () => import('../favorites/favorites.module').then( m => m.FavoritesPageModule)
        },
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
