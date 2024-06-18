export class PackageModel {
    id: number;
    packageName: string;
    code: string;


    constructor(probs: { id: number, packageName: string, code: string }) {
        this.id = probs.id;
        this.packageName = probs.packageName;
        this.code = probs.code;
    }

}