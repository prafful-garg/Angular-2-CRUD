import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { UsersComponent } from './users/users.component'

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', component: UsersComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
