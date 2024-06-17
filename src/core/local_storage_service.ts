import { openDatabase, ResultSetRowList, SQLiteDatabase } from "react-native-sqlite-storage";
import showToast from "./toast_config";


export class SqlLiteDataBase {

    instance!: SQLiteDatabase;

    private constructor() { }
    private static db: SqlLiteDataBase;

    static getInstance(): SqlLiteDataBase {
        if (this.db) {
            return this.db;
        } else {
            this.db = new SqlLiteDataBase();
            return this.db;
        }
    }

    async openDataBase(probs: { dbName: string }) {
        try {
            const db = await openDatabase({
                name: probs.dbName,
                location: "default",
                readOnly: false,
            });
            this.instance = db;
            console.log("DataBase opened successfully", this.instance);
        } catch (error) {
            showToast({
                title: "Creating DataBase",
                message: "Error while Openingtthe database",
                type: "error",
            });
        }
    }

    async createTable(probs: { sql: string }): Promise<void> {
        if (this.instance) {
            let errorMessage: string = "Error while creating the database's table";
            await this.instance.transaction((tx) => {
                tx.executeSql(probs.sql).then((_) => {
                    console.log("table created succesfullly");
                }).catch((_) => {
                    showToast({
                        title: "Creating Table",
                        message: errorMessage,
                        type: "error",
                    });
                });
            });
        }
    }


    async getAll(probs: { sql: string }): Promise<ResultSetRowList | undefined> {
        try {
            const result = new Promise<ResultSetRowList | undefined>((resolve, reject) => {
                this.instance.transaction((tx) => {
                    tx.executeSql(
                        probs.sql,
                        [],
                        (_, res) => { resolve(res.rows) },
                        (_, err) => { reject(err) }
                    );
                });
            });

            return result;
        } catch (error) {
            return undefined;
        }
    }

    async execute(probs: { sql: string }): Promise<boolean | undefined> {
        try {
            const result = new Promise<boolean | undefined>((resolve, reject) => {
                this.instance.transaction((tx) => {
                    tx.executeSql(
                        probs.sql,
                        [],
                        (_, res) => {
                            let isAdded = res.rowsAffected > 0;
                            console.log("rowsAffected", res.rowsAffected);

                            resolve(isAdded)
                        },
                        (_, err) => { reject(err) },
                    );
                });
            });
            return result;

        } catch (error) {
            return undefined;
        }

    }
}