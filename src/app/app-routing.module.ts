import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListarClientesComponent } from './listar-clientes/listar-clientes.component';
import { CadastroClienteComponent } from './cadastro-cliente/cadastro-cliente.component';

const routes: Routes = [
  { path: 'listarClientes', component: ListarClientesComponent },
  { path: 'cadastroCliente', component: CadastroClienteComponent },
  { path: 'consultaCliente/:idCliente', component: CadastroClienteComponent },
  { path: '', redirectTo: '/listarClientes', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
