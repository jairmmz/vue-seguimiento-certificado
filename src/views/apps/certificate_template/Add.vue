<template>
    <ul class="flex space-x-2 pb-4 rtl:space-x-reverse">
        <li>
            <router-link :to="{ name: 'certificate-templates-index' }" class="text-primary hover:underline">Plantilla de Certificado</router-link>
        </li>
        <li class="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
            <span>Añadir</span>
        </li>
    </ul>
    <div class="panel p-5">
        <h1 class="font-semibold text-2xl border-b-2 mb-4">
            {{ certificateTemplateId ? 'Editar Plantilla de Certificado' : 'Crear Plantilla de Certificado' }}
            <span
                v-if="isLoadingFetch"
                class="animate-spin border-2 border-black dark:border-white border-l-transparent rounded-full w-5 h-5 ltr:mr-4 rtl:ml-4 inline-block align-middle"
            >
            </span>
        </h1>

        <form class="space-y-5" @submit.prevent="submitForm()">
            <div class="grid grid-cols-1 gap-5">
                <div :class="{ 'has-error': $v4.form.name.$error, 'has-success': isSubmitForm && !$v4.form.name.$error }">
                    <label for="customName">Título de la Plantilla de Certificado</label>
                    <input id="customName" type="text" class="form-input" v-model="form.name" />
                    <template v-if="isSubmitForm && !$v4.form.name.$error">
                        <p class="text-[#1abc9c] mt-1">¡Se ve bien!</p>
                    </template>
                    <template v-if="isSubmitForm && $v4.form.name.$error">
                        <p class="text-danger mt-1">Por favor ingrese nombre de la Plantilla de Certificado</p>
                    </template>
                </div>
                <div :class="{ 'has-error': $v4.form.template_file.$error, 'has-success': isSubmitForm && !$v4.form.template_file.$error }">
                    <label for="customTemplate_file">Archivo pdf de la Plantilla de Certificado</label>
                    <input id="customTemplate_file" type="file" class="form-input" accept=".pdf" @change="onFileChanged" />
                    <template v-if="isSubmitForm && !$v4.form.template_file.$error">
                        <p class="text-[#1abc9c] mt-1">¡Se ve bien!</p>
                    </template>
                    <template v-if="isSubmitForm && $v4.form.template_file.$error">
                        <p class="text-danger mt-1">Por favor ingrese el archivo .pdf</p>
                    </template>
                </div>

            </div>
            <div class="ltr:text-right rtl:text-left flex justify-start items-center mt-8">
                <router-link :to="{ name: 'certificate-templates-index' }" class="btn btn-outline-danger">Cancelar</router-link>
                <button type="submit" class="btn btn-primary ltr:ml-4 rtl:mr-4" :disabled="isLoadingSave">
                    <span
                        v-if="isLoadingSave"
                        class="animate-spin border-2 border-white border-l-transparent rounded-full w-5 h-5 ltr:mr-4 rtl:ml-4 inline-block align-middle"
                    >
                    </span>
                    <span>{{ isLoadingSave ? 'Guardando...' : 'Guardar' }}</span>
                </button>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
    import { useMeta } from '@/composables/use-meta';
    import { onMounted, ref } from 'vue';
    import { CertificateTemplate } from './types/certificate-template';
    import { useCreateCertificateTemplate } from './actions/createCertificateTemplate';
    import { storeToRefs } from 'pinia';
    import { useCertificateTemplateStore } from './store/certificate-template';
    import { useRoute } from 'vue-router';
    import { useGetCertificateTemplate } from './actions/getCertificateTemplate';
    import { useUpdateCertificateTemplate } from './actions/updateCertificateTemplate';
    import { useVuelidate } from '@vuelidate/core';
    import { required } from '@vuelidate/validators';

    useMeta({ title: 'Curso' });

    const { createCertificateTemplate } = useCreateCertificateTemplate();
    const { updateCertificateTemplate } = useUpdateCertificateTemplate();
    const { getCertificateTemplate, certificateTemplate, isLoadingFetch } = useGetCertificateTemplate();
    const { isLoadingSave } = storeToRefs(useCertificateTemplateStore());
    const route = useRoute();

    const certificateTemplateId = parseInt(route.params.id as string);
    const form = ref<CertificateTemplate>({} as CertificateTemplate);

    const isSubmitForm = ref(false);
    const rules = {
        form: {
            name: { required },
            template_file: { required },
        },
    };

    const $v4 = useVuelidate(rules, { form });

    const loadCertificateTemplateData = async (id: number) => {
        await getCertificateTemplate(id);
        if (certificateTemplate) {
            form.value = {
                id: certificateTemplate.value.id,
                name: certificateTemplate.value.name,
                template_file: certificateTemplate.value.template_file,
            };
        }
    };

    const onFileChanged = (event: any) => {
        const file = event.target.files[0];    
        form.value.template_file = file;
    }

    const submitForm = async () => {
        isSubmitForm.value = true;
        $v4.value.form.$touch();
        if ($v4.value.form.$invalid) {
            return false;
        }
        if (certificateTemplateId) {
            await updateCertificateTemplate(form.value);
            console.log('update', form.value);
            
        } else {
            await createCertificateTemplate(form.value);
            console.log('create', form.value);
        }
    };

    onMounted(() => {
        if (certificateTemplateId) {
            loadCertificateTemplateData(certificateTemplateId);
        }
    });
</script>

<style scoped></style>
