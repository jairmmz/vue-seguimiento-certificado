<template>
    <TransitionRoot appear :show="addTaskModal" as="template">
        <Dialog as="div" @close="handleCloseModal" class="relative z-[51]">
            <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100"
                leave-to="opacity-0"
            >
                <DialogOverlay class="fixed inset-0 bg-[black]/60" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex h-full items-start justify-center px-4 py-8">
                    <TransitionChild
                        as="template"
                        enter="duration-300 ease-out"
                        enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100"
                        leave="duration-200 ease-in"
                        leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95"
                    >
                        <DialogPanel class="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-5xl text-black dark:text-white-dark">
                            <div class="flex justify-end p-2">
                                <button
                                    type="button"
                                    class="absolute top-4ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                    @click="handleCloseModal"
                                >
                                    <icon-x />
                                </button>
                            </div>
                            <div v-if="certificate?.certificate_file_url" class="p-5 pb-5 h-[600px]">
                                <div class="h-[600px] pb-5">
                                    <embed :src="certificate?.certificate_file_url" type="application/pdf" width="100%" height="100%" />
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
    import { ref, watch } from 'vue';
    import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogOverlay } from '@headlessui/vue';
    import IconX from '@/components/icon/icon-x.vue';
    import { Certificate } from '../apps/participant/types/participant';

    const addTaskModal = ref(false);

    const props = defineProps<{
        isOpenModal: boolean;
        certificate: Certificate | null;
    }>();

    watch(
        () => props.isOpenModal,
        (value) => {
            addTaskModal.value = value;
        },
    );

    const handleCloseModal = () => {
        addTaskModal.value = false;
        emit('closeModal');
    };

    const emit = defineEmits<{
        (event: 'closeModal'): void;
    }>();

    const form = ref<Certificate>({} as Certificate);
</script>

<style scoped></style>
