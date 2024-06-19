import { openDatabase, ResultSet, SQLiteDatabase } from "react-native-sqlite-storage";
import showToast from "../app/toast_config";


export class LocalStorageService {

    sqlLite!: SQLiteDatabase;

    private constructor() { }
    private static localStorageInstance: LocalStorageService;

    static getInstance(): LocalStorageService {
        if (this.localStorageInstance) {
            return this.localStorageInstance;
        } else {
            this.localStorageInstance = new LocalStorageService();
            return this.localStorageInstance;
        }
    }

    async openDataBase(probs: { dbName: string }): Promise<boolean> {
        try {
            const db = await openDatabase({
                name: probs.dbName,
                location: "default",
                readOnly: false,
            });
            this.sqlLite = db;
            console.log("DataBase opened successfully");
            return true;
        } catch (error) {
            showToast({
                title: "Creating DataBase",
                message: "Error while Opening the database",
                type: "error",
            });
            return false;

        }
    }

    async createTable(probs: { sql: string }): Promise<void> {
        try {
            await this.sqlLite.transaction((tx) => {
                tx.executeSql(
                    probs.sql,
                    [],
                    (_, __) => { },
                    (_, __) => { throw new Error() }
                );
            });

        } catch (error) { throw error }
    }


    async findAll(probs: { sql: string }): Promise<ResultSet> {
        try {
            let result!: ResultSet;
            await this.sqlLite.transaction((tx) => {
                tx.executeSql(
                    probs.sql,
                    [],
                    (_, res) => { result = res },
                    (_, __) => { throw new Error() }
                );
            });
            return result;
        } catch (error) { throw error }
    }

    async execute(probs: { sql: string }): Promise<ResultSet> {
        try {
            let result!: ResultSet;
            await this.sqlLite.transaction((tx) => {
                tx.executeSql(
                    probs.sql,
                    [],
                    (_, res) => { result = res; },
                    (_, __) => { throw new Error() },
                );
            });
            return result;
        } catch (error) { throw error }
    }
}