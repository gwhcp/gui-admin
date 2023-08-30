import { ComputedRef, UnwrapNestedRefs } from "vue";

interface UseCustomerBillingInvoiceInterface {
    formArr: ComputedRef<string[]>;
    formObj: ComputedRef<{
        billing_profile: {
            id: number;
            name: string;
        };
        order: {
            id: number;
            status: string;
        };
        product_profile: {
            id: number;
            name: string;
        };
        store_product: {
            id: number;
            name: string;
            product_type: string;
        };
        store_product_price: {
            base_price: string;
            billing_cycle: number;
            id: number;
            setup_price: string;
        };
        items: string[]
    }>;
    getInvoice: (billing_id: string, invoice_id: string) => Promise<void>;
    getSearch: (billing_id: string) => Promise<void>;
}

export const useCustomerBillingInvoice = (): UseCustomerBillingInvoiceInterface => {
    const { loadingState } = usePageLoading();

    const formArr = computed(() => {
        return localCustomerBillingInvoice.formArr;
    });

    const formObj = computed(() => {
        return localCustomerBillingInvoice.formObj;
    });

    const getInvoice = async (billing_id: string, invoice_id: string) => {
        loadingState.isActive = true;

        const { doProcess, processorObj } = await useProcessor();

        await doProcess(`admin/customer/billing/invoice/${billing_id}/invoice/${invoice_id}`, 'GET', null);

        localCustomerBillingInvoice.formObj = processorObj.value;

        loadingState.isActive = false;
    };

    const getSearch = async (billing_id: string) => {
        loadingState.isActive = true;

        const { doProcess, processorArr } = await useProcessor();

        await doProcess(`admin/customer/billing/invoice/${billing_id}/search`, 'GET', null);

        localCustomerBillingInvoice.formArr = processorArr.value;

        loadingState.isActive = false;
    };

    const localCustomerBillingInvoice: UnwrapNestedRefs<any> = reactive({
        formArr: [],
        formObj: {
            billing_profile: {
                id: 0,
                name: ''
            },
            order: {
                id: 0,
                status: ''
            },
            product_profile: {
                id: 0,
                name: ''
            },
            store_product: {
                id: 0,
                name: '',
                product_type: ''
            },
            store_product_price: {
                base_price: '0.00',
                billing_cycle: 0,
                id: 0,
                setup_price: '0.00'
            },
            items: []
        }
    });

    return {
        formArr,
        formObj,
        getInvoice,
        getSearch
    };
};