<template>
    <ul class="flex space-x-2 pb-4 rtl:space-x-reverse">
        <li>
            <router-link :to="{ name: 'course-index' }" class="text-primary hover:underline">Curso</router-link>
        </li>
        <li class="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
            <span>Añadir</span>
        </li>
    </ul>
    <div class="panel p-5">
        <h1 class="font-semibold text-2xl border-b-2 mb-4">
            {{ courseId ? 'Editar curso' : 'Crear curso' }}
            <span
                v-if="isLoadingFetch"
                class="animate-spin border-2 border-black dark:border-white border-l-transparent rounded-full w-5 h-5 ltr:mr-4 rtl:ml-4 inline-block align-middle"
            >
            </span>
        </h1>
        <form class="space-y-5" @submit.prevent="submitForm()">
            <div class="grid grid-cols-1 gap-5">
                <div :class="{ 'has-error': $v4.form.name.$error, 'has-success': isSubmitForm && !$v4.form.name.$error }">
                    <label for="customName">Título del curso</label>
                    <input id="customName" type="text" class="form-input" v-model="form.name" />
                    <template v-if="isSubmitForm && !$v4.form.name.$error">
                        <p class="text-[#1abc9c] mt-1">¡Se ve bien!</p>
                    </template>
                    <template v-if="isSubmitForm && $v4.form.name.$error">
                        <p class="text-danger mt-1">Por favor ingrese nombre del curso</p>
                    </template>
                </div>
                <div :class="{ 'has-error': $v4.form.description.$error, 'has-success': isSubmitForm && !$v4.form.description.$error }">
                    <label for="customLastName">Descripción</label>
                    <textarea class="form-input" name="description" id="description" v-model="form.description" rows="5"></textarea>
                    <template v-if="isSubmitForm && !$v4.form.description.$error">
                        <p class="text-[#1abc9c] mt-1">¡Se ve bien!</p>
                    </template>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div :class="{ 'has-error': $v4.form.start_date.$error, 'has-success': isSubmitForm && !$v4.form.start_date.$error }">
                        <label for="customeEmail">Fecha de Inicio</label>
                        <input id="customeEmail" type="date" class="form-input" v-model="form.start_date" />
                        <template v-if="isSubmitForm && !$v4.form.start_date.$error">
                            <p class="text-[#1abc9c] mt-1">¡Se ve bien!</p>
                        </template>
                        <template v-if="isSubmitForm && $v4.form.start_date.$error">
                            <p class="text-danger mt-1">Por favor ingrese la fecha de inicio</p>
                        </template>
                    </div>
                    <div :class="{ 'has-error': $v4.form.end_date.$error, 'has-success': isSubmitForm && !$v4.form.end_date.$error }">
                        <label for="customeEnd_date">Fecha de Término</label>
                        <input id="customeEnd_date" type="date" class="form-input" v-model="form.end_date" />
                        <template v-if="isSubmitForm && !$v4.form.end_date.$error">
                            <p class="text-[#1abc9c] mt-1">¡Se ve bien!</p>
                        </template>
                        <template v-if="isSubmitForm && $v4.form.end_date.$error">
                            <p class="text-danger mt-1">Por favor ingrese la fecha de término</p>
                        </template>
                    </div>
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
    </div>
</template>

<script setup lang="ts">
    import { useMeta } from '@/composables/use-meta';
    import { onMounted, ref } from 'vue';
    import { Course } from './types/course';
    import { useCreateCourse } from './actions/createCourse';
    import { storeToRefs } from 'pinia';
    import { useCourseStore } from './store/course';
    import { useRoute } from 'vue-router';
    import { useGetCourse } from './actions/getCourse';
    import { useUpdateCourse } from './actions/updateCourse';
    import { useVuelidate } from '@vuelidate/core';
    import { required } from '@vuelidate/validators';

    useMeta({ title: 'Curso' });

    const { createCourse } = useCreateCourse();
    const { updateCourse } = useUpdateCourse();
    const { getCourse, course, isLoadingFetch } = useGetCourse();
    const { isLoadingSave } = storeToRefs(useCourseStore());
    const route = useRoute();

    const courseId = parseInt(route.params.id as string);
    const form = ref<Course>({} as Course);

    const isSubmitForm = ref(false);
    const rules = {
        form: {
            name: { required },
            last_name: { required },
            description: {},
            start_date: { required },
            end_date: { required },
        },
    };

    const extractDateFromISO = (isoDate: string): string => {
        if (!isoDate) return '';
        return isoDate.split('T')[0]; // Divide en "fecha" y "hora", y toma solo la fecha
    };

    const $v4 = useVuelidate(rules, { form });

    const loadCourseData = async (id: number) => {
        await getCourse(id);
        if (course) {
            form.value = {
                id: course.value.id,
                name: course.value.name,
                description: course.value.description,
                start_date: extractDateFromISO(course.value.start_date),
                end_date: extractDateFromISO(course.value.end_date),
            };
        }
    };

    const submitForm = async () => {
        isSubmitForm.value = true;
        $v4.value.form.$touch();
        if ($v4.value.form.$invalid) {
            return false;
        }
        if (courseId) {
            await updateCourse(form.value);
        } else {
            await createCourse(form.value);
        }
    };

    onMounted(() => {
        if (courseId) {
            loadCourseData(courseId);
        }
    });
</script>

<style scoped></style>
