import { ProductoDialogoComponent } from './producto-dialogo/producto-dialogo.component';
import { ProductoService } from './../../_service/producto.service';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialog } from '@angular/material';
import { Producto } from './../../_model/producto';
import { Component, OnInit, ViewChild } from '@angular/core';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-medico',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  displayedColumns = ['idProducto', 'nombre', 'marca'];
  dataSource: MatTableDataSource<Producto>;
  
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private productoService : ProductoService, 
    private dialog : MatDialog, 
    private snack: MatSnackBar) { }

  ngOnInit() {
    this.productoService.productoCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.productoService.mensajeCambio.subscribe(data => {
      this.snack.open(data, 'AVISO', {
        duration: 2000
      });
    });

    this.productoService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  filtrar(valor : string){
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  abrirDialogo(producto? : Producto){
    let med = producto != null ? producto : new Producto();
    this.dialog.open(ProductoDialogoComponent, {
      width: '250px',
      data: med
    });
  }

  eliminar(producto : Producto){
    this.productoService.eliminar(producto.idProducto).pipe(switchMap( () => {
      return this.productoService.listar();
    })).subscribe(data => {
      this.productoService.productoCambio.next(data);
      this.productoService.mensajeCambio.next('SE ELIMINO');
    });
  }


}
