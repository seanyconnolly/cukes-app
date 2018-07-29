import { Component } from '@angular/core';

import {ResultsService} from "../../../@core/data/ResultsService";

@Component({
  selector: 'ngx-results-table',
  templateUrl: './results-table.component.html',
  styleUrls: ['./results-table.component.css']
})

export class ResultsTableComponent {

  allAvialableJobs = [
    "ST NIGHTLY IOS",
    "ST NIGHTLY ANDROID",
  ];

  jobName;
  jobNumber;
  lastRun = "";

  updateResultOptions = [
    { value: "PASSED_MANUALLY2", title: "PASSED MANUALLY2"},
    { value: "PASSED_LOCALLY", title: "PASSED LOCALLY"},
    { value: "DATA_ISSUE", title: "DATA ISSUE"}
  ];


  settings = {
     actions: {
       delete: false,
       add: false
     },

    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      cukeTag: {
        title: 'Tag',
        type: 'string',
      },
      identifier: {
        title: 'Identifier',
        type: 'string',
      },
      finalResult: {
        title:'Final Result',
        type: 'string',
        valuePrepareFunction: (value) => {
          return this.upper(value);
        },
        editor: {
          type: 'list',
          config: {
            selectText: "select",
            list: this.updateResultOptions,
          },
        },
      },
      failReason: {
        title: 'Reason',
        type: 'string',
      },
      failDescription: {
        title: 'Description',
        type: 'string',
      },
      createdOn: {
        title: 'Started',
        type: 'string',
        valuePrepareFunction: (value) => {
          return this.getDate(value);
        },
      },
      updatedOn: {
        title: 'Finished',
        type: 'string',
        valuePrepareFunction: (value) => {
          return this.getDate(value);
        },
      },
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
  };

  // source: LocalDataSource = new LocalDataSource();
  source;

  constructor(private service: ResultsService ) {
    this.jobNumber = "1";
    this.jobName = this.allAvialableJobs[0];
    this.lastRun = "Thursday 28th June 07:30";

    //
    // this.service.getCukesJobNameAndNumber(this.jobName, this.jobNumber).then((data) => {
    //   this.source = data;
    // });
    this.getResults();


  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  getResults(){
    this.service.getCukesJobNameAndNumber(this.jobName, this.jobNumber).then((data) => {
      this.source = data;
    })
  }

  viewResult(id){
    alert("will view result :: " + id);
  }

  onJobNameChange(event){
    this.getResults();
  }

  onJobNumberChange(event){
    this.getResults();
  }

  upper(string){
    return string.toUpperCase();
  }

  getDate(timestamp){
    return new Date(timestamp).toISOString().replace('T', ' ').replace('Z','');
  }
}
