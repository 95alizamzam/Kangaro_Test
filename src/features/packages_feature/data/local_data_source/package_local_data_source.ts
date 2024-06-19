import { enablePromise } from "react-native-sqlite-storage";
import { AppResult } from "../../../../core/app/result";
import showToast from "../../../../core/app/toast_config";
import { AppException } from "../../../../core/errors/exceptions";
import { LocalStorageService } from "../../../../core/services/local_storage_service";
import { PackageModel } from "../models/package_model";

export class PackageLocalDataSource {
    private tableName: string = "PackagesTable";

    localStorage!: LocalStorageService;

    constructor() {
        this.localStorage = LocalStorageService.getInstance();
    }


    async init(): Promise<void> {
        enablePromise(true);
        await this.createTable();
    }

    private async createTable() {
        try {
            let sql = `CREATE TABLE IF NOT EXISTS ${this.tableName}` +
                `(ID INTEGER PRIMARY KEY AUTOINCREMENT,PackageName TEXT,BarCode TEXT UNIQUE)`;
            await this.localStorage.createTable({ sql: sql });
        } catch (error) {
            showToast({
                title: "Creating Table",
                message: `Something went wrong while creating the ${this.tableName} table`,
                type: "error",
            });
        }
    }

    async getPackagesList(): Promise<AppResult<Array<PackageModel>>> {
        let result = new AppResult<Array<PackageModel>>({});
        try {
            let sql = `SELECT * FROM  ${this.tableName}`;
            let packages: Array<PackageModel> = [];
            let response = await this.localStorage.findAll({ sql: sql });
            let length = response.rows.length;
            for (let i = 0; i < length; i++) {
                let item = new PackageModel({
                    id: response.rows.item(i)['ID'],
                    packageName: response.rows.item(i)['PackageName'],
                    code: response.rows.item(i)['BarCode'],
                });
                packages.push(item);
            }
            result.data = packages;
            return result;
        } catch (_) {
            let exception = new AppException({ code: 500, message: "An Error Occuried while fetching the data" });
            result.exception = exception;
            return result;
        }
    }

    async addPackage(obj: PackageModel): Promise<AppResult<boolean>> {
        let result = new AppResult<boolean>({});
        try {
            let sql = `INSERT INTO  ${this.tableName} (PackageName, BarCode) VALUES ("${obj.packageName}", "${obj.code}")`;
            let response = await this.localStorage.execute({ sql: sql });
            let isAdded = response.rowsAffected > 0;
            result.data = isAdded;
            return result;
        } catch (error) {
            let exception = new AppException({ code: 500, message: "An Error Occuried while Adding new package" });
            result.exception = exception;
            return result;
        }

    }

    async deletePackage(probs: { packageId: number }): Promise<AppResult<boolean>> {
        let result = new AppResult<boolean>({});
        try {
            let sql = `DELETE FROM ${this.tableName} WHERE ID = ${probs.packageId}`;
            let response = await this.localStorage.execute({ sql: sql });
            let isDeleted = response.rowsAffected > 0;
            result.data = isDeleted;
            return result;
        } catch (error) {
            let exception = new AppException({ code: 500, message: "An Error Occuried while Deleting the package" });
            result.exception = exception;
            return result;
        }
    }

}