import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: "phoneNumberPipe"})
export class PhoneNumberPipe implements PipeTransform {
  transform(rawPhoneNumberString: number | null): string {
    if (rawPhoneNumberString === null) {
      return "";
    }
    let phoneNumberString = rawPhoneNumberString.toString();
    return "+7 (" + phoneNumberString.slice(0, 3) + ") " + phoneNumberString.slice(3, 6) + " - "
      + phoneNumberString.slice(6, 8) + " - " + phoneNumberString.slice(8, 10);
  }
}
