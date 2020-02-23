import { Component, OnInit, ViewChild } from '@angular/core';
import { Persona } from 'src/app/_model/persona';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar } from '@angular/material';
import { PersonaService } from 'src/app/_service/persona.service';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  displayedColumns = ['idPersona', 'nombres', 'apellidos', 'acciones'];
  dataSource: MatTableDataSource<Persona>
  @ViewChild(MatSort, { static : true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(  private personaService: PersonaService,
    private snackBar: MatSnackBar) { 
  
  }

  ngOnInit() {
    this.personaService.listarClientes().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

  }

  eliminar(idPersona: number){

  }

}
