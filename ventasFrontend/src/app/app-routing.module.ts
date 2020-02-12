import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonaComponent } from './views/persona/persona.component';
import { ProductoComponent } from './views/producto/producto.component';


const routes: Routes = [
  {path: 'persona', component: PersonaComponent},
  {path: 'producto', component: ProductoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
