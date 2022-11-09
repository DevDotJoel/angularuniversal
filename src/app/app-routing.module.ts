import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './pages/product/products/products.component';

const routes: Routes = [
  { path: 'events', component: ProductsComponent },
  { path: '**', redirectTo: 'AppComponent' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
