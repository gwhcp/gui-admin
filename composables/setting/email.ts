import { ComputedRef, UnwrapNestedRefs } from "vue";

interface UseSettingEmailInterface {
    choices: ComputedRef<Record<string, string>>;
    createEmail: (values: Record<string, unknown>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void
    }) => Promise<void>;
    deleteEmail: (values: { id: string; }) => Promise<boolean>;
    formArr: ComputedRef<string[]>;
    formErrors: ComputedRef<Record<string, unknown>>;
    formObj: ComputedRef<{
        body: string;
        date_from: string;
        sender: string;
        subject: string;
        template: string;
        template_name: string;
    }>;
    formSuccess: ComputedRef<boolean>;
    getChoices: () => Promise<void>;
    getProfile: (id: string) => Promise<void>;
    getSearch: () => Promise<void>;
    updateProfile: (values: Record<string, string>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void
    }) => Promise<void>;
}

export const useSettingEmail = (): UseSettingEmailInterface => {
    const { loadingState } = usePageLoading();

    const { $event } = useNuxtApp();

    const router = useRouter();

    const { selectionClear } = useSearchGrid();

    const choices = computed(() => {
        return localSettingEmail.choices;
    });

    const createEmail = async (values: Record<string, unknown>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void;
    }) => {
        loadingState.isActive = true;

        const { doProcess, processorErrors, processorSuccess } = await useProcessor();

        await doProcess('admin/setting/email/create', 'POST', values);

        if (!processorSuccess.value) {
            actions.setErrors(processorErrors.value);
        } else {
            // @ts-ignore
            $event('alert', {
                display: processorSuccess.value,
                message: 'Email template has been created.',
                type: 'success'
            });

            await router.push({ path: '/setting/email' });
        }

        loadingState.isActive = false;
    };

    const deleteEmail = async (values: { id: string; }) => {
        loadingState.isActive = true;

        const { doProcess, processorErrors, processorSuccess } = await useProcessor();

        await doProcess(`admin/setting/email/delete/${values['id']}`, 'DELETE', null);

        if (!processorSuccess.value) {
            localSettingEmail.formErrors = processorErrors.value;
        } else {
            localSettingEmail.formArr = localSettingEmail.formArr.filter((item: {
                [x: string]: string;
            }) => item['id'] !== values['id']);

            selectionClear();

            localSettingEmail.formSuccess = true;
        }

        loadingState.isActive = false;

        return processorSuccess.value;
    };

    const formArr = computed(() => {
        return localSettingEmail.formArr;
    });

    const formErrors = computed(() => {
        return localSettingEmail.formErrors;
    });

    const formObj = computed(() => {
        return localSettingEmail.formObj;
    });

    const formSuccess = computed(() => {
        return localSettingEmail.formSuccess;
    });

    const getChoices = async () => {
        const { doProcess, processorObj } = await useProcessor();

        await doProcess('admin/setting/email/choices', 'GET', null);

        localSettingEmail.choices = processorObj.value;
    };

    const getProfile = async (id: string) => {
        loadingState.isActive = true;

        const { doProcess, processorObj } = await useProcessor();

        await doProcess(`admin/setting/email/profile/${id}`, 'GET', null);

        localSettingEmail.formObj = processorObj.value;

        loadingState.isActive = false;
    };

    const getSearch = async () => {
        loadingState.isActive = true;

        const { doProcess, processorArr } = await useProcessor();

        await doProcess('admin/setting/email/search', 'GET', null);

        localSettingEmail.formArr = processorArr.value;

        loadingState.isActive = false;
    };

    const localSettingEmail: UnwrapNestedRefs<any> = reactive({
        choices: {},
        formArr: [],
        formErrors: {},
        formObj: {
            banned_type: '',
            banned_type_name: '',
            date_from: '',
            name: '',
            status: ''
        },
        formSuccess: false
    });

    const updateProfile = async (values: Record<string, string>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void;
    }) => {
        loadingState.isActive = true;

        const { doProcess, processorErrors, processorSuccess } = await useProcessor();

        await doProcess(`admin/setting/email/profile/${values['email']}`, 'PATCH', values);

        if (!processorSuccess.value) {
            actions.setErrors(processorErrors.value);
        } else {
            // @ts-ignore
            $event('alert', {
                display: processorSuccess.value,
                message: 'Email template has been updated.',
                type: 'success'
            });

            await router.push({ path: '/setting/email' });
        }

        loadingState.isActive = false;
    };

    return {
        choices,
        createEmail,
        deleteEmail,
        formArr,
        formErrors,
        formObj,
        formSuccess,
        getChoices,
        getProfile,
        getSearch,
        updateProfile
    };
};