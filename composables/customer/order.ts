import { ComputedRef, UnwrapNestedRefs } from "vue";

interface UseCustomerOrderInterface {
    choices: ComputedRef<Record<string, string>>;
    formArr: ComputedRef<string[]>;
    formErrors: ComputedRef<Record<string, unknown>>;
    formObj: ComputedRef<{
        account: Record<string, unknown>;
        billing_invoice: Record<string, any>;
        billing_profile: Record<string, any>;
        coupon: Record<string, any>;
        fraud_string: string[];
        product_profile: Record<string, any>;
    }>;
    fraudArr: ComputedRef<string[]>;
    formSuccess: ComputedRef<boolean>;
    getChoices: () => Promise<void>;
    getEdit: (order_id: string) => Promise<void>;
    getFraud: (fraud_strings: string[]) => Promise<void>;
    getSearch: () => Promise<void>;
    updateOrder: (values: Record<string, string>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void
    }) => Promise<void>;
}

export const useCustomerOrder = (): UseCustomerOrderInterface => {
    const { loadingState } = usePageLoading();

    const { $event } = useNuxtApp();

    const router = useRouter();

    const choices = computed(() => {
        return localCustomerAccount.choices;
    });

    const formArr = computed(() => {
        return localCustomerAccount.formArr;
    });

    const formErrors = computed(() => {
        return localCustomerAccount.formErrors;
    });

    const formObj = computed(() => {
        return localCustomerAccount.formObj;
    });

    const formSuccess = computed(() => {
        return localCustomerAccount.formSuccess;
    });

    const fraudArr = computed(() => {
        return localCustomerAccount.fraudArr;
    });

    const getChoices = async () => {
        const { doProcess, processorObj } = await useProcessor();

        await doProcess('admin/customer/order/choices', 'GET', null);

        localCustomerAccount.choices = processorObj.value;
    };

    const getEdit = async (order_id: string) => {
        loadingState.isActive = true;

        const { doProcess, processorObj } = await useProcessor();

        await doProcess(`admin/customer/order/${order_id}/edit`, 'GET', null);

        localCustomerAccount.formObj = processorObj.value;

        loadingState.isActive = false;
    };

    const getFraud = async (fraud_strings: string[]) => {
        loadingState.isActive = true;

        const strings: any = [];

        const { doProcess, processorObj } = await useProcessor();

        for (const item of fraud_strings) {
            await doProcess(`admin/customer/order/${item}/fraud`, 'GET', null);

            strings.push(processorObj.value);
        }

        localCustomerAccount.fraudArr = strings;

        loadingState.isActive = false;
    };

    const getSearch = async () => {
        loadingState.isActive = true;

        const { doProcess, processorArr } = await useProcessor();

        await doProcess('admin/customer/order/search', 'GET', null);

        localCustomerAccount.formArr = processorArr.value;

        loadingState.isActive = false;
    };

    const localCustomerAccount: UnwrapNestedRefs<any> = reactive({
        choices: {
            order_status: {}
        },
        formArr: [],
        formErrors: {},
        formObj: {
            account: {},
            billing_invoice: {
                store_product: {},
                store_product_price: {}
            },
            billing_profile: {},
            coupon: {},
            product_profile: {}
        },
        fraudArr: [],
        formSuccess: false
    });

    const updateOrder = async (values: Record<string, string>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void;
    }) => {
        loadingState.isActive = true;

        const { doProcess, processorErrors, processorSuccess } = await useProcessor();

        await doProcess(`admin/customer/order/${values['order']}/edit`, 'PATCH', values);

        if (!processorSuccess.value) {
            if ('message' in processorErrors.value) {
                // @ts-ignore
                $event('alert', {
                    display: true,
                    message: processorErrors.value['message'],
                    type: 'danger'
                });
            } else {
                actions.setErrors(processorErrors.value);
            }
        } else {
            // @ts-ignore
            $event('alert', {
                display: processorSuccess.value,
                message: 'Customer order has been updated.',
                type: 'success'
            });

            await router.push({ path: '/customer/order' });
        }

        loadingState.isActive = false;
    };

    return {
        choices,
        formArr,
        formErrors,
        formObj,
        formSuccess,
        fraudArr,
        getChoices,
        getEdit,
        getFraud,
        getSearch,
        updateOrder
    };
};