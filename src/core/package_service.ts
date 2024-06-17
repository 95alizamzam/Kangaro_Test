import { enablePromise } from "react-native-sqlite-storage";
import { PackageModel } from "../models/package_model";
import { SqlLiteDataBase } from "./local_storage_service";

export class PackageService {

    private dbName: string = "KangaroDB.db";
    private tableName: string = "PackagesTable";

    sqlDataBase!: SqlLiteDataBase;
    constructor() {
        this.sqlDataBase = SqlLiteDataBase.getInstance();
    }


    async init(): Promise<void> {
        enablePromise(true);
        await this.createLocalDataBase();
        await this.createTable();
    }

    private async createLocalDataBase(): Promise<void> {
        await this.sqlDataBase.openDataBase({ dbName: this.dbName });
    }

    private async createTable() {
        let sql = `CREATE TABLE IF NOT EXISTS ${this.tableName}` +
            `(ID INTEGER PRIMARY KEY AUTOINCREMENT,PackageName TEXT,BarCode TEXT)`;
        await this.sqlDataBase.createTable({ sql: sql });
    }

    async getPackagesList(): Promise<Array<PackageModel> | undefined> {
        let sql = `SELECT * FROM ${this.tableName}`;
        let packages: Array<PackageModel> = [];
        let result = await this.sqlDataBase.getAll({ sql: sql });
        if (result) {
            for (let i = 0; i < result.length; i++) {
                let item = {
                    id: result.item(i)['ID'],
                    packageName: result.item(i)['PackageName'],
                    barcode: result.item(i)['BarCode'],
                } as PackageModel;
                packages.push(item);
            }
            return packages;
        } else {
            return undefined;
        }
    }

    async addPackage(obj: PackageModel): Promise<boolean | undefined> {
        try {
            let db = SqlLiteDataBase.getInstance();
            let sql = `INSERT INTO ${this.tableName} (PackageName, BarCode) VALUES ("${obj.packageName}", "${obj.barcode}")`;
            let response = await db.execute({ sql: sql });
            return response;
        } catch (error) {
            return undefined;
        }

    }

    async deletePackage(probs: { packageId: number }): Promise<boolean | undefined> {
        try {
            let db = SqlLiteDataBase.getInstance();
            let sql = `DELETE FROM ${this.tableName} WHERE ID = ${probs.packageId}`;
            let response = await db.execute({ sql: sql });
            return response;
        } catch (error) {
            return undefined;
        }
    }

}