<script lang="ts"
        setup>
const { $event } = useNuxtApp();

const props = defineProps({
    installFunction: {
        type: Function,
        required: true
    },
    messageAlert: {
        type: String,
        required: true
    },
    messageError: {
        type: String,
        required: false,
    },
    messageSuccess: {
        type: String,
        required: true
    },
    params: {
        type: Object,
        required: false
    },
    redirect: {
        type: String,
        required: true
    }
});

const router = useRouter();

const modalInstall = () => {
    const can_install = props.installFunction(props.params);

    const msg = can_install.then((result: boolean) => {
        return result;
    });

    msg.then((value: boolean) => {
        if (!value) {
            // @ts-ignore
            $event('alert', {
                display: true,
                message: (props.messageError) ? props.messageError[0] : '',
                type: 'danger'
            });
        } else {
            // @ts-ignore
            $event('alert', {
                display: true,
                message: props.messageSuccess,
                type: 'success'
            });

            router.push({ path: props.redirect });
        }
    });
};
</script>

<template>
    <button class="btn btn-success"
            data-bs-target="#installModal"
            data-bs-toggle="modal"
            type="button">
        <svg class="bi">
            <use xlink:href="#server"/>
        </svg>

        Install
    </button>

    <div id="installModal"
         aria-hidden="true"
         aria-labelledby="installModalLabel"
         class="modal fade"
         tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 id="installModalLabel"
                        class="modal-title">
                        <svg class="bi-warning text-danger">
                            <use xlink:href="#triange-exclamation"/>
                        </svg>

                        Warning
                    </h5>

                    <button aria-label="Close"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            type="button"/>
                </div>

                <div class="modal-body">
                    {{ messageAlert }}
                </div>

                <div class="modal-footer">
                    <button class="btn btn-secondary"
                            data-bs-dismiss="modal"
                            type="button">
                        <svg class="bi">
                            <use xlink:href="#square-xmark"/>
                        </svg>

                        Cancel
                    </button>

                    <button class="btn btn-success"
                            data-bs-dismiss="modal"
                            type="button"
                            @click="modalInstall">
                        <svg class="bi">
                            <use xlink:href="#server"/>
                        </svg>

                        Install
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.bi {
    display: inline-block;
    width: 1rem;
    height: 1rem;
}

.bi-warning {
    display: inline-block;
    width: 1.3rem;
    height: 1.3rem;
}
</style>