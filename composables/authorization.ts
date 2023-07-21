interface useAuthorizationInterface {
    hasAccess: (permission: string) => void;
    hasPerm: (permission: string) => boolean;
    hasPermForm: (permission: string) => void;
    logout: () => void;
    submitLogin: (values: Record<string, unknown>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void
    }) => Promise<void>;
}

export const useAuthorization = (): useAuthorizationInterface => {
    const { loadingState } = usePageLoading();

    const { data: auth } = useAuth();

    const hasAccess = (permission: string) => {
        // @ts-ignore
        if (!auth.value['has_perm'].hasOwnProperty(permission)) {
            throw showError({ fatal: true, statusCode: 403 });
        }
    };

    const hasPerm = (permission: string) => {
        // @ts-ignore
        return auth.value['has_perm'].hasOwnProperty(permission);
    };

    const hasPermForm = (permission: string) => {
        const form = <HTMLFormElement>document.querySelector('form');

        // @ts-ignore
        if (!auth.value['has_perm'].hasOwnProperty(permission)) {
            Array.from(form.elements).forEach((input) => {
                input.setAttribute('disabled', 'true');
            });
        }
    };

    const logout = async () => {
        loadingState.isActive = true;

        const { signOut } = useAuth();

        await signOut({ callbackUrl: '/auth' });

        loadingState.isActive = false;
    };

    const submitLogin = async (values: Record<string, unknown>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void;
    }) => {
        loadingState.isActive = true;

        const { signIn } = useAuth();

        try {
            await signIn(values, { callbackUrl: '/' });
        } catch {
            actions.setErrors({ username: 'Are you sure?', password: 'I think not...' });
        }

        loadingState.isActive = false;
    }

    return {
        hasAccess,
        hasPerm,
        hasPermForm,
        logout,
        submitLogin
    };
};