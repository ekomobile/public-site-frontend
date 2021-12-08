import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {MobileOperator} from "./app-content-manager.service";


export interface PhoneNumber {
  abc_ctn: number | null;
  def_ctn: number,
  type: number,
  price: number
}


@Injectable({
  providedIn: 'root'
})
export class AppPhoneNumbersManagerService {
  private apiUrl: string = environment.apiBaseUrl + "phone_numbers/?";
  private apiUrl2: string = environment.apiBaseUrl + "content_manager/";

  constructor(private http: HttpClient) { }


  public getPhoneNumbersList(phoneType: number, mobileOperator: number, includeNumbers: number[],
                             excludeNumbers: number[], phoneNumbersMask: string[],
                             phoneNumbersMaskStrict: boolean) {
    const headers = new HttpHeaders();
    headers.append("Content-Type", "application/text");
    let params: string[] = [];
    params.push("phone_type=" + phoneType.toString());
    params.push("mobile_operator=" + mobileOperator.toString());
    params.push("phone_number_mask=" + phoneNumbersMask.join(""))
    if (phoneNumbersMaskStrict) {
      params.push("phone_number_mask_strict=1");
    }
    includeNumbers.forEach(
      (number) => {
        params.push("include_numbers=" + number.toString());
      }
    );
    excludeNumbers.forEach(
      (number) => {
        params.push("exclude_numbers=" + number.toString());
      }
    );
    const url = this.apiUrl + params.join("&");
    console.log(url);
    return this.http.get<Array<PhoneNumber>>(url, {headers: headers});
  }

  public getMobileOperatorsList() {
    const headers = new HttpHeaders();
    headers.append("Content-Type", "application/text");
    return this.http.get<Array<MobileOperator>>(this.apiUrl2 + 'mobile_operators/', {headers: headers});
  }
}
