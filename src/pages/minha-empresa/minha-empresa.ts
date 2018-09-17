import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { UsuarioProvider } from '../../providers/usuario/usuario';
import { EmpresaProvider } from '../../providers/empresa/empresa'
import { UsuarioSessionProvider } from '../../providers/usuario-session/usuario-session';
import { MensagensProvider } from '../../providers/mensagens/mensagens';
import { AcaoSistemaProvider } from '../../providers/acao-sistema/acao-sistema'

import { ConfiguracoesPage } from '../../pages/configuracoes/configuracoes'

/**
 * Generated class for the MinhaEmpresaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-minha-empresa',
  templateUrl: 'minha-empresa.html',
})
export class MinhaEmpresaPage {

  empresa : any;
  empresaForm : any;
  categorias : any[];
  estados : any[];
  municipios : any[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public usuarioProvider : UsuarioProvider, public empresaProvider : EmpresaProvider,
              public mensagens : MensagensProvider, public acaoSistemaProvider : AcaoSistemaProvider) {
      this.inicializarEmpresaForm();
      this.inicializarDependencias();
      this.acaoSistemaProvider.setaAcaoParaIncluir();          
  }

  /**
   * Inicializa as dependências do caso de uso.
   */
  public inicializarDependencias() {
    this.empresaProvider.getCategorias()
    .subscribe( data => {
      this.categorias = data;

      this.empresaProvider.getEstados()
        .subscribe( data => {
          this.estados = data;
          this.inicializarEmpresa();

        }, err => {
          this.mensagens.adicionarMensagemErro(err.error);
      });

    },
    err => this.mensagens.adicionarMensagemErro(err.error));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MinhaEmpresaPage');
  }

  /**
   * Inicializa as propriedades para manipulação do formulário
   */
  public inicializarEmpresaForm() {
    this.empresa = {};
    this.empresa.pessoa = {};
    this.empresa.pessoa.municipio = {};
    this.empresa.estado = {};
    this.empresa.categoria = {};

    this.empresaForm = new FormGroup({
      txtNome: new FormControl(this.empresa.pessoa.nome, [Validators.required, Validators.maxLength(100)]),
      txtCidade: new FormControl(this.empresa.pessoa.municipio, [Validators.required, Validators.maxLength(100)]),
      txtEstado : new FormControl(this.empresa.estado, [Validators.required]),
      txtTelefone : new FormControl(this.empresa.pessoa.telefone, [Validators.required,Validators.minLength(14), Validators.maxLength(14)]),
      txtCategoria : new FormControl(this.empresa.categoria, [Validators.required]),
      txtAnuncio : new FormControl(this.empresa.anuncio, [Validators.maxLength(100)]),
      txtMunicipio : new FormControl(this.empresa.pessoa.municipio, [Validators.required])
    });
  }

  /**
   * Inicializa a empresa.
   */
  public inicializarEmpresa() {
    this.empresaProvider.getRegistroPorResponsavel(UsuarioSessionProvider.usarioSesion.id)
    .subscribe( data => {
      this.empresa = data;

      if (data == null || data.id == undefined) {
        this.acaoSistemaProvider.setaAcaoParaIncluir();
      } else {
        this.acaoSistemaProvider.setaAcaoParaAlterar();
      }
    },
    err => {
      this.mensagens.adicionarMensagemErro(err.error);
   });
  }

  /**
   * Volta a nagação para as configurações.
   */
  public voltar() {
    this.navCtrl.push(ConfiguracoesPage);
  }

  /**
   * Busca os municípios associados a estado.
   */
  public buscarMunicipios() {
    this.municipios = undefined;
    this.empresa.pessoa.municipio = undefined;

		if (this.empresa.estado != undefined) {
      this.empresaProvider.getMunicipiosPorEstado(this.empresa.estado.id)
      .subscribe(data => {
        this.municipios = data;
      },
      err => {
        this.mensagens.adicionarMensagemErro(err.error);
     });      
		} 
  }
  
  public salvar() {
    this.empresaProvider.salvar(this.empresa, undefined) 
    .subscribe(data => {
       
    })
  }
}
