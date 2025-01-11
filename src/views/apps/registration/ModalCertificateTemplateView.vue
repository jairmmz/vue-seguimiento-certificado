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
                            <button
                                type="button"
                                class="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                @click="handleCloseModal"
                            >
                                <icon-x />
                            </button>
                            <div class="text-lg font-bold bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                {{ nameCertificateTemplate }}
                            </div>
                            <div v-if="certificateTemplateUrlProps" class="p-5 h-[600px]">
                                <div class="h-[600px]">
                                    <embed :src="certificateTemplateUrlProps" type="application/pdf" width="100%" height="100%" />
                                </div>
                            </div>
                            <div v-else>
                                <p>No existe url de la plantilla del certificado</p>
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

    const addTaskModal = ref(false);

    const props = defineProps<{
        isOpenModal: boolean;
        certificateTemplateUrl?: string;
        nameCertificateTemplate: string;
    }>();

    const certificateTemplateUrlProps = computed(() => props.certificateTemplateUrl);

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
</script>

<style scoped></style>
