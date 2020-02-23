import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { PersonaService } from 'src/app/_service/persona.service';
import { Persona } from '../../../../_model/persona';

@Component({
  selector: 'app-persona-edicion',
  templateUrl: './persona-edicion.component.html',
  styleUrls: ['./persona-edicion.component.css']
})
export class PersonaEdicionComponent implements OnInit {

  form: FormGroup;
  id: number;
  edicion: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private personaService: PersonaService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      'id': new FormControl(0),
      'nombres': new FormControl(''),
      'apellidos': new FormControl('')
    });

    this.route.params.subscribe((params : Params)=>{
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.initForm();
    });

  }

  initForm(){
    if(this.edicion){
      this.personaService.listarPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          'id': new FormControl(data.idPersona),
          'nombres': new FormControl(data.nombres),
          'apellidos': new FormControl(data.apellidos)
        
        });
      });
    }
  }

  operar(){
    let persona = new Persona();
    persona.idPersona = this.form.value['id'];
    persona.nombres = this.form.value['nombres'];
    persona.apellidos = this.form.value['apellidos']

    if(this.edicion){
      this.personaService.modificar(persona).subscribe( ()=> {
        this.personaService.listarClientes().subscribe(data => {
          this.personaService.personaCambio.next(data);
          this.personaService.mensajeCambio.next('SE MODIFICO');
        });
      });
    }else{
      this.personaService.registrar(persona).subscribe( () => {
        this.personaService.listarClientes().subscribe(data => {
          this.personaService.personaCambio.next(data);
          this.personaService.mensajeCambio.next('SE REGISTRO');
        });
      });
    }
    
    this.router.navigate(['persona']);
  }
}
