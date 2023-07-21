import { ComputedRef, UnwrapNestedRefs } from "vue";

interface UseCompanyMailInterface {
    choices: ComputedRef<Record<string, string>>;
    createMail: (values: Record<string, unknown>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void
    }) => Promise<void>;
    deleteMail: (values: { id: string; }) => Promise<boolean>;
    formArr: ComputedRef<string[]>;
    formErrors: ComputedRef<Record<string, unknown>>;
    formObj: ComputedRef<{
        choices: Record<string, unknown>;
        formArr: string[];
        formErrors: Record<string, unknown>;
        formObj: Record<string, unknown>;
        formSuccess: boolean;
    }>;
    formSuccess: ComputedRef<boolean>;
    getChoices: () => Promise<void>;
    getProfile: (domain_id: string, mail_id: string) => Promise<void>;
    getSearch: (domain_id: string) => Promise<void>;
    updatePassword: (values: Record<string, string>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void
    }) => Promise<void>;
    updateProfile: (values: Record<string, string>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void
    }) => Promise<void>;
}

export const useCompanyMail = (): UseCompanyMailInterface => {
    const { loadingState } = usePageLoading();

    const { $event } = useNuxtApp();

    const router = useRouter();

    const { selectionClear } = useSearchGrid();

    const choices = computed(() => {
        return localCompanyMail.choices;
    });

    const createMail = async (values: Record<string, unknown>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void;
    }) => {
        loadingState.isActive = true;

        const { doProcess, processorErrors, processorSuccess } = await useProcessor();

        await doProcess('admin/company/mail/create', 'POST', values);

        if (!processorSuccess.value) {
            actions.setErrors(processorErrors.value);
        } else {
            // @ts-ignore
            $event('alert', {
                display: processorSuccess.value,
                message: 'Mail account has been created.',
                type: 'success'
            });

            await router.push({ path: `/company/mail/${values['domain']}` });
        }

        loadingState.isActive = false;
    };

    const deleteMail = async (values: { id: string; }) => {
        loadingState.isActive = true;

        const { doProcess, processorErrors, processorSuccess } = await useProcessor();

        await doProcess(`admin/company/mail/delete/${values['id']}`, 'DELETE', null);

        if (!processorSuccess.value) {
            localCompanyMail.formErrors = processorErrors.value;
        } else {
            localCompanyMail.formArr = localCompanyMail.formArr.filter((item: {
                [x: string]: string;
            }) => item['id'] !== values['id']);

            selectionClear();

            localCompanyMail.formSuccess = true;
        }

        loadingState.isActive = false;

        return processorSuccess.value;
    };

    const formArr = computed(() => {
        return localCompanyMail.formArr;
    });

    const formErrors = computed(() => {
        return localCompanyMail.formErrors;
    });

    const formObj = computed(() => {
        return localCompanyMail.formObj;
    });

    const formSuccess = computed(() => {
        return localCompanyMail.formSuccess;
    });

    const getChoices = async () => {
        const { doProcess, processorObj } = await useProcessor();

        await doProcess('admin/company/mail/choices', 'GET', null);

        localCompanyMail.choices = processorObj.value;
    };

    const getProfile = async (domain_id: string, mail_id: string) => {
        loadingState.isActive = true;

        const { doProcess, processorObj } = await useProcessor();

        await doProcess(`admin/company/mail/profile/${domain_id}/${mail_id}`, 'GET', null);

        localCompanyMail.formObj = processorObj.value;

        loadingState.isActive = false;
    };

    const getSearch = async (domain_id: string) => {
        loadingState.isActive = true;

        const { doProcess, processorArr } = await useProcessor();

        await doProcess(`admin/company/mail/search/${domain_id}`, 'GET', null);

        localCompanyMail.formArr = processorArr.value;

        loadingState.isActive = false;
    };

    const updatePassword = async (values: Record<string, string>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void;
    }) => {
        loadingState.isActive = true;

        const { doProcess, processorErrors, processorSuccess } = await useProcessor();

        await doProcess(`admin/company/mail/password/${values['id']}`, 'PATCH', values);

        if (!processorSuccess.value) {
            actions.setErrors(processorErrors.value);
        } else {
            // @ts-ignore
            $event('alert', {
                display: processorSuccess.value,
                message: 'Password has been updated.',
                type: 'success'
            });

            await router.push({ path: `/company/mail/${values['id']}` });
        }

        loadingState.isActive = false;
    };

    const updateProfile = async (values: Record<string, string>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void;
    }) => {
        loadingState.isActive = true;

        const { doProcess, processorErrors, processorSuccess } = await useProcessor();

        await doProcess(`admin/company/mail/profile/${values['domain']}/${values['id']}`, 'PATCH', values);

        if (!processorSuccess.value) {
            actions.setErrors(processorErrors.value);
        } else {
            // @ts-ignore
            $event('alert', {
                display: processorSuccess.value,
                message: 'Profile has been updated.',
                type: 'success'
            });

            await router.push({ path: `/company/mail/${values['id']}` });
        }

        loadingState.isActive = false;
    };

    const localCompanyMail: UnwrapNestedRefs<any> = reactive({
        choices: {},
        formArr: [],
        formErrors: {},
        formObj: {},
        formSuccess: false
    });

    return {
        choices,
        createMail,
        deleteMail,
        formArr,
        formErrors,
        formObj,
        formSuccess,
        getChoices,
        getProfile,
        getSearch,
        updatePassword,
        updateProfile
    };
};