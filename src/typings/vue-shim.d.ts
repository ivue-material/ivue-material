declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}

declare type ComponentSize = 'large' | 'medium' | 'small' | 'mini'

declare type Nullable<T> = T | null;

declare interface Ref<T = any> {
    /**
     * Type differentiator only.
     * We need this to be in public d.ts but don't want it to show up in IDE
     * autocomplete, so we use a private Symbol instead.
     */
    [RefSymbol]: true;
    value: T;
}

declare const RefSymbol: unique symbol;
