import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { MenuPage } from './pages/menu/menu/menu.page';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'login',
		pathMatch: 'full'
	},
	{
		path: 'home',
		loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
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
	{
		path: 'forgot-password',
		loadChildren: () => import('./pages/auth/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
	},
	{
		path: 'register',
		loadChildren: () => import('./pages/auth/register/register.module').then( m => m.RegisterPageModule)
	},
	{
		path: 'tabs-pages',
		loadChildren: () => import('./pages/user/tabs/tabs.module').then( m => m.TabsPageModule)
	},
	{
		path: 'properties',
		loadChildren: () => import('./pages/user/property-management/properties/properties.module').then( m => m.PropertiesPageModule)
	},
	{
		path: 'property-list',
		loadChildren: () => import('./pages/user/property-management/components/property-list/property-list.module').then( m => m.PropertyListPageModule)
	},
	{
		path: 'property-details/:id',
		loadChildren: () => import('./pages/user/property-management/property-details/property-details.module').then( m => m.PropertyDetailsPageModule)
	},
	{
		path: 'appointment',
		loadChildren: () => import('./pages/user/property-management/appointment/appointment.module').then( m => m.AppointmentPageModule)
	},
	{
		path: 'car-washes',
		loadChildren: () => import('./pages/user/carwash-management/car-washes/car-washes.module').then( m => m.CarWashesPageModule)
	},
	{
		path: 'events',
		loadChildren: () => import('./pages/user/event-management/events/events.module').then( m => m.EventsPageModule)
	},
	{
		path: 'carwash-details/:id',
		loadChildren: () => import('./pages/user/carwash-management/carwash-details/carwash-details.module').then( m => m.CarwashDetailsPageModule)
	},
	{
		path: 'book-slot/:id',
		loadChildren: () => import('./pages/user/carwash-management/book-slot/book-slot.module').then( m => m.BookSlotPageModule)
	},
	{
		path: 'event-details',
		loadChildren: () => import('./pages/user/event-management/event-details/event-details.module').then( m => m.EventDetailsPageModule)
	},
	{
		path: 'model',
		loadChildren: () => import('./pages/Model/model/model.module').then( m => m.ModelPageModule)
	},
  {
    path: 'prices/:id',
    loadChildren: () => import('./pages/user/carwash-management/prices/prices.module').then( m => m.PricesPageModule)
  },
  {
    path: 'property-map',
    loadChildren: () => import('./pages/user/property-management/property-map/property-map.module').then( m => m.PropertyMapPageModule)
  },
  {
    path: 'searched-property',
    loadChildren: () => import('./pages/user/property-management/searched-property/searched-property.module').then( m => m.SearchedPropertyPageModule)
  },
  {
    path: 'prices',
    loadChildren: () => import('./pages/user/carwash-management/prices/prices.module').then( m => m.PricesPageModule)
  },
  {
    path: 'property-map',
    loadChildren: () => import('./pages/user/property-management/property-map/property-map.module').then( m => m.PropertyMapPageModule)
  },
  {
    path: 'searched-property',
    loadChildren: () => import('./pages/user/property-management/searched-property/searched-property.module').then( m => m.SearchedPropertyPageModule)
  },
  {
    path: 'cleaning-services',
    loadChildren: () => import('./pages/user/cleaning-management/cleaning-services/cleaning-services.module').then( m => m.CleaningServicesPageModule)
  },
  {
    path: 'cleaning-service-map',
    loadChildren: () => import('./pages/user/cleaning-management/cleaning-service-map/cleaning-service-map.module').then( m => m.CleaningServiceMapPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/user/profile/profile.module').then(m => m.ProfilePageModule)
  },
  {
    path: 'service-list',
    loadChildren: () => import('./pages/user/cleaning-management/components/service-list/service-list.module').then( m => m.ServiceListPageModule)
  },
  {
    path: 'service-details/:id',
    loadChildren: () => import('./pages/user/cleaning-management/service-details/service-details.module').then( m => m.ServiceDetailsPageModule)
  },
{
    path: 'confirm',
    loadChildren: () => import('./pages/user/confirm/confirm.module').then( m => m.ConfirmPageModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('./pages/user/notification/notification.module').then( m => m.NotificationPageModule)
  },
  {
    path: 'carwash-map',
    loadChildren: () => import('./pages/user/carwash-management/carwash-map/carwash-map.module').then( m => m.CarwashMapPageModule)
  },
  {
    path: 'carwash-appointment/:id',
    loadChildren: () => import('./pages/user/carwash-management/carwash-appointment/carwash-appointment.module').then( m => m.CarwashAppointmentPageModule)
  },
   {
    path: 'carwash-appointment',
    loadChildren: () => import('./pages/user/carwash-management/carwash-appointment/carwash-appointment.module').then( m => m.CarwashAppointmentPageModule)
  },
  {
    path: 'messages/:id',
    loadChildren: () => import('./pages/user/messages/messages.module').then( m => m.MessagesPageModule)
  },
  {
    path: 'messages',
    loadChildren: () => import('./pages/user/messages/messages.module').then( m => m.MessagesPageModule)
  },
  {
    path: 'service-type',
    loadChildren: () => import('./pages/user/cleaning-management/service-type/service-type.module').then( m => m.ServiceTypePageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./pages/menu/menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'add-favorites',
    loadChildren: () => import('./pages/user/add-favorites/add-favorites.module').then( m => m.AddFavoritesPageModule)
  },
  {
    path: 'request-service',
    loadChildren: () => import('./pages/user/cleaning-management/request-service/request-service.module').then( m => m.RequestServicePageModule)
  },
  {
    path: 'payment-modal',
    loadChildren: () => import('./pages/user/cleaning-management/payment-modal/payment-modal.module').then( m => m.PaymentModalPageModule)
  },
  {
    path: 'carwash-messages/:id',
    loadChildren: () => import('./pages/user/carwash-management/messages/messages.module').then( m => m.MessagesPageModule)
  },
  {
    path: 'carwash-messages',
    loadChildren: () => import('./pages/user/carwash-management/messages/messages.module').then( m => m.MessagesPageModule)
  },






];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
