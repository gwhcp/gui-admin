import { ComputedRef, UnwrapNestedRefs } from "vue";

interface UseStoreFraudInterface {
    choices: ComputedRef<Record<string, string>>;
    createFraud: (values: Record<string, unknown>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void
    }) => Promise<void>;
    deleteFraud: (values: { id: string; }) => Promise<boolean>;
    formArr: ComputedRef<string[]>;
    formErrors: ComputedRef<Record<string, unknown>>;
    formObj: ComputedRef<{
        date_from: string;
        fraud_type: string;
        fraud_type_name: string;
        is_active: boolean;
        name: string;
    }>;
    formSuccess: ComputedRef<boolean>;
    getEdit: (fraud_id: string) => Promise<void>;
    getChoices: () => Promise<void>;
    getSearch: () => Promise<void>;
    updateProfile: (values: Record<string, string>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void
    }) => Promise<void>;
}

export const useStoreFraud = (): UseStoreFraudInterface => {
    const { loadingState } = usePageLoading();

    const { $event } = useNuxtApp();

    const router = useRouter();

    const { selectionClear } = useSearchGrid();

    const choices = computed(() => {
        return localStoreFraud.choices;
    });

    const createFraud = async (values: Record<string, unknown>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void;
    }) => {
        loadingState.isActive = true;

        const { doProcess, processorErrors, processorSuccess } = await useProcessor();

        await doProcess('admin/store/fraud/create', 'POST', values);

        if (!processorSuccess.value) {
            actions.setErrors(processorErrors.value);
        } else {
            // @ts-ignore
            $event('alert', {
                display: processorSuccess.value,
                message: 'Fraud string has been created.',
                type: 'success'
            });

            await router.push({ path: '/store/fraud' });
        }

        loadingState.isActive = false;
    };

    const deleteFraud = async (values: { id: string; }) => {
        loadingState.isActive = true;

        const { doProcess, processorErrors, processorSuccess } = await useProcessor();

        await doProcess(`admin/store/fraud/${values['id']}/delete`, 'DELETE', null);

        if (!processorSuccess.value) {
            localStoreFraud.formErrors = processorErrors.value;
        } else {
            localStoreFraud.formArr = localStoreFraud.formArr.filter((item: {
                [x: string]: string;
            }) => item['id'] !== values['id']);

            selectionClear();

            localStoreFraud.formSuccess = true;
        }

        loadingState.isActive = false;

        return processorSuccess.value;
    };

    const formArr = computed(() => {
        return localStoreFraud.formArr;
    });

    const formErrors = computed(() => {
        return localStoreFraud.formErrors;
    });

    const formObj = computed(() => {
        return localStoreFraud.formObj;
    });

    const formSuccess = computed(() => {
        return localStoreFraud.formSuccess;
    });

    const getChoices = async () => {
        const { doProcess, processorObj } = await useProcessor();

        await doProcess('admin/store/fraud/choices', 'GET', null);

        localStoreFraud.choices = processorObj.value;
    };

    const getEdit = async (fraud_id: string) => {
        loadingState.isActive = true;

        const { doProcess, processorObj } = await useProcessor();

        await doProcess(`admin/store/fraud/${fraud_id}/edit`, 'GET', null);

        localStoreFraud.formObj = processorObj.value;

        loadingState.isActive = false;
    };

    const getSearch = async () => {
        loadingState.isActive = true;

        const { doProcess, processorArr } = await useProcessor();

        await doProcess('admin/store/fraud/search', 'GET', null);

        localStoreFraud.formArr = processorArr.value;

        loadingState.isActive = false;
    };

    const localStoreFraud: UnwrapNestedRefs<any> = reactive({
        choices: {},
        formArr: [],
        formErrors: {},
        formObj: {
            date_from: '',
            fraud_type: '',
            fraud_type_name: '',
            is_active: false,
            name: ''
        },
        formSuccess: false
    });

    const updateProfile = async (values: Record<string, string>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void;
    }) => {
        loadingState.isActive = true;

        const { doProcess, processorErrors, processorSuccess } = await useProcessor();

        await doProcess(`admin/store/fraud/${values['fraud']}/edit`, 'PATCH', values);

        if (!processorSuccess.value) {
            actions.setErrors(processorErrors.value);
        } else {
            // @ts-ignore
            $event('alert', {
                display: processorSuccess.value,
                message: 'Fraud string has been updated.',
                type: 'success'
            });

            await router.push({ path: '/store/fraud' });
        }

        loadingState.isActive = false;
    };

    return {
        choices,
        createFraud,
        deleteFraud,
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