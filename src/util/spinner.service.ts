import { Injectable } from '@angular/core';
import { BehaviorSubject,Subject } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
 
  visibility= new Subject<boolean>();
 
 
 
  show() {
    this.visibility.next(true);
  }
 
  hide() {
    this.visibility.next(false);
  }
}