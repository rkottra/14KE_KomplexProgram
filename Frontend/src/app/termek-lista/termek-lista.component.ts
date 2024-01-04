import { Component, Inject, Input, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { TermekModel } from '../termek-model';
import { TermekUrlapComponent } from '../termek-urlap/termek-urlap.component';
import { TermekService } from '../termek.service';

@Component({
  selector: "dialogYesNoQuestion",
  template: `<h1 mat-dialog-title>Delete "{{product.nev}}"</h1>
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
  public product:TermekModel;

  public asd:string = "válasz";

  constructor(@Inject(MAT_DIALOG_DATA) bármi: TermekModel)
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
    public adatforras:MatTableDataSource<TermekModel> 
                    = new MatTableDataSource<TermekModel>();

    public displayedColumns: string[] = ['idColumn', 'nevColumn', 
            'arColumn', 'dbColumn', 'osszArColumn',
            'kepColumn', 'funkcioColumn'];

    //public darabok:number[] = [];

    @ViewChild(MatPaginator) paginator: any;
    
    constructor(private szerviz:TermekService, private _snackBar: MatSnackBar, public dialog: MatDialog) {
        this.szerviz.listTermekek().subscribe(
          (dataFromBackend) => {
            this.adatforras = new MatTableDataSource<TermekModel>(dataFromBackend)
            this.adatforras.paginator = this.paginator;
          }
        );
        
    }

    updateClick(element:TermekModel) {
      const dialogRef = this.dialog.open(TermekUrlapComponent, {data: element});

      dialogRef.afterClosed().subscribe((result) => {
        if (result !== "") {
          this.szerviz.updateTermek(element).subscribe();
        }
      })
    }

    deleteClick(element:TermekModel) {
        const dialogRef = this.dialog.open(DialogComponent, {data: element});

        dialogRef.afterClosed().subscribe(result => {
          if (result === true) {
            this.szerviz.deleteTermek(element).subscribe( 
              {
                next:
                (successfully:boolean) => {
                  if (successfully) {
                    
                    this._snackBar.open("Sikeres törlés: "+element.nev, "", {
                      duration: 2000,
                    });
      
                    this.szerviz.listTermekek().subscribe(
                      (dataFromBackend) => {
                        this.adatforras = new MatTableDataSource<TermekModel>(dataFromBackend)
                        this.adatforras.paginator = this.paginator;
                      }
                    );
      
                  } else {
                    this._snackBar.open("Nem sikerült a törlés: "+element.nev, "", {
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
}
