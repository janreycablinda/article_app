import { Component, OnInit, Inject, ViewChild, Input } from '@angular/core';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SOLUTIONLINKS } from '../../mock-solution-data';
import { Link } from '../../mock-solution-data';
import { CRUDdataService } from '../../shared/cruddata.service';
import { HeaderVisibility } from '../../shared/header-visibility.service';
import { Router } from '@angular/router';
import { HandleTokenService } from '../../shared/handle-token.service';
import { AddDialogComponent } from '../components/add-dialog/add-dialog.component';
import { DataDetailsComponent } from '../components/data-details/data-details.component';
import { select, Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { ProductService } from 'src/app/store/products/product.service';
import { MatTableDataSource } from '@angular/material/table';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatPaginator } from '@angular/material/paginator';
import { Product } from 'src/app/store/products.state';

export interface DialogData {
  name: string;
  solutionLink: string;
  price: string;
  isPublished: any;
  id: any;
}

@Component({
  selector: 'app-main-page',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  showFiller = false;
  filmIcon = faFilm;
  name?: string ;
  solutionLink?: string ;
  links = SOLUTIONLINKS;
  selectedLink?: Link;
  products$: any = Observable;
 
  displayedColumns = ['id', 'name', 'image', 'actions'];
    dataSource = new MatTableDataSource<Product>(SOLUTIONLINKS);

  constructor(
    public dialog: MatDialog,
    private crudService: CRUDdataService , 
    public headerVisibility: HeaderVisibility, 
    private router: Router,
    private handleToken: HandleTokenService,
    private store: Store,
    private productService: ProductService,
    private breakpointObserver: BreakpointObserver) {
      breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
        this.displayedColumns = result.matches ?
            ['id', 'name', 'image', 'actions'] :
            ['id', 'name', 'image', 'actions'];
        });
     }
     
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);

  @Input()
  hidePageSize!: boolean;

  ngOnInit(): void {
    this.productService.fetchDataList()
  }

  gotoFb(page: String){
    switch (page) {
      case 'facebook':
        window.location.href ='https://facebook.com';
          break;
      case 'twitter':
        window.location.href ='https://twitter.com';
          break;
      case 'instagram':
        window.location.href ='https://instagram.com';
          break;
      case 'tiktok':
        window.location.href ='https://tiktok.com';
          break;
      case 'telegram':
        window.location.href ='https://telegram.com';
          break;
      case 'linkedin':
        window.location.href ='https://linkedin.com';
          break;
      default:
          console.log("No url for this page!");
          break;
    }
  }
  openAddSolutionDialog(): void {
    const addSolutionDialogRef = this.dialog.open(AddDialogComponent, {
      width: '250px',
      data: {prob: this.name, sol: this.solutionLink},
    });
    addSolutionDialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openSolutionDetailsDialog(data:any){
    this.productService.dataID = data.id;
    this.productService.fetchData()
     .subscribe(
      (response: { id: any; name: any; image_link: any; })=>{
      console.log("Old function response: ",response)
      this.productService.dataID = response.id;
      console.log("openning edit dialog with id", response.id);
      const detailDialogRef = this.dialog.open(DataDetailsComponent, {
        data: { name: response.name, solutionLink: response.image_link},
      });
       detailDialogRef.afterClosed().subscribe(() => {
        console.log('The dialog was closed');
        this.productService.fetchDataList();
      });
    });
  }

  async onDelete(data:any){
    await (this.productService.dataID = data.id);
    this.productService.deleteData();
    this.productService.fetchData();
  }

  onLogout(){
    this.handleToken.signOut();
    this.headerVisibility.setShow(!this.handleToken.userLoggedIn);
    this.router.navigate(['/login']);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  selectPage(page: any){

  }
}


