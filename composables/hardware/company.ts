import { ComputedRef, UnwrapNestedRefs } from "vue";

interface UseHardwareCompanyInterface {
    choices: ComputedRef<Record<string, string>>;
    createHardware: (values: Record<string, unknown>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void
    }) => Promise<void>;
    deleteHardware: (values: { id: string; }) => Promise<boolean>;
    domainsAllowed: ComputedRef<string[]>;
    domainsBase: ComputedRef<string[]>;
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
    getBaseDomain: () => Promise<void>;
    getChoices: () => Promise<void>;
    getDomain: (id: string) => Promise<void>;
    getProfile: (server_id: string) => Promise<void>;
    getSearch: () => Promise<void>;
    installHardware: (values: { id: string; }) => Promise<boolean>;
    installSuccess: ComputedRef<boolean>;
    installWarning: ComputedRef<boolean>;
    nonFieldFormError: ComputedRef<boolean>;
    nonFieldFormMessage: ComputedRef<string>;
    updateDomain: (values: Record<string, string>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void
    }) => Promise<void>;
    updateProfile: (values: Record<string, string>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void
    }) => Promise<void>;
}

export const useHardwareCompany = (): UseHardwareCompanyInterface => {
    const { loadingState } = usePageLoading();

    const { $event } = useNuxtApp();

    const router = useRouter();

    const { selectionClear } = useSearchGrid();

    const choices = computed(() => {
        return localHardwareCompany.choices;
    });

    const createHardware = async (values: Record<string, unknown>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void;
    }) => {
        loadingState.isActive = true;

        const { doProcess, processorErrors, processorSuccess } = await useProcessor();

        await doProcess('admin/hardware/company/create', 'POST', values);

        if (!processorSuccess.value) {
            actions.setErrors(processorErrors.value);
        } else {
            // @ts-ignore
            $event('alert', {
                display: processorSuccess.value,
                message: 'Company hardware has been created.',
                type: 'success'
            });

            await router.push({ path: '/hardware/company' });
        }

        loadingState.isActive = false;
    };

    const deleteHardware = async (values: { id: string; }) => {
        loadingState.isActive = true;

        const { doProcess, processorErrors, processorSuccess } = await useProcessor();

        await doProcess(`admin/hardware/company/delete/${values['id']}`, 'DELETE', null);

        if (!processorSuccess.value) {
            localHardwareCompany.formErrors = processorErrors.value;
        } else {
            localHardwareCompany.formArr = localHardwareCompany.formArr.filter((item: {
                [x: string]: string;
            }) => item['id'] !== values['id']);

            selectionClear();

            localHardwareCompany.formSuccess = true;
        }

        loadingState.isActive = false;

        return processorSuccess.value;
    };

    const domainsAllowed = computed(() => {
        return localHardwareCompany.domainsAllowed;
    });

    const domainsBase = computed(() => {
        return localHardwareCompany.domainsBase;
    });

    const formArr = computed(() => {
        return localHardwareCompany.formArr;
    });

    const formErrors = computed(() => {
        return localHardwareCompany.formErrors;
    });

    const formObj = computed(() => {
        return localHardwareCompany.formObj;
    });

    const formSuccess = computed(() => {
        return localHardwareCompany.formSuccess;
    });

    const getBaseDomain = async () => {
        loadingState.isActive = true;

        await getChoices();

        const domains: any = [];

        for (const [key, value] of Object.entries(localHardwareCompany.choices)) {
            domains.push({
                value: parseInt(key, 10),
                label: value
            })
        }

        localHardwareCompany.domainsBase = domains;

        loadingState.isActive = false;
    };

    const getChoices = async () => {
        const { doProcess, processorObj } = await useProcessor();

        await doProcess('admin/hardware/company/choices', 'GET', null);

        localHardwareCompany.choices = processorObj.value;
    };

    const getDomain = async (server_id: string) => {
        loadingState.isActive = true;

        const { doProcess, processorObj } = await useProcessor();

        await doProcess(`admin/hardware/company/domain/${server_id}`, 'GET', null);

        localHardwareCompany.domainsAllowed = processorObj.value['allowed'];

        loadingState.isActive = false;
    };

    const getProfile = async (server_id: string) => {
        loadingState.isActive = true;

        const { doProcess, processorObj } = await useProcessor();

        await doProcess(`admin/hardware/company/profile/${server_id}`, 'GET', null);

        localHardwareCompany.formObj = processorObj.value;

        loadingState.isActive = false;
    };

    const getSearch = async () => {
        loadingState.isActive = true;

        const { doProcess, processorArr } = await useProcessor();

        await doProcess('admin/hardware/company/search', 'GET', null);

        localHardwareCompany.formArr = processorArr.value;

        loadingState.isActive = false;
    };

    const installHardware = async (values: { id: string; }) => {
        loadingState.isActive = true;

        const { doProcess, processorSuccess } = await useProcessor();

        await doProcess(`admin/hardware/company/install/${values['id']}`, 'PATCH', { in_queue: true, is_installed: true });

        if (!processorSuccess.value) {
            localHardwareCompany.installSuccess = false;
            localHardwareCompany.installWarning = true;
        } else {
            localHardwareCompany.installSuccess = true;
            localHardwareCompany.installWarning = false;
        }

        loadingState.isActive = false;

        return processorSuccess.value;
    };

    const installSuccess = computed(() => {
        return localHardwareCompany.installSuccess;
    });

    const installWarning = computed(() => {
        return localHardwareCompany.installWarning;
    });

    const localHardwareCompany: UnwrapNestedRefs<any> = reactive({
        choices: {
            domain: {},
            hardware_target: {}
        },
        domainsAllowed: [],
        domainsBase: [],
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
        installWarning: false,
        nonFieldFormError: false,
        nonFieldFormMessage: ''
    });

    const nonFieldFormError = computed(() => {
        return localHardwareCompany.nonFieldFormError;
    });

    const nonFieldFormMessage = computed(() => {
        return localHardwareCompany.nonFieldFormMessage;
    });

    const updateDomain = async (values: Record<string, string>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void;
    }) => {
        loadingState.isActive = true;

        const { doProcess, processorErrors, processorSuccess } = await useProcessor();

        await doProcess(`admin/hardware/company/domain/${values['server']}`, 'PATCH', { allowed: values['allowed'] });

        if (!processorSuccess.value) {
            if ('allowed' in processorErrors.value) {
                localHardwareCompany.nonFieldFormError = true;
                localHardwareCompany.nonFieldFormMessage = processorErrors.value['allowed'][0];
            } else {
                actions.setErrors(processorErrors.value);
            }
        } else {
            // @ts-ignore
            $event('alert', {
                display: processorSuccess.value,
                message: 'Profile has been updated.',
                type: 'success'
            });

            await router.push({ path: '/hardware/company' });
        }

        loadingState.isActive = false;
    };

    const updateProfile = async (values: Record<string, string>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void;
    }) => {
        loadingState.isActive = true;

        const { doProcess, processorErrors, processorSuccess } = await useProcessor();

        await doProcess(`admin/hardware/company/profile/${values['server']}`, 'PATCH', values);

        if (!processorSuccess.value) {
            actions.setErrors(processorErrors.value);
        } else {
            // @ts-ignore
            $event('alert', {
                display: processorSuccess.value,
                message: 'Profile has been updated.',
                type: 'success'
            });

            await router.push({ path: '/hardware/company' });
        }

        loadingState.isActive = false;
    };

    return {
        choices,
        createHardware,
        deleteHardware,
        domainsAllowed,
        domainsBase,
        formArr,
        formErrors,
        formObj,
        formSuccess,
        getChoices,
        getBaseDomain,
        getDomain,
        getProfile,
        getSearch,
        installHardware,
        installSuccess,
        installWarning,
        nonFieldFormError,
        nonFieldFormMessage,
        updateDomain,
        updateProfile
    };
};