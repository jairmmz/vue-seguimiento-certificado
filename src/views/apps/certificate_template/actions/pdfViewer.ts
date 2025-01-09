import { ref } from 'vue';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.min.mjs';

export function usePdfViewer() {
    const canvas = ref<HTMLCanvasElement | null>(null);
    const scale = ref(1.0);

    // Asegurarnos de usar la misma versión que tenemos instalada
    pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.worker.mjs`;

    const loadPdf = async (url: string) => {
        if (!canvas.value) return;

        try {
            const pdf = await pdfjsLib.getDocument(url).promise;
            const page = await pdf.getPage(1);
            const viewport = page.getViewport({ scale: scale.value });

            canvas.value.height = viewport.height;
            canvas.value.width = viewport.width;

            const context = canvas.value.getContext('2d');
            if (!context) return;

            const renderContext = {
                canvasContext: context,
                viewport: viewport,
            };

            await page.render(renderContext).promise;
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return {
        loadPdf,
        canvas,
        scale,
    };
}
