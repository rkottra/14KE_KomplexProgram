import { Component, Inject, Input, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ProductModel } from '../models/product-model';
import { TermekUrlapComponent } from '../termek-urlap/termek-urlap.component';
import { TermekService } from '../services/termek.service';
import { UserService } from '../services/user.service';
import { MatInput } from '@angular/material/input';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: "dialogYesNoQuestion",
  template: `<h1 mat-dialog-title>Delete "{{product.name}}"</h1>
  <div mat-dialog-content>
    Would you like to delete?
  </div>
  <div mat-dialog-actions>
    <button mat-button mat-dialog-close>No</button>
    <button mat-button [mat-dialog-close]="true" cdkFocusInitial>Yes</button>
  </div>`,
  standalone:true,
  imports:[MatDialogModule]
})
export class DialogComponent {
  public product:ProductModel;

  constructor(@Inject(MAT_DIALOG_DATA) bármi: ProductModel)
  {
    this.product = bármi;
  }
}



@Component({
  selector: 'app-termek-lista',
  templateUrl: './termek-lista.component.html',
  styleUrls: ['./termek-lista.component.css']
})
export class TermekListaComponent {
    
    //public adatforras: TermekModel[] = [];
    public adatforras:MatTableDataSource<ProductModel> 
                    = new MatTableDataSource<ProductModel>();

    public displayedColumns: string[] = ['id', 'name', 
            'price', 'count', 'sumPrice',
            'url', 'functions'];

    @ViewChild(MatPaginator) paginator: any;
    @ViewChild(MatInput) filterInput: any;
    @ViewChild(MatSort) sort: any;


    constructor(private szerviz:TermekService, 
                private _snackBar: MatSnackBar, 
                public dialog: MatDialog,
                public userSzerviz:UserService)
    {
        this.szerviz.listTermekek().subscribe(
          (dataFromBackend) => {
            this.adatforras           = new MatTableDataSource<ProductModel>(dataFromBackend)
            
            this.adatforras.paginator = this.paginator;      
            this.adatforras.sort      = this.sort;
/*            this.adatforras.filterPredicate = function (record,filter) {
              return record.nev.indexOf(filter) != -1 || record.id.toString().indexOf(filter) != -1;
            }*/
          }
        );
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.adatforras.filter = filterValue.trim().toLowerCase();
    }
  

    ngAfterViewInit () {
      
      this.paginator._intl.itemsPerPageLabel="Oldalanként hány elem jelenjen meg";
      
    }

    updateClick(element:ProductModel) {
      let masolat = {...element};
      /*let masolat = {
        id    : element.id,
        name  : element.name,
        price : element.price,
        tax   : element.tax,
        url   : element.url,
        count : element.count,
      };*/

      const dialogRef = this.dialog.open(TermekUrlapComponent, {data: masolat});

      dialogRef.afterClosed().subscribe((result) => {
        if (result !== "") {
          this.szerviz.updateTermek(masolat).subscribe(
              (ModositottTermek:ProductModel) => {
                if (ModositottTermek.name && ModositottTermek.name === masolat.name) {
                  
                  this._snackBar.open("Sikeres módosítás: "+ModositottTermek.name, "", {
                    duration: 2000,
                  });
    
                  this.szerviz.listTermekek().subscribe(
                    (dataFromBackend) => {
                      this.adatforras.data = dataFromBackend;

/*                      this.adatforras = new MatTableDataSource<TermekModel>(dataFromBackend)
                      this.adatforras.paginator = this.paginator;*/
                    }
                  );
    
                } else {
                  this._snackBar.open("Nem sikerült a módosítás: "+masolat.name, "", {
                    duration: 2000,
                  });
                }
              }
          );
        }
      })
    }

    deleteClick(element:ProductModel) {
        const dialogRef = this.dialog.open(DialogComponent, {data: element});

        dialogRef.afterClosed().subscribe(result => {
          if (result === true) {
            this.szerviz.deleteTermek(element).subscribe( 
              {
                next:
                (successfully:boolean) => {
                  if (successfully) {
                    
                    this._snackBar.open("Sikeres törlés: "+element.name, "", {
                      duration: 2000,
                    });
      
                    this.szerviz.listTermekek().subscribe(
                      (dataFromBackend) => {
                        this.adatforras.data = dataFromBackend;
                        //this.adatforras = new MatTableDataSource<TermekModel>(dataFromBackend)
                        //this.adatforras.paginator = this.paginator;
                        //this.adatforras.filter = (this.filterInput as MatInput).value;
                      }
                    );
      
                  } else {
                    this._snackBar.open("Nem sikerült a törlés: "+element.name, "", {
                      duration: 2000,
                    });
                  }
                },
      
                error: (error) =>{
                  this._snackBar.open("Nem sikerült a törlés: "+(error.message), "", {
                    duration: 2000,
                  });
                }
              })
          }
        });
    }

    insertClick() {
      let ujElem = {
        name: "",
        price: 100,
        tax: 27,
        url: "",
      };

      const dialogRef = this.dialog.open(TermekUrlapComponent, {data: ujElem});

      dialogRef.afterClosed().subscribe((result) => {
        if (result !== "") {
          this.szerviz.insertTermek(ujElem as ProductModel).subscribe(
              (ujTermek:ProductModel) => {
                if (ujTermek.name && ujTermek.name === ujElem.name) {
                  
                  this._snackBar.open("Sikeres új termék létrehozás: "+ujTermek.name, "", {
                    duration: 2000,
                  });
    
                  this.szerviz.listTermekek().subscribe(
                    (dataFromBackend) => {
                      this.adatforras.data = dataFromBackend;

/*                      this.adatforras = new MatTableDataSource<TermekModel>(dataFromBackend)
                      this.adatforras.paginator = this.paginator;
                      this.adatforras.filter = (this.filterInput as MatInput).value;*/
                    }
                  );
    
                } else {
                  this._snackBar.open("Nem sikerült az új termék létrehozása: "+ujElem.name, "", {
                    duration: 2000,
                  });
                }
              }
          );
        }
      })
    }
}
