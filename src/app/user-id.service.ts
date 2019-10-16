import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserIdService {
  private _userId: string;
  get userId(): string {
    return this._userId;
  }

  set userId(value: string) {
    this._userId = value;
  }

  constructor() {
  }
}
