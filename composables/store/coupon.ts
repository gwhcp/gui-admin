import { ComputedRef, UnwrapNestedRefs } from "vue";

interface UseStoreCouponInterface {
    createCoupon: (values: Record<string, string>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void
    }) => Promise<void>;
    deleteCoupon: (values: { id: string; }) => Promise<boolean>;
    formArr: ComputedRef<string[]>;
    formErrors: ComputedRef<Record<string, unknown>>;
    formObj: ComputedRef<{
        amount: string;
        is_active: boolean;
        name: string;
    }>;
    formSuccess: ComputedRef<boolean>;
    getEdit: (coupon_id: string) => Promise<void>;
    getSearch: () => Promise<void>;
    updateCoupon: (values: Record<string, string>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void
    }) => Promise<void>;
}

export const useStoreCoupon = (): UseStoreCouponInterface => {
    const { loadingState } = usePageLoading();

    const { $event } = useNuxtApp();

    const router = useRouter();

    const { selectionClear } = useSearchGrid();

    const createCoupon = async (values: Record<string, string>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void;
    }) => {
        loadingState.isActive = true;

        const { doProcess, processorErrors, processorSuccess } = await useProcessor();

        await doProcess('admin/store/coupon/create', 'POST', values);

        if (!processorSuccess.value) {
            actions.setErrors(processorErrors.value);
        } else {
            // @ts-ignore
            $event('alert', {
                display: processorSuccess.value,
                message: 'Coupon has been created.',
                type: 'success'
            });

            await router.push({ path: '/store/coupon' });
        }

        loadingState.isActive = false;
    };

    const deleteCoupon = async (values: { id: string; }) => {
        loadingState.isActive = true;

        const { doProcess, processorErrors, processorSuccess } = await useProcessor();

        await doProcess(`admin/store/coupon/${values['id']}/delete`, 'DELETE', null);

        if (!processorSuccess.value) {
            localStoreCoupon.formErrors = processorErrors.value;
        } else {
            localStoreCoupon.formArr = localStoreCoupon.formArr.filter((item: {
                [x: string]: string;
            }) => item['id'] !== values['id']);

            selectionClear();

            localStoreCoupon.formSuccess = true;
        }

        loadingState.isActive = false;

        return processorSuccess.value;
    };

    const formArr = computed(() => {
        return localStoreCoupon.formArr;
    });

    const formErrors = computed(() => {
        return localStoreCoupon.formErrors;
    });

    const formObj = computed(() => {
        return localStoreCoupon.formObj;
    });

    const formSuccess = computed(() => {
        return localStoreCoupon.formSuccess;
    });

    const getEdit = async (coupon_id: string) => {
        loadingState.isActive = true;

        const { doProcess, processorObj } = await useProcessor();

        await doProcess(`admin/store/coupon/${coupon_id}/edit`, 'GET', null);

        localStoreCoupon.formObj = processorObj.value;

        loadingState.isActive = false;
    };

    const getSearch = async () => {
        loadingState.isActive = true;

        const { doProcess, processorArr } = await useProcessor();

        await doProcess('admin/store/coupon/search', 'GET', null);

        localStoreCoupon.formArr = processorArr.value

        loadingState.isActive = false;
    };

    const localStoreCoupon: UnwrapNestedRefs<any> = reactive({
        formArr: [],
        formErrors: {},
        formObj: {
            amount: '0.00',
            is_active: false,
            name: ''
        },
        formSuccess: false
    });

    const updateCoupon = async (values: Record<string, string>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void;
    }) => {
        loadingState.isActive = true;

        const { doProcess, processorErrors, processorSuccess } = await useProcessor();

        await doProcess(`admin/store/coupon/${values['coupon']}/edit`, 'PATCH', values);

        if (!processorSuccess.value) {
            actions.setErrors(processorErrors.value);
        } else {
            // @ts-ignore
            $event('alert', {
                display: processorSuccess.value,
                message: 'Coupon has been updated.',
                type: 'success'
            });

            await router.push({ path: '/store/coupon' });
        }

        loadingState.isActive = false;
    };

    return {
        createCoupon,
        deleteCoupon,
        formArr,
        formErrors,
        formObj,
        formSuccess,
        getEdit,
        getSearch,
        updateCoupon
    };
};