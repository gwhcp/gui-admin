import { ComputedRef, UnwrapNestedRefs } from "vue";

interface UseCustomerBillingProfileInterface {
    formArr: ComputedRef<string[]>;
    formErrors: ComputedRef<Record<string, unknown>>;
    formObj: ComputedRef<{
        address: string;
        city: string;
        country: string;
        credit_card_cvv2: number;
        credit_card_month: number;
        credit_card_name: string;
        credit_card_number: number;
        credit_card_type: string;
        credit_card_year: number;
        date_from: string;
        name: string;
        primary_phone: string;
        state: string;
        zipcode: string;
    }>;
    formSuccess: ComputedRef<boolean>;
    getEdit: (account_id: string) => Promise<void>;
    getSearch: () => Promise<void>;
    updateProfile: (values: Record<string, string>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void
    }) => Promise<void>;
}

export const useCustomerBillingProfile = (): UseCustomerBillingProfileInterface => {
    const { loadingState } = usePageLoading();

    const { $event } = useNuxtApp();

    const router = useRouter();

    const formArr = computed(() => {
        return localCustomerBillingProfile.formArr;
    });

    const formErrors = computed(() => {
        return localCustomerBillingProfile.formErrors;
    });

    const formObj = computed(() => {
        return localCustomerBillingProfile.formObj;
    });

    const formSuccess = computed(() => {
        return localCustomerBillingProfile.formSuccess;
    });

    const getEdit = async (account_id: string) => {
        loadingState.isActive = true;

        const { doProcess, processorObj } = await useProcessor();

        await doProcess(`admin/customer/billing/profile/${account_id}/edit`, 'GET', null);

        localCustomerBillingProfile.formObj = processorObj.value;

        loadingState.isActive = false;
    };

    const getSearch = async () => {
        loadingState.isActive = true;

        const { doProcess, processorArr } = await useProcessor();

        await doProcess('admin/customer/billing/profile/search', 'GET', null);

        localCustomerBillingProfile.formArr = processorArr.value;

        loadingState.isActive = false;
    };

    const localCustomerBillingProfile: UnwrapNestedRefs<any> = reactive({
        formArr: [],
        formErrors: {},
        formObj: {
            address: '',
            city: '',
            country: '',
            credit_card_cvv2: '',
            credit_card_month: '',
            credit_card_name: '',
            credit_card_number: '',
            credit_card_type: '',
            credit_card_year: '',
            date_from: '',
            name: '',
            primary_phone: '',
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

        await doProcess(`admin/customer/account/${values['account']}/edit`, 'PATCH', values);

        if (!processorSuccess.value) {
            actions.setErrors(processorErrors.value);
        } else {
            // @ts-ignore
            $event('alert', {
                display: processorSuccess.value,
                message: 'Customer billing profile has been updated.',
                type: 'success'
            });

            await router.push({ path: '/customer/billing' });
        }

        loadingState.isActive = false;
    };

    return {
        formArr,
        formErrors,
        formObj,
        formSuccess,
        getEdit,
        getSearch,
        updateProfile
    };
};