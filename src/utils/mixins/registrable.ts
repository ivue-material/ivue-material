import { createApp } from 'vue'

function generateWarning(child, parent) {
    return () => console.error(`The ${child} component must be used inside a ${parent}`);
}

// 注入
export function inject(namespace, child, parent) {
    const defaultImpl = child && parent ? {
        register: generateWarning(child, parent),
        unregister: generateWarning(child, parent)
    } : null;

    return {
        inject: {
            [namespace]: {
                default: defaultImpl
            }
        }
    }
}

// 提供
export function provide(namespace) {

    return {
        provide() {
            return {
                [namespace]: {
                    register: this.register,
                    unregister: this.unregister
                }
            }
        }
    };
}
