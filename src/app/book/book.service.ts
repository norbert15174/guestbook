import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environment";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) {
  }

  sendFiles(formData: FormData) {
    this.http.post<any>(`${environment.apiUrl}/api/v1/guest/1/files`, formData).subscribe(
      (response) => {
        console.log('Pliki zostały wysłane pomyślnie.', response);
      },
      (error) => {
        console.error('Wystąpił błąd podczas wysyłania plików.', error);
      }
    );
  }

}
