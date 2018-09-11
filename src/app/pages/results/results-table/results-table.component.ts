import {Component} from '@angular/core';

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
    "ST NIGHTLY API"
  ];

  jobName;
  jobNumber;
  lastRun = "";
  runDuration="";

  updateResultOptions = [
    {value: "PASSED_MANUALLY2", title: "PASSED MANUALLY2"},
    {value: "PASSED_LOCALLY", title: "PASSED LOCALLY"},
    {value: "DATA_ISSUE", title: "DATA ISSUE"}
  ];


  settings = {
    // rowClassFunction: (row) => {
    //   if (row.cells[4].newValue === 'FAILED') {
    //     return 'tr-failed';
    //   } else {
    //     return 'text-danger';
    //   }
    // },
    actions: {
      delete: false,
      add: false
    },
    columns: {
      // id: {
      //   title: 'ID',
      //   type: 'number',
      // },
      cukeTag: {
        title: 'Tag',
        type: 'string',
      },
      identifier: {
        title: 'Identifier',
        type: 'string',
      },
      finalResult: {
        title: 'Final Result',
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
          return this.getNiceDate (value);
        },
      },
      updatedOn: {
        title: 'Finished',
        type: 'string',
        valuePrepareFunction: (value) => {
          return this.getNiceDate(value);
        },
      },
      duration: {
        title: 'Duration',
        type: 'string',
        valuePrepareFunction: (cell: any, row: any) => {
          return this.getNiceDateMins(this.getTimeDiff(row.updatedOn, row.createdOn));
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

  constructor(private service: ResultsService) {
    this.jobNumber = "1";
    this.jobName = this.allAvialableJobs[0];


    //
    // this.service.getCukesJobNameAndNumber(this.jobName, this.jobNumber).then((data) => {
    //   this.source = data;
    // });
    this.getResults();


  }

  getTimeDiff(updatedOn, createdOn){
    console.log(" updated on " + updatedOn);
    console.log(" createdOn  " + createdOn);
    console.log("returning " + (updatedOn - createdOn));
    return updatedOn - createdOn;
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  getResults() {
    this.service.getCukesJobNameAndNumber(this.jobName, this.jobNumber).then((data) => {
      this.source = data;
      this.lastRun = "Started: " + this.getNiceDateWithDay(this.source[0].createdOn);
      this.getDuration();
    })
  }

  getDuration(){
    let numLastTest =  this.source.length;
    let finishTime = this.source[numLastTest-1].updatedOn;

    this.runDuration = "Run Time: " +this.getNiceDateMins(this.getTimeDiff(finishTime, this.source[0].createdOn));

  }

  incrementJobNumberUp() {
    this.jobNumber++;
    this.getResults();
  }

  decrementJobNumberUp() {
    this.jobNumber--;
    this.getResults();
  }

  viewResult(id) {
    alert("will view result :: " + id);
  }

  getSizeRun() {
    if (this.source.length > 0) {
      return "Total " + this.source.length + " Scenarios"
    } else if (this.source.length === 0) {
      return "no tests run for : #" + this.jobNumber;
    } else {
      return "N/A";
    }
  }

  onJobNameChange(event) {
    this.getResults();
  }

  onJobNumberChange(event) {
    this.getResults();
  }

  upper(string) {
    return string.toUpperCase();
  }

  getDate(timestamp) {
    return new Date(timestamp).toISOString().replace('T', ' ').replace('Z', '');
  }

  getNiceDate(timestamp) {
    console.log("getNiceDate for :: "+ timestamp);
    let dateObj = new Date(timestamp);
    let hours = dateObj.getHours(); //months from 1-12
    let mins = dateObj.getMinutes(); //months from 1-12
    let sec = dateObj.getSeconds(); //months from 1-12
    let month = dateObj.getUTCMonth() + 1; //months from 1-12
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();

    return  hours + ":" + this.pad(mins,2 ) + ":" + this.pad(sec,2) ;

    // return  day + "/" + month + "     " + hours + ":" + mins + ":" + sec ;
  }

  getNiceDateMins(timestamp) {
    console.log("getNiceDate for :: "+ timestamp);
    let dateObj = new Date(timestamp);

    let mins = dateObj.getMinutes();
    let sec = dateObj.getSeconds();


    return this.pad(mins,2 ) + ":" + this.pad(sec,2) ;

    // return  day + "/" + month + "     " + hours + ":" + mins + ":" + sec ;
  }

  getNiceDateWithDay(timestamp) {
    let dateObj = new Date(timestamp);
    let hours = dateObj.getHours(); //months from 1-12
    let mins = dateObj.getMinutes(); //months from 1-12
    let sec = dateObj.getSeconds(); //months from 1-12
    let month = dateObj.getUTCMonth() + 1; //months from 1-12
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();

    return  day + "/" + month + "     " + hours + ":" + mins + ":" + sec ;
  }


  pad(n, width) {
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join("0") + n;
  }

}
