import * as mysql from 'mysql';
import * as config from 'config';

const DB_CONFIG = config.get('database');
const CONFIG = {
	connectionLimit: 100,
	host: DB_CONFIG.host,
	port: DB_CONFIG.port,
	user: DB_CONFIG.username,
	password: DB_CONFIG.password,
	database: DB_CONFIG.database
};

export class Database {
	private connection: mysql.Connection;
	constructor() {
		this.connection = mysql.createPool(CONFIG)
  }

  async getConnection(): Promise<mysql.Connection> {
    return new Promise( (resolve, reject) => {
      this.connection.getConnection((err, connection) => {
        if (err) return reject(err);
        resolve(connection);
      });
    });
  }

	async select(attributes: string[]|string = "*", table: string, where: Map<string, string>, limit: number = null): Promise<any> {
		let attr_string = Array.isArray(attributes) ? attributes.join(',') : attributes;

		let query = `select ${attr_string} FROM ${table}`;

		if (where) {
			let params_mapping: string[] = [];
			for (let key in where.keys()) {
				params_mapping.push(`${key} = :${key}`);
			}
			query += `WHERE ${params_mapping}`;
		}

		if (limit)
			query += `LIMIT ${limit}`;

		return await this.query(query, where);
	}

	async query(sql, args = null): Promise<any[]> {
    const connection = await this.getConnection();
    return new Promise<any[]>( (resolve, reject) => {
			connection.query(sql, args, (err, rows) => {
				connection.release();
				if (err) return reject(err);
				resolve(rows);
			});
		});
	}

	async close(): Promise<boolean> {
		return new Promise<boolean>((resolve, reject) => {
			this.connection.end( err => {
				if (err) return reject(err);
				resolve(true);
			});
		});
	}
}
