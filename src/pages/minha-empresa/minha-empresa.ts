import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { UsuarioProvider } from '../../providers/usuario/usuario';
import { EmpresaProvider } from '../../providers/empresa/empresa'
import { UsuarioSessionProvider } from '../../providers/usuario-session/usuario-session';
import { MensagensProvider } from '../../providers/mensagens/mensagens';
import { AcaoSistemaProvider } from '../../providers/acao-sistema/acao-sistema'
import { ArquivoProvider } from '../../providers/arquivo/arquivo';
import { LoaderProvider } from '../../providers/loader/loader';

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
  imagem:any;
  exibirArquivo : boolean = false;
  sanitizedUrl : any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public usuarioProvider : UsuarioProvider, public empresaProvider : EmpresaProvider,
              public mensagens : MensagensProvider, public acaoSistemaProvider : AcaoSistemaProvider,
              private camera: Camera, private arquivoProvider : ArquivoProvider,
              public loader: LoaderProvider) {
      this.init();
      this.acaoSistemaProvider.setaAcaoParaIncluir();     
  }

  /**
   * Inicializa as propriedades para manipulação do formulário
   * e as depêndencias do caso de uso.
   */
  public init() {
    this.empresa = {};
    this.empresa.pessoa = {};
    this.empresa.pessoa.municipio = {};
    this.empresa.estado = {};
    this.empresa.categoria = {};
    
    this.empresaForm = new FormGroup({
      txtNome: new FormControl(this.empresa.pessoa.nome, [Validators.required, Validators.maxLength(100)]),
      txtCidade: new FormControl(this.empresa.pessoa.municipio, [Validators.required, Validators.maxLength(100)]),
      txtEstado : new FormControl(this.empresa.estado, [Validators.required]),
      txtTelefone : new FormControl(this.empresa.pessoa.telefone, [Validators.required,Validators.pattern('[0-9]*'), Validators.minLength(10),  Validators.maxLength(11)]),
      txtCategoria : new FormControl(this.empresa.categoria, [Validators.required]),
      txtAnuncio : new FormControl(this.empresa.anuncio, [Validators.maxLength(100)]),
      txtMunicipio : new FormControl(this.empresa.pessoa.municipio, [Validators.required])
    });

    this.inicializarDependencias();
  }


  /**
   * Inicializa as dependências do caso de uso.
   */
  public inicializarDependencias() {
    this.loader.loaderAguarde();

    //inicializando as categorias
    this.empresaProvider.getCategorias()
    .subscribe( data => {
      this.categorias = data;

      //inicializando os estados
      this.empresaProvider.getEstados()
        .subscribe( data => {
          this.estados = data;

          //inicializa as empresas.  
          this.inicializarEmpresa();
        }, err => {
          this.loader.encerrar();
          this.mensagens.adicionarMensagemHttpErro(err);
      });
    },
    err => {
        this.loader.encerrar();
        this.mensagens.adicionarMensagemHttpErro(err)
      }
    );
  }

  /**
   * Seta a categoria.
   */
  private definirCategoria() {
    if (this.empresa.categoria.id != undefined) {
      this.categorias.forEach(categoria => {
         if (categoria.id == this.empresa.categoria.id) {
            this.empresa.categoria = categoria;
         }
      });
    }
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
        this.definirEstado();
        this.definirCategoria();
      }
    },
    err => {
      this.loader.encerrar();
      this.mensagens.adicionarMensagemHttpErro(err);
   });
  }

  /**
   * Seta a imagem.
   */
  public definirImagem() {
    if (this.empresa != undefined && this.empresa.id != undefined) {
      this.arquivoProvider.getBase64ArquivoPorRegistro(this.empresa.id)
      .subscribe( data =>{
          this.imagem = data;
          //remove quebras de linhas.
          this.imagem = this.imagem.replace(/(\r\n\t|\n|\r\t)/gm,"");
          this.loader.encerrar();
      }, err => {
        this.loader.encerrar();
        this.mensagens.adicionarMensagemHttpErro(err.error);
      })
    }
  }

  /**
   * Seta o estado.
   */
  private definirEstado() {
    this.estados.forEach(estado => {
      if (estado.id == this.empresa.pessoa.municipio.estado.id) {
          this.empresa.estado = estado;
          this.empresaProvider.getMunicipiosPorEstado(this.empresa.pessoa.municipio.estado.id)
          .subscribe(data => {
            this.definirImagem();
            this.municipios = data;
            this.definirMunicipio();
          },
          err => {
            this.loader.encerrar();
            this.mensagens.adicionarMensagemHttpErro(err);
        });
      }
    });
  }

  /**
   * Volta a nagação para as configurações.
   */
  public voltar() {
    this.navCtrl.push(ConfiguracoesPage);
  }

  /**
   * Busca os municípios associados ao estado.
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
        this.mensagens.adicionarMensagemHttpErro(err);
     });      
		} 
  }

  /**
   * Seta o município.
   */
  private definirMunicipio() {
    this.municipios.forEach(municipio => {
      if (municipio.id == this.empresa.pessoa.municipio.id) {
        this.empresa.pessoa.municipio = municipio;
        }
    });
  }

  /**
   * Adiciona a imagem da biblioteca de imagens ao formulário
   */
  adicionaImagem() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
  
    this.camera.getPicture(options).then((imageData) => {
      this.imagem = imageData;
      this.empresa.removerImagem = false;
    }, (err) => {
      console.log(err);
    });
  }

  /**
   * Remove a imagem escolhida.
   */
  removerImagem() {
    this.imagem = undefined;
    this.empresa.removerImagem = true;
  }

  /**
   * Salva a empresa.
   */
  public salvar() {
    this.loader.loaderAguarde();
    this.empresaProvider.salvar(this.empresa, this.imagem)
    .subscribe(data => {
      this.loader.encerrar();
      this.mensagens.adicionarMensagemSucesso(data);
      this.voltar();
    },
    err => {
      this.loader.encerrar();
      this.mensagens.adicionarMensagemHttpErro(err);
   });
  }
}