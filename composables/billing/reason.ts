import { ComputedRef, UnwrapNestedRefs } from "vue";

interface UseBillingReasonInterface {
    choices: ComputedRef<Record<string, string>>;
    createReason: (values: Record<string, unknown>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void
    }) => Promise<void>;
    deleteReason: (values: { id: string; }) => Promise<boolean>;
    formArr: ComputedRef<string[]>;
    formErrors: ComputedRef<Record<string, unknown>>;
    formObj: ComputedRef<{
        date_from: string;
        is_active: boolean;
        name: string;
        reason_type: string;
        reason_type_name: string;
    }>;
    formSuccess: ComputedRef<boolean>;
    getChoices: () => Promise<void>;
    getSearch: () => Promise<void>;
}

export const useBillingReason = (): UseBillingReasonInterface => {
    const { loadingState } = usePageLoading();

    const { $event } = useNuxtApp();

    const router = useRouter();

    const { selectionClear } = useSearchGrid();

    const choices = computed(() => {
        return localBillingReason.choices;
    });

    const createReason = async (values: Record<string, unknown>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void;
    }) => {
        loadingState.isActive = true;

        const { doProcess, processorErrors, processorSuccess } = await useProcessor();

        await doProcess('admin/billing/reason/create', 'POST', values);

        if (!processorSuccess.value) {
            actions.setErrors(processorErrors.value);
        } else {
            // @ts-ignore
            $event('alert', {
                display: processorSuccess.value,
                message: 'Billing reason has been created.',
                type: 'success'
            });

            await router.push({ path: '/billing/reason' });
        }

        loadingState.isActive = false;
    };

    const deleteReason = async (values: { id: string; }) => {
        loadingState.isActive = true;

        const { doProcess, processorErrors, processorSuccess } = await useProcessor();

        await doProcess(`admin/billing/reason/${values['id']}/delete`, 'DELETE', null);

        if (!processorSuccess.value) {
            localBillingReason.formErrors = processorErrors.value;
        } else {
            localBillingReason.formArr = localBillingReason.formArr.filter((item: {
                [x: string]: string;
            }) => item['id'] !== values['id']);

            selectionClear();

            localBillingReason.formSuccess = true;
        }

        loadingState.isActive = false;

        return processorSuccess.value;
    };

    const formArr = computed(() => {
        return localBillingReason.formArr;
    });

    const formErrors = computed(() => {
        return localBillingReason.formErrors;
    });

    const formObj = computed(() => {
        return localBillingReason.formObj;
    });

    const formSuccess = computed(() => {
        return localBillingReason.formSuccess;
    });

    const getChoices = async () => {
        const { doProcess, processorObj } = await useProcessor();

        await doProcess('admin/billing/reason/choices', 'GET', null);

        localBillingReason.choices = processorObj.value;
    };

    const getSearch = async () => {
        loadingState.isActive = true;

        const { doProcess, processorArr } = await useProcessor();

        await doProcess('admin/billing/reason/search', 'GET', null);

        localBillingReason.formArr = processorArr.value;

        loadingState.isActive = false;
    };

    const localBillingReason: UnwrapNestedRefs<any> = reactive({
        choices: {},
        formArr: [],
        formErrors: {},
        formObj: {
            date_from: '',
            is_active: false,
            name: '',
            reason_type: '',
            reason_type_name: ''
        },
        formSuccess: false
    });

    return {
        choices,
        createReason,
        deleteReason,
        formArr,
        formErrors,
        formObj,
        formSuccess,
        getChoices,
        getSearch
    };
};