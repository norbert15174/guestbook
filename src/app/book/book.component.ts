import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {BookService} from "./book.service";
import {SpinnerService} from "../spinner/spinner.service";
import {Book} from "./book";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent implements OnInit {

  imageUrls: string[] = [];
  selectedItem!: string;
  currentForm!: FormGroup<Book>;
  files: File[] = [];
  showImageError: boolean = false;
  readonly MAX_FILE_SIZE = 50 * 1024 * 1024; // 50 MB in bytes

  constructor(private http: HttpClient, private formBuilder: FormBuilder, private bookService: BookService, private spinnerService: SpinnerService,
              private toastrService: ToastrService) {
    this.selectedItem = 'PHOTO_AND_MESSAGE';
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.currentForm = this.formBuilder.group({
      from: this.formBuilder.nonNullable.control('', {validators: [Validators.required]}),
      message: this.formBuilder.nonNullable.control(''),
    });
    this.selectedItem = 'PHOTO_AND_MESSAGE';
    this.files = [];
    this.imageUrls = [];
  }

  private resetForm() {
    this.currentForm.reset();
    this.selectedItem = 'PHOTO_AND_MESSAGE';
    this.files = [];
    this.imageUrls = [];
  }

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    this.showImageError = false;
    if (!files) {
      this.files = [];
      return;
    }

    this.imageUrls = [];
    const input = event.target as HTMLInputElement;
    if (input.files) {
      let currentSize = 0;
      for (let i = 0; i < input.files.length; i++) {
        const mimeType = input.files[i].type;
        if (!mimeType.startsWith('image/')) {
          this.toastrService.error('Nie wszystkie wskazane pliki są zdjęciami', '', {
            timeOut: 5000,
            progressBar: true,
            enableHtml: true,
          });
          this.files = [];
          this.imageUrls = [];
          return;
        }

        currentSize += input.files[i].size;
        if (currentSize > this.MAX_FILE_SIZE) {
          this.showImageError = true;
          this.files = [];
          this.imageUrls = [];
          return;
        }

        this.files.push(input.files[i]);
        this.imageUrls.push(URL.createObjectURL(input.files[i]));
      }
    }
  }

  removeUrl(imageUrl: string) {
    let index = this.imageUrls.indexOf(imageUrl);
    this.imageUrls.splice(index, 1);
    this.files.splice(index, 1);
  }

  removeAll() {
    this.imageUrls = [];
    this.files = [];
  }

  changeSelectedItem(type: string) {
    this.selectedItem = type;
    if (this.selectedItem === 'MESSAGE') {
      this.imageUrls = [];
      this.files = [];
    }
  }

  submit(formDirective: FormGroupDirective) {
    if (this.currentForm?.valid) {
      this.spinnerService.show();
      this.bookService.createBook(this.currentForm.getRawValue())
        .subscribe({
          next: data => {
            if (!this.files || this.files.length < 1) {
              this.spinnerService.hide();
              this.toastrService.success('Życzenia zostały przesłane', '', {
                timeOut: 5000,
                progressBar: true,
                enableHtml: true,
              });
              this.resetForm()
              formDirective.resetForm();
              return
            }
            this.uploadFiles(data.uuid, formDirective);
          },
          error: err => {
            this.toastrService.error('Nie udało się przesłać życzeń, spróbuj ponownie za chwilę', '', {
              timeOut: 5000,
              progressBar: true,
              enableHtml: true,
            });
          }
          }
        )
    } else {
      this.currentForm.markAllAsTouched();
    }

  }

  private uploadFiles(uuid: string, formDirective: FormGroupDirective) {
    const formData = new FormData();
    this.files.forEach(file => {
      formData.append('files', file, file.name);
    });

    let headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    this.bookService.sendFiles(formData, uuid).subscribe({
      next: data => {
        this.spinnerService.hide();
        this.toastrService.success('Życzenia zostały przesłane', '', {
          timeOut: 5000,
          progressBar: true,
          enableHtml: true,
        });
        formDirective.resetForm();
        this.resetForm();
      },
      error: err => {
        this.toastrService.error('Nie udało się przesłać życzeń, spróbuj ponownie za chwilę', '', {
          timeOut: 5000,
          progressBar: true,
          enableHtml: true,
        });
        this.spinnerService.hide();
      }
      }
    );
  }
}
