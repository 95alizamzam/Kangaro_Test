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

    async createTable(probs: { sql: string }): Promise<ResultSet> {
        return new Promise<ResultSet>((resolve, reject) => {
            this.sqlLite.transaction((tx) => {
                tx.executeSql(
                    probs.sql,
                    [],
                    (_, res) => { resolve(res); },
                    (_, __) => { reject(new Error()) }
                );
            });
        });

    }


    async findAll(probs: { sql: string }): Promise<ResultSet> {
        const promise = new Promise<ResultSet>((resolve, reject) => {
            this.sqlLite.transaction((tx) => {
                tx.executeSql(
                    probs.sql,
                    [],
                    (_, res) => { resolve(res) },
                    (_, __) => { reject(new Error()) }
                );
            });
        });

        return promise.then((res) => (res)).catch((err) => { throw err });
    }

    async execute(probs: { sql: string }): Promise<ResultSet> {
        const promise = new Promise<ResultSet>((resolve, reject) => {
            this.sqlLite.transaction((tx) => {
                tx.executeSql(
                    probs.sql,
                    [],
                    (_, res) => { resolve(res) },
                    (_, __) => { reject(new Error()) },
                );
            });
        });
        return promise.then((res) => (res)).catch((err) => { throw err });
    }
}