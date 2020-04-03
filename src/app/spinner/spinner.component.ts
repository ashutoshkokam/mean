import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { SpinnerService } from '../../util/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  visibility: Subject<boolean> = this.spinnerService.visibility;
  constructor(private spinnerService:SpinnerService) { }

  ngOnInit() {
  }

}
