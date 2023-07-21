import { ComputedRef, UnwrapNestedRefs } from "vue";

interface UseNetworkQueueInterface {
    formArr: ComputedRef<string[]>;
    formErrors: ComputedRef<Record<string, unknown>>;
    formObj: ComputedRef<{
        queue_status: string;
    }>;
    formSuccess: ComputedRef<boolean>;
    getProfile: (id: string) => Promise<void>;
    getSearch: () => Promise<void>;
    retryQueue: (id: string) => Promise<void>;
}

export const useNetworkQueue = (): UseNetworkQueueInterface => {
    const { loadingState } = usePageLoading();

    const router = useRouter();

    const formArr = computed(() => {
        return localNetworkQueue.formArr;
    });

    const formErrors = computed(() => {
        return localNetworkQueue.formErrors;
    });

    const formObj = computed(() => {
        return localNetworkQueue.formObj;
    });

    const formSuccess = computed(() => {
        return localNetworkQueue.formSuccess;
    });

    const getProfile = async (id: string) => {
        loadingState.isActive = true;

        const { doProcess, processorObj } = await useProcessor();

        await doProcess(`admin/network/queue/profile/${id}`, 'GET', null);

        localNetworkQueue.formArr = processorObj.value['queue_items'];

        localNetworkQueue.formObj = processorObj.value['queue_status'];

        loadingState.isActive = false;
    };

    const getSearch = async () => {
        loadingState.isActive = true;

        const { doProcess, processorArr } = await useProcessor();

        await doProcess('admin/network/queue/search', 'GET', null);

        localNetworkQueue.formArr = processorArr.value;

        loadingState.isActive = false;
    };

    const localNetworkQueue: UnwrapNestedRefs<any> = reactive({
        formArr: [],
        formObj: {
            queue_status: ''
        }
    });

    const retryQueue = async (id: string) => {
        loadingState.isActive = true;

        const { doProcess, processorErrors, processorSuccess } = await useProcessor();

        await doProcess('admin/network/queue/retry', 'PATCH', { queue_status: id });

        if (!processorSuccess.value) {
            localNetworkQueue.formErrors = processorErrors.value;
        } else {
            // @ts-ignore
            $event('alert', {
                display: processorSuccess.value,
                message: 'Queue has been updated.',
                type: 'success'
            });

            await router.push({ path: '/network/queue' });
        }

        loadingState.isActive = false;
    };

    return {
        formArr,
        formErrors,
        formObj,
        formSuccess,
        getProfile,
        getSearch,
        retryQueue
    };
};