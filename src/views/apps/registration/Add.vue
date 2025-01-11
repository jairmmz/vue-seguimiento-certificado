<template>
    <ul class="flex space-x-2 pb-4 rtl:space-x-reverse">
        <li>
            <router-link :to="{ name: 'registration-index' }" class="text-primary hover:underline">Inscripciones</router-link>
        </li>
        <li class="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
            <span>Añadir</span>
        </li>
    </ul>
    <div class="panel p-5">
        <h1 class="font-semibold text-2xl border-b-2 mb-4">
            {{ courseId ? 'Editar inscripción' : 'Añadir inscripción' }}
            <span
                v-if="isLoadingFetchCoursesParticipantsNotRegistrations"
                class="animate-spin border-2 border-black dark:border-white border-l-transparent rounded-full w-5 h-5 ltr:mr-4 rtl:ml-4 inline-block align-middle"
            >
            </span>
        </h1>
        <form class="space-y-5" @submit.prevent="submitForm()">
            <div>
                <label for="customName">Cursos</label>
                <multiselect
                    v-model="form.course_id"
                    :options="courses"
                    class="custom-multiselect"
                    :searchable="true"
                    placeholder="Seleccione un curso"
                    selected-label=""
                    select-label=""
                    :label="'name'"
                    :track-by="'id'"
                    deselect-label=""
                    :no-options-text="'No se encontraron cursos'"
                >
                    <template #noResult>
                        <span class="text-gray-400">No se encontraron cursos</span>
                    </template>
                </multiselect>
                <template v-if="isSubmitForm && $v4.form.course_id.$error">
                    <p class="text-danger mt-1">Por favor seleccione un curso</p>
                </template>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                    <label for="customName">Participante</label>
                    <multiselect
                        v-model="form.participant_id"
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
                    <label for="customName">Tipo de participante</label>
                    <multiselect
                        v-model="form.type_participant_id"
                        :options="typeParticipants"
                        class="custom-multiselect"
                        :searchable="true"
                        placeholder="Seleccione un tipo de participante"
                        selected-label=""
                        select-label=""
                        :label="'name'"
                        :track-by="'id'"
                        deselect-label=""
                        :no-options-text="'No se encontraron tipos de participantes'"
                    >
                        <template #noResult>
                            <span class="text-gray-400">No se encontraron tipos de participantes</span>
                        </template>
                    </multiselect>
                    <template v-if="isSubmitForm && $v4.form.type_participant_id.$error">
                        <p class="text-danger mt-1">Por favor seleccione un tipo de participante</p>
                    </template>
                </div>
            </div>
            <div class="ltr:text-right rtl:text-left flex justify-start items-center mt-8">
                <router-link :to="{ name: 'course-index' }" class="btn btn-outline-danger">Cancelar</router-link>
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
    </div>
</template>

<script setup lang="ts">
    import { useMeta } from '@/composables/use-meta';
    import { onMounted, ref } from 'vue';
    import { storeToRefs } from 'pinia';
    import { useRoute } from 'vue-router';
    import { useVuelidate } from '@vuelidate/core';
    import { required } from '@vuelidate/validators';
    import { useCreateRegistration } from './actions/createRegistration';
    import { useUpdateRegistration } from './actions/updateRegistration';
    import { useRegistrationStore } from './store/registration';
    import { Registration, RegistrationSelect } from './types/registration';
    import { useGetCoursesParticipantsNotRegistrations } from './actions/getCoursesParticipantsNotRegistrations';
    import Multiselect from '@suadelabs/vue3-multiselect';
    import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
    import { Course } from '../course/types/course';
    import { Participant, TypeParticipant } from '../participant/types/participant';

    useMeta({ title: 'Inscripción de Curso / Participantes' });

    const route = useRoute();

    const { getCoursesParticipantsNotRegistrations, coursesParticipantsNotRegistrations, isLoadingFetchCoursesParticipantsNotRegistrations } =
        useGetCoursesParticipantsNotRegistrations();
    const { createRegistration } = useCreateRegistration();
    const { updateRegistration } = useUpdateRegistration();
    const { isLoadingSave } = storeToRefs(useRegistrationStore());

    const courseId = parseInt(route.params.id as string);
    const form = ref<Registration>({
        course_id: 0,
        participant_id: 0,
        type_participant_id: 0,
    });

    const isSubmitForm = ref(false);
    const rules = {
        form: {
            course_id: { required },
            participant_id: { required },
            type_participant_id: { required },
        },
    };

    const $v4 = useVuelidate(rules, { form });

    const loadRegistrations = async () => {};

    const loadCourseParticipants = async (id: number) => {};

    // const course = ref<Course>({} as Course);

    const courses = ref<Course[] | undefined>([]);
    const participants = ref<Participant[] | undefined>([]);
    const typeParticipants = ref<TypeParticipant[] | undefined>([]);

    const loadCoursesParticipants = async () => {
        await getCoursesParticipantsNotRegistrations();
        courses.value = coursesParticipantsNotRegistrations.value?.courses;
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
            console.log('update', form.value);

            // await updateCourse(form.value);
        } else {
            // await createCourse(form.value);
            console.log('create', form.value.course_id);
        }
    };

    onMounted(() => {
        if (courseId) {
            loadCourseParticipants(courseId);
        }
        loadCoursesParticipants();
        loadRegistrations();
    });
</script>

<style scoped></style>
