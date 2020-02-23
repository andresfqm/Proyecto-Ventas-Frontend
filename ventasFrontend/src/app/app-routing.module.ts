import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonaComponent } from './pages/persona/persona.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { VentaComponent } from './pages/venta/venta.component';
import { PersonaEdicionComponent } from './pages/persona/persona-edicion/persona-edicion/persona-edicion.component';


// Configuramos nuestras reglas de navegación
const routes: Routes = [
  {
    path: 'persona', component: PersonaComponent, children: [
      { path: 'edicion/:id', component: PersonaEdicionComponent },
      { path: 'nuevo', component: PersonaEdicionComponent }
    ]
  },
  { path: 'producto', component: ProductoComponent },
  {path: 'venta', component: VentaComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
