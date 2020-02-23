import { Component, OnInit, Inject } from '@angular/core';
import { Producto } from 'src/app/_model/producto';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProductoService } from 'src/app/_service/producto.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-producto-dialogo',
  templateUrl: './producto-dialogo.component.html',
  styleUrls: ['./producto-dialogo.component.css']
})
export class ProductoDialogoComponent implements OnInit {

  producto: Producto;

  constructor(
    private dialogRef: MatDialogRef<ProductoDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Producto,
    private productoService : ProductoService
  ) { }

  ngOnInit() {
    this.producto = new Producto();
    this.producto.idProducto = this.data.idProducto;
    this.producto.nombre = this.data.nombre;
    this.producto.marca = this.data.marca;
  }

  cancelar() {
    this.dialogRef.close();
  }

  operar(){
    if (this.producto != null && this.producto.idProducto > 0) {
      //MODIFICAR
      //BUENO PRACTICA
      this.productoService.modificar(this.producto).pipe(switchMap( () => {
        return this.productoService.listar();
      })).subscribe(data => {
        this.productoService.productoCambio.next(data);
        this.productoService.mensajeCambio.next('SE MODIFICO');
      });      
    }else{
      //REGISTRAR      
      //PRACTICA COMUN
      this.productoService.registrar(this.producto).subscribe(() => {
        this.productoService.listar().subscribe(data => {
          this.productoService.productoCambio.next(data);
          this.productoService.mensajeCambio.next('SE REGISTRO');
        });
      });
    }
    this.dialogRef.close();
  }
}
