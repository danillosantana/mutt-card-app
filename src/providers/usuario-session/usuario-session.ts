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
      return db.executeSql('SELECT id, nome, telefone, token FROM usuario ', [])
      .then( res => {
        console.log('inicializa usuário na sessão...');
        if (res.rows.length > 0) {
         UsuarioSessionProvider.autenticado = true;
         UsuarioSessionProvider.usarioSesion = res.rows.item(0);
        } 
     })
    })
  }

  /**
   * Salva o usuário na sessão.
   */
  salvar(usuario) {
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
      return db.executeSql('SELECT id, nome, telefone, token FROM usuario ', [])
      .then((resultado) => {
        if (resultado.rows.length > 0) {
          return this.deleteUsuarios()
                .then(() => {
                  return db.executeSql('INSERT INTO usuario (id, nome, telefone, token) VALUES(?, ?, ?, ?) ', [usuario.id, usuario.nome, usuario.telefone, usuario.token]) 
                });
        }

        return db.executeSql('INSERT INTO usuario (id, nome, telefone, token) VALUES(?, ?, ?, ?) ', [usuario.id, usuario.nome, usuario.telefone, usuario.token])
      })
    })
  }

  /**
   * Exclui os usuários.
   */
  deleteUsuarios() {
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
          return db.executeSql('DELETE FROM usuario ', [])
    });
  }
}
