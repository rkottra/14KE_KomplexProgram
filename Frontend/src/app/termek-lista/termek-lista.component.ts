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
import { ActivatedRoute, Params } from '@angular/router';

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
            'price', 'category.name',//'count', 'sumPrice',
            'url', 'functions'];

    @ViewChild(MatPaginator) paginator: any;
    @ViewChild(MatInput) filterInput: any;
    @ViewChild(MatSort) sort: any;

    public keresoKifejezes:string = "";

    ngOnInit(): void {
      this.route.params.subscribe(
        (params) =>{
          if (params != null) {
            this.keresoKifejezes = params['filter'];
          }
        }
      );
    }

    constructor(private szerviz:TermekService, 
                private _snackBar: MatSnackBar, 
                public dialog: MatDialog,
                public userSzerviz:UserService,
                private route: ActivatedRoute)
    {
        
        this.szerviz.listTermekek().subscribe(
          (dataFromBackend) => {

           /* let segedList = new Array();
            for (let index = 0; index < dataFromBackend.length; index++) {
              const element = dataFromBackend[index];
              let seged =  {
                id    : element.id,
                name  : element.name,
                price : element.price,
                url   : element.url,
              };
              segedList.push(seged);
              
            }
            this.adatforras           = new MatTableDataSource<ProductModel>(segedList);
            */
            
            this.adatforras           = new MatTableDataSource<ProductModel>(dataFromBackend);
            
            this.adatforras.paginator = this.paginator;  
            this.adatforras.sortingDataAccessor = (item:ProductModel, property) => {
              switch(property) {
                case 'category.name': return item.category.name;
                case 'price': return item.price;
                case 'id': return item.id;
                default: return item.name;
              }
            };

            this.adatforras.sort      = this.sort;
            
            this.applyFilter();

          }
        );
    }

    applyFilter() {
      
      this.adatforras.filterPredicate = 
        (data: ProductModel, filter: string) =>
          data.category.name.indexOf(filter) != -1 ||
          data.name.indexOf(filter) != -1 ||
          data.price.toString().indexOf(filter) != -1 ;

      this.adatforras.filter = this.keresoKifejezes.trim().toLowerCase();
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
