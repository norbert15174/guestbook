import {FormControl} from "@angular/forms";

export interface Book {

  from: FormControl<string>,
  message: FormControl<string>,

}

export interface BookRequest {

  from: string,
  message: string

}

export interface BookResponse {

  id: number,
  uuid: string

}
