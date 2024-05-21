import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BookService} from "./book.service";
import {SpinnerService} from "../spinner/spinner.service";
import {Book} from "./book";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent implements OnInit {

  imageUrls: string[] = [];
  selectedItem!: string;
  selectedFiles!: FileList;
  loginForm!: FormGroup<Book>;
  files: File[] = [];

  constructor(private http: HttpClient, private formBuilder: FormBuilder, private bookService: BookService, private spinnerService: SpinnerService) {
    this.selectedItem = 'PHOTO_AND_MESSAGE';
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      from: this.formBuilder.nonNullable.control('', {validators: [Validators.required]}),
      message: this.formBuilder.nonNullable.control(''),
    });
  }

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    if (!files) return;

    this.selectedFiles = files;

    this.imageUrls = [];
    for (let i = 0; i < files.length; i++) {
      const file: File = files[i];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.imageUrls.push(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  }

  removeUrl(imageUrl: string) {
    let index = this.imageUrls.indexOf(imageUrl);
    this.imageUrls.splice(index, 1);
  }

  removeAll() {
    this.imageUrls = [];
  }

  changeSelectedItem(type: string) {
    this.selectedItem = type;
    if (this.selectedItem === 'MESSAGE') {
      this.imageUrls = [];
    }
  }

  submit() {
    this.spinnerService.show();
    if (this.loginForm?.valid) {
      this.bookService.createBook(this.loginForm.getRawValue())
        .subscribe(data => {
            this.uploadFiles(data.uuid);
          }
        )
    } else {
      this.loginForm.markAllAsTouched();
    }

  }

  private uploadFiles(uuid: string) {
    if (!this.selectedFiles || this.selectedFiles.length < 1) {
      this.spinnerService.hide();
      return
    }

    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.files.push(this.selectedFiles[i]);
    }

    const formData = new FormData();
    this.files.forEach(file => {
      formData.append('files', file, file.name);
    });

    let headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    this.bookService.sendFiles(formData, uuid).subscribe(data => {
        this.spinnerService.hide();
      }
    );
  }
}
