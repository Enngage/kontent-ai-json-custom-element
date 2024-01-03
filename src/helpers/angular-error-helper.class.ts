import { HttpErrorResponse } from '@angular/common/http';
import stringifyObject from 'stringify-object';

export class AngularErrorHelper {
    extractErrorMessage(error: any): string {
        let message: string = '';

        if (error instanceof Error) {
            // standard error
            message = error.message.toString();
        } else if (error instanceof HttpErrorResponse) {
            if (error.error?.message) {
                message = error.error.message;
            } else {
                message = stringifyObject(error.error);
            }
        } else if (this.isString(error)) {
            message = error.toString();
        } else if (typeof error === 'object') {
            // try parsing object
            try {
                message = stringifyObject(error);
            } catch {
                message = 'Parsing error failed. Original error: ' + message;
            }
        } else {
            message = 'Unexpected error: ' + message;
        }

        return `${message}`;
    }

    private isString(value: any): boolean {
        if (typeof value === 'string' || value instanceof String) {
            return true;
        }
        return false;
    }
}

export const angularErrorHelper = new AngularErrorHelper();
