import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CustomerService {

  constructor(private http: HttpClient) { }

  salvarCliente(cliente) {
    return this.http.post('http://test.portalpostal.com.br:8083/secure/customer', cliente);
  }

  atualizarCliente(cliente) {
    return this.http.put('http://test.portalpostal.com.br:8083/secure/customer', cliente);
  }

  buscarClientes() {
    return this.http.get('http://test.portalpostal.com.br:8083/secure/customers/');
  }

  buscarCliente(idCliente) {
    return this.http.get(`http://test.portalpostal.com.br:8083/secure/customer/${idCliente}`);
  }

  deletaCliente(idCliente) {
    return this.http.delete(`http://test.portalpostal.com.br:8083/secure/customer/${idCliente}`);
  }
}
