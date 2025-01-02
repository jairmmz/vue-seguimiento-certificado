<template>
    <ul class="flex space-x-2 pb-4 rtl:space-x-reverse">
        <li>
            <router-link :to="{ name: 'survey-index' }" class="text-primary hover:underline">Encuestas</router-link>
        </li>
        <li class="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
            <span>Añadir</span>
        </li>
    </ul>
    <div class="panel p-5">
        <h1 class="font-semibold text-2xl border-b-2 mb-4">{{ surveyId ? 'Editar encuesta' : 'Crear encuesta' }}</h1>
        <form @submit.prevent="handleSave">
            <div class="mb-5">
                <label for="title">Título</label>
                <textarea id="title" v-model="form.title" rows="3" class="form-textarea" placeholder="Ingrese un título" autofocus required></textarea>
            </div>
            <div v-for="(editor, index) in editors" :key="index" class="mb-5">
                <label>{{ editor.label }}</label>
                <quillEditor
                    ref="editor"
                    v-model:value="form[editor.field]"
                    :options="editorOptions"
                    style="min-height: 200px"
                    @ready="onEditorReady(index)"
                ></quillEditor>
            </div>
            <div class="mb-5">
                <label for="assignee">Estado de la encuesta</label>
                <multiselect
                    :options="statusOptions"
                    v-model:modelValue="form.status"
                    class="custom-multiselect"
                    :searchable="false"
                    placeholder="Selecionar..."
                    selected-label=""
                    select-label=""
                    deselect-label=""
                ></multiselect>
            </div>
            <div class="ltr:text-right rtl:text-left flex justify-end items-center mt-8">
                <router-link :to="{ name: 'survey-index' }" class="btn btn-outline-danger">Cancelar</router-link>
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
    import { nextTick, onMounted, ref, watch } from 'vue';
    import { quillEditor } from 'vue3-quill';
    import { Survey } from './types/survey';
    import Multiselect from '@suadelabs/vue3-multiselect';
    import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
    import { useCreateSurvey } from './actions/createSurveys';
    import { storeToRefs } from 'pinia';
    import { useSurveyStore } from './store/survey';
    import { useRoute } from 'vue-router';
    import { useGetSurvey } from './actions/getSurvey';
    import { useUpdateSurvey } from './actions/updateSurvey';

    useMeta({ title: 'Nueva Encuesta' });

    const { createSurvey } = useCreateSurvey();
    const { updateSurvey } = useUpdateSurvey();
    const { getSurvey, isLoadingGet } = useGetSurvey();
    const { isLoadingSave } = storeToRefs(useSurveyStore());
    const route = useRoute();

    const editors = [
        { field: 'description', label: 'Descripción' },
        { field: 'guidelines', label: 'Pautas' },
        { field: 'message_welcome', label: 'Mensaje de bienvenida' },
        { field: 'message_finish', label: 'Mensaje de despedida' },
    ];

    const editorRefs = ref<any[]>([]);

    const surveyId = parseInt(route.params.id as string);

    const editorOptions = ref({
        modules: {
            toolbar: [[{ header: [1, 2, false] }], ['bold', 'italic', 'underline', 'link'], [{ list: 'ordered' }, { list: 'bullet' }], ['clean']],
        },
        placeholder: '',
    });

    const statusOptions = ref(['borrador', 'publicado', 'cerrado']);

    const form = ref<Survey>({} as Survey);

    const onEditorReady = (index: number,) => {
        // console.log(`Editor ${index} is ready`)
    };

    const loadSurveyData = async (id: number) => {
        const survey = await getSurvey(id);
        if (survey) {
            form.value = survey;
            nextTick(() => {
                editorRefs.value.forEach((editor) => {
                    if (editor && editor.quill) {
                        editor.quill.blur();
                    }
                });
            });
        }
    };

    const handleSave = async () => {
        if (surveyId) {
            await updateSurvey(form.value);
        } else {
            // Create
            await createSurvey(form.value);
        }
    };

    onMounted(() => {
        if (surveyId) {
            loadSurveyData(surveyId);
        }
    });
</script>

<style scoped></style>
