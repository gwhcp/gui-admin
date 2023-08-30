import { ComputedRef, UnwrapNestedRefs } from "vue";

interface UseSettingBannedInterface {
    choices: ComputedRef<Record<string, string>>;
    createBanned: (values: Record<string, unknown>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void
    }) => Promise<void>;
    deleteBanned: (values: { id: string; }) => Promise<boolean>;
    formArr: ComputedRef<string[]>;
    formErrors: ComputedRef<Record<string, unknown>>;
    formObj: ComputedRef<{
        banned_type: string;
        banned_type_name: string;
        date_from: string;
        name: string;
        status: string;
    }>;
    formSuccess: ComputedRef<boolean>;
    getChoices: () => Promise<void>;
    getSearch: () => Promise<void>;
}

export const useSettingBanned = (): UseSettingBannedInterface => {
    const { loadingState } = usePageLoading();

    const { $event } = useNuxtApp();

    const router = useRouter();

    const { selectionClear } = useSearchGrid();

    const choices = computed(() => {
        return localSettingBanned.choices;
    });

    const createBanned = async (values: Record<string, unknown>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void;
    }) => {
        loadingState.isActive = true;

        const { doProcess, processorErrors, processorSuccess } = await useProcessor();

        await doProcess('admin/setting/banned/create', 'POST', values);

        if (!processorSuccess.value) {
            actions.setErrors(processorErrors.value);
        } else {
            // @ts-ignore
            $event('alert', {
                display: processorSuccess.value,
                message: 'Banned item has been created.',
                type: 'success'
            });

            await router.push({ path: '/setting/banned' });
        }

        loadingState.isActive = false;
    };

    const deleteBanned = async (values: { id: string; }) => {
        loadingState.isActive = true;

        const { doProcess, processorErrors, processorSuccess } = await useProcessor();

        await doProcess(`admin/setting/banned/${values['id']}/delete`, 'DELETE', null);

        if (!processorSuccess.value) {
            localSettingBanned.formErrors = processorErrors.value;
        } else {
            localSettingBanned.formArr = localSettingBanned.formArr.filter((item: {
                [x: string]: string;
            }) => item['id'] !== values['id']);

            selectionClear();

            localSettingBanned.formSuccess = true;
        }

        loadingState.isActive = false;

        return processorSuccess.value;
    };

    const formArr = computed(() => {
        return localSettingBanned.formArr;
    });

    const formErrors = computed(() => {
        return localSettingBanned.formErrors;
    });

    const formObj = computed(() => {
        return localSettingBanned.formObj;
    });

    const formSuccess = computed(() => {
        return localSettingBanned.formSuccess;
    });

    const getChoices = async () => {
        const { doProcess, processorObj } = await useProcessor();

        await doProcess('admin/setting/banned/choices', 'GET', null);

        localSettingBanned.choices = processorObj.value;
    };

    const getSearch = async () => {
        loadingState.isActive = true;

        const { doProcess, processorArr } = await useProcessor();

        await doProcess('admin/setting/banned/search', 'GET', null);

        localSettingBanned.formArr = processorArr.value;

        loadingState.isActive = false;
    };

    const localSettingBanned: UnwrapNestedRefs<any> = reactive({
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

    return {
        choices,
        createBanned,
        deleteBanned,
        formArr,
        formErrors,
        formObj,
        formSuccess,
        getChoices,
        getSearch
    };
};