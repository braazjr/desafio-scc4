import { Component, OnInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { Customer } from '../modelos/customer-model';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { CustomerService } from '../customer.service';
import { FormGroup, FormBuilder, Validators } from '../../../node_modules/@angular/forms';

declare var $: any;
declare var M: any;

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.css']
})
export class CadastroClienteComponent implements OnInit, AfterViewChecked {

  idCliente: any;
  cliente: Customer = new Customer();
  federalIdMask: any = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/,];
  phoneMask: any = ['(', /[1-9]/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  cellphoneMask: any = ['(', /[1-9]/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  formulario: FormGroup;

  constructor(private _changeDetectionRef: ChangeDetectorRef, private _route: ActivatedRoute, private _customerService: CustomerService, private _formBuilder: FormBuilder) { }

  ngOnInit() {
    $('.datepicker').datepicker({
      format: 'dd/mm/yyyy',
      i18n: {
        cancel: 'Cancelar',
        clear: 'Limpar',
        previousMonth: 'Mês anterior',
        nextMonth: 'Próximo mês',
        months: [
          'Janeiro',
          'Fevereiro',
          'Maio',
          'Abril',
          'Maio',
          'Junho',
          'Julho',
          'Agosto',
          'Setembro',
          'Outubro',
          'Novembro',
          'Dezembro'
        ],
        monthsShort: [
          'Jan',
          'Fev',
          'Mar',
          'Abr',
          'Mai',
          'Jun',
          'Jul',
          'Ago',
          'Set',
          'Out',
          'Nov',
          'Dez'
        ],
        weekdays: [
          'Domingo',
          'Segunda',
          'Terça',
          'Quarta',
          'Quinta',
          'Sexta',
          'Sábado'
        ],
        weekdaysShort: [
          'Dom',
          'Seg',
          'Ter',
          'Qua',
          'Qui',
          'Sex',
          'Sab'
        ],
        weekdaysAbbrev: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
      }
    });

    this.idCliente = this._route.snapshot.paramMap.get('idCliente');
    console.log(this.idCliente)

    if (this.idCliente != null && this.idCliente != 0)
      this._customerService.buscarCliente(this.idCliente).subscribe(response => {
        this.cliente = response['data'].customer;
        console.log(this.cliente)
      })

    this.formulario = this._formBuilder.group({
      active: ['', [Validators.required]],
      federalIdType: ['', [Validators.required]],
      name: ['', Validators.required],
      federalId: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      registration: [''],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      phone2: [''],
      residentialPhone: [''],
      commercialPhone: [''],
      emailCollection: ['', [Validators.required]],
      emergencyContact: [''],
      emergencyPhone: [''],
      birthday: ['']
    })
  }

  ngAfterViewChecked(): void {
    M.updateTextFields();
    this._changeDetectionRef.detectChanges();
  }

  salvarCliente() {
    console.log(this.cliente);

    if (this.cliente.id == undefined) {
      this._customerService.salvarCliente(this.cliente).subscribe(response => {
        console.log(response)
        M.toast({ html: 'Cliente salvo!' });
      }, ctc => {
        console.log(ctc);
        var toastErrorHTML = '<span style="backgroundColor: red">Ocorreu um erro ao tentar salvar o cliente!</span>';
        M.toast({ html: toastErrorHTML });
      })
    } else {
      this._customerService.atualizarCliente(this.cliente).subscribe(response => {
        console.log(response);
        M.toast({ html: 'Cliente atualizado!' });
      }, ctc => {
        console.log(ctc);
        var toastErrorHTML = '<span style="backgroundColor: red">Ocorreu um erro ao tentar atualizar o cliente!</span>';
        M.toast({ html: toastErrorHTML });
      })
    }
  }

  getFederal() {
    if (this.cliente.federalIdType != undefined) {
      if (this.cliente.federalIdType == 'Physical') {
        this.federalIdMask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/,];
        return 'CPF *';
      } else {
        this.federalIdMask = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/,];
        return 'CNPJ *';
      }
    } else {
      return 'Escolha CPF ou CNPJ'
    }
  }
}
