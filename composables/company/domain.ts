import { ComputedRef, UnwrapNestedRefs } from "vue";

interface UseCompanyDomainInterface {
    createDomain: (values: Record<string, unknown>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void
    }) => Promise<void>;
    deleteDomain: (values: { id: string; }) => Promise<boolean>;
    formArr: ComputedRef<string[]>;
    formErrors: ComputedRef<Record<string, unknown>>;
    formObj: ComputedRef<{
        account: null | number;
        date_from: string;
        in_queue: boolean;
        ipaddress_pool: null | number;
        is_active: boolean;
        manage_dns: boolean;
        name: string;
        ns: string[];
        related_to: null | number;
    }>;
    formSuccess: ComputedRef<boolean>;
    getEdit: (domain_id: string) => Promise<void>;
    getSearch: () => Promise<void>;
}

export const useCompanyDomain = (): UseCompanyDomainInterface => {
    const { loadingState } = usePageLoading();

    const { $event } = useNuxtApp();

    const router = useRouter();

    const { selectionClear } = useSearchGrid();

    const createDomain = async (values: Record<string, unknown>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void;
    }) => {
        loadingState.isActive = true;

        const { doProcess, processorErrors, processorSuccess } = await useProcessor();

        await doProcess('admin/company/domain/create', 'POST', values);

        if (!processorSuccess.value) {
            actions.setErrors(processorErrors.value);
        } else {
            // @ts-ignore
            $event('alert', {
                display: processorSuccess.value,
                message: 'Domain has been created.',
                type: 'success'
            });

            await router.push({ path: '/company/domain' });
        }

        loadingState.isActive = false;
    };

    const deleteDomain = async (values: { id: string; }) => {
        loadingState.isActive = true;

        const { doProcess, processorErrors, processorSuccess } = await useProcessor();

        await doProcess(`admin/company/domain/${values['id']}/delete`, 'DELETE', null);

        if (!processorSuccess.value) {
            localCompanyDomain.formErrors = processorErrors.value;
        } else {
            localCompanyDomain.formArr = localCompanyDomain.formArr.filter((item: {
                [x: string]: string;
            }) => item['id'] !== values['id']);

            selectionClear();

            localCompanyDomain.formSuccess = true;
        }

        loadingState.isActive = false;

        return processorSuccess.value;
    };

    const formArr = computed(() => {
        return localCompanyDomain.formArr;
    });

    const formErrors = computed(() => {
        return localCompanyDomain.formErrors;
    });

    const formObj = computed(() => {
        return localCompanyDomain.formObj;
    });

    const formSuccess = computed(() => {
        return localCompanyDomain.formSuccess;
    });

    const getEdit = async (domain_id: string) => {
        loadingState.isActive = true;

        const { doProcess, processorObj } = await useProcessor();

        await doProcess(`admin/company/domain/${domain_id}/edit`, 'GET', null);

        localCompanyDomain.formObj = processorObj.value;

        loadingState.isActive = false;
    };

    const getSearch = async () => {
        loadingState.isActive = true;

        const { doProcess, processorArr } = await useProcessor();

        await doProcess('admin/company/domain/search', 'GET', null);

        localCompanyDomain.formArr = processorArr.value;

        loadingState.isActive = false;
    };

    const localCompanyDomain: UnwrapNestedRefs<any> = reactive({
        formArr: [],
        formErrors: {},
        formObj: {
            account: 0,
            date_from: '',
            in_queue: false,
            ipaddress_pool: null,
            is_active: false,
            manage_dns: false,
            name: '',
            ns: [],
            related_to: null
        },
        formSuccess: false
    });

    return {
        createDomain,
        deleteDomain,
        formArr,
        formErrors,
        formObj,
        formSuccess,
        getEdit,
        getSearch
    };
};