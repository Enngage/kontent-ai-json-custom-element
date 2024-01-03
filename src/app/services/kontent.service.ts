import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

declare const CustomElement: any;

export interface ICustomElementContext {
    item: {
        codename: string;
        id: string;
        name: string;
    };
    projectId: string;
    variant: {
        id: string;
        codename: string;
    };
}

export interface IElementChangedData {
    elementCodenames: string[];
}

interface IElementInit {
    isDisabled: boolean;
    value?: string;
    context: ICustomElementContext;
    config?: any;
}

@Injectable({ providedIn: 'root' })
export class KontentService {
    public disabledChanged = new Subject<boolean>();
    public elementsChanged = new Subject<IElementChangedData>();
    private initialized: boolean = false;

    constructor() {}

    initCustomElement(onInit: (data: IElementInit) => void, onError: (error: any) => void): void {
        try {
            CustomElement.init((element: any, context: ICustomElementContext) => {
                this.initialized = true;

                CustomElement.onDisabledChanged((disabled: boolean) => {
                    this.disabledChanged.next(disabled);
                });

                CustomElement.observeElementChanges([], (data: IElementChangedData) => {
                    this.elementsChanged.next(data);
                });

                onInit({
                    context: context,
                    value: element.value,
                    isDisabled: element.disabled,
                    config: element.config
                });
            });
        } catch (error) {
            onError(error);
        }
    }

    setValue(value: string | null): void {
        if (this.initialized) {
            CustomElement.setValue(value);
        }
    }

    getElementValue(elementCodename: string, newValueCallback: (newValue: string) => void): void {
        if (this.initialized) {
            CustomElement.getElementValue(elementCodename, (value: string) => {
                newValueCallback(value);
            });
        }
    }

    updateSizeToMatchHtml(height: number): void {
        if (this.initialized) {
            CustomElement.setHeight(height);
        }
    }
}
