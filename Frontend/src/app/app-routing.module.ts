import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TermekListaComponent } from './termek-lista/termek-lista.component';

const routes: Routes = [
  {
    path: 'termekek/:filter',
    component: TermekListaComponent
    
  },
  {
    path: '**',
    component: TermekListaComponent
    
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
