import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppPhoneNumbersManagerService, PhoneNumber} from "../../../services/app-phone-numbers-manager.service";
import {Subscription} from "rxjs";
import {MobileOperator} from "../../../services/app-content-manager.service";

interface PhoneNumbersType {
  id: number,
  name: string,
  state: boolean;
}

interface NumbersItem {
  value: number;
  include: boolean;
  exclude: boolean;
}

@Component({
  selector: 'app-search-numbers',
  templateUrl: './search-numbers.component.html',
  styleUrls: ['./search-numbers.component.scss']
})
export class SearchNumbersComponent implements OnInit, OnDestroy {
  public phoneNumbersList: PhoneNumber[] = [];
  private phoneNumbersReverseSort: boolean = false;
  public phoneNumbersPriceCategoriesList: number[] = [];
  public currentCategoriesList: number[] = [];
  public MobileOperatorsList: MobileOperator[] = [];
  public phoneNumbersTypesList: PhoneNumbersType[] = [
    {
      id: 1,
      name: "Мобильный",
      state: true
    },
    {
      id: 2,
      name: "Городской",
      state: false
    }
  ];
  public additionalSearchPanelVisibility: boolean = false;
  private currentMobileOperator: number = 1;
  private phoneNumbersMask: string[] = ["?", "?", "?", "?", "?", "?", "?", "?", "?", "?"];
  private phoneNumbersSearchingByMaskStrict: boolean = false;
  public numbersSetList: NumbersItem[] = [
    {value: 0, include: false, exclude: false}, {value: 1, include: false, exclude: false},
    {value: 2, include: false, exclude: false}, {value: 3, include: false, exclude: false},
    {value: 4, include: false, exclude: false}, {value: 5, include: false, exclude: false},
    {value: 6, include: false, exclude: false}, {value: 7, include: false, exclude: false},
    {value: 8, include: false, exclude: false}, {value: 9, include: false, exclude: false}
  ];
  public phoneNumbersLoadingState: boolean = false;
  private phoneNumbersListSubscription?: Subscription;
  private mobileOperatorsListSubscription?: Subscription;

  constructor(private phoneNumbersManager: AppPhoneNumbersManagerService) { }

  public setCurrentPhoneNumbersType(id: number) {
    this.phoneNumbersTypesList.forEach(
      (type) => {
          type.state = !type.state;
      }
    );
  }

  public setCurrentMobileOperator(id: number): void {
    this.currentMobileOperator = id;
  }

  public addCategory(value: number): void {
    this.currentCategoriesList.push(value);
  }

  public removeCategory(value: number): void {
    if (this.currentCategoriesList.length != 1) {
      const newArray: number[] = [];
      this.currentCategoriesList.forEach(
        (item) => {
          if (item !== value) {
            newArray.push(item);
          }
        }
      );
      this.currentCategoriesList = newArray;
    }
  }

  public setPhoneNumbersSearchingStrict(): void {
    this.phoneNumbersSearchingByMaskStrict = !this.phoneNumbersSearchingByMaskStrict;
  }

  public sortPhoneNumbersList(): void {
    if (this.phoneNumbersReverseSort) {
      this.phoneNumbersList.sort((a, b) => {
        if (a.price < b.price) {
          return 1;
        }
        if (a.price > b.price) {
          return -1;
        }
        return 0;
      });
    } else {
      this.phoneNumbersList.sort((a, b) => {
        if (a.price < b.price) {return -1;}
        if (a.price > b.price) {return 1;}
        return 0;
      });
    }
    this.phoneNumbersReverseSort = !this.phoneNumbersReverseSort;
  }

  private prevMaskSlot(event: any): void {
    const currentSlotId = event.id.toString().split("-");
    const prevSlotId = "slot-" + (Number(currentSlotId[currentSlotId.length - 1]) - 1);
    const prevElement = document.getElementById(prevSlotId);
    if (prevElement) {
      prevElement.focus();
    }
  }

  private nextMaskSlot(event: any): void {
    const currentSlotId = event.id.toString().split("-");
    const nextSlotId = "slot-" + (Number(currentSlotId[currentSlotId.length - 1]) + 1);
    const nextElement = document.getElementById(nextSlotId);
    if (nextElement) {
      nextElement.focus();
    }
  }

  public readPhoneNumbersMask(): void {
    const slots: string[] = ["slot-1", "slot-2", "slot-3", "slot-4", "slot-5", "slot-6", "slot-7", "slot-8",
      "slot-9", "slot-10"]
    const currentMask: string[] = [];
    slots.forEach(
      (slot) => {
        // @ts-ignore
        let value = document.getElementById(slot).value;

        if (value.length > 0) {
          currentMask.push(value);
        } else {
          currentMask.push("?");
        }
      });
    this.phoneNumbersMask = currentMask;
  }


  public changeMaskSlotItem(event: any, button: any): void {
    const isNumber = new RegExp('^[0-9]$');
    const isString = new RegExp('^[A-Za-z]$');

    if (event.value !== "" && button === "ArrowLeft") {
      this.prevMaskSlot(event);
      return;
    }

    if (event.value.length < 1 && button === "ArrowRight") {
      this.nextMaskSlot(event);
      return;
    }

    if (isNumber.test(event.value) || isString.test(event.value) || event.value == false) {
      if (event.value.length < 1 && (button === "Backspace" || button === "ArrowLeft")) {
        this.prevMaskSlot(event);
        this.readPhoneNumbersMask();
        return;
      }

      if (event.value.length > 0 || button === "ArrowRight" && button !== "ArrowLeft") {
        this.nextMaskSlot(event);
        this.readPhoneNumbersMask();
        return;
      }
    } else {
      event.value = null;
    }
  }

  public fetchPhoneNumbersList(): void {
    this.phoneNumbersList = [];
    this.phoneNumbersPriceCategoriesList = [];
    this.phoneNumbersReverseSort = false;
    const mobileOperator: number = this.currentMobileOperator;
    const includeNumbers: number[] = [];
    const excludeNumbers: number[] = [];
    const phoneNumbersMask: string[] = this.phoneNumbersMask;
    const phoneNumbersSearchingByMaskStrict: boolean = this.phoneNumbersSearchingByMaskStrict
    let phoneType: number = 0;

    this.phoneNumbersTypesList.forEach(
      (type) => {if (type.state) {phoneType = Number(type.id);}}
    );

    this.numbersSetList.forEach(
      (item) => {
        if (item.include) {
          includeNumbers.push(item.value);
        }
        if (item.exclude) {
          excludeNumbers.push(item.value);
        }
      }
    );

    this.phoneNumbersLoadingState = false;
    if (this.phoneNumbersListSubscription) {
      this.phoneNumbersListSubscription.unsubscribe();
    }
    this.phoneNumbersListSubscription = this.phoneNumbersManager.getPhoneNumbersList(
      phoneType, mobileOperator, includeNumbers, excludeNumbers, phoneNumbersMask,
      phoneNumbersSearchingByMaskStrict).subscribe(
      (phoneNumbers) => {
        phoneNumbers.forEach(
          (phoneNumber) => {
            this.phoneNumbersList.push(phoneNumber);
            this.phoneNumbersPriceCategoriesList.push(phoneNumber.price);
          }
        );
        this.sortPhoneNumbersList();
        const uniqueCategories: number[] = [];
        this.phoneNumbersPriceCategoriesList.forEach(
          (price) => {
            if (uniqueCategories.indexOf(price) === -1) {
              uniqueCategories.push(price);
            }
          }
        );
        this.phoneNumbersPriceCategoriesList = uniqueCategories.sort((a, b) => {
          return a-b;
        });
        this.currentCategoriesList = this.phoneNumbersPriceCategoriesList;
      }
    );
    this.phoneNumbersLoadingState = true;
  }

  ngOnInit(): void {
    this.fetchPhoneNumbersList();

    this.mobileOperatorsListSubscription = this.phoneNumbersManager.getMobileOperatorsList().subscribe(
      (mobileOperators) => {
        this.MobileOperatorsList = mobileOperators;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.phoneNumbersListSubscription) {
      this.phoneNumbersListSubscription.unsubscribe();
    }
    if (this.mobileOperatorsListSubscription) {
      this.mobileOperatorsListSubscription.unsubscribe();
    }
  }
}
