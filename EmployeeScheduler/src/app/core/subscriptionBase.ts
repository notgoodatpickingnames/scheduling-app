import { OnDestroy, EventEmitter } from "@angular/core";

export class SubscriptionBase implements OnDestroy {
    public componentDestroyed = new EventEmitter();
    public ngOnDestroy() {
        this.componentDestroyed.emit();
    }
}
