import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AcaoSistemaProvider } from '../../providers/acao-sistema/acao-sistema';
import { LoaderProvider } from '../../providers/loader/loader';
import { EmpresaProvider } from '../../providers/empresa/empresa'
import { UsuarioSessionProvider } from '../../providers/usuario-session/usuario-session';
import { MensagensProvider } from '../../providers/mensagens/mensagens';
import { CartaoFidelidadeEmpresaProvider } from '../../providers/cartao-fidelidade-empresa/cartao-fidelidade-empresa'

import { ConfiguracoesPage } from '../../pages/configuracoes/configuracoes';


@IonicPage()
@Component({
  selector: 'page-cartao-fidelidade-empresa',
  templateUrl: 'cartao-fidelidade-empresa.html',
})
export class CartaoFidelidadeEmpresaPage {

  empresaTO : any;
  cartoesFidelidadeEmpresaTO : any[];
  cartaoFidelidadeForm : any;
  cartaoFidelidade : any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public acaoSistemaProvider : AcaoSistemaProvider, public loaderProvider : LoaderProvider,
              public empresaProvider : EmpresaProvider, public mensagensProvider : MensagensProvider,
              public cartaoFidelidadeEmpresaProvider : CartaoFidelidadeEmpresaProvider) {
       this.acaoSistemaProvider.setaAcaoParaListar();
       this.init();         
       this.inicializarDependencias();         
  }

  /**
   * Inicializa as propriedades do formulário.
   */
  public init() {
    this.cartaoFidelidade = {};
     
    this.cartaoFidelidade = new FormGroup({
      txtNome: new FormControl(this.cartaoFidelidade.pessoa.nome, [Validators.required, Validators.maxLength(100)]),
      txtDescricao: new FormControl(this.cartaoFidelidade.descricao, [Validators.required, Validators.maxLength(100)]),
      txtPontos: new FormControl(this.cartaoFidelidade.pontos, [Validators.required, Validators.maxLength(2)]),
    });
  }

  /**
   * Inicializa as dependências do caso de uso.
   */
  public inicializarDependencias() {

    this.empresaProvider.getRegistroTOPorResponsavel(UsuarioSessionProvider.usarioSesion.id)
    .subscribe( data => {
        this.empresaTO = data;

        this.cartaoFidelidadeEmpresaProvider.getCartoesFidelidadeTOPorRegistro(this.empresaTO.id)
        .subscribe( data => {
            this.cartoesFidelidadeEmpresaTO = data;
        },  err => {
          this.mensagensProvider.adicionarMensagemHttpErro(err);
      });

    }, err => {
        this.mensagensProvider.adicionarMensagemHttpErro(err);
    });
  }

  /**
   * Seta a ação para inclusão.
   */
  public novoCartaoFidelidade() {
    this.acaoSistemaProvider.setaAcaoParaIncluir();
    this.init();
    this.definirEmpresa();
  }

  /**
   * Seta a ação para alteração.
   */
  public alterarCartaoFidelidade() {
    this.acaoSistemaProvider.setaAcaoParaAlterar();
    this.definirEmpresa();
  }

  /**
   * Seta a empresa.
   */
  private definirEmpresa() {
    this.cartaoFidelidade.registro = {};
    this.cartaoFidelidade.registro.id = this.empresaTO.id;
  }

  /**
   * Salva o cartão fidelidade.
   */
  public salvar() {
    this.cartaoFidelidadeEmpresaProvider.salvar(this.cartaoFidelidade)
    .subscribe(data =>{
       this.mensagensProvider.adicionarMensagemSucesso(data);
       this.acaoSistemaProvider.setaAcaoParaListar();
    }, err => {
        this.mensagensProvider.adicionarMensagemHttpErro(err);
    });
  }

  /**
   * Volta a navegação para a página de configurações
   */
  public voltar() {
    this.navCtrl.push(ConfiguracoesPage);
  }
}