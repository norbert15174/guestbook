import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) {
  }

  sendFiles(formData: FormData) {
    this.http.post<any>('http://localhost:8443/api/v1/guest/1/files', formData).subscribe(
      (response) => {
        console.log('Pliki zostały wysłane pomyślnie.', response);
      },
      (error) => {
        console.error('Wystąpił błąd podczas wysyłania plików.', error);
      }
    );
  }

}
