<template>
    <div class="mb-5">
        <!-- Modal -->
        <TransitionRoot appear :show="isSurveyModalOpen" as="template">
            <Dialog as="div" @close="hideModal" class="relative z-50">
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
                    <div class="flex min-h-full items-center justify-center px-4 py-8">
                        <TransitionChild
                            as="template"
                            enter="duration-300 ease-out"
                            enter-from="opacity-0 scale-95"
                            enter-to="opacity-100 scale-100"
                            leave="duration-200 ease-in"
                            leave-from="opacity-100 scale-100"
                            leave-to="opacity-0 scale-95"
                        >
                            <DialogPanel class="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg text-black dark:text-white-dark">
                                <div class="text-lg font-bold bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                    Información de la encuesta
                                </div>
                                <div class="p-5">
                                    <table class="w-full table-auto rounded-lg overflow-hidden mb-2">
                                        <thead></thead>
                                        <tbody>
                                            <tr class="border-b border-slate-200">
                                                <td class="py-3 px-6 font-bold">Título:</td>
                                                <td class="py-3 px-6">{{ survey?.title }}</td>
                                            </tr>
                                            <tr class="border-b border-slate-200">
                                                <td class="py-3 px-6 font-bold">Descripción:</td>
                                                <td class="py-3 px-6" v-html="survey?.description"></td>
                                            </tr>
                                            <tr class="border-b border-slate-200">
                                                <td class="py-3 px-6 font-bold">Pautas:</td>
                                                <td class="py-3 px-6" v-html="survey?.guidelines"></td>
                                            </tr>
                                            <tr class="border-b border-slate-200">
                                                <td class="py-3 px-6 font-bold">Mensaje de bienvenida:</td>
                                                <td class="py-3 px-6" v-html="survey?.message_welcome"></td>
                                            </tr>
                                            <tr class="border-b border-slate-200">
                                                <td class="py-3 px-6 font-bold">Mensaje de despedida:</td>
                                                <td class="py-3 px-6" v-html="survey?.message_finish"></td>
                                            </tr>
                                            <tr class="border-b border-slate-200">
                                                <td class="py-3 px-6 font-bold">Estado:</td>
                                                <td class="py-3 px-6">{{ survey?.status }}</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <div class="flex justify-end items-center mt-8">
                                        <button type="button" @click="hideModal" class="btn btn-primary ltr:ml-4 rtl:mr-4">Cerrar</button>
                                    </div>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </TransitionRoot>
    </div>
</template>

<script setup lang="ts">
    import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogOverlay } from '@headlessui/vue';
    import { Survey } from './types/survey';
    import { storeToRefs } from 'pinia';
    import { useSurveyStore } from './store/survey';
    const { isSurveyModalOpen } = storeToRefs(useSurveyStore());

    defineProps<{
        survey: Survey | null;
    }>();

    const hideModal = () => {
        isSurveyModalOpen.value = false;
    };
</script>

<style scoped></style>
