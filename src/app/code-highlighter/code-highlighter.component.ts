import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    Signal,
    ViewEncapsulation,
    WritableSignal,
    computed,
    signal
} from '@angular/core';
import { getHighlighter } from 'shiki';
import { CoreComponent } from '../core/core.component';
import { catchError, from, map } from 'rxjs';
import { angularErrorHelper } from 'src/helpers/angular-error-helper.class';

export type ValidationState = 'empty' | 'valid' | 'invalid' | 'notJson';

export interface IJsonValidationResult {
    state: ValidationState;
    errorMessage?: string;
}

@Component({
    selector: 'app-code-highlighter',
    templateUrl: './code-highlighter.component.html',
    styleUrl: './code-highlighter.component.scss',
    encapsulation: ViewEncapsulation.None
})
export class CodeHighlighterComponent extends CoreComponent implements OnInit {
    public readonly highlightedJson: WritableSignal<string> = signal('');
    public readonly validationResult: Signal<IJsonValidationResult> = computed(() => {
        return this.validateJson(this.json());
    });

    public readonly isExpanded: WritableSignal<boolean> = signal(false);

    public readonly canShowCodePreview: Signal<boolean> = computed(() => {
        if (this.json().length) {
            return true;
        }
        return false;
    });

    public readonly json: WritableSignal<string> = signal('');
    @Input({ required: true, alias: 'json' }) set _json(value: string) {
        this.json.set(value);
        this.validate.next(this.validationResult());
    }

    @Output() validate = new EventEmitter<IJsonValidationResult>();

    constructor() {
        super();
    }

    ngOnInit(): void {
        super.subscribeToObservable(
            from(
                getHighlighter({
                    theme: 'dark-plus',
                    themes: ['dark-plus'],
                    langs: ['json'],
                    paths: {
                        languages: '/assets/languages',
                        themes: '/assets/themes',
                        wasm: '/assets/wasm'
                    }
                })
            ).pipe(
                map((highlighter) => {
                    const highlightedCode = highlighter.codeToHtml(this.json(), {
                        lang: 'json'
                    });

                    this.highlightedJson.set(highlightedCode);
                }),
                catchError((error) => {
                    console.error(error);
                    throw Error(`Failed to initiate shiki or highlight code sample`);
                })
            )
        );
    }

    handleToggleCode(): void {
        this.isExpanded.set(!this.isExpanded());
    }

    private validateJson(text: string | undefined): IJsonValidationResult {
        if (!text) {
            return {
                state: 'empty'
            };
        }

        if (!text.startsWith('{') && !text.startsWith('[')) {
            // text / example does not represent json value
            return {
                state: 'notJson'
            };
        }

        try {
            JSON.parse(text);
        } catch (error) {
            return {
                state: 'invalid',
                errorMessage: angularErrorHelper.extractErrorMessage(error)
            };
        }
        return {
            state: 'valid'
        };
    }
}
