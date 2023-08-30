import { ComputedRef, UnwrapNestedRefs } from "vue";

interface UseHardwareClientInterface {
    choices: ComputedRef<Record<string, string>>;
    createHardware: (values: Record<string, unknown>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void
    }) => Promise<void>;
    deleteHardware: (values: { id: string; }) => Promise<boolean>;
    formArr: ComputedRef<string[]>;
    formErrors: ComputedRef<Record<string, unknown>>;
    formObj: ComputedRef<{
        account_id: number;
        date_from: string;
        domain: string;
        domain_name: string;
        domain_id: number;
        hardware_type: string;
        hardware_type_name: string;
        in_queue: boolean;
        ip: string;
        ipaddress: string;
        ipaddress_pool_id: number;
        is_active: boolean;
        is_admin: boolean;
        is_bind: boolean;
        is_cp: boolean;
        is_domain: boolean;
        is_installed: boolean;
        is_mail: boolean;
        is_managed: boolean;
        is_mysql: boolean;
        is_postgresql: boolean;
        is_store: boolean;
        is_unmanaged: boolean;
        server_type: string;
        target_type: string;
    }>;
    formSuccess: ComputedRef<boolean>;
    getChoices: () => Promise<void>;
    getEdit: (server_id: string) => Promise<void>;
    getSearch: () => Promise<void>;
    installHardware: (values: { id: string; }) => Promise<boolean>;
    installSuccess: ComputedRef<boolean>;
    installWarning: ComputedRef<boolean>;
    updateProfile: (values: Record<string, string>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void
    }) => Promise<void>;
}

export const useHardwareClient = (): UseHardwareClientInterface => {
    const { loadingState } = usePageLoading();

    const { $event } = useNuxtApp();

    const router = useRouter();

    const { selectionClear } = useSearchGrid();

    const choices = computed(() => {
        return localHardwareClient.choices;
    });

    const createHardware = async (values: Record<string, unknown>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void;
    }) => {
        loadingState.isActive = true;

        const { doProcess, processorErrors, processorSuccess } = await useProcessor();

        await doProcess('admin/hardware/client/create', 'POST', values);

        if (!processorSuccess.value) {
            actions.setErrors(processorErrors.value);
        } else {
            // @ts-ignore
            $event('alert', {
                display: processorSuccess.value,
                message: 'Client hardware has been created.',
                type: 'success'
            });

            await router.push({ path: '/hardware/client' });
        }

        loadingState.isActive = false;
    };

    const deleteHardware = async (values: { id: string; }) => {
        loadingState.isActive = true;

        const { doProcess, processorErrors, processorSuccess } = await useProcessor();

        await doProcess(`admin/hardware/client/${values['id']}/delete`, 'DELETE', null);

        if (!processorSuccess.value) {
            localHardwareClient.formErrors = processorErrors.value;
        } else {
            localHardwareClient.formArr = localHardwareClient.formArr.filter((item: {
                [x: string]: string;
            }) => item['id'] !== values['id']);

            selectionClear();

            localHardwareClient.formSuccess = true;
        }

        loadingState.isActive = false;

        return processorSuccess.value;
    };

    const formArr = computed(() => {
        return localHardwareClient.formArr;
    });

    const formErrors = computed(() => {
        return localHardwareClient.formErrors;
    });

    const formObj = computed(() => {
        return localHardwareClient.formObj;
    });

    const formSuccess = computed(() => {
        return localHardwareClient.formSuccess;
    });

    const getChoices = async () => {
        const { doProcess, processorObj } = await useProcessor();

        await doProcess('admin/hardware/client/choices', 'GET', null);

        localHardwareClient.choices = processorObj.value;
    };

    const getEdit = async (server_id: string) => {
        loadingState.isActive = true;

        const { doProcess, processorObj } = await useProcessor();

        await doProcess(`admin/hardware/client/${server_id}/edit`, 'GET', null);

        localHardwareClient.formObj = processorObj.value;

        loadingState.isActive = false;
    };

    const getSearch = async () => {
        loadingState.isActive = true;

        const { doProcess, processorArr } = await useProcessor();

        await doProcess('admin/hardware/client/search', 'GET', null);

        localHardwareClient.formArr = processorArr.value;

        loadingState.isActive = false;
    };

    const installHardware = async (values: { id: string; }) => {
        loadingState.isActive = true;

        const { doProcess, processorSuccess } = await useProcessor();

        await doProcess(`admin/hardware/client/${values['id']}/install`, 'PATCH', {
            in_queue: true,
            is_installed: true
        });

        if (!processorSuccess.value) {
            localHardwareClient.installSuccess = false;
            localHardwareClient.installWarning = true;
        } else {
            localHardwareClient.installSuccess = true;
            localHardwareClient.installWarning = false;
        }

        loadingState.isActive = false;

        return processorSuccess.value;
    };

    const installSuccess = computed(() => {
        return localHardwareClient.installSuccess;
    });

    const installWarning = computed(() => {
        return localHardwareClient.installWarning;
    });

    const localHardwareClient: UnwrapNestedRefs<any> = reactive({
        choices: {
            domain: {},
            hardware_target: {},
            hardware_type: {}
        },
        formArr: [],
        formErrors: {},
        formObj: {
            account_id: 0,
            date_from: '',
            domain: '',
            domain_name: '',
            domain_id: 0,
            hardware_type: '',
            hardware_type_name: '',
            in_queue: false,
            ip: '',
            ipaddress: '',
            ipaddress_pool_id: 0,
            is_active: false,
            is_admin: false,
            is_bind: false,
            is_cp: false,
            is_domain: false,
            is_installed: false,
            is_mail: false,
            is_managed: false,
            is_mysql: false,
            is_postgresql: false,
            is_store: false,
            is_unmanaged: false,
            server_type: '',
            target_type: ''
        },
        formSuccess: false,
        installSuccess: false,
        installWarning: false
    });

    const updateProfile = async (values: Record<string, string>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void;
    }) => {
        loadingState.isActive = true;

        const { doProcess, processorErrors, processorSuccess } = await useProcessor();

        await doProcess(`admin/hardware/client/${values['server']}/edit`, 'PATCH', values);

        if (!processorSuccess.value) {
            actions.setErrors(processorErrors.value);
        } else {
            // @ts-ignore
            $event('alert', {
                display: processorSuccess.value,
                message: 'Profile has been updated.',
                type: 'success'
            });

            await router.push({ path: '/hardware/client' });
        }

        loadingState.isActive = false;
    };

    return {
        choices,
        createHardware,
        deleteHardware,
        formArr,
        formErrors,
        formObj,
        formSuccess,
        getChoices,
        getEdit,
        getSearch,
        installHardware,
        installSuccess,
        installWarning,
        updateProfile
    };
};