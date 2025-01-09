import { ref } from 'vue';
import type { DynamicField, TemplatePosition } from '../types/certificate-data-position';

export function useDraggableFields() {
    const fields = ref<DynamicField[]>([
        { id: 'name', name: 'nombre', label: 'Nombre del Participante', x: 0, y: 0, type: 'text' },
        { id: 'course', name: 'curso', label: 'Nombre del Curso', x: 0, y: 0, type: 'text' },
        { id: 'date', name: 'fecha', label: 'Fecha de Emisión', x: 0, y: 0, type: 'date' },
        { id: 'hours', name: 'horas', label: 'Horas Lectivas', x: 0, y: 0, type: 'text' },
    ]);

    const positions = ref<TemplatePosition[]>([]);
    const isDragging = ref(false);
    const currentField = ref<DynamicField | null>(null);
    const isMoving = ref(false);

    const startDrag = (field: DynamicField) => {
        isDragging.value = true;
        currentField.value = field;
    };

    const startMoving = (field: DynamicField, event: MouseEvent) => {
        if (field.x && field.y) {
            isMoving.value = true;
            currentField.value = field;
            event.stopPropagation();
        }
    }

    const updatePosition = (x: number, y: number) => {
        if (currentField.value) {
            const fieldIndex = fields.value.findIndex((f) => f.id === currentField.value?.id);
            if (fieldIndex !== -1) {
                fields.value[fieldIndex] = {
                    ...fields.value[fieldIndex],
                    x,
                    y,
                };
            }
        }
    };

    const removeField = (fieldId: string) => {
        const index = fields.value.findIndex((f) => f.id === fieldId);
        if (index !== -1) {
            fields.value[index].x = 0;
            fields.value[index].y = 0;
        }
    };

    const endDrag = () => {
        isDragging.value = false;
        isMoving.value = false;
        currentField.value = null;
    };

    const savePositions = () => {
        positions.value = fields.value.map((field) => ({
            fieldId: field.id,
            x: field.x,
            y: field.y,
        }));

        console.log('Posiciones guardadas: ', positions.value);
    };

    return {
        fields,
        positions,
        isDragging,
        isMoving,
        currentField,
        startDrag,
        startMoving,
        updatePosition,
        removeField,
        endDrag,
        savePositions,
    };
}
