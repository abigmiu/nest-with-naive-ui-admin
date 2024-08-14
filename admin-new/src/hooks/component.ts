import { h, type Component,  type VNode } from "vue";


interface INestCmp {
    props?: any,
    component: Component
}

/** 多个组件嵌套 */
export function useNestComponents(cmps: INestCmp[]) {
    // return () => h('div', null, createCmp(0));
    // const nestComponent = (props, ctx) => {
    //     const createCmp = (index: number): VNode => {
    //         if (index === cmps.length - 1) {
    //             return h(cmps[index].component, cmps[index].props || null, ctx.slots.default && ctx.slots.default()); // Directly return VNode here
    //         } else {
    //             return h(cmps[index].component, cmps[index].props || null, createCmp(index + 1));
    //         }
    //     }
    //     const vnodes = createCmp(1);
    //     return h(cmps[0].component, cmps[0].props, vnodes);
    // }
    // @ts-ignore
    const nestComponent = (props, ctx) => {
        let childVNodes: VNode | null = null;
        for (let i = cmps.length - 1; i > 0; i--) {
            const props = cmps[i].props || null;
            const childCmp: VNode = childVNodes ? childVNodes : ctx.slots.default && ctx.slots.default();
            childVNodes = h(cmps[i].component, props, () => childCmp);
        }

        return h(cmps[0].component, cmps[0].props, () => childVNodes!)
    }

    return nestComponent;
}

export function useSlotComponent() {

}