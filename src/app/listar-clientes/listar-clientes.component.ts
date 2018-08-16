import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Customer } from '../modelos/customer-model';

declare var $: any;
declare var M: any;

@Component({
  selector: 'app-listar-clientes',
  templateUrl: './listar-clientes.component.html',
  styleUrls: ['./listar-clientes.component.css']
})
export class ListarClientesComponent implements OnInit {

  clientes: Customer[] = [];
  clienteExclusao: Customer = new Customer;

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    $('#modalExclusao').modal();
    this.buscarClientes();
  }

  buscarClientes() {
    this.customerService.buscarClientes().subscribe(response => {
      console.log(response)

      this.clientes = response['data'].customerList;
    }, () => {
      console.log('Ocorreu um erro ao buscar clientes')
    })
  }

  excluirCliente() {
    this.customerService.deletaCliente(this.clienteExclusao.id).subscribe(response => {
      console.log(response);
      M.toast({ html: 'Cliente deletado!' });
      this.buscarClientes();
    }, ctc => {
      console.log(ctc);
      var toastErrorHTML = '<span style="backgroundColor: red">Ocorreu um erro ao tentar deletar o cliente!</span>';
      M.toast({ html: toastErrorHTML });
    })
  }
}
