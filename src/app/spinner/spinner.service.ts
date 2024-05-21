import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor() {
  }

  private _spinner = new BehaviorSubject<boolean>(false);

  get spinner(): BehaviorSubject<boolean> {
    return this._spinner;
  }

  hide() {
    this._spinner.next(false);
  }

  show() {
    this._spinner.next(true);
  }

}
