import { Directive } from '@angular/core';
import { NgModel, FormControl } from '@angular/forms';

@Directive({
    selector: '[updateTextFields]',
    providers: [NgModel]
})
export class UpdateTextFieldsDirective {
  
    constructor(private model: NgModel) {
    }

    // ngOnInit() {
    //     // haven't really looked into how to handle form groups or binds using ngModel
    //     let m = this.model.formDirective ?
    //         this.model.formDirective :
    //         this.model;

    //     m.valueChanges.subscribe(value => {
    //         Materialize.updateTextFields();
    //     });
    // }
}