import { ChangeDetectionStrategy, OnInit, WritableSignal, signal } from '@angular/core';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CoreComponent } from './core/core.component';
import { KontentService } from './services/kontent.service';
import { map } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent extends CoreComponent implements OnInit {
    private readonly sourceElementConfigPropertyName: string = 'sourceElement';
    public readonly sourceElementCodename: WritableSignal<string | undefined> = signal(undefined);

    // base
    public readonly errorMessage: WritableSignal<string | undefined> = signal(undefined);
    public readonly infoMessage: WritableSignal<string | undefined> = signal(undefined);

    // data
    public readonly json: WritableSignal<string> = signal('');

    // state
    public readonly disabled: WritableSignal<boolean> = signal(false);

    private readonly sampleJson: string = `{
    "author": {
        "type": "modular_content",
        "name": "Author",
        "value": [
            "jenny_brown"
        ]ě
    }
}`;

    constructor(private kontentService: KontentService) {
        super();
    }

    ngOnInit(): void {
        this.subscribeToElementsChange();

        if (this.isKontentContext()) {
            this.kontentService.initCustomElement(
                (data) => {
                    this.disabled.set(data.isDisabled);
                    this.json.set(data.value ?? '');

                    this.sourceElementCodename.set(data.config[this.sourceElementConfigPropertyName]);
                    this.updateJsonValue();
                },
                (error) => {
                    console.error(error);
                    this.errorMessage.set(
                        `Could not initialize custom element. Custom elements can only be embedded in an iframe`
                    );
                }
            );
        } else {
            this.json.set(this.sampleJson);
        }
    }

    ngAfterViewChecked(): void {
        // update size of Kontent UI
        if (this.isKontentContext()) {
            // this is required because otherwise the offsetHeight can return 0 in some circumstances
            // https://stackoverflow.com/questions/294250/how-do-i-retrieve-an-html-elements-actual-width-and-height
            setTimeout(() => {
                const htmlElement = document.getElementById('htmlElem');
                if (htmlElement) {
                    const height = htmlElement.offsetHeight;
                    this.kontentService.updateSizeToMatchHtml(height);
                }
            }, 50);
        }
    }

    private subscribeToElementsChange(): void {
        super.subscribeToObservable(
            this.kontentService.elementsChanged.pipe(
                map((data) => {
                    this.updateJsonValue();
                })
            )
        );
    }

    private updateJsonValue(): void {
        const sourceElementCodename = this.sourceElementCodename();
        if (sourceElementCodename) {
            this.kontentService.getElementValue(sourceElementCodename, (newValue) => {
                this.json.set(newValue?.toString() ?? '');
            });
        }
    }

    private isKontentContext(): boolean {
        return environment.production;
    }
}
