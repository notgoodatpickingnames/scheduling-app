import { OnDestroy, EventEmitter } from "@angular/core";
import { Page } from "tns-core-modules/ui/page/page";

export class SubscriptionBase implements OnDestroy {
    public componentDestroyed = new EventEmitter();

    public ngOnDestroy() {
        this.componentDestroyed.emit();
    }
}
