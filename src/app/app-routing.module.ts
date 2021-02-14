import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MenuPage } from './pages/menu/menu/menu.page';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'menu/first-page',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/auth/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'forgotPass',
    loadChildren: () => import('./pages/auth/forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule)
  },
 

  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/auth/forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule)
  },
 
  {
    path: 'menu',component:MenuPage,
    // loadChildren: () => import('./pages/menu/menu/menu.module').then(m => m.MenuPageModule)
    children:[
      {
        path: 'car-wash',
        loadChildren: () => import('./pages/carWash/car-wash/car-wash.module').then(m => m.CarWashPageModule)
      },
      {
        path: 'first-page',
        loadChildren: () => import('./pages/firstPage/first-page/first-page.module').then( m => m.FirstPagePageModule)
      },
      {
        path: 'apartment',
        loadChildren: () => import('./pages/apartment/apartment/apartment.module').then( m => m.ApartmentPageModule)
      },
      {
        path: 'event',
        loadChildren: () => import('./pages/event/event/event.module').then( m => m.EventPageModule)
      },
    ]
  
  },
 
  



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
