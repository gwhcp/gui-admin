import { ComputedRef, UnwrapNestedRefs } from "vue";

interface UseNetworkPoolInterface {
    choices: ComputedRef<Record<string, string>>;
    createPool: (values: Record<string, unknown>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void
    }) => Promise<void>;
    deletePool: (values: { id: string; }) => Promise<boolean>;
    formArr: ComputedRef<string[]>;
    formErrors: ComputedRef<Record<string, unknown>>;
    formObj: ComputedRef<{
        assigned: string;
        assigned_name: string;
        broadcast: null | string;
        date_from: string;
        ip_available: number;
        ip_total: number;
        ip_type: number;
        is_active: boolean;
        name: string;
        netmask: null | string;
        network: string;
        subnet: number;
    }>;
    formSuccess: ComputedRef<boolean>;
    getChoices: () => Promise<void>;
    getEdit: (setup_id: string) => Promise<void>;
    getSearch: () => Promise<void>;
    updateProfile: (values: Record<string, string>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void
    }) => Promise<void>;
}

export const useNetworkPool = (): UseNetworkPoolInterface => {
    const { loadingState } = usePageLoading();

    const { $event } = useNuxtApp();

    const router = useRouter();

    const { selectionClear } = useSearchGrid();

    const choices = computed(() => {
        return localNetworkPool.choices;
    });

    const createPool = async (values: Record<string, unknown>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void;
    }) => {
        loadingState.isActive = true;

        const { doProcess, processorErrors, processorSuccess } = await useProcessor();

        await doProcess('admin/network/pool/create', 'POST', values);

        if (!processorSuccess.value) {
            actions.setErrors(processorErrors.value);
        } else {
            // @ts-ignore
            $event('alert', {
                display: processorSuccess.value,
                message: 'IP pool has been created.',
                type: 'success'
            });

            await router.push({ path: '/network/pool' });
        }

        loadingState.isActive = false;
    };

    const deletePool = async (values: { id: string; }) => {
        loadingState.isActive = true;

        const { doProcess, processorErrors, processorSuccess } = await useProcessor();

        await doProcess(`admin/network/pool/${values['id']}/delete`, 'DELETE', null);

        if (!processorSuccess.value) {
            localNetworkPool.formErrors = processorErrors.value;
        } else {
            localNetworkPool.formArr = localNetworkPool.formArr.filter((item: {
                [x: string]: string;
            }) => item['id'] !== values['id']);

            selectionClear();

            localNetworkPool.formSuccess = true;
        }

        loadingState.isActive = false;

        return processorSuccess.value;
    };

    const formArr = computed(() => {
        return localNetworkPool.formArr;
    });

    const formErrors = computed(() => {
        return localNetworkPool.formErrors;
    });

    const formObj = computed(() => {
        return localNetworkPool.formObj;
    });

    const formSuccess = computed(() => {
        return localNetworkPool.formSuccess;
    });

    const getChoices = async () => {
        const { doProcess, processorObj } = await useProcessor();

        await doProcess('admin/network/pool/choices', 'GET', null);

        localNetworkPool.choices = processorObj.value;
    };

    const getEdit = async (setup_id: string) => {
        loadingState.isActive = true;

        const { doProcess, processorObj } = await useProcessor();

        await doProcess(`admin/network/pool/${setup_id}/edit`, 'GET', null);

        localNetworkPool.formObj = processorObj.value;

        loadingState.isActive = false;
    };

    const getSearch = async () => {
        loadingState.isActive = true;

        const { doProcess, processorArr } = await useProcessor();

        await doProcess('admin/network/pool/search', 'GET', null);

        localNetworkPool.formArr = processorArr.value;

        loadingState.isActive = false;
    };

    const localNetworkPool: UnwrapNestedRefs<any> = reactive({
        choices: {},
        formArr: [],
        formErrors: {},
        formObj: {
            assigned: '',
            assigned_name: '',
            broadcast: null,
            date_from: '',
            ip_available: 0,
            ip_total: 0,
            ip_type: 0,
            is_active: false,
            name: '',
            netmask: null,
            network: '',
            subnet: 0
        },
        formSuccess: false
    });

    const updateProfile = async (values: Record<string, string>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void;
    }) => {
        loadingState.isActive = true;

        const { doProcess, processorErrors, processorSuccess } = await useProcessor();

        await doProcess(`admin/network/pool/${values['setup']}/edit`, 'PATCH', values);

        if (!processorSuccess.value) {
            actions.setErrors(processorErrors.value);
        } else {
            // @ts-ignore
            $event('alert', {
                display: processorSuccess.value,
                message: 'IP pool has been updated.',
                type: 'success'
            });

            await router.push({ path: '/network/pool' });
        }

        loadingState.isActive = false;
    };

    return {
        choices,
        createPool,
        deletePool,
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