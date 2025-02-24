<template>
    <div>
        <div class="panel px-0 pb-1.5 border-[#e0e6ed] dark:border-[#1b2e4b]">
            <div class="datatable invoice-table">
                <div class="mb-4.5 px-5 flex md:items-center md:flex-row flex-col gap-5">
                    <h1 class="text-xl font-semibold">Reportes:</h1>
                </div>

                <!-- simple bar -->
                <div class="panel">
                    <div class="flex items-center justify-between">
                        <h5 class="font-semibold text-lg dark:text-white">Lista de participantes incritos por curso</h5>
                    </div>
                    <div class="mb-5">
                        <apexchart v-if="!isLoadingFetchGetParticipantsByCourse" height="300" :options="barChart" :series="barChartSeries"
                            class="bg-white dark:bg-black rounded-lg my-5"></apexchart>
                        <div v-else class="flex items-center justify-center h-96">
                            <p class="text-gray-500 dark:text-gray-400">Cargando...</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, computed } from 'vue';
import apexchart from 'vue3-apexcharts';
import { useMeta } from '@/composables/use-meta';
import { useAppStore } from '@/stores/index';
import { useGetParticipantsByCourse } from './actions/getParticipantsByCourse';
import { ParticipantsByCourse } from './types';

const store = useAppStore();

useMeta({ title: 'Cursos' });

const { getParticipantsByCourse, participantsByCourse, isLoadingFetchGetParticipantsByCourse } = useGetParticipantsByCourse();

const courses = ref<string[]>([]);
const participants = ref<number[]>([]);

const loadParticipantsByCourse = async () => {
    await getParticipantsByCourse();
    participantsByCourse.value.forEach((item: ParticipantsByCourse) => {
        courses.value.push(item.name);
        participants.value.push(item.registrations_count);
    });
};

const barChart = computed(() => {
    const isDark = store.theme === 'dark' || store.isDarkMode ? true : false;
    const isRtl = store.rtlClass === 'rtl' ? true : false;
    return {
        chart: {
            height: 300,
            type: 'bar',
            zoom: {
                enabled: false,
            },
            toolbar: {
                show: false,
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            show: true,
            width: 1,
        },
        colors: ['#4361ee'],
        xaxis: {
            categories: courses.value,
            axisBorder: {
                color: isDark ? '#191e3a' : '#e0e6ed',
            },
        },
        yaxis: {
            opposite: isRtl ? true : false,
            reversed: isRtl ? true : false,
        },
        grid: {
            borderColor: isDark ? '#191e3a' : '#e0e6ed',
        },
        plotOptions: {
            bar: {
                horizontal: true,
            },
        },
        fill: {
            opacity: 0.8,
        },
    };
});

const barChartSeries = ref([
    {
        name: 'N° de participantes',
        data: participants.value,
    },
]);

onMounted(async () => {
    await loadParticipantsByCourse();
});
</script>
