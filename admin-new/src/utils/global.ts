import { createDiscreteApi } from "naive-ui";

const { message, dialog } = createDiscreteApi(
    ['message', 'dialog']
);

export {
    message,
    dialog
};