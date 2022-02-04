import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { bank } from './bank';

@Injectable({
  providedIn: 'root'
})
export class BankServiceService {

  private _url:string="https://vast-shore-74260.herokuapp.com/banks?city=MUMBAI"
  constructor(private http:HttpClient) { }

  getBankDetails():Observable<bank[]>{
    return this.http.get<bank[]>(this._url);
  }

}
