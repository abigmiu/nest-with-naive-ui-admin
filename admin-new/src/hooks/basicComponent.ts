import type BasicForm from "@/components/form/BasicForm.vue";
import type { IPageData } from "@/types/api/base";
import type { IBasicPagination } from "@/types/common";
import type { PaginationProps } from "naive-ui";
import { onMounted, ref, type Ref } from "vue";

interface IUseBasicTable {
    loading: Ref<boolean>;
    tableData: Ref<any[]>;
    pagination: Ref<false | IBasicPagination>;
    refresh: () => Promise<void>;
    handlePaginationChange: (page?: number, pageSize?: number) => Promise<void>;
    fetchData: (args?: Record<string, any>) => Promise<void>;
}

export function useBasicTable(
    fetchFn: (query: Record<string, any>, ...args: any[]) => Promise<IPageData<any> | any[]>,
    pageable: boolean,
): IUseBasicTable {
    const tableData = ref<any[]>([]);
    const loading = ref(false);
    const pagination: IUseBasicTable['pagination'] = ref(false);


    const _pageSearchParams = pageable ? { page: 1, pageSize: 20 } : {};

    async function fetchData(searchParams?: Record<string, any>, ...args: any[]) {
        loading.value = true;

        try {
            const _searchParams = { ..._pageSearchParams, ...searchParams };
            const data = await fetchFn(_searchParams, ...args);
            if (Array.isArray(data)) {
                tableData.value = data;
                pagination.value = false;
            } else {
                tableData.value = data.list;
                pagination.value = {
                    page: data.page,
                    pageSize: data.pageSize,
                    itemCount: data.itemCount,
                    pageCount: data.pageCount
                };
            }

        } finally {
            loading.value = false;
        }
    }

    async function refresh() {
        await fetchData();
    }

    async function handlePaginationChange(page?: number, pageSize?: number) {
        if (page) {
            _pageSearchParams!.page = page;
        }
        if (pageSize) {
            _pageSearchParams!.pageSize = pageSize;
        }


        await fetchData();
    }

    onMounted(fetchData);

    return {
        loading,
        tableData,
        pagination,
        refresh,
        handlePaginationChange,
        fetchData
    };
}


export function getBasicForm(ref: Ref<InstanceType<typeof BasicForm>  | null>) {
    if (!ref.value) {
        throw new Error("ref is null");
    }

    return ref.value;
}