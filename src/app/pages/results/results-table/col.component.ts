import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';


@Component({
  template: `
  <span [ngClass]="classToApply">{{renderValue}}</span>
  `,
  styles: ['.error { color: red; }']
})
export class ColComponent implements ViewCell, OnInit {

  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;

  classToApply = '';

  ngOnInit() {
    if(this.value == 'ERROR') {
      this.classToApply = 'error';
    }
    this.renderValue = this.value.toString().toUpperCase();
  }

}
