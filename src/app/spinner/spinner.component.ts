import {Component, OnInit} from '@angular/core';
import {SpinnerService} from "./spinner.service";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss'
})
export class SpinnerComponent implements OnInit {

  showSpinner = false;

  constructor(private spinnerService: SpinnerService) {
  }

  ngOnInit(): void {
    this.spinnerService.spinner.subscribe(spinner => this.showSpinner = spinner)
  }


}
