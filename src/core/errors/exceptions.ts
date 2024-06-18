export class AppException {
    code: number;
    message: string;

    constructor(probs: { code: number, message: string }) {
        this.code = probs.code;
        this.message = probs.message;
    }
}
