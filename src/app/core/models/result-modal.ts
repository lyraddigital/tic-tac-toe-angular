import { Subject } from 'rxjs';

export class Modal {
    onClosed: Subject<any>;

    constructor() {
        this.onClosed = new Subject<any>();
    }
}

export class ResultModal extends Modal {
    close(): void {
        this.onClosed.next();
        this.onClosed.complete();
    }
}
