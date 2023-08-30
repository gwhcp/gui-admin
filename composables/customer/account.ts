import { ComputedRef, UnwrapNestedRefs } from "vue";

interface UseCustomerAccountInterface {
    formArr: ComputedRef<string[]>;
    formErrors: ComputedRef<Record<string, unknown>>;
    formObj: ComputedRef<{
        address: string;
        city: string;
        comment_order: string;
        country: string;
        date_from: string;
        email: string;
        first_name: string;
        is_active: boolean;
        last_name: string;
        primary_phone: string;
        secondary_phone: null | string;
        state: string;
        time_format: number;
        time_zone: string;
        zipcode: string;
    }>;
    formSuccess: ComputedRef<boolean>;
    getAccessLog: (account_id: string) => Promise<void>;
    getEdit: (account_id: string) => Promise<void>;
    getSearch: () => Promise<void>;
    updateProfile: (values: Record<string, string>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void
    }) => Promise<void>;
}

export const useCustomerAccount = (): UseCustomerAccountInterface => {
    const { loadingState } = usePageLoading();

    const { $event } = useNuxtApp();

    const router = useRouter();

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

    const getAccessLog = async (account_id: string) => {
        loadingState.isActive = true;

        const { doProcess, processorArr } = await useProcessor();

        await doProcess(`admin/customer/account/${account_id}/accesslog`, 'GET', null);

        localCustomerAccount.formArr = processorArr.value;

        loadingState.isActive = false;
    };

    const getEdit = async (account_id: string) => {
        loadingState.isActive = true;

        const { doProcess, processorObj } = await useProcessor();

        await doProcess(`admin/customer/account/${account_id}/edit`, 'GET', null);

        localCustomerAccount.formObj = processorObj.value;

        loadingState.isActive = false;
    };

    const getSearch = async () => {
        loadingState.isActive = true;

        const { doProcess, processorArr } = await useProcessor();

        await doProcess('admin/customer/account/search', 'GET', null);

        localCustomerAccount.formArr = processorArr.value;

        loadingState.isActive = false;
    };

    const localCustomerAccount: UnwrapNestedRefs<any> = reactive({
        formArr: [],
        formErrors: {},
        formObj: {
            address: '',
            city: '',
            comment_order: '',
            country: '',
            date_from: '',
            email: '',
            first_name: '',
            last_name: '',
            primary_phone: '',
            secondary_phone: null,
            state: '',
            time_format: 12,
            time_zone: '',
            zipcode: ''
        },
        formSuccess: false
    });

    const updateProfile = async (values: Record<string, string>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void;
    }) => {
        loadingState.isActive = true;

        const { doProcess, processorErrors, processorSuccess } = await useProcessor();

        await doProcess(`admin/customer/account/${values['account']}/edit`, 'PATCH', values);

        if (!processorSuccess.value) {
            actions.setErrors(processorErrors.value);
        } else {
            // @ts-ignore
            $event('alert', {
                display: processorSuccess.value,
                message: 'Customer profile has been updated.',
                type: 'success'
            });

            await router.push({ path: '/customer/account' });
        }

        loadingState.isActive = false;
    };

    return {
        formArr,
        formErrors,
        formObj,
        formSuccess,
        getAccessLog,
        getEdit,
        getSearch,
        updateProfile
    };
};