import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  constructor(private sqlite: SQLite) {

  }

  /**
   * Retorna o banco de dados
   */
  public getDB() {
    return this.sqlite.create({
      name: 'mutt-card.db',
      location: 'default'
    });
  }

  /**
   * Cria o banco de dados.
   */
  public createDataBase() {
    return this.getDB()
      .then((db : SQLiteObject) => {
        this.createTable(db);
      })
      .catch( e => console.error(e));
  }

  /**
   * Cria as tabelas do banco.
   */
  public createTable(db : SQLiteObject) {
    db.sqlBatch([' CREATE TABLE IF NOT EXISTS usuario(id integer primary key not null, nome TEXT, email TEXT, token TEXT)'])
    .then(() => console.log('Tabelas criadas'))
    .catch(e => console.error('Erro ao criar tabelas', e));
  }

}
