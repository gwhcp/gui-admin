interface UseUtilsInterface {
    convertDateTime: (val: string) => string;
    getApiTitle: () => string;
    getApiUrl: () => string;
    getGuiUrl: () => string;
}

export const useUtils = (): UseUtilsInterface => {
    const { data: auth } = useAuth();

    const runtimeConfig = useRuntimeConfig();

    const convertDateTime = (val: string) => {
        const dayjs = useDayjs();

        // @ts-ignore
        if (auth.value['time_format'] === 12) {
            // @ts-ignore
            return dayjs(val).tz(auth.value['time_zone']).format('YYYY-MM-DD h:mm:ss A')
        } else {
            // @ts-ignore
            return dayjs(val).tz(auth.value['time_zone']).format('YYYY-MM-DD H:mm:ss')
        }
    }

    const getApiTitle = () => {
        return runtimeConfig.public['api_title'];
    }

    const getApiUrl = () => {
        return runtimeConfig.public['api_url'];
    }

    const getGuiUrl = () => {
        return runtimeConfig.public['gui_url'];
    }

    return {
        convertDateTime,
        getApiTitle,
        getApiUrl,
        getGuiUrl
    };
};