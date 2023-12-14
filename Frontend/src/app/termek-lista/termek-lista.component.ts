import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TermekModel } from '../termek-model';
import { TermekService } from '../termek.service';

@Component({
  selector: 'app-termek-lista',
  templateUrl: './termek-lista.component.html',
  styleUrls: ['./termek-lista.component.css']
})
export class TermekListaComponent {
    
    //public adatforras: TermekModel[] = [];
    public adatforras:MatTableDataSource<TermekModel> 
                    = new MatTableDataSource<TermekModel>();

    public displayedColumns: string[] = ['idColumn', 'nevColumn', 
            'arColumn', 'dbColumn', 'osszArColumn',
            'kepColumn', 'funkcioColumn'];

    //public darabok:number[] = [];

    @ViewChild(MatPaginator) paginator: any;
    
    constructor(private szerviz:TermekService) {
        this.szerviz.listTermekek().subscribe(
          (dataFromBackend) => {
            this.adatforras = new MatTableDataSource<TermekModel>(dataFromBackend)
            this.adatforras.paginator = this.paginator;
          }
        );
        
    }
}
