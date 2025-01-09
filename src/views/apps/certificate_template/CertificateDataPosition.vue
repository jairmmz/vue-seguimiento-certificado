<template>
    <ul class="flex space-x-2 pb-4 rtl:space-x-reverse">
        <li>
            <router-link :to="{ name: 'certificate-templates-index' }" class="text-primary hover:underline">Plantilla de Certificado</router-link>
        </li>
        <li class="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
            <span>Añadir</span>
        </li>
    </ul>
    <div class="panel p-5">
        <h1 class="font-semibold text-2xl border-b-2 mb-4">
            Configurar Posiciones de Datos en Plantilla de Certificado
            <span
                v-if="isLoadingFetch"
                class="animate-spin border-2 border-black dark:border-white border-l-transparent rounded-full w-5 h-5 ltr:mr-4 rtl:ml-4 inline-block align-middle"
            ></span>
        </h1>
        <div class="certificate-editor">
            <div class="editor-layout">
                <!-- Panel de campos -->
                <div class="fields-panel">
                    <h2>Campos Disponibles</h2>
                    <div v-for="field in fields" :key="field.id" class="field-item" draggable="true" @dragstart="startDrag(field)">
                        {{ field.label }}
                    </div>
                    <button class="save-button" @click="savePositions">Guardar Posiciones</button>
                </div>

                <!-- Área del PDF -->
                <div class="pdf-container" @dragover.prevent @drop.prevent="handleDrop">
                    <div class="pdf-viewer" ref="pdfContainer" @mousemove="handleMouseMove" @mouseup="endDrag">
                        <canvas ref="canvas"></canvas>
                        <!-- Campos posicionados -->
                        <div
                            v-for="field in fields"
                            :key="field.id"
                            class="positioned-field"
                            :style="{
                                left: `${field.x}px`,
                                top: `${field.y}px`,
                                display: field.x && field.y ? 'block' : 'none',
                                cursor: 'move',
                            }"
                            @mousedown="startMoving(field, $event)"
                        >
                            {{ field.label }}
                            <button class="remove-btn" @click="removeField(field.id)">X</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useMeta } from '@/composables/use-meta';
    import { onMounted, ref } from 'vue';
    import { useRoute } from 'vue-router';
    import { useGetCertificateTemplate } from './actions/getCertificateTemplate';
    import { usePdfViewer } from './actions/pdfViewer';
    import { useDraggableFields } from './actions/draggableFields';

    useMeta({ title: 'Configuración de datos Plantilla Certificado' });

    const { getCertificateTemplate, certificateTemplate, isLoadingFetch } = useGetCertificateTemplate();

    const route = useRoute();
    const certificateTemplateId = parseInt(route.params.id as string);

    const pdfContainer = ref<HTMLElement | null>(null);
    const { canvas, loadPdf } = usePdfViewer();
    const { fields, startDrag, startMoving, updatePosition, removeField, endDrag, savePositions, isDragging, isMoving } = useDraggableFields();

    const handleFileUpload = (event: Event) => {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            loadPdf(url);
        }
    };

    const handleDrop = (event: DragEvent) => {
        event.preventDefault();
        if (!pdfContainer.value) return;

        const rect = pdfContainer.value.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        updatePosition(x, y);
        endDrag();
    };

    const handleMouseMove = (event: MouseEvent) => {
        if ((isDragging.value || isMoving.value) && pdfContainer.value) {
            const rect = pdfContainer.value.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            updatePosition(x, y);
        }
    };

    const loadCertificateTemplateData = async () => {
        await getCertificateTemplate(certificateTemplateId);
        if (!certificateTemplate.value.template_file) return;
        // loadPdf(certificateTemplate.value?.template_file_url);
        loadPdf(`/storage/certificate_templates/${certificateTemplate.value.template_file}`);
    };

    onMounted(() => {
        if (certificateTemplateId) {
            loadCertificateTemplateData();
        }
    });
</script>

<style scoped>
    .certificate-editor {
        padding: 20px;
    }

    .editor-layout {
        display: flex;
        gap: 20px;
        min-height: 400px;
    }

    .fields-panel {
        width: 250px;
        padding: 10px;
        background: #f5f5f5;
        border-radius: 8px;
    }

    .field-item {
        padding: 10px;
        margin: 8px 0;
        background: white;
        border: 1px solid #ddd;
        border-radius: 4px;
        cursor: move;
    }

    .pdf-container {
        flex: 1;
        background: white;
        border-radius: 8px;
        padding: 20px;
        overflow: auto; /* Permitir desplazamiento si el PDF es más grande */
        max-height: 500px; /* Tamaño máximo del contenedor */
    }

    .pdf-viewer {
        position: relative;
        overflow: auto;
    }

    .pdf-viewer canvas {
        display: block;
        margin: auto; /* Centrar el PDF */
        max-width: 100%; /* Asegurar que no exceda el ancho */
        max-height: 100%; /* Ajustar al alto del contenedor */
        object-fit: contain; /* Escalar proporcionalmente */
    }

    .positioned-field {
        position: absolute;
        padding: 8px;
        background: rgba(0, 123, 255, 0.1);
        border: 1px solid #007bff;
        border-radius: 4px;
        cursor: move;
        transform: translate(-50%, -50%);
        z-index: 10;
    }

    .save-button {
        width: 100%;
        padding: 10px;
        margin-top: 20px;
        background: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    .save-button:hover {
        background: #0056b3;
    }
</style>
