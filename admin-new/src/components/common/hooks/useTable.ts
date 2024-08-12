import { provide } from "vue";

const tableProvideKey = Symbol('table');

export function createTableContext() {
    provide(tableProvideKey, {});
}