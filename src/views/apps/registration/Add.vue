<template>
    <ul class="flex space-x-2 pb-4 rtl:space-x-reverse">
        <li>
            <router-link :to="{ name: 'registration-index' }" class="text-primary hover:underline">Inscripciones</router-link>
        </li>
        <li class="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
            <span>Edición</span>
        </li>
    </ul>
    <div class="panel p-5">
        <h1 class="font-semibold text-2xl border-b-2 mb-4">
            Inscripciones de participantes
            <span
                v-if="isLoadingFetchCoursesParticipantsNotRegistrations"
                class="animate-spin border-2 border-black dark:border-white border-l-transparent rounded-full w-5 h-5 ltr:mr-4 rtl:ml-4 inline-block align-middle"
            >
            </span>
        </h1>
        <form class="space-y-5 my-5" @submit.prevent="submitForm()">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                    <label for="customName">Participante</label>
                    <multiselect
                        v-model="selectedParticipant"
                        :options="participants"
                        class="custom-multiselect"
                        :searchable="true"
                        placeholder="Seleccione un participante"
                        selected-label=""
                        select-label=""
                        :label="'name'"
                        :track-by="'id'"
                        deselect-label=""
                        :no-options-text="'No se encontraron participantes'"
                    >
                        <template #noResult>
                            <span class="text-gray-400">No se encontraron participantes</span>
                        </template>
                    </multiselect>
                    <template v-if="isSubmitForm && $v4.form.participant_id.$error">
                        <p class="text-danger mt-1">Por favor seleccione un participante</p>
                    </template>
                </div>
                <div>
                    <label for="customName">Condición</label>
                    <multiselect
                        v-model="selectedTypeParticipant"
                        :options="typeParticipants"
                        class="custom-multiselect"
                        :searchable="true"
                        placeholder="Seleccione una condición"
                        selected-label=""
                        select-label=""
                        :label="'name'"
                        :track-by="'id'"
                        deselect-label=""
                        :no-options-text="'No se encontraron condiciones'"
                    >
                        <template #noResult>
                            <span class="text-gray-400">No se encontraron condiciones</span>
                        </template>
                    </multiselect>
                    <template v-if="isSubmitForm && $v4.form.type_participant_id.$error">
                        <p class="text-danger mt-1">Por favor seleccione una condición</p>
                    </template>
                </div>
            </div>
            <div class="ltr:text-right rtl:text-left flex justify-start items-center mt-8">
                <router-link :to="{ name: 'registration-index' }" class="btn btn-outline-danger">Cancelar</router-link>
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

        <!-- Tabla -->
        <div class="panel px-0 pb-1.5 border-[#e0e6ed] dark:border-[#1b2e4b]">
            <div class="datatable invoice-table">
                <div class="mb-4.5 px-5 flex md:items-center md:flex-row flex-col gap-5">
                    <div class="flex items-center gap-2">
                        <h1 class="text-xl font-semibold">Lista de participantes inscritos</h1>
                    </div>
                    <div class="ltr:ml-auto rtl:mr-auto">
                        <input v-model="search" type="text" class="form-input" placeholder="Buscar..." />
                    </div>
                </div>

                <vue3-datatable
                    ref="datatable"
                    :loading="isLoadingFetchRegistrationParticipants"
                    :rows="participantsRegistrations"
                    :columns="cols"
                    :totalRows="participantsRegistrations?.length"
                    :sortable="true"
                    :search="search"
                    paginationInfo="Mostrando {0} a {1} de {2} entradas"
                    noDataContent="No hay datos disponibles"
                    skin=""
                    firstArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M13 19L7 12L13 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path opacity="0.5" d="M16.9998 19L10.9998 12L16.9998 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
                    lastArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M11 19L17 12L11 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path opacity="0.5" d="M6.99976 19L12.9998 12L6.99976 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg> '
                    previousArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M15 5L9 12L15 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
                    nextArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M9 5L15 12L9 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
                >
                    <template #id="data">
                        {{ data.value.id }}
                    </template>
                    <template #participant_name="data">
                        <div class="flex items-center font-semibold">
                            {{ data.value.participant_name }}
                        </div>
                    </template>
                    <template #number_participants="data">
                        <div class="flex items-center font-semibold">
                            {{ data.value.number_participants }}
                        </div>
                    </template>
                    <template #participant_last_name="data">
                        <div class="flex items-center font-semibold">
                            {{ data.value.participant_last_name }}
                        </div>
                    </template>
                    <template #participant_identification="data">
                        <div class="flex items-center font-semibold">
                            {{ data.value.participant_identification }}
                        </div>
                    </template>
                    <template #type_participant="data">
                        <div class="flex items-center font-semibold">
                            {{ data.value.type_participant }}
                        </div>
                    </template>
                    <template #actions="data">
                        <div class="flex justify-center gap-x-2">
                            <button type="button" class="btn btn-warning btn-sm" @click="handleViewRegistrationParticipant(data.value)">
                                <icon-eye class="w-4 h-4 mr-1" />
                                Ver
                            </button>
                            <button type="button" class="btn btn-danger btn-sm" @click="showAlertDeleteRegistration(data.value.id)">
                                <icon-trash-lines class="w-4 h-4 mr-1" />
                                Eliminar
                            </button>
                        </div>
                    </template>
                </vue3-datatable>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, ref, watch } from 'vue';
    import { useMeta } from '@/composables/use-meta';
    import Vue3Datatable from '@bhplugin/vue3-datatable';
    import IconTrashLines from '@/components/icon/icon-trash-lines.vue';
    import IconEye from '@/components/icon/icon-eye.vue';
    import { storeToRefs } from 'pinia';
    import { useRoute } from 'vue-router';
    import { useVuelidate } from '@vuelidate/core';
    import { required } from '@vuelidate/validators';
    import { useCreateRegistration } from './actions/createRegistration';
    import { useRegistrationStore } from './store/registration';
    import { Registration } from './types/registration';
    import { useGetCoursesParticipantsNotRegistrations } from './actions/getCoursesParticipantsNotRegistrations';
    import Multiselect from '@suadelabs/vue3-multiselect';
    import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
    import { Course } from '../course/types/course';
    import { Participant, TypeParticipant } from '../participant/types/participant';
    import { useGetRegistrationParticipantsByCourse } from './actions/getRegistrationParticipantsByCourse';
    import Swal from 'sweetalert2';
    import { useDeleteRegistration } from './actions/deleteRegistration';

    useMeta({ title: 'Inscripciones de participantes' });

    const route = useRoute();

    const { getCoursesParticipantsNotRegistrations, coursesParticipantsNotRegistrations, isLoadingFetchCoursesParticipantsNotRegistrations } =
        useGetCoursesParticipantsNotRegistrations();
    const { getRegistrationParticipantsByCourse, participantsRegistrations, isLoadingFetchRegistrationParticipants } = useGetRegistrationParticipantsByCourse();
    const { createRegistration } = useCreateRegistration();
    const { deleteRegistration, isLoadingFetchDeleteRegistration } = useDeleteRegistration();
    const { isLoadingSave } = storeToRefs(useRegistrationStore());

    const courseId = parseInt(route.params.id as string);
    const form = ref<Registration>({} as Registration);

    const selectedCourse = ref<any>(null);
    const selectedParticipant = ref<any>(null);
    const selectedTypeParticipant = ref<any>(null);

    // Datatable
    const datatable: any = ref(null);
    const search = ref('');

    const cols = ref([
        { field: 'id', title: 'ID Inscripción', width: '15%' },
        { field: 'participant_name', title: 'Nombres', width: '20%' },
        { field: 'participant_last_name', title: 'Apellidos', width: '20%' },
        { field: 'participant_identification', title: 'Identificación', width: '15%' },
        { field: 'type_participant', title: 'Condición', width: '15%' },
        { field: 'actions', title: 'Acciones', sort: false, headerClass: 'justify-center', width: '15%' },
    ]);

    const isSubmitForm = ref(false);
    const rules = {
        form: {
            participant_id: { required },
            type_participant_id: { required },
        },
    };

    const $v4 = useVuelidate(rules, { form });

    const loadRegistrationsParticipants = async (id: number) => {
        await getRegistrationParticipantsByCourse(id);
    };

    const participants = ref<Participant[] | undefined>([]);
    const typeParticipants = ref<TypeParticipant[] | undefined>([]);

    const loadCoursesParticipants = async () => {
        await getCoursesParticipantsNotRegistrations(courseId);
        participants.value = coursesParticipantsNotRegistrations.value?.participants;
        typeParticipants.value = coursesParticipantsNotRegistrations.value?.type_participants;

        participants.value?.forEach((participant) => {
            participant.name = `${participant.identification} - ${participant.name} ${participant.last_name}`;
        });
    };

    const submitForm = async () => {
        isSubmitForm.value = true;
        $v4.value.form.$touch();
        if ($v4.value.form.$invalid) {
            return false;
        }
        if (courseId) {
            await createRegistration(form.value, courseId);
        }

        await loadRegistrationsParticipants(courseId);
        await loadCoursesParticipants();

        // Limpiar formulario
        form.value = {} as Registration;
        selectedParticipant.value = null;
        selectedTypeParticipant.value = null;
        isSubmitForm.value = false;

        // Limpiar validaciones
        $v4.value.form.$reset();
    };

    const handleViewRegistrationParticipant = (data: any) => {
        console.log('View registration participant');
    };

    const showAlertDeleteRegistration = async (id: number) => {
        Swal.fire({
            icon: 'warning',
            title: 'Estas seguro?',
            text: 'No podrás revertir esto!',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',
            customClass: 'sweet-alerts',
        }).then(async (result) => {
            if (result.value) {
                await deleteRegistration(id);
                await loadRegistrationsParticipants(courseId);
                await loadCoursesParticipants();
            }
        });
    };

    watch(selectedParticipant, (value: Participant) => {
        if (value) {
            form.value.participant_id = value.id as number;
        }
    });

    watch(selectedTypeParticipant, (value: TypeParticipant) => {
        if (value) {
            form.value.type_participant_id = value.id as number;
        }
    });

    onMounted(() => {
        // Cargar cursos, participantes y tipos de participantes
        loadCoursesParticipants();

        // Tabla
        loadRegistrationsParticipants(courseId);
    });
</script>

<style scoped></style>
