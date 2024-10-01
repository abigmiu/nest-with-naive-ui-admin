import { defineStore } from "pinia";
import store from "./store";
import { reqFileUpload } from "@/api/file";
interface IWorkStoreState {
    file: File | null;
    process: number;
    uploadedUrl: string;
    title: string;
    desc: string;
}

export const useWorkStore = defineStore('work', {
    state(): IWorkStoreState {
        return {
            file: null,
            process: 0,
            uploadedUrl: '',
            title: '',
            desc: '',
        };
    },
    actions: {
        async updateFile() {
            if (!this.file) return;
            const _this = this;
            const { id, url } = await reqFileUpload(this.file, {
                onUploadProgress({ progress }) {
                    _this.process = (progress || 0) * 100;
                },
            });
            this.uploadedUrl = url;
        },
        clearData() {
            this.title = '';
            this.file = null;
            this.uploadedUrl = '';
            this.desc = '';
            this.process = 0;
        }
    }
});

export const useWorkStoreOutSide = () => {
    useWorkStore(store);
};