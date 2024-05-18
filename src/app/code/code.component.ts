import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {isPlatformBrowser} from "@angular/common";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {environment} from "../../../environment";

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrl: './code.component.scss'
})
export class CodeComponent implements OnInit {

  loginForm!: FormGroup;
  error?: string;

  constructor(private formBuilder: FormBuilder, @Inject(PLATFORM_ID) private platformId: Object, private router: Router, private route: ActivatedRoute, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      code: ['', Validators.required]
    });

    let params = this.route.snapshot.queryParamMap;
    if (params.has("code")) {
      if (isPlatformBrowser(this.platformId)) {
        window.location.href = `${environment.apiUrl}/api/v1/code?code=${params.get("code")}`;
      }
    }

    this.onChanges();
  }

  onChanges(): void {
    this.loginForm.get('code')?.valueChanges.subscribe(val => {
      this.error = '';
    });
  }

  onSubmit() {
    if (this.loginForm?.valid) {
      this.http.get<any>(`${environment.apiUrl}/api/v1/code/check?code=${this.loginForm.controls['code'].value}`).subscribe(
        (response) => {
          window.location.href = `${environment.apiUrl}/api/v1/code?code=${this.loginForm.controls['code'].value}`;
          return
        },
        (error) => {
          this.error = 'Niepoprawny kod'
          return
        }
      );

    } else {
      this.loginForm.markAllAsTouched();
    }
  }

}
