<script lang="ts"
        setup>
import { boolean, object, string } from "yup";

const { hasAccess, hasPermForm } = useAuthorization();

const { choices, createHardware, formObj, getChoices } = useHardwareClient();

const route = useRoute();

const disable_domain = ref(false);

const has_domain = ref(false);

const has_mail = ref(false);

const has_mysql = ref(false);

const has_postgresql = ref(false);

const schema = object({
    domain: string().required(),
    hardware_type: string().required(),
    ip: string().required(),
    is_domain: boolean(),
    is_mail: boolean(),
    is_mysql: boolean(),
    is_postgresql: boolean(),
    target_type: string().required()
});

definePageMeta({
    description: 'Create Client Hardware',
    title: 'Create Client Hardware'
});

onMounted(() => {
    getChoices();

    hasAccess('admin_hardware_client.view_server');

    hasPermForm('admin_hardware_client.add_server');
});

useHead({
    title: `${route.meta['title']}`
});

const checkedQuerySelector = (parent: Element | Document, selector: string): Element => {
    const el = parent.querySelector(selector);

    if (!el) {
        throw new Error(`Selector ${selector} didn't match any elements.`);
    }

    return el;
};

const hardwareChange = (value: string) => {
    const options = (checkedQuerySelector(document, '#target_type') as HTMLSelectElement).options;

    const target_type = document.getElementById('target_type') as Element;

    switch (value) {
        case 'dedicated':
            (checkedQuerySelector(target_type, 'option[value="domain"]') as HTMLSelectElement).style.display = "block";
            (checkedQuerySelector(target_type, 'option[value="mail"]') as HTMLSelectElement).style.display = "block";
            (checkedQuerySelector(target_type, 'option[value="mysql"]') as HTMLSelectElement).style.display = "block";
            (checkedQuerySelector(target_type, 'option[value="postgresql"]') as HTMLSelectElement).style.display = "block";
            (checkedQuerySelector(target_type, 'option[value="managed"]') as HTMLSelectElement).style.display = "none";
            (checkedQuerySelector(target_type, 'option[value="unmanaged"]') as HTMLSelectElement).style.display = "none";

            formObj.value['target_type'] = 'domain';
            formObj.value['is_domain'] = true;
            has_domain.value = true;
            disable_domain.value = true;

            has_mail.value = false;
            has_mysql.value = false;
            has_postgresql.value = false;

            break;

        case 'private':
            (checkedQuerySelector(target_type, 'option[value="domain"]') as HTMLSelectElement).style.display = "none";
            (checkedQuerySelector(target_type, 'option[value="mail"]') as HTMLSelectElement).style.display = "none";
            (checkedQuerySelector(target_type, 'option[value="mysql"]') as HTMLSelectElement).style.display = "none";
            (checkedQuerySelector(target_type, 'option[value="postgresql"]') as HTMLSelectElement).style.display = "none";
            (checkedQuerySelector(target_type, 'option[value="managed"]') as HTMLSelectElement).style.display = "block";
            (checkedQuerySelector(target_type, 'option[value="unmanaged"]') as HTMLSelectElement).style.display = "block";

            formObj.value['target_type'] = 'managed';

            has_domain.value = false;
            has_mail.value = false;
            has_mysql.value = false;
            has_postgresql.value = false;
            disable_domain.value = false;

            break;

        default:
            Array.from(options).forEach((option_element) => {
                option_element.style.display = "none";
            });
    }
};

const targetChange = (value: string) => {
    switch (value) {
        case 'domain':
            formObj.value['is_domain'] = true;
            has_domain.value = true;
            disable_domain.value = true;

            break;

        case 'mail':
        case 'mysql':
        case 'postgresql':
            formObj.value['is_domain'] = false;
            has_domain.value = false;

            break;

        case 'managed':
            has_domain.value = false;
            has_mail.value = false;
            has_mysql.value = false;
            has_postgresql.value = false;

            break;

        case 'unmanaged':
            has_domain.value = true;
            has_mail.value = true;
            has_mysql.value = true;
            has_postgresql.value = true;

            break;
    }
};
</script>

<template>
    <NavButtonHardwareClient/>

    <Form :validation-schema="schema"
          @submit="createHardware">
        <div class="row mb-3">
            <div class="col">
                <div class="border rounded p-3">
                    <FormSelect v-model="formObj['domain']"
                                :options="choices['domain']"
                                :required="true"
                                label="Domain"
                                name="domain"/>

                    <FormText v-model="formObj['ip']"
                              :required="true"
                              label="IP Address"
                              name="ip"/>

                    <FormSelect v-model="formObj['hardware_type']"
                                :options="choices['hardware_type']"
                                :required="true"
                                label="Hardware"
                                name="hardware_type"
                                @input="hardwareChange(formObj['hardware_type'])"/>

                    <FormSelect v-model="formObj['target_type']"
                                :options="choices['hardware_target']"
                                :required="true"
                                label="Target"
                                name="target_type"
                                @input="targetChange(formObj['target_type'])"/>

                    <FormSwitch v-if="has_domain"
                                v-model="formObj['is_domain']"
                                :disabled="disable_domain"
                                label="Domain"
                                name="is_domain"/>

                    <FormSwitch v-if="has_mail"
                                v-model="formObj['is_mail']"
                                label="Mail"
                                name="is_mail"/>

                    <FormSwitch v-if="has_mysql"
                                v-model="formObj['is_mysql']"
                                label="MySQL"
                                name="is_mysql"/>

                    <FormSwitch v-if="has_postgresql"
                                v-model="formObj['is_postgresql']"
                                label="PostgreSQL"
                                name="is_postgresql"/>

                    <button class="btn btn-outline-success px-4"
                            type="submit">
                        Create
                    </button>
                </div>
            </div>
        </div>
    </Form>
</template>

<style scoped>

</style>