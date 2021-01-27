import { animate, state, style, transition, trigger } from '@angular/animations';

export function cellAnimations(): Array<any> {
    return [
        trigger('toggleDisplay', [
          state('notPopulated', style({ width: 0, height: 0 })),
          state('populated', style({ width: '12vmin', height: '12vmin' })),
          transition('notPopulated => populated', [
            animate('350ms')
          ])
        ])
    ];
}