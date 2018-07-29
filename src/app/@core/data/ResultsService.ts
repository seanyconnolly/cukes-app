import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Headers} from '@angular/http';
import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";


@Injectable()
export class ResultsService {

    constructor(private http: Http) {
    }


    getCukes() {
        return this.getHelper("http://localhost:7002" + '/cuke');
    }

    getCukesJobNameAndNumber(name: string, number:string) {
        return this.getHelper(environment.resultsAaiUrl + '/cuke/' + name + '/' + number);
    }


    private getHelperText(url: string) {
        let headers = new Headers();
        //   this.createAuthorizationHeader(headers);
        return new Promise((resolve, reject) => {
            this.http.get(url, {headers: headers})
                .map((res) => {
                    return res.text();
                })
                .subscribe(data => {
                    console.log(data);
                    resolve(data);
                }, error => reject(error));

        });
    }

    private getHelper(url: string) {
        let headers = new Headers();
        // this.createAuthorizationHeader(headers);
        // headers.append("contentType", "applocation/json");
        return new Promise((resolve, reject) => {
            this.http.get(url, {headers: headers})
                .map((res) => {
                    return res.json();
                })
                .subscribe(data => {
                    console.log(data);
                    resolve(data);
                }, error => reject(error));

        });
    }

    private postHelper(url: string, body: any) {
        let headers = new Headers();
        // this.createAuthorizationHeader(headers);
        // headers.append("contentType", "applocation/json");
        return new Promise((resolve, reject) => {
            this.http.post(url, body, {headers: headers})
                .map((res) => {
                    const json = res.json();
                    return json;
                })
                .subscribe(data => {
                    resolve(data);
                }, error => reject(error));

        });
    }

    private putHelper(url: string, body: any) {
        let headers = new Headers();
        // this.createAuthorizationHeader(headers);
        // headers.append("contentType", "applocation/json");
        return new Promise((resolve, reject) => {
            this.http.put(url, body, {headers: headers})
                .map((res) => {
                    const json = res.json();
                    return json;
                })
                .subscribe(data => {
                    resolve(data);
                }, error => reject(error));

        });
    }


}
