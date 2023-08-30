import { ComputedRef, UnwrapNestedRefs } from "vue";

interface UseEmployeeAccountInterface {
    choices: ComputedRef<Record<string, string>>;
    formArr: ComputedRef<string[]>;
    formErrors: ComputedRef<Record<string, unknown>>;
    formObj: ComputedRef<{
        address: string;
        city: string;
        comment_order: string;
        company: null | number;
        confirmed_password: string;
        country: string;
        date_from: string;
        email: string;
        first_name: string;
        is_active: boolean;
        is_staff: boolean;
        last_login: null | string;
        last_name: string;
        old_password: string;
        password: string;
        primary_phone: string;
        secondary_phone: null | string;
        state: string;
        time_format: number;
        time_zone: string;
        zipcode: string;
    }>;
    formSuccess: ComputedRef<boolean>;
    getAccessLog: () => Promise<void>;
    getChoices: () => Promise<void>;
    getEdit: () => Promise<void>;
    updatePassword: (values: Record<string, string>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void
    }) => Promise<void>;
    updateProfile: (values: Record<string, string>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void
    }) => Promise<void>;
}

export const useEmployeeAccount = (): UseEmployeeAccountInterface => {
    const { loadingState } = usePageLoading();

    const { $event } = useNuxtApp();

    const router = useRouter();

    const choices = computed(() => {
        return localEmployeeAccount.choices;
    });

    const formArr = computed(() => {
        return localEmployeeAccount.formArr;
    });

    const formErrors = computed(() => {
        return localEmployeeAccount.formErrors;
    });

    const formObj = computed(() => {
        return localEmployeeAccount.formObj;
    });

    const formSuccess = computed(() => {
        return localEmployeeAccount.formSuccess;
    });

    const getAccessLog = async () => {
        loadingState.isActive = true;

        const { doProcess, processorArr } = await useProcessor();

        await doProcess('admin/employee/account/accesslog', 'GET', null);

        localEmployeeAccount.formArr = processorArr.value;

        loadingState.isActive = false;
    };

    const getChoices = async () => {
        const { doProcess, processorObj } = await useProcessor();

        await doProcess('admin/employee/account/choices', 'GET', null);

        localEmployeeAccount.choices = processorObj.value;
    };

    const getEdit = async () => {
        loadingState.isActive = true;

        const { doProcess, processorObj } = await useProcessor();

        await doProcess('admin/employee/account/edit', 'GET', null);

        localEmployeeAccount.formObj = processorObj.value;

        loadingState.isActive = false;
    };

    const localEmployeeAccount: UnwrapNestedRefs<any> = reactive({
        choices: {},
        formArr: [],
        formErrors: {},
        formObj: {
            address: '',
            city: '',
            comment_order: '',
            company: null,
            confirmed_password: '',
            country: '',
            date_from: '',
            email: '',
            first_name: '',
            is_active: false,
            is_staff: false,
            last_login: null,
            last_name: '',
            old_password: '',
            password: '',
            primary_phone: '',
            secondary_phone: null,
            state: '',
            time_format: 12,
            time_zone: '',
            zipcode: ''
        },
        formSuccess: false
    });

    const updatePassword = async (values: Record<string, string>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void;
    }) => {
        loadingState.isActive = true;

        const { doProcess, processorErrors, processorSuccess } = await useProcessor();

        await doProcess('admin/employee/account/password', 'PATCH', values);

        if (!processorSuccess.value) {
            actions.setErrors(processorErrors.value);
        } else {
            // @ts-ignore
            $event('alert', {
                display: processorSuccess.value,
                message: 'Password has been updated.',
                type: 'success'
            });

            await router.push({ path: '/employee/account/password' });
        }

        loadingState.isActive = false;
    };

    const updateProfile = async (values: Record<string, string>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void;
    }) => {
        loadingState.isActive = true;

        const { doProcess, processorErrors, processorSuccess } = await useProcessor();

        await doProcess('admin/employee/account/edit', 'PATCH', values);

        if (!processorSuccess.value) {
            actions.setErrors(processorErrors.value);
        } else {
            // @ts-ignore
            $event('alert', {
                display: processorSuccess.value,
                message: 'Profile has been updated.',
                type: 'success'
            });

            await router.push({ path: '/employee/account' });
        }

        loadingState.isActive = false;
    };

    return {
        choices,
        formArr,
        formErrors,
        formObj,
        formSuccess,
        getAccessLog,
        getChoices,
        getEdit,
        updatePassword,
        updateProfile
    };
};