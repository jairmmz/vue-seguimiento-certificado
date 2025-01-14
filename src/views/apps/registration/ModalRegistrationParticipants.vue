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
                            <div class="pt-10 text-center">
                                <span v-if="isLoadingFetchGetCourse"
                                    class="animate-spin border-2 border-black dark:border-white border-l-transparent rounded-full w-5 h-5 ltr:mr-4 rtl:ml-4 inline-block align-middle">
                                </span>
                                <h3 v-else class="text-lg font-semibold text-center">{{ course.name }}</h3>
                            </div>
                            <hr />

                            <div class="p-2">
                                <h3 class="text-lg font-semibold">Lista de participantes inscritos</h3>
                            </div>

                            <!-- Crear una tabla para iterar participantsRegistrations -->
                            <div class="flex justify-center items-center">
                                <div v-if="isLoadingFetchRegistrationParticipants">Cargando...</div>
                                <table v-else class="my-2 min-w-full border border-gray-300 dark:border-gray-700">
                                    <thead>
                                        <tr class="bg-gray-100 dark:bg-gray-800">
                                            <th
                                                class="px-6 py-3 border-b border-gray-300 dark:border-gray-700 text-left text-xs font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
                                                ID
                                            </th>
                                            <th
                                                class="px-6 py-3 border-b border-gray-300 dark:border-gray-700 text-left text-xs font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
                                                Nombres
                                            </th>
                                            <th
                                                class="px-6 py-3 border-b border-gray-300 dark:border-gray-700 text-left text-xs font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
                                                Apellidos
                                            </th>
                                            <th
                                                class="px-6 py-3 border-b border-gray-300 dark:border-gray-700 text-left text-xs font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
                                                Identificación
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="participant in participantsRegistrations" :key="participant.id"
                                            class="bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700">
                                            <td
                                                class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-gray-100">
                                                {{ participant.id }}
                                            </td>
                                            <td
                                                class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-gray-100">
                                                {{ participant.participant_name }}
                                            </td>
                                            <td
                                                class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-gray-100">
                                                {{ participant.participant_last_name }}
                                            </td>
                                            <td
                                                class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-gray-100">
                                                {{ participant.participant_identification }}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
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
import { useGetRegistrationParticipantsByCourse } from './actions/getRegistrationParticipantsByCourse';
import { useGetCourse } from '../course/actions/getCourse';

const addTaskModal = ref(false);

const { getRegistrationParticipantsByCourse, participantsRegistrations, isLoadingFetchRegistrationParticipants } = useGetRegistrationParticipantsByCourse();
const { getCourse, course, isLoadingFetchGetCourse } = useGetCourse();

const props = defineProps<{
    isOpenModal: boolean;
    courseId: number;
}>();

const courseIdProps = computed(() => props.courseId);

const loadCertificateExistsUrl = ref<boolean>(false);

const loadCertificate = async () => {
    loadCertificateExistsUrl.value = false;
    await getCourse(courseIdProps.value);
    await getRegistrationParticipantsByCourse(courseIdProps.value);
    console.log(participantsRegistrations.value);
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
    isLoadingFetchRegistrationParticipants.value = true;
    emit('closeModal');
};

const emit = defineEmits<{
    (event: 'closeModal'): void;
}>();
</script>

<style scoped></style>
