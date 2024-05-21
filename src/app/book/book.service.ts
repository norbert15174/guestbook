import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environment";
import {BookRequest, BookResponse} from "./book";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) {
  }

  sendFiles(formData: FormData, uuid: string) {
    return this.http.post<any>(`${environment.apiUrl}/api/v1/guest/${uuid}/files`, formData);
  }

  createBook(book: BookRequest) {
    return this.http.post<BookResponse>(`${environment.apiUrl}/api/v1/book`, book);
  }

}
