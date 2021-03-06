import { Component, OnInit, TemplateRef } from '@angular/core';
import { EventoService } from '../_services/Evento.service';
import { Evento } from '../_moldels/Evento';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

//Formatar horas 
import { defineLocale, BsLocaleService, ptBrLocale } from 'ngx-bootstrap';


defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {
  
  eventosFiltrados: Evento[];
  eventos: Evento[];
  evento: Evento;
  modoSalvar = 'post';
  
  imagemLargura = 50;
  imagemMargem = 2;
  mostrarImagem = false;
  registerForm: FormGroup;
  bodyDeletarEvento = '';
  
  _filtroLista = '';
  
  constructor(
    private eventoService: EventoService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private localService: BsLocaleService
    ) {
      this.localService.use('pt-br');
    }
    
    get filtroLista(): string {
      return this._filtroLista;
    }
    
    set filtroLista(value: string) {
      this._filtroLista = value;
      this.eventosFiltrados = this.filtroLista ? this.filtrarEvento(this.filtroLista) : this.eventos;
    }
    
    //Abrir modal
    openModal(template: any) {
      this.registerForm.reset();
      template.show();
    }
    
    
    ngOnInit() {
      this.validation();
      this.getEventos();
      this.eventosFiltrados = [];
    }
    
    alterarImagem() {
      this.mostrarImagem = !this.mostrarImagem;
    }
    
    //Validar campos
    validation() {
      this.registerForm = this.fb.group({
        tema: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
        local: ['', Validators.required],
        qtdPessoas: ['', [Validators.required, Validators.max(500)]],
        dataEvento: ['', Validators.required],
        imagemURL: ['', Validators.required],
        telefone: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
      });
    }
    
    editarEvento(evento: Evento, template: any){
      this.modoSalvar = 'put';
      this.openModal(template);
      this.evento = evento;
      this.registerForm.patchValue(this.evento);
    }
    
    novoEvento(template: any){
      this.modoSalvar = 'post';
      this.openModal(template);
    }
    excluirEvento(evento: Evento, template: any) {
      this.openModal(template);
      this.evento = evento;
      this.bodyDeletarEvento = `Tem certeza que deseja excluir o Evento: ${evento.tema}, Código: ${evento.id}`;
    }
    
    confirmeDelete(template: any){
      this.eventoService.deleteEvento(this.evento.id).subscribe(
        () => {
          template.hide();
          this.getEventos();
         // this.toastr.success('Deletado com Sucesso');
        }, error => {
          //this.toastr.error('Erro ao tentar Deletar');
          console.log(error);
        }
      );
    }
    //Salvar registro
    salvarAlteracao(template: any) {
      if(this.registerForm.valid){
        if(this,this.modoSalvar === 'post'){          
          this.evento =  Object.assign({}, this.registerForm.value);
          this.eventoService.postEvento(this.evento).subscribe(
            (novoEvento: Evento) => {
              //console.log(novoEvento);
              template.hide();
              this.getEventos();
            }, error => {
              console.log(error);
            }
            );
          }else{
            this.evento =  Object.assign({id: this.evento.id}, this.registerForm.value);
            this.eventoService.putEvento(this.evento).subscribe(
              (novoEvento: Evento) => {
                //console.log(novoEvento);
                template.hide();
                this.getEventos();
              }, error => {
                console.log(error);
              }
              );
            }
          }
        }
        
        
        
        filtrarEvento(filtrarPor: string): Evento[] {
          filtrarPor = filtrarPor.toLocaleLowerCase();
          return this.eventos.filter(
            evento => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1
            );
          }
          
          
          getEventos() {
            this.eventoService.getAllEvento().subscribe(
              (_eventos: Evento[]) => {
                this.eventos = _eventos;
                this.eventosFiltrados = this.eventos;
                //console.log(_eventos);
              },
              error => {
                console.log(error);
              }
              );
            }
          }
          