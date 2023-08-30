import { ComputedRef, UnwrapNestedRefs } from "vue";

interface UseCompanyDnsInterface {
    choices: ComputedRef<Record<string, string>>;
    createRecord: (values: Record<string, unknown>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void
    }) => Promise<void>;
    deleteRecord: (values: { id: string; }) => Promise<boolean>;
    formArr: ComputedRef<string[]>;
    formErrors: ComputedRef<Record<string, unknown>>;
    formObj: ComputedRef<{
        data: string;
        host: string;
        manage_dns: boolean;
        mx_priority: null | number;
        name: string;
        ns: string[];
        record_type: string;
    }>;
    formSuccess: ComputedRef<boolean>;
    getChoices: () => Promise<void>;
    getNameserverBase: () => Promise<void>;
    getNameserverDomain: (domain_id: string) => Promise<void>;
    getSearch: (id: string) => Promise<void>;
    nameserverBase: ComputedRef<string[]>;
    nameserverDomain: ComputedRef<string[]>;
    updateNameserver: (id: string, values: string[], actions: {
        setErrors: (arg0: Record<string, unknown>) => void
    }) => Promise<void>;
}

export const useCompanyDns = (): UseCompanyDnsInterface => {
    const { loadingState } = usePageLoading();

    const { $event } = useNuxtApp();

    const router = useRouter();

    const { selectionClear } = useSearchGrid();

    const choices = computed(() => {
        return localCompanyDns.choices;
    });

    const createRecord = async (values: Record<string, unknown>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void;
    }) => {
        loadingState.isActive = true;

        const { doProcess, processorErrors, processorSuccess } = await useProcessor();

        await doProcess('admin/company/dns/create', 'POST', values);

        if (!processorSuccess.value) {
            actions.setErrors(processorErrors.value);
        } else {
            // @ts-ignore
            $event('alert', {
                display: processorSuccess.value,
                message: 'DNS record has been created.',
                type: 'success'
            });

            await router.push({ path: `/company/dns/${values['domain']}` });
        }

        loadingState.isActive = false;
    };

    const deleteRecord = async (values: { id: string; }) => {
        loadingState.isActive = true;

        const { doProcess, processorErrors, processorSuccess } = await useProcessor();

        await doProcess(`admin/company/dns/${values['id']}/delete`, 'DELETE', null);

        if (!processorSuccess.value) {
            localCompanyDns.formErrors = processorErrors.value;
        } else {
            localCompanyDns.formArr = localCompanyDns.formArr.filter((item: {
                [x: string]: string;
            }) => item['id'] !== values['id']);

            selectionClear();

            localCompanyDns.formSuccess = true;
        }

        loadingState.isActive = false;

        return processorSuccess.value;
    };

    const formArr = computed(() => {
        return localCompanyDns.formArr;
    });

    const formErrors = computed(() => {
        return localCompanyDns.formErrors;
    });

    const formObj = computed(() => {
        return localCompanyDns.formObj;
    });

    const formSuccess = computed(() => {
        return localCompanyDns.formSuccess;
    });

    const getChoices = async () => {
        const { doProcess, processorObj } = await useProcessor();

        await doProcess('admin/company/dns/choices', 'GET', null);

        localCompanyDns.choices = processorObj.value;
    };

    const getNameserverBase = async () => {
        loadingState.isActive = true;

        await getChoices();

        const ns: any = [];

        for (const [key, value] of Object.entries(localCompanyDns.choices['ns'])) {
            ns.push({
                value: parseInt(key, 10),
                label: value
            });
        }

        localCompanyDns.nameserverBase = ns;

        loadingState.isActive = false;
    };

    const getNameserverDomain = async (domain_id: string) => {
        loadingState.isActive = true;

        const { doProcess, processorObj } = await useProcessor();

        await doProcess(`admin/company/dns/${domain_id}/ns`, 'GET', null);

        localCompanyDns.nameserverDomain = processorObj.value['ns'];

        loadingState.isActive = false;
    };

    const getSearch = async (id: string) => {
        loadingState.isActive = true;

        const { doProcess, processorArr } = await useProcessor();

        await doProcess(`admin/company/dns/${id}/search`, 'GET', null);

        localCompanyDns.formArr = processorArr.value;

        loadingState.isActive = false;
    };

    const localCompanyDns: UnwrapNestedRefs<any> = reactive({
        choices: {
            ns: {},
            zone: {}
        },
        formArr: [],
        formErrors: {},
        formObj: {
            data: '',
            host: '',
            manage_dns: false,
            mx_priority: null,
            name: '',
            ns: [],
            record_type: ''
        },
        formSuccess: false,
        nameserverBase: [],
        nameserverDomain: []
    });

    const nameserverBase = computed(() => {
        return localCompanyDns.nameserverBase;
    });

    const nameserverDomain = computed(() => {
        return localCompanyDns.nameserverDomain;
    });

    const updateNameserver = async (id: string, values: string[], actions: {
        setErrors: (arg0: Record<string, unknown>) => void;
    }) => {
        loadingState.isActive = true;

        const ns: string[] = [];

        values.forEach((val: string) => {
            // @ts-ignore
            ns.push(val['value']);
        });

        const { doProcess, processorErrors, processorSuccess } = await useProcessor();

        await doProcess(`admin/company/dns/${id}/ns`, 'PATCH', { ns: ns });

        if (!processorSuccess.value) {
            actions.setErrors(processorErrors.value);
        } else {
            // @ts-ignore
            $event('alert', {
                display: processorSuccess.value,
                message: 'Nameserver has been updated.',
                type: 'success'
            });

            await router.push({ path: '/company/dns' });
        }

        loadingState.isActive = false;
    };

    return {
        choices,
        createRecord,
        deleteRecord,
        formArr,
        formErrors,
        formObj,
        formSuccess,
        getChoices,
        getNameserverBase,
        getNameserverDomain,
        getSearch,
        nameserverBase,
        nameserverDomain,
        updateNameserver
    };
};