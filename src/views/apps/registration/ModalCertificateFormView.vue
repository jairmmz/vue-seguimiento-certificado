<template>
    <TransitionRoot appear :show="addTaskModal" as="template">
        <Dialog as="div" @close="handleCloseModal" class="relative z-[51]">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
                leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                <DialogOverlay class="fixed inset-0 bg-[black]/60" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex h-full items-start justify-center px-4 py-8">
                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95">
                        <DialogPanel
                            class="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-5xl text-black dark:text-white-dark">
                            <button type="button"
                                class="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                @click="handleCloseModal">
                                <icon-x />
                            </button>
                            <div class="pt-10">
                                <h3 class="text-lg font-semibold text-center">Certificado de {{ props.participantName }}
                                </h3>
                                <hr>
                            </div>
                            <form @submit.prevent="submitForm()" class="mt-5">
                                <div class="flex flex-row justify-center items-end container px-5">
                                    <div class="flex flex-col w-full">
                                        <div for="customCertificateFile">Subir certificado (PDF)</div>
                                        <div class="flex w-full">
                                            <input type="file" id="customTemplate_file" accept=".pdf" class="form-input"
                                                @change="onFileChanged" />
                                            <div class="flex">
                                                <button type="submit" class="btn btn-primary ltr:ml-4 rtl:mr-4"
                                                    :disabled="isLoadingSave">
                                                    <span v-if="isLoadingSave"
                                                        class="animate-spin border-2 border-white border-l-transparent rounded-full w-5 h-5 ltr:mr-4 rtl:ml-4 inline-block align-middle">
                                                    </span>
                                                    <span>{{ isLoadingSave ? 'Guardando...' : 'Guardar' }}</span>
                                                </button>

                                                <button v-if="loadCertificateExistsUrl" type="button"
                                                    class="btn btn-danger ltr:ml-4 rtl:mr-4"
                                                    @click="showAlertDeleteCertificate()">
                                                    {{ isLoadingFetchDeleteCertificate ? 'Eliminando...' : 'Eliminar' }}
                                                </button>
                                            </div>
                                        </div>
                                        <template v-if="isSubmitForm && $v4.form.certificate_file.$error">
                                            <p class="text-danger mt-1">Por favor suba un certificado en formato .pdf
                                            </p>
                                        </template>
                                    </div>
                                </div>
                            </form>
                            <div v-if="isLoadingFetchGetCertificate" class="flex justify-center items-center p-5">
                                <span class="text-gray-400 dark:text-gray-600">Cargando...</span>
                            </div>
                            <div v-else-if="certificate?.certificate_file_url" class="p-5 h-[600px]">
                                <div class="h-[600px]">
                                    <embed :src="certificate?.certificate_file_url" type="application/pdf" width="100%"
                                        height="100%" />
                                </div>
                            </div>
                            <div v-else class="flex justify-center items-center p-5">
                                <span class="text-gray-400 dark:text-gray-600">No se ha subido ningún certificado</span>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogOverlay } from '@headlessui/vue';
import IconX from '@/components/icon/icon-x.vue';
import { useCreateCertificate } from './actions/createCertificate';
import { storeToRefs } from 'pinia';
import { useCertificateStore } from './store/certificate';
import { useUpdateCertificate } from './actions/updateCertificate';
import { useGetCertificate } from './actions/getCertificate';
import { Certificate } from './types/certificate';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import Swal from 'sweetalert2';
import { useDeleteCertificate } from './actions/deleteCertificate';

const addTaskModal = ref(false);

const { getCertificate, certificate, isLoadingFetchGetCertificate } = useGetCertificate();
const { createCertificate } = useCreateCertificate();
const { updateCertificate } = useUpdateCertificate();
const { deleteCertificate, isLoadingFetchDeleteCertificate } = useDeleteCertificate();
const { isLoadingSave } = storeToRefs(useCertificateStore());

const props = defineProps<{
    isOpenModal: boolean;
    registrationId: number;
    participantName: string;
}>();

const registrationIdProps = computed(() => props.registrationId);

const loadCertificateExistsUrl = ref<boolean>(false);

const loadCertificate = async () => {
    loadCertificateExistsUrl.value = false;
    await getCertificate(registrationIdProps.value);
    if (certificate.value?.certificate_file_url) {
        loadCertificateExistsUrl.value = true;
    }
};

watch(
    () => props.isOpenModal,
    (value) => {
        addTaskModal.value = value;
    },
);

watch(
    () => addTaskModal.value,
    (value) => {
        if (value) {
            loadCertificate();
        }
    },
);

const handleCloseModal = () => {
    addTaskModal.value = false;
    resetModal();
    emit('closeModal');
};

const emit = defineEmits<{
    (event: 'closeModal'): void;
}>();

const form = ref<Certificate>({} as Certificate);

const isSubmitForm = ref(false);
const rules = {
    form: {
        certificate_file: { required },
    },
};

const onFileChanged = (event: any) => {
    const file = event.target.files[0];
    form.value.certificate_file = file;
};

const $v4 = useVuelidate(rules, { form });

const submitForm = async () => {
    isSubmitForm.value = true;
    $v4.value.form.$touch();
    if ($v4.value.form.$invalid) {
        return false;
    }

    form.value.registration_id = registrationIdProps.value;
    if (certificate.value?.id) {
        await updateCertificate(form.value, certificate.value.id);
    } else {
        await createCertificate(form.value);
    }

    resetModal();

    handleCloseModal();
};

const showAlertDeleteCertificate = async () => {
    Swal.fire({
        icon: 'warning',
        title: 'Estas seguro?',
        text: 'No podrás revertir esto!',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
        customClass: {
            popup: 'sweet-alerts',
        },
    }).then(async (result) => {
        if (result.value) {
            if (!certificate.value?.id) return null;
            await deleteCertificate(certificate.value?.id);
            resetModal();

            handleCloseModal();
            await loadCertificate();
        }
    });
};

const resetModal = () => {
    form.value = {} as Certificate;
    isSubmitForm.value = false;
    $v4.value.form.$reset();
};
</script>

<style scoped></style>
