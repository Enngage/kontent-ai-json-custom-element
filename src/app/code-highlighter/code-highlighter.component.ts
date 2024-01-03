import { Component, Input, OnInit, Signal, ViewEncapsulation, WritableSignal, computed, signal } from '@angular/core';
import { getHighlighter, Highlighter, Lang } from 'shiki';
import { CoreComponent } from '../core/core.component';
import { catchError, from, map } from 'rxjs';
import { angularErrorHelper } from 'src/helpers/angular-error-helper.class';

interface IJsonValidationResult {
    isValid: boolean;
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

    public readonly json: WritableSignal<string> = signal('');
    @Input({ required: true, alias: 'json' }) set _json(value: string) {
        this.json.set(value);
    }

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

    private validateJson(text: string): { isValid: boolean; errorMessage?: string } {
        try {
            JSON.parse(text);
        } catch (error) {
            return {
                isValid: false,
                errorMessage: angularErrorHelper.extractErrorMessage(error)
            };
        }
        return {
            isValid: true
        };
    }
}
