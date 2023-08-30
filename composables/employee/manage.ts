import { ComputedRef, UnwrapNestedRefs } from "vue";

interface UseEmployeeManageInterface {
    createAccount: (values: Record<string, unknown>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void
    }) => Promise<void>;
    deleteAccount: (values: { id: string; }) => Promise<boolean>;
    formArr: ComputedRef<string[]>;
    formErrors: ComputedRef<Record<string, unknown>>;
    formObj: ComputedRef<{
        address: string;
        city: string;
        comment_order: string;
        company: null | number;
        country: string;
        date_from: string;
        email: string;
        first_name: string;
        is_active: boolean;
        is_staff: boolean;
        last_login: null | string;
        last_name: string;
        password: string;
        primary_phone: string;
        secondary_phone: null | string;
        state: string;
        time_format: number;
        time_zone: string;
        zipcode: string;
    }>;
    formSuccess: ComputedRef<boolean>;
    getAccessLog: (account_id: string) => Promise<void>;
    getPermissionsBase: () => Promise<void>;
    getPermissionsUser: (account_id: string) => Promise<void>;
    getEdit: (account_id: string) => Promise<void>;
    permissionsBase: ComputedRef<string[]>;
    permissionsUser: ComputedRef<string[]>;
    getSearch: () => Promise<void>;
    updatePermissions: (id: string, values: string[]) => Promise<void>;
    updateProfile: (values: Record<string, string>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void
    }) => Promise<void>;
}

export const useEmployeeManage = (): UseEmployeeManageInterface => {
    const { loadingState } = usePageLoading();

    const { $event } = useNuxtApp();

    const router = useRouter();

    const { selectionClear } = useSearchGrid();

    const createAccount = async (values: Record<string, unknown>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void;
    }) => {
        loadingState.isActive = true;

        const { doProcess, processorErrors, processorSuccess } = await useProcessor();

        await doProcess('admin/employee/manage/create', 'POST', values);

        if (!processorSuccess.value) {
            actions.setErrors(processorErrors.value);
        } else {
            // @ts-ignore
            $event('alert', {
                display: processorSuccess.value,
                message: 'Employee account has been created.',
                type: 'success'
            });

            await router.push({ path: '/employee/manage' });
        }

        loadingState.isActive = false;
    };

    const deleteAccount = async (values: { id: string; }) => {
        loadingState.isActive = true;

        const { doProcess, processorErrors, processorSuccess } = await useProcessor();

        await doProcess(`admin/employee/manage/${values['id']}/delete`, 'DELETE', null);

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

    const getAccessLog = async (account_id: string) => {
        loadingState.isActive = true;

        const { doProcess, processorArr } = await useProcessor();

        await doProcess(`admin/employee/manage/${account_id}/accesslog`, 'GET', null);

        localBillingPayment.formArr = processorArr.value;

        loadingState.isActive = false;
    };

    const getPermissionsBase = async () => {
        loadingState.isActive = true;

        const { doProcess, processorArr } = await useProcessor();

        await doProcess('admin/employee/manage/permission/base', 'GET', null);

        const perms: any = [];

        for (const base of processorArr.value) {
            perms.push({
                // @ts-ignore
                value: base['id'],

                // @ts-ignore
                label: base['name']
            })
        }

        localBillingPayment.permissionsBase = perms;

        loadingState.isActive = false;
    };

    const getPermissionsUser = async (account_id: string) => {
        loadingState.isActive = true;

        const { doProcess, processorObj } = await useProcessor();

        await doProcess(`admin/employee/manage/${account_id}/permission`, 'GET', null);

        localBillingPayment.permissionsUser = processorObj.value['user_permissions'];

        loadingState.isActive = false;
    };

    const getEdit = async (account_id: string) => {
        loadingState.isActive = true;

        const { doProcess, processorObj } = await useProcessor();

        await doProcess(`admin/employee/manage/${account_id}/edit`, 'GET', null);

        localBillingPayment.formObj = processorObj.value;

        loadingState.isActive = false;
    };

    const getSearch = async () => {
        loadingState.isActive = true;

        const { doProcess, processorArr } = await useProcessor();

        await doProcess('admin/employee/manage/search', 'GET', null);

        localBillingPayment.formArr = processorArr.value;

        loadingState.isActive = false;
    };

    const localBillingPayment: UnwrapNestedRefs<any> = reactive({
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
            is_active: false,
            is_staff: false,
            last_login: null,
            last_name: '',
            password: '',
            primary_phone: '',
            secondary_phone: null,
            state: '',
            time_format: 12,
            time_zone: '',
            zipcode: ''
        },
        formSuccess: false,
        permissionsBase: [],
        permissionsUser: []
    });

    const permissionsBase = computed(() => {
        return localBillingPayment.permissionsBase;
    });

    const permissionsUser = computed(() => {
        return localBillingPayment.permissionsUser;
    });

    const updatePermissions = async (id: string, values: string[]) => {
        loadingState.isActive = true;

        const perms: string[] = [];

        values.forEach((val: string) => {
            // @ts-ignore
            perms.push(val['value']);
        });

        const { doProcess, processorErrors, processorSuccess } = await useProcessor();

        await doProcess(`admin/employee/manage/${id}/permission`, 'PATCH', { 'user_permissions': perms });

        if (!processorSuccess.value) {
            localBillingPayment.formErrors = processorErrors.value;
        } else {
            // @ts-ignore
            $event('alert', {
                display: processorSuccess.value,
                message: 'Permissions have been updated.',
                type: 'success'
            });

            await router.push({ path: '/employee/manage' });
        }

        loadingState.isActive = false;
    };

    const updateProfile = async (values: Record<string, string>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void;
    }) => {
        loadingState.isActive = true;

        const { doProcess, processorErrors, processorSuccess } = await useProcessor();

        await doProcess(`admin/employee/manage/${values['account']}/edit`, 'PATCH', values);

        if (!processorSuccess.value) {
            actions.setErrors(processorErrors.value);
        } else {
            // @ts-ignore
            $event('alert', {
                display: processorSuccess.value,
                message: 'Employee profile has been updated.',
                type: 'success'
            });

            await router.push({ path: '/employee/manage' });
        }

        loadingState.isActive = false;
    };

    return {
        createAccount,
        deleteAccount,
        formArr,
        formErrors,
        formObj,
        formSuccess,
        getAccessLog,
        getPermissionsBase,
        getPermissionsUser,
        getEdit,
        getSearch,
        permissionsBase,
        permissionsUser,
        updatePermissions,
        updateProfile
    };
};