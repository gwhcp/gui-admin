import { ComputedRef, UnwrapNestedRefs } from "vue";

interface UseBillingPaymentInterface {
    choices: ComputedRef<Record<string, string>>;
    createPayment: (values: Record<string, unknown>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void
    }) => Promise<void>;
    deletePayment: (values: { id: string; }) => Promise<boolean>;
    formArr: ComputedRef<string[]>;
    formErrors: ComputedRef<Record<string, unknown>>;
    formObj: ComputedRef<{
        date_from: string;
        in_test_mode: boolean;
        is_active: boolean;
        login_id: string;
        merchant: string;
        merchant_name: string;
        transaction_key: string;
        transaction_type: string;
    }>;
    formSuccess: ComputedRef<boolean>;
    getChoices: () => Promise<void>;
    getEdit: (payment_id: string) => Promise<void>;
    getSearch: () => Promise<void>;
    updateProfile: (values: Record<string, string>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void
    }) => Promise<void>;
}

export const useBillingPayment = (): UseBillingPaymentInterface => {
    const { loadingState } = usePageLoading();

    const { $event } = useNuxtApp();

    const router = useRouter();

    const { selectionClear } = useSearchGrid();

    const choices = computed(() => {
        return localBillingPayment.choices;
    });

    const createPayment = async (values: Record<string, unknown>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void;
    }) => {
        loadingState.isActive = true;

        const { doProcess, processorErrors, processorSuccess } = await useProcessor();

        await doProcess('admin/billing/payment/create', 'POST', values);

        if (!processorSuccess.value) {
            actions.setErrors(processorErrors.value);
        } else {
            // @ts-ignore
            $event('alert', {
                display: processorSuccess.value,
                message: 'Payment gateway has been created.',
                type: 'success'
            });

            await router.push({ path: '/billing/payment' });
        }

        loadingState.isActive = false;
    };

    const deletePayment = async (values: { id: string; }) => {
        loadingState.isActive = true;

        const { doProcess, processorErrors, processorSuccess } = await useProcessor();

        await doProcess(`admin/billing/payment/${values['id']}/delete`, 'DELETE', null);

        if (!processorSuccess.value) {
            localBillingPayment.formErrors = processorErrors.value;
        } else {
            localBillingPayment.formArr = localBillingPayment.formArr.filter((item: {
                [x: string]: string;
            }) => item['id'] !== values['id']);

            selectionClear();

            localBillingPayment.formSuccess = true;
        }

        loadingState.isActive = false;

        return processorSuccess.value;
    };

    const formArr = computed(() => {
        return localBillingPayment.formArr;
    });

    const formErrors = computed(() => {
        return localBillingPayment.formErrors;
    });

    const formObj = computed(() => {
        return localBillingPayment.formObj;
    });

    const formSuccess = computed(() => {
        return localBillingPayment.formSuccess;
    });

    const getChoices = async () => {
        const { doProcess, processorObj } = await useProcessor();

        await doProcess('admin/billing/payment/choices', 'GET', null);

        localBillingPayment.choices = processorObj.value;
    };

    const getEdit = async (payment_id: string) => {
        loadingState.isActive = true;

        const { doProcess, processorObj } = await useProcessor();

        await doProcess(`admin/billing/payment/${payment_id}/edit`, 'GET', null);

        localBillingPayment.formObj = processorObj.value;

        loadingState.isActive = false;
    };

    const getSearch = async () => {
        loadingState.isActive = true;

        const { doProcess, processorArr } = await useProcessor();

        await doProcess('admin/billing/payment/search', 'GET', null);

        localBillingPayment.formArr = processorArr.value;

        loadingState.isActive = false;
    };

    const localBillingPayment: UnwrapNestedRefs<any> = reactive({
        choices: {
            merchant: {}
        },
        formArr: [],
        formErrors: {},
        formObj: {
            date_from: '',
            in_test_mode: false,
            is_active: false,
            login_id: '',
            merchant: '',
            merchant_name: '',
            transaction_key: '',
            transaction_type: ''
        },
        formSuccess: false
    });

    const updateProfile = async (values: Record<string, string>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void;
    }) => {
        loadingState.isActive = true;

        const { doProcess, processorErrors, processorSuccess } = await useProcessor();

        await doProcess(`admin/billing/payment/${values['payment']}/edit`, 'PATCH', values);

        if (!processorSuccess.value) {
            actions.setErrors(processorErrors.value);
        } else {
            // @ts-ignore
            $event('alert', {
                display: processorSuccess.value,
                message: 'Profile has been updated.',
                type: 'success'
            });

            await router.push({ path: '/billing/payment' });
        }

        loadingState.isActive = false;
    };

    return {
        choices,
        createPayment,
        deletePayment,
        formArr,
        formErrors,
        formObj,
        formSuccess,
        getChoices,
        getEdit,
        getSearch,
        updateProfile
    };
};