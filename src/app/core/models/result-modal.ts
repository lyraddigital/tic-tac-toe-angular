import { Subject } from 'rxjs';

export class Modal {
    public onClosed: Subject<any>;

    constructor() {
        this.onClosed = new Subject<any>();
    }
}

export class ResultModal extends Modal {
    public close(): void {
        this.onClosed.next();
        this.onClosed.complete();
    }
}
