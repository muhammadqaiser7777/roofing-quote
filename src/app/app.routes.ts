// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { Faq } from './pages/faq/faq';
import { Form } from './pages/form/form';
import { Policies } from './pages/policies/policies';
import {MarketingPartners} from './pages/marketing-partners/marketing-partners';


export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'contact', component: Contact },
  { path: 'faq', component: Faq },
  { path: 'form', component: Form },
  { path: 'policies', component: Policies },
  { path: 'marketing-partners', component: MarketingPartners },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled', // 👈 scrolls to top automatically
      anchorScrolling: 'enabled'           // optional: allows #anchor navigation
    })
  ],
  exports: [RouterModule] // 👈 needed so routing works
})
export class AppRoutingModule {}
