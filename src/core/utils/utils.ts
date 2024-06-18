export class AppUtils {
    constructor() { }

    static async sleep(ms: number): Promise<void> {
        return new Promise(
            (resolve) => setTimeout(resolve, ms));
    };

}