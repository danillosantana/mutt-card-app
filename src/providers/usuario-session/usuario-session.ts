import { DatabaseProvider } from '../database/database';
import { SQLiteObject } from '@ionic-native/sqlite';
import { Injectable } from '@angular/core';

/*
  Generated class for the UsuarioSessionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuarioSessionProvider {

  public static autenticado = false;
  public static usarioSesion : any = {};

  constructor(public dbProvider : DatabaseProvider) {
  }

  /**
   * Inicializa o usuário na sessão.
   */
  inicializarUsuarioSession() {
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
      return db.executeSql('SELECT * FROM usuario ', [])
      .then( res => {
        console.log('inicializa usuário na sessão...');
        if (res.rows.length > 0) {
         UsuarioSessionProvider.autenticado = true;
         UsuarioSessionProvider.usarioSesion = res.rows[0];
        }
     })
     .catch(e => console.error('Falha ao inicializar  o usuário', e));
    })
    .catch(e => console.error('Falha ao inicializar  o banco', e)); 
  }

  /**
   * Salva o usuário na sessão.
   */
  salvar(usuario) {
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
        return db.executeSql('INSERT INTO usuario (id, email, token) VALUES(?, ?, ?) ', [usuario.id, usuario.email, usuario.token])
        .then(() => console.log(' Usuário inserido com sucesso'))
        .catch( e => console.error('Falha ao inserir o usuário na sessão'))
    })
    .catch(e => console.error('Falha ao salvar usuário na sessão', e));
  }
}
