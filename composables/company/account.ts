import { ComputedRef, UnwrapNestedRefs } from "vue";

interface UseCompanyAccountInterface {
    formArr: ComputedRef<string[]>;
    formErrors: ComputedRef<Record<string, unknown>>;
    formObj: ComputedRef<{
        address: string;
        city: string;
        country: string;
        date_from: string;
        name: string;
        primary_phone: string;
        secondary_phone: null | string;
        state: string;
        zipcode: string;
    }>;
    formSuccess: ComputedRef<boolean>;
    getEdit: () => Promise<void>;
    updateProfile: (values: Record<string, string>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void
    }) => Promise<void>;
}

export const useCompanyAccount = (): UseCompanyAccountInterface => {
    const { loadingState } = usePageLoading();

    const { $event } = useNuxtApp();

    const router = useRouter();

    const formArr = computed(() => {
        return localCompanyAccount.formArr;
    });

    const formErrors = computed(() => {
        return localCompanyAccount.formErrors;
    });

    const formObj = computed(() => {
        return localCompanyAccount.formObj;
    });

    const formSuccess = computed(() => {
        return localCompanyAccount.formSuccess;
    });

    const getEdit = async () => {
        loadingState.isActive = true;

        const { doProcess, processorObj } = await useProcessor();

        await doProcess('admin/company/account/edit', 'GET', null);

        localCompanyAccount.formObj = processorObj.value;

        loadingState.isActive = false;
    };

    const localCompanyAccount: UnwrapNestedRefs<any> = reactive({
        formArr: [],
        formErrors: {},
        formObj: {
            address: '',
            city: '',
            country: '',
            date_from: '',
            name: '',
            primary_phone: '',
            secondary_phone: null,
            state: '',
            zipcode: ''
        },
        formSuccess: false
    });

    const updateProfile = async (values: Record<string, string>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void;
    }) => {
        loadingState.isActive = true;

        const { doProcess, processorErrors, processorSuccess } = await useProcessor();

        await doProcess('admin/company/account/edit', 'PATCH', values);

        if (!processorSuccess.value) {
            actions.setErrors(processorErrors.value);
        } else {
            // @ts-ignore
            $event('alert', {
                display: processorSuccess.value,
                message: 'Profile has been updated.',
                type: 'success'
            });

            await router.push({ path: '/company/account' });
        }

        loadingState.isActive = false;
    };

    return {
        formArr,
        formErrors,
        formObj,
        formSuccess,
        getEdit,
        updateProfile
    };
};