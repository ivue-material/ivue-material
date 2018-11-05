import Vue from 'vue';

function generateWarning (child, parent) {
      return () => console.error(`The ${child} component must be used inside a ${parent}`);
}

export function inject (namespace, child, parent) {
      const defaultImpl = child && parent ? {
            register: generateWarning(child, parent),
            unregister: generateWarning(child, parent)
      } : null

      return Vue.extend({
            name: 'registrable-inject',
            inject: {
                  [namespace]: {
                        default: defaultImpl
                  }
            }
      });
}