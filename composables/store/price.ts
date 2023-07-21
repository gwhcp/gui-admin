import { ComputedRef, UnwrapNestedRefs } from "vue";

interface UseStorePriceInterface {
    createPrice: (values: Record<string, unknown>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void
    }) => Promise<void>;
    deletePrice: (values: { id: string; product_id: string; }) => Promise<boolean>;
    formArr: ComputedRef<string[]>;
    formErrors: ComputedRef<Record<string, unknown>>;
    formObj: ComputedRef<{
        base_price: string;
        billing_cycle: number;
        date_from: string;
        is_active: boolean;
        is_hidden: boolean;
        setup_price: string;
        store_product: number;
        store_product_id: number;
    }>;
    formSuccess: ComputedRef<boolean>;
    getProfile: (id: string, product_id: string) => Promise<void>;
    getSearch: (product_id: string) => Promise<void>;
    updateProfile: (values: Record<string, string>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void
    }) => Promise<void>;
}

export const useStorePrice = (): UseStorePriceInterface => {
    const { loadingState } = usePageLoading();

    const { $event } = useNuxtApp();

    const router = useRouter();

    const { selectionClear } = useSearchGrid();

    const createPrice = async (values: Record<string, unknown>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void;
    }) => {
        loadingState.isActive = true;

        const { doProcess, processorErrors, processorSuccess } = await useProcessor();

        await doProcess('admin/store/product/price/create', 'POST', values);

        if (!processorSuccess.value) {
            actions.setErrors(processorErrors.value);
        } else {
            // @ts-ignore
            $event('alert', {
                display: processorSuccess.value,
                message: 'Product price has been created.',
                type: 'success'
            });

            await router.push({ path: `/store/product/${values['product_type']}/${values['store_product']}/price` });
        }

        loadingState.isActive = false;
    };

    const deletePrice = async (values: { id: string; product_id: string }) => {
        loadingState.isActive = true;

        const { doProcess, processorErrors, processorSuccess } = await useProcessor();

        await doProcess(`admin/store/product/price/delete/${values['product_id']}/${values['id']}`, 'DELETE', null);

        if (!processorSuccess.value) {
            localStorePrice.formErrors = processorErrors.value;
        } else {
            localStorePrice.formArr = localStorePrice.formArr.filter((item: {
                [x: string]: string;
            }) => item['id'] !== values['id']);

            selectionClear();

            localStorePrice.formSuccess = true;
        }

        loadingState.isActive = false;

        return processorSuccess.value;
    };

    const formArr = computed(() => {
        return localStorePrice.formArr;
    });

    const formErrors = computed(() => {
        return localStorePrice.formErrors;
    });

    const formObj = computed(() => {
        return localStorePrice.formObj;
    });

    const formSuccess = computed(() => {
        return localStorePrice.formSuccess;
    });

    const getProfile = async (id: string, product_id: string) => {
        loadingState.isActive = true;

        const { doProcess, processorObj } = await useProcessor();

        await doProcess(`admin/store/product/price/profile/${product_id}/${id}`, 'GET', null);

        localStorePrice.formObj = processorObj.value;

        loadingState.isActive = false;
    };

    const getSearch = async (product_id: string) => {
        loadingState.isActive = true;

        const { doProcess, processorArr } = await useProcessor();

        await doProcess(`admin/store/product/price/search/${product_id}`, 'GET', null);

        localStorePrice.formArr = processorArr.value;

        loadingState.isActive = false;
    };

    const localStorePrice: UnwrapNestedRefs<any> = reactive({
        formArr: [],
        formErrors: {},
        formObj: {
            base_price: '0.00',
            billing_cycle: 0,
            date_from: '',
            is_active: false,
            is_hidden: false,
            setup_price: '0.00',
            store_product: 0,
            store_product_id: 0
        },
        formSuccess: false
    });

    const updateProfile = async (values: Record<string, string>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void;
    }) => {
        loadingState.isActive = true;

        const { doProcess, processorErrors, processorSuccess } = await useProcessor();

        await doProcess(`admin/store/product/price/profile/${values['store_product']}/${values['price_id']}`, 'PATCH', values);

        if (!processorSuccess.value) {
            actions.setErrors(processorErrors.value);
        } else {
            // @ts-ignore
            $event('alert', {
                display: processorSuccess.value,
                message: 'Product price has been updated.',
                type: 'success'
            });

            await router.push({ path: `/store/product/${values['product_type']}/${values['store_product']}/price` });
        }

        loadingState.isActive = false;
    };

    return {
        createPrice,
        deletePrice,
        formArr,
        formErrors,
        formObj,
        formSuccess,
        getProfile,
        getSearch,
        updateProfile
    };
};