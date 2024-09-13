import type BasicForm from "@/components/form/BasicForm.vue";
import TableActionMore from "@/components/table/components/TableActionMore.vue";
import type { IPageData } from "@/types/api/base";
import type { IBasicPagination } from "@/types/common";
import { NButton, type ButtonProps, type PaginationProps } from "naive-ui";
import { h } from "vue";
import { onMounted, ref, type Ref } from "vue";

interface IUseBasicTable {
    loading: Ref<boolean>;
    tableData: Ref<any[]>;
    pagination: Ref<false | IBasicPagination>;
    updateRealtime: (status: boolean) => void;
    refresh: () => Promise<void>;
    handlePaginationChange: (page?: number, pageSize?: number) => Promise<void>;
    fetchData: (args?: Record<string, any>) => Promise<void>;
}

export interface IBasicTableActionColumnRender {
    title: string;
    props: ButtonProps;
}

export interface IBasicTableActionMoreColumnRender {
    type: 'more';
    props: InstanceType<typeof TableActionMore>['$props'];
}
export function useBasicTable(
    fetchFn: (query: Record<string, any>, ...args: any[]) => Promise<IPageData<any> | any[]>,
    pageable: boolean,
): IUseBasicTable {
    const tableData = ref<any[]>([]);
    const loading = ref(false);

    let firstPageFirstId: number;
    let realtime: boolean;

    const pagination: IUseBasicTable['pagination'] = pageable 
        ? ref({
            page: 1,
            pageSize: 20,
            itemCount: 0,
            pageCount: 0,
            showSizePicker: true,
            pageSizes: [10, 20, 50, 100]
        }) 
        :ref(false);


    const _pageSearchParams = pageable ? { page: 1, pageSize: 20 } : {};

    async function fetchData(searchParams?: Record<string, any>, ...args: any[]) {
        loading.value = true;

        try {
            const _searchParams: Record<string, any> = { ..._pageSearchParams, ...searchParams };
            if (realtime) {
                _searchParams.realtime = true;
                _searchParams.firstId = firstPageFirstId;
            }
            const data = await fetchFn(_searchParams, ...args);
            if (Array.isArray(data)) {
                tableData.value = data;
                pagination.value = false;
            } else {
                tableData.value = data.list;
                
                if (pageable) {
                    const paginationData = pagination.value as IBasicPagination;
                    paginationData.page = data.page;
                    paginationData.pageSize = data.pageSize;
                    paginationData.itemCount = data.itemCount;
                    paginationData.pageCount = data.pageCount;
                }
                
                if (data.page === 1) {
                    firstPageFirstId = data.list[0].id;
                }
                
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
            _pageSearchParams!.page = 1;
            _pageSearchParams!.pageSize = pageSize;
        }


        await fetchData();
    }


    function updateRealtime(status: boolean) {
        realtime = status;
    }

    onMounted(fetchData);

    return {
        loading,
        tableData,
        pagination,
        refresh,
        handlePaginationChange,
        fetchData,
        updateRealtime
    };
}

/** 表格操作列 */
export function renderBasicTableActionColumn(columns: Array<IBasicTableActionColumnRender | IBasicTableActionMoreColumnRender>) {
    return columns.map((column) => {
       if ('type' in column) {
            return h(TableActionMore, column.props);
       } else {
        return h(NButton, {
            size: 'small',
            class: "ml-2",
            ...column.props,
        }, () => column.title);
       }
    });
}

export function getBasicForm(ref: Ref<InstanceType<typeof BasicForm>  | null>) {
    if (!ref.value) {
        throw new Error("ref is null");
    }

    return ref.value;
}