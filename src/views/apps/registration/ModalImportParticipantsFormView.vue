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
                                <h3 class="text-lg font-semibold text-center">
                                    Importar participantes (Formato .csv)
                                </h3>
                                <hr>
                            </div>
                            <form @submit.prevent="submitForm()" class="mt-5">
                                <div class="flex flex-row justify-center items-end container px-5 my-5">
                                    <div class="flex flex-col w-full">
                                        <div class="mb-4" for="customCertificateFile">
                                            <span>Subir archivo .CSV | </span>
                                            <a class="cursor-pointer text-blue-600" href="/assets/files/participantes_ejemplo.csv">Descargar archivo de ejemplo participantes_ejemplo.csv</a>
                                        </div>
                                        <div class="flex w-full">
                                            <input type="file" id="customTemplate_file" accept=".csv" class="form-input"
                                                @change="onFileChanged" />
                                            <div class="flex">
                                                <button type="submit" class="btn btn-primary ltr:ml-4 rtl:mr-4"
                                                    :disabled="isLoadingSaveImportParticipant">
                                                    <span v-if="isLoadingSaveImportParticipant"
                                                        class="animate-spin border-2 border-white border-l-transparent rounded-full w-5 h-5 ltr:mr-4 rtl:ml-4 inline-block align-middle">
                                                    </span>
                                                    <span>{{ isLoadingSaveImportParticipant ? 'Guardando...' : 'Guardar'
                                                    }}</span>
                                                </button>
                                            </div>
                                        </div>
                                        <template v-if="isSubmitForm && $v4.form.file.$error">
                                            <p class="text-danger mt-1">Por favor suba un archivo en formato .csv
                                            </p>
                                        </template>
                                    </div>
                                </div>
                            </form>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogOverlay } from '@headlessui/vue';
import IconX from '@/components/icon/icon-x.vue';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { useImportParticipantRegistration } from './actions/importParticipantsRegistration';
import { ImportParticipants } from './types/import';
import { useRoute } from 'vue-router';

const addTaskModal = ref(false);
const route = useRoute();

const { importParticipantRegistration, isLoadingSaveImportParticipant } = useImportParticipantRegistration();

const props = defineProps<{
    isOpenModal: boolean;
}>();

const courseId = parseInt(route.params.id as string);

watch(
    () => props.isOpenModal,
    (value) => {
        addTaskModal.value = value;
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

const form = ref<ImportParticipants>({} as ImportParticipants);

const isSubmitForm = ref(false);
const rules = {
    form: {
        file: { required },
    },
};

const onFileChanged = (event: any) => {
    const file = event.target.files[0];
    form.value.file = file;
};

const $v4 = useVuelidate(rules, { form });

const submitForm = async () => {
    isSubmitForm.value = true;
    $v4.value.form.$touch();
    if ($v4.value.form.$invalid) {
        return false;
    }

    if (courseId) {
        await importParticipantRegistration(form.value, courseId);
    }
    resetModal();

    handleCloseModal();
};

const resetModal = () => {
    form.value = {} as ImportParticipants;
    isSubmitForm.value = false;
    $v4.value.form.$reset();
};
</script>

<style scoped></style>
