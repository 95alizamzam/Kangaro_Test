import { AppException } from "../errors/exceptions";

export class AppResult<T> {
    data?: T | null = null;
    exception?: AppException | null = null;

    constructor(probs: { data?: T, exception?: AppException }) {
        this.data = this.data;
        this.exception = probs.exception;
    }
}
