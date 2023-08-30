import { ComputedRef, UnwrapNestedRefs } from "vue";

interface UseStoreHostingDomainInterface {
    choices: ComputedRef<Record<string, string>>;
    createProduct: (values: Record<string, unknown>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void
    }) => Promise<void>;
    deleteProduct: (values: { id: string; }) => Promise<boolean>;
    formArr: ComputedRef<string[]>;
    formErrors: ComputedRef<Record<string, unknown>>;
    formObj: ComputedRef<{
        bandwidth: number;
        cron_tab: number;
        date_from: string;
        diskspace: number;
        domain: number;
        ftp_user: number;
        hardware_type: string;
        hardware_type_name: string;
        has_cron: boolean;
        has_domain: boolean;
        has_mail: boolean;
        has_mysql: boolean;
        has_postgresql: boolean;
        ipaddress: number;
        ipaddress_type: string;
        is_active: boolean;
        is_managed: boolean;
        mail_account: number;
        mail_list: number;
        mysql_database: number;
        mysql_user: number;
        name: string;
        postgresql_database: number;
        postgresql_user: number;
        product_type: string;
        product_type_name: string;
        sub_domain: number;
    }>;
    formSuccess: ComputedRef<boolean>;
    getChoices: () => Promise<void>;
    getEdit: (product_id: string) => Promise<void>;
    getResource: (product_id: string) => Promise<void>;
    getSearch: () => Promise<void>;
    updateProfile: (values: Record<string, string>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void
    }) => Promise<void>;
    updateResource: (values: Record<string, string>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void
    }) => Promise<void>;
}

export const useStoreHostingDomain = (): UseStoreHostingDomainInterface => {
    const { loadingState } = usePageLoading();

    const { $event } = useNuxtApp();

    const router = useRouter();

    const { selectionClear } = useSearchGrid();

    const choices = computed(() => {
        return localStoreHostingDomain.choices;
    });

    const createProduct = async (values: Record<string, unknown>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void;
    }) => {
        loadingState.isActive = true;

        const { doProcess, processorErrors, processorSuccess } = await useProcessor();

        await doProcess('admin/store/product/domain/create', 'POST', values);

        if (!processorSuccess.value) {
            actions.setErrors(processorErrors.value);
        } else {
            // @ts-ignore
            $event('alert', {
                display: processorSuccess.value,
                message: 'Hosting product has been created.',
                type: 'success'
            });

            await router.push({ path: '/store/product/hosting/domain' });
        }

        loadingState.isActive = false;
    };

    const deleteProduct = async (values: { id: string; }) => {
        loadingState.isActive = true;

        const { doProcess, processorErrors, processorSuccess } = await useProcessor();

        await doProcess(`admin/store/product/domain/${values['id']}/delete`, 'DELETE', null);

        if (!processorSuccess.value) {
            localStoreHostingDomain.formErrors = processorErrors.value;
        } else {
            localStoreHostingDomain.formArr = localStoreHostingDomain.formArr.filter((item: {
                [x: string]: string;
            }) => item['id'] !== values['id']);

            selectionClear();

            localStoreHostingDomain.formSuccess = true;
        }

        loadingState.isActive = false;

        return processorSuccess.value;
    };

    const formArr = computed(() => {
        return localStoreHostingDomain.formArr;
    });

    const formErrors = computed(() => {
        return localStoreHostingDomain.formErrors;
    });

    const formObj = computed(() => {
        return localStoreHostingDomain.formObj;
    });

    const formSuccess = computed(() => {
        return localStoreHostingDomain.formSuccess;
    });

    const getChoices = async () => {
        const { doProcess, processorObj } = await useProcessor();

        await doProcess('admin/store/product/choices', 'GET', null);

        localStoreHostingDomain.choices = processorObj.value;
    };

    const getEdit = async (product_id: string) => {
        loadingState.isActive = true;

        const { doProcess, processorObj } = await useProcessor();

        await doProcess(`admin/store/product/domain/${product_id}/edit`, 'GET', null);

        localStoreHostingDomain.formObj = processorObj.value;

        loadingState.isActive = false;
    };

    const getResource = async (product_id: string) => {
        loadingState.isActive = true;

        const { doProcess, processorObj } = await useProcessor();

        await doProcess(`admin/store/product/domain/${product_id}/resource`, 'GET', null);

        localStoreHostingDomain.formObj = processorObj.value;

        loadingState.isActive = false;
    };

    const getSearch = async () => {
        loadingState.isActive = true;

        const { doProcess, processorArr } = await useProcessor();

        await doProcess('admin/store/product/domain/search', 'GET', null);

        localStoreHostingDomain.formArr = processorArr.value;

        loadingState.isActive = false;
    };

    const localStoreHostingDomain: UnwrapNestedRefs<any> = reactive({
        choices: {},
        formArr: [],
        formErrors: {},
        formObj: {
            bandwidth: 0,
            cron_tab: 0,
            date_from: '',
            diskspace: 0,
            domain: 0,
            ftp_user: 0,
            hardware_type: '',
            hardware_type_name: '',
            has_cron: false,
            has_domain: false,
            has_mail: false,
            has_mysql: false,
            has_postgresql: false,
            ipaddress: 0,
            ipaddress_type: '',
            is_active: false,
            is_managed: false,
            mail_account: 0,
            mail_list: 0,
            mysql_database: 0,
            mysql_user: 0,
            name: '',
            postgresql_database: 0,
            postgresql_user: 0,
            product_type: '',
            product_type_name: '',
            sub_domain: 0
        },
        formSuccess: false
    });

    const updateProfile = async (values: Record<string, string>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void;
    }) => {
        loadingState.isActive = true;

        const { doProcess, processorErrors, processorSuccess } = await useProcessor();

        await doProcess(`admin/store/product/domain/${values['product']}/edit`, 'PATCH', values);

        if (!processorSuccess.value) {
            actions.setErrors(processorErrors.value);
        } else {
            // @ts-ignore
            $event('alert', {
                display: processorSuccess.value,
                message: 'Hosting product has been updated.',
                type: 'success'
            });

            await router.push({ path: '/store/product/hosting/domain' });
        }

        loadingState.isActive = false;
    };

    const updateResource = async (values: Record<string, string>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void;
    }) => {
        loadingState.isActive = true;

        const { doProcess, processorErrors, processorSuccess } = await useProcessor();

        await doProcess(`admin/store/product/domain/${values['product']}/resource`, 'PATCH', values);

        if (!processorSuccess.value) {
            actions.setErrors(processorErrors.value);
        } else {
            // @ts-ignore
            $event('alert', {
                display: processorSuccess.value,
                message: 'Hosting resources have been updated.',
                type: 'success'
            });

            await router.push({ path: '/store/product/hosting/domain' });
        }

        loadingState.isActive = false;
    };

    return {
        choices,
        createProduct,
        deleteProduct,
        formArr,
        formErrors,
        formObj,
        formSuccess,
        getChoices,
        getEdit,
        getResource,
        getSearch,
        updateProfile,
        updateResource
    };
};