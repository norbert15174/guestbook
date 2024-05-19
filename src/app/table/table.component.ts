import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {Table} from "./table";
import {environment} from "../../../environment";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit {
  myControl = new FormControl<string>('');
  options: Table[] = [];
  filteredOptions!: Observable<Table[]>;
  info: boolean = false;
  tables: Table[] = [];
  tableId: number = 0;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.http.get<Table[]>(`${environment.apiUrl}/api/v1/guest`).subscribe(
      (response) => {
        this.options = response;
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => this.filter(value || '')),
        );
      }
    );

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filter(value || '')),
    );
  }

  displayFn(user: string): string {
    return user ? user : '';
  }

  private filter(name: string): Table[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.fullname.toLowerCase().includes(filterValue));
  }

  showInfo(id: number) {
    let tables = this.options.filter(o => o.tableId === id);
    this.tableId = id;
    this.info = true;
    this.tables = tables;
  }
}
