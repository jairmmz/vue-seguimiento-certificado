<template>
    <div>
        <div class="flex gap-5 relative sm:h-[calc(100vh_-_150px)] h-full sm:min-h-0" :class="{ 'min-h-[999px]': isShowGroupQuestions }">
            <div
                class="panel p-4 flex-none max-w-xs w-full absolute xl:relative z-10 space-y-4 h-full hidden xl:block overflow-hidden"
                :class="isShowGroupQuestionsMenu && '!block !overflow-y-auto'"
            >
                <div class="flex justify-between items-center">
                    <div class="flex items-center">
                        <h2 class="font-semibold text-lg">Grupo de preguntas</h2>
                    </div>
                    <button type="button" class="btn btn-primary btn-sm">Añadir</button>
                </div>
                <div class="h-px w-full border-b border-[#e0e6ed] dark:border-[#1b2e4b]"></div>
                <div class="mt-2">
                    <perfect-scrollbar
                        :options="{
                            swipeEasing: true,
                            wheelPropagation: false,
                        }"
                        class="chat-users relative h-full min-h-[100px] sm:h-[calc(100vh_-_357px)] space-y-0.5 ltr:pr-3.5 rtl:pl-3.5 ltr:-mr-3.5 rtl:-ml-3.5"
                    >
                        <template v-for="groupQuestion in groupQuestions" :key="groupQuestion.id">
                            <button
                                type="button"
                                class="w-full flex justify-between items-center p-2 hover:bg-gray-100 dark:hover:bg-[#050b14] rounded-md dark:hover:text-primary hover:text-primary"
                                :class="{
                                    'bg-gray-100 dark:bg-[#050b14] dark:text-primary text-primary':
                                        selectedGroupQuestions && selectedGroupQuestions.id === groupQuestion.id,
                                }"
                                @click="selectGroupQuestion(groupQuestion)"
                            >
                                <div class="flex-1 mt-2">
                                    <div class="flex items-center">
                                        <div class="mx-3 ltr:text-left rtl:text-right">
                                            <p class="mb-1 font-semibold">{{ groupQuestion.title }}</p>
                                        </div>
                                    </div>
                                </div>
                            </button>
                        </template>
                    </perfect-scrollbar>
                </div>
            </div>

            <div
                class="bg-black/60 z-[5] w-full h-full absolute rounded-md hidden"
                :class="isShowGroupQuestions && '!block xl:!hidden'"
                @click="isShowGroupQuestions = !isShowGroupQuestions"
            ></div>

            <div class="panel p-0 flex-1">
                <template v-if="!isShowGroupQuestions">
                    <div class="flex items-center justify-center h-full relative p-4">
                        <button
                            type="button"
                            class="xl:hidden absolute top-4 ltr:left-4 rtl:right-4 hover:text-primary"
                            @click="isShowGroupQuestions = !isShowGroupQuestions"
                        >
                            <icon-menu />
                        </button>

                        <div class="py-8 flex items-center justify-center flex-col">
                            <div class="w-[280px] md:w-[430px] mb-8 h-[calc(100vh_-_320px)] min-h-[120px] text-white dark:text-[#0e1726]">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    data-name="Layer 1"
                                    class="w-full h-full"
                                    viewBox="0 0 891.29496 745.19434"
                                    xmlns:xlink="http://www.w3.org/1999/xlink"
                                >
                                    <ellipse
                                        cx="418.64354"
                                        cy="727.19434"
                                        rx="352"
                                        ry="18"
                                        :fill="store.theme === 'dark' || store.isDarkMode ? '#888ea8' : '#e6e6e6'"
                                    />
                                    <path
                                        d="M778.64963,250.35008h-3.99878V140.80476a63.40187,63.40187,0,0,0-63.4018-63.40193H479.16232a63.40188,63.40188,0,0,0-63.402,63.4017v600.9744a63.40189,63.40189,0,0,0,63.4018,63.40192H711.24875a63.40187,63.40187,0,0,0,63.402-63.40168V328.32632h3.99878Z"
                                        transform="translate(-154.35252 -77.40283)"
                                        fill="#3f3d56"
                                    />
                                    <path
                                        d="M761.156,141.24713v600.09a47.35072,47.35072,0,0,1-47.35,47.35h-233.2a47.35084,47.35084,0,0,1-47.35-47.35v-600.09a47.3509,47.3509,0,0,1,47.35-47.35h28.29a22.50659,22.50659,0,0,0,20.83,30.99h132.96a22.50672,22.50672,0,0,0,20.83-30.99h30.29A47.35088,47.35088,0,0,1,761.156,141.24713Z"
                                        transform="translate(-154.35252 -77.40283)"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M686.03027,400.0032q-2.32543,1.215-4.73047,2.3-2.18994.99-4.4497,1.86c-.5503.21-1.10987.42-1.66992.63a89.52811,89.52811,0,0,1-13.6001,3.75q-3.43506.675-6.96,1.06-2.90991.33-5.87989.47c-1.41015.07-2.82031.1-4.24023.1a89.84124,89.84124,0,0,1-16.75977-1.57c-1.44043-.26-2.85009-.57-4.26025-.91a88.77786,88.77786,0,0,1-19.66992-7.26c-.56006-.28-1.12012-.58-1.68018-.87-.83008-.44-1.63965-.9-2.4497-1.38.38964-.54.81005-1.07,1.23974-1.59a53.03414,53.03414,0,0,1,78.87012-4.1,54.27663,54.27663,0,0,1,5.06006,5.86C685.25977,398.89316,685.6499,399.44321,686.03027,400.0032Z"
                                        transform="translate(-154.35252 -77.40283)"
                                        fill="#6c63ff"
                                    />
                                    <circle cx="492.14325" cy="234.76352" r="43.90974" fill="#2f2e41" />
                                    <circle
                                        cx="642.49883"
                                        cy="327.46205"
                                        r="32.68086"
                                        transform="translate(-232.6876 270.90663) rotate(-28.66315)"
                                        fill="#a0616a"
                                    />
                                    <path
                                        d="M676.8388,306.90589a44.44844,44.44844,0,0,1-25.402,7.85033,27.23846,27.23846,0,0,0,10.796,4.44154,89.62764,89.62764,0,0,1-36.61.20571,23.69448,23.69448,0,0,1-7.66395-2.63224,9.699,9.699,0,0,1-4.73055-6.3266c-.80322-4.58859,2.77227-8.75743,6.488-11.567a47.85811,47.85811,0,0,1,40.21662-8.03639c4.49246,1.16124,8.99288,3.12327,11.91085,6.731s3.78232,9.16981,1.00224,12.88488Z"
                                        transform="translate(-154.35252 -77.40283)"
                                        fill="#2f2e41"
                                    />
                                    <path
                                        d="M644.5,230.17319a89.98675,89.98675,0,0,0-46.83984,166.83l.58007.34q.72.43506,1.43995.84c.81005.48,1.61962.94,2.4497,1.38.56006.29,1.12012.59,1.68018.87a88.77786,88.77786,0,0,0,19.66992,7.26c1.41016.34,2.81982.65,4.26025.91a89.84124,89.84124,0,0,0,16.75977,1.57c1.41992,0,2.83008-.03,4.24023-.1q2.97-.135,5.87989-.47,3.52513-.39,6.96-1.06a89.52811,89.52811,0,0,0,13.6001-3.75c.56005-.21,1.11962-.42,1.66992-.63q2.26464-.87,4.4497-1.86,2.40015-1.08,4.73047-2.3a90.7919,90.7919,0,0,0,37.03955-35.97c.04-.07995.09034-.16.13038-.24a89.30592,89.30592,0,0,0,9.6499-26.41,90.051,90.051,0,0,0-88.3501-107.21Zm77.06006,132.45c-.08008.14-.1499.28-.23.41a88.17195,88.17195,0,0,1-36.48,35.32q-2.29542,1.2-4.66992,2.25c-1.31006.59-2.64991,1.15-4,1.67-.57032.22-1.14991.44-1.73.64a85.72126,85.72126,0,0,1-11.73,3.36,84.69473,84.69473,0,0,1-8.95019,1.41c-1.8501.2-3.73.34-5.62012.41-1.21.05-2.42969.08-3.6499.08a86.762,86.762,0,0,1-16.21973-1.51,85.62478,85.62478,0,0,1-9.63037-2.36,88.46592,88.46592,0,0,1-13.98974-5.67c-.52-.27-1.04-.54-1.5503-.82-.73-.39-1.46972-.79-2.18994-1.22-.54-.3-1.08008-.62-1.60986-.94-.31006-.18-.62012-.37-.93018-.56a88.06851,88.06851,0,1,1,123.18018-32.47Z"
                                        transform="translate(-154.35252 -77.40283)"
                                        fill="#3f3d56"
                                    />
                                    <path
                                        d="M624.2595,268.86254c-.47244-4.968-6.55849-8.02647-11.3179-6.52583s-7.88411,6.2929-8.82863,11.19308a16.0571,16.0571,0,0,0,2.16528,12.12236c2.40572,3.46228,6.82664,5.623,10.95,4.74406,4.70707-1.00334,7.96817-5.59956,8.90127-10.32105s.00667-9.58929-.91854-14.31234Z"
                                        transform="translate(-154.35252 -77.40283)"
                                        fill="#2f2e41"
                                    />
                                    <path
                                        d="M691.24187,275.95964c-.47245-4.968-6.5585-8.02646-11.3179-6.52582s-7.88412,6.29289-8.82864,11.19307a16.05711,16.05711,0,0,0,2.16529,12.12236c2.40571,3.46228,6.82663,5.623,10.95,4.74406,4.70707-1.00334,7.96817-5.59955,8.90127-10.32105s.00667-9.58929-.91853-14.31234Z"
                                        transform="translate(-154.35252 -77.40283)"
                                        fill="#2f2e41"
                                    />
                                    <path
                                        d="M488.93638,356.14169a4.47525,4.47525,0,0,1-3.30664-1.46436L436.00767,300.544a6.02039,6.02039,0,0,0-4.42627-1.94727H169.3618a15.02615,15.02615,0,0,1-15.00928-15.00927V189.025a15.02615,15.02615,0,0,1,15.00928-15.00928H509.087A15.02615,15.02615,0,0,1,524.0963,189.025v94.5625A15.02615,15.02615,0,0,1,509.087,298.59676h-9.63135a6.01157,6.01157,0,0,0-6.00464,6.00489v47.0332a4.474,4.474,0,0,1-2.87011,4.1958A4.52563,4.52563,0,0,1,488.93638,356.14169Z"
                                        transform="translate(-154.35252 -77.40283)"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M488.93638,356.14169a4.47525,4.47525,0,0,1-3.30664-1.46436L436.00767,300.544a6.02039,6.02039,0,0,0-4.42627-1.94727H169.3618a15.02615,15.02615,0,0,1-15.00928-15.00927V189.025a15.02615,15.02615,0,0,1,15.00928-15.00928H509.087A15.02615,15.02615,0,0,1,524.0963,189.025v94.5625A15.02615,15.02615,0,0,1,509.087,298.59676h-9.63135a6.01157,6.01157,0,0,0-6.00464,6.00489v47.0332a4.474,4.474,0,0,1-2.87011,4.1958A4.52563,4.52563,0,0,1,488.93638,356.14169ZM169.3618,176.01571A13.024,13.024,0,0,0,156.35252,189.025v94.5625a13.024,13.024,0,0,0,13.00928,13.00927H431.5814a8.02436,8.02436,0,0,1,5.90039,2.59571l49.62208,54.1333a2.50253,2.50253,0,0,0,4.34716-1.69092v-47.0332a8.0137,8.0137,0,0,1,8.00464-8.00489H509.087a13.024,13.024,0,0,0,13.00928-13.00927V189.025A13.024,13.024,0,0,0,509.087,176.01571Z"
                                        transform="translate(-154.35252 -77.40283)"
                                        fill="#3f3d56"
                                    />
                                    <circle cx="36.81601" cy="125.19345" r="13.13371" fill="#6c63ff" />
                                    <path
                                        d="M493.76439,275.26947H184.68447a7.00465,7.00465,0,1,1,0-14.00929H493.76439a7.00465,7.00465,0,0,1,0,14.00929Z"
                                        transform="translate(-154.35252 -77.40283)"
                                        :fill="store.theme === 'dark' || store.isDarkMode ? '#888ea8' : '#e6e6e6'"
                                    />
                                    <path
                                        d="M393.07263,245.49973H184.68447a7.00465,7.00465,0,1,1,0-14.00929H393.07263a7.00464,7.00464,0,0,1,0,14.00929Z"
                                        transform="translate(-154.35252 -77.40283)"
                                        :fill="store.theme === 'dark' || store.isDarkMode ? '#888ea8' : '#e6e6e6'"
                                    />
                                    <path
                                        d="M709.41908,676.83065a4.474,4.474,0,0,1-2.87011-4.1958v-47.0332a6.01157,6.01157,0,0,0-6.00464-6.00489H690.913a15.02615,15.02615,0,0,1-15.00928-15.00927V510.025A15.02615,15.02615,0,0,1,690.913,495.01571H1030.6382a15.02615,15.02615,0,0,1,15.00928,15.00928v94.5625a15.02615,15.02615,0,0,1-15.00928,15.00927H768.4186a6.02039,6.02039,0,0,0-4.42627,1.94727l-49.62207,54.1333a4.47525,4.47525,0,0,1-3.30664,1.46436A4.52563,4.52563,0,0,1,709.41908,676.83065Z"
                                        transform="translate(-154.35252 -77.40283)"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M709.41908,676.83065a4.474,4.474,0,0,1-2.87011-4.1958v-47.0332a6.01157,6.01157,0,0,0-6.00464-6.00489H690.913a15.02615,15.02615,0,0,1-15.00928-15.00927V510.025A15.02615,15.02615,0,0,1,690.913,495.01571H1030.6382a15.02615,15.02615,0,0,1,15.00928,15.00928v94.5625a15.02615,15.02615,0,0,1-15.00928,15.00927H768.4186a6.02039,6.02039,0,0,0-4.42627,1.94727l-49.62207,54.1333a4.47525,4.47525,0,0,1-3.30664,1.46436A4.52563,4.52563,0,0,1,709.41908,676.83065ZM690.913,497.01571A13.024,13.024,0,0,0,677.9037,510.025v94.5625A13.024,13.024,0,0,0,690.913,617.59676h9.63135a8.0137,8.0137,0,0,1,8.00464,8.00489v47.0332a2.50253,2.50253,0,0,0,4.34716,1.69092l49.62208-54.1333a8.02436,8.02436,0,0,1,5.90039-2.59571h262.2196a13.024,13.024,0,0,0,13.00928-13.00927V510.025a13.024,13.024,0,0,0-13.00928-13.00928Z"
                                        transform="translate(-154.35252 -77.40283)"
                                        fill="#3f3d56"
                                    />
                                    <path
                                        d="M603.53027,706.11319a89.06853,89.06853,0,0,1-93.65039,1.49,54.12885,54.12885,0,0,1,9.40039-12.65,53.43288,53.43288,0,0,1,83.90967,10.56994C603.2998,705.71316,603.41992,705.91318,603.53027,706.11319Z"
                                        transform="translate(-154.35252 -77.40283)"
                                        fill="#6c63ff"
                                    />
                                    <circle cx="398.44256" cy="536.68841" r="44.20157" fill="#2f2e41" />
                                    <circle
                                        cx="556.81859"
                                        cy="629.4886"
                                        r="32.89806"
                                        transform="translate(-416.96496 738.72884) rotate(-61.33685)"
                                        fill="#ffb8b8"
                                    />
                                    <path
                                        d="M522.25039,608.79582a44.74387,44.74387,0,0,0,25.57085,7.9025,27.41946,27.41946,0,0,1-10.8677,4.47107,90.22316,90.22316,0,0,0,36.85334.20707,23.852,23.852,0,0,0,7.71488-2.64973,9.76352,9.76352,0,0,0,4.762-6.36865c.80855-4.61909-2.7907-8.81563-6.53113-11.64387a48.17616,48.17616,0,0,0-40.4839-8.08981c-4.52231,1.169-9.05265,3.144-11.99,6.77579s-3.80746,9.23076-1.0089,12.97052Z"
                                        transform="translate(-154.35252 -77.40283)"
                                        fill="#2f2e41"
                                    />
                                    <path
                                        d="M555.5,721.17319a89.97205,89.97205,0,1,1,48.5708-14.21875A89.87958,89.87958,0,0,1,555.5,721.17319Zm0-178a88.00832,88.00832,0,1,0,88,88A88.09957,88.09957,0,0,0,555.5,543.17319Z"
                                        transform="translate(-154.35252 -77.40283)"
                                        fill="#3f3d56"
                                    />
                                    <circle cx="563.81601" cy="445.19345" r="13.13371" fill="#6c63ff" />
                                    <path
                                        d="M1020.76439,595.26947H711.68447a7.00465,7.00465,0,1,1,0-14.00929h309.07992a7.00464,7.00464,0,0,1,0,14.00929Z"
                                        transform="translate(-154.35252 -77.40283)"
                                        :fill="store.theme === 'dark' || store.isDarkMode ? '#888ea8' : '#e6e6e6'"
                                    />
                                    <path
                                        d="M920.07263,565.49973H711.68447a7.00465,7.00465,0,1,1,0-14.00929H920.07263a7.00465,7.00465,0,0,1,0,14.00929Z"
                                        transform="translate(-154.35252 -77.40283)"
                                        :fill="store.theme === 'dark' || store.isDarkMode ? '#888ea8' : '#e6e6e6'"
                                    />
                                    <ellipse
                                        cx="554.64354"
                                        cy="605.66091"
                                        rx="24.50394"
                                        ry="2.71961"
                                        :fill="store.theme === 'dark' || store.isDarkMode ? '#888ea8' : '#e6e6e6'"
                                    />
                                    <ellipse
                                        cx="335.64354"
                                        cy="285.66091"
                                        rx="24.50394"
                                        ry="2.71961"
                                        :fill="store.theme === 'dark' || store.isDarkMode ? '#888ea8' : '#e6e6e6'"
                                    />
                                </svg>
                            </div>
                            <p class="flex justify-center bg-white-dark/20 p-2 font-semibold rounded-md w-[250px] mx-auto">Seleccione un grupo de preguntas</p>
                        </div>
                    </div>
                </template>

                <template v-if="isShowGroupQuestions && selectedGroupQuestions">
                    <div class="relative h-full">
                        <div class="flex justify-between items-center p-4">
                            <div class="flex items-center space-x-2 rtl:space-x-reverse">
                                <button type="button" class="xl:hidden hover:text-primary" @click="isShowGroupQuestions = !isShowGroupQuestions">
                                    <icon-menu />
                                </button>
                                <div class="mx-3">
                                    <p class="font-semibold">{{ selectedGroupQuestions.title }}</p>
                                </div>
                            </div>
                            <div class="flex sm:gap-5 gap-3">
                                <div class="dropdown">
                                    <Popper :placement="store.rtlClass === 'rtl' ? 'bottom-start' : 'bottom-end'" offsetDistance="0">
                                        <button
                                            type="button"
                                            class="bg-[#f4f4f4] dark:bg-[#1b2e4b] hover:bg-primary-light w-8 h-8 rounded-full !flex justify-center items-center"
                                        >
                                            <icon-horizontal-dots class="hover:text-primary rotate-90 opacity-70" />
                                        </button>
                                        <template #content="{ close }">
                                            <ul @click="close()" class="text-black dark:text-white-dark">
                                                <li>
                                                    <a href="javascript:;">
                                                        <icon-copy class="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 shrink-0" />
                                                        Duplicar
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:;">
                                                        <icon-trash-lines class="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 shrink-0" />
                                                        Eliminar
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:;">
                                                        <icon-settings class="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 shrink-0" />
                                                        Ajustes
                                                    </a>
                                                </li>
                                            </ul>
                                        </template>
                                    </Popper>
                                </div>
                            </div>
                        </div>

                        <div class="h-px w-full border-b border-[#e0e6ed] dark:border-[#1b2e4b]"></div>

                        <perfect-scrollbar class="relative h-full sm:h-[calc(100vh_-_300px)] question-form-box">
                            <div class="space-y-5 p-4 sm:pb-0 pb-[68px] sm:min-h-[300px] min-h-[400px]">
                                <template v-if="selectedGroupQuestions.title && selectedGroupQuestions.title.length">
                                    <Container v-model="questions" :group="{ name: 'questions' }" @change="handleOrderChange" class="space-y-4">
                                        <!-- Tarjeta de pregunta -->
                                        <Draggable
                                            v-for="(question, index) in questions"
                                            :key="question.id"
                                            :item="question"
                                            class="p-4 bg-white rounded-md shadow"
                                        >
                                            <div class="flex-justify-between items-center">
                                                <div class="font-bold">{{ question.question || 'Nueva Pregunta' }}</div>
                                                <div class="flex space-x-2">
                                                    <!-- Botón para duplicar pregunta -->
                                                    <button @click="duplicateQuestion(index)" class="text-blue-500">Duplicar</button>
                                                    <!-- Botón para eliminar pregunta -->
                                                    <button @click="removeQuestion(index)" class="text-red-500">Eliminar</button>
                                                </div>
                                            </div>

                                            <form class="mt-4 space-y-2">
                                                <!-- Title de la pregunta -->
                                                <div>
                                                    <label for="question" class="block text-sm font-medium text-gray-700">Pregunta</label>
                                                    <input
                                                        type="text"
                                                        v-model="question.question"
                                                        id="question"
                                                        placeholder="Escribe una pregunta"
                                                        class="mt-1 block w-full rounded-md border-x-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                        required
                                                    />
                                                </div>

                                                <!-- Tipo de pregunta -->
                                                <div>
                                                    <label for="type" class="block text-sm font-medium text-gray-700">Tipo de pregunta</label>
                                                    <select
                                                        v-model="question.type"
                                                        name="type"
                                                        id="type"
                                                        class="mt-1 block w-full rounded-md border-x-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                    >
                                                        <option value="text">Texto</option>
                                                        <option value="textarea">Área de texto</option>
                                                        <option value="radio">Radio</option>
                                                        <option value="checkbox">Checkbox</option>
                                                        <option value="select">Select</option>
                                                        <option value="email">Email</option>
                                                        <option value="number">Número</option>
                                                        <option value="date">Fecha</option>
                                                        <option value="time">Hora</option>
                                                        <option value="datetime">Fecha y hora</option>
                                                        <option value="url">URL</option>
                                                        <option value="tel">Teléfono</option>
                                                        <option value="password">Contraseña</option>
                                                    </select>
                                                </div>

                                                <!-- Input del orden -->
                                                <div>
                                                    <label for="order" class="block text-sm font-medium text-gray-700">Orden</label>
                                                    <input
                                                        v-model="question.order"
                                                        type="number"
                                                        id="order"
                                                        placeholder="Orden"
                                                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                        required
                                                    />
                                                </div>

                                                <!-- Checkbox para requerido -->
                                                <div class="flex items-center">
                                                    <input
                                                        v-model="question.required"
                                                        type="checkbox"
                                                        id="required"
                                                        class="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                                    />
                                                    <label for="required" class="ml-2 block text-sm font-medium text-gray-700">¿Es obligatorio?</label>
                                                </div>

                                                <!-- Opciones adicionales (para radio, checkbox, select) -->
                                                <div v-if="['radio', 'checkbox', 'select'].includes(question.type)">
                                                    <label for="options" class="block text-sm font-medium text-gray-700">Opciones</label>
                                                    <div
                                                        v-for="(option, optIndex) in question.type"
                                                        :key="optIndex"
                                                        class="flex space-x-2 items-center mt-1"
                                                    >
                                                        <input
                                                            type="text"
                                                            v-model="question.type"
                                                            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                            placeholder="Opción"
                                                        />
                                                        <button @click="removeOption(index, optIndex)" class="text-red-500">Eliminar</button>
                                                    </div>
                                                    <button @click="addOption(index)" class="mt-2 text-blue-500">Añadir Opción</button>
                                                </div>
                                            </form>
                                        </Draggable>
                                    </Container>

                                    <!-- Botón para añadir una nueva pregunta -->
                                    <button
                                        @click="addNewQuestion"
                                        class="mt-6 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Añadir Pregunta
                                    </button>
                                </template>
                            </div>
                        </perfect-scrollbar>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import { useAppStore } from '@/stores/index';
    import { useMeta } from '@/composables/use-meta';

    import IconHorizontalDots from '@/components/icon/icon-horizontal-dots.vue';
    import IconSettings from '@/components/icon/icon-settings.vue';
    import IconMenu from '@/components/icon/icon-menu.vue';
    import IconCopy from '@/components/icon/icon-copy.vue';
    import IconTrashLines from '@/components/icon/icon-trash-lines.vue';
    import { useRoute } from 'vue-router';
    import { useGetGroupQuestions } from './actions/getGroupQuestions';
    import { GroupQuestions, Question } from './types/group-questions';
    import { useGetQuestions } from './actions/getQuestions';

    import { Container, Draggable } from 'vue-dndrop';

    useMeta({ title: 'Configurar encuesta' });

    const { getGroupQuestions, groupQuestions, survey, isLoadingFetchGroupQuestions } = useGetGroupQuestions();
    const { getQuestions, questions, isLoadingQuestions } = useGetQuestions();

    const route = useRoute();
    const surveyId = parseInt(route.params.id as string);

    const store = useAppStore();
    const isShowGroupQuestions = ref(false);
    const isShowGroupQuestionsMenu = ref(false);

    const selectedGroupQuestions = ref<GroupQuestions>({} as GroupQuestions);

    const selectGroupQuestion = async (groupQuestion: GroupQuestions) => {
        if (!groupQuestion.id) return;
        selectedGroupQuestions.value = groupQuestion;
        isShowGroupQuestions.value = true;
        await getQuestions(groupQuestion.id);
        scrollToBottom();
        isShowGroupQuestionsMenu.value = false;
    };

    const saveQuestion = () => {
        if (true) {
            // TODO SAVE QUESTION TO DATABASE
            scrollToBottom();
        }
    };

    const scrollToBottom = () => {
        if (isShowGroupQuestions.value) {
            setTimeout(() => {
                const element: any = document.querySelector('.question-form-box');
                element.behavior = 'smooth';
                element.scrollTop = element.scrollHeight;
            });
        }
    };

    const addNewQuestion = () => {
        const newQuestion = ref<Question>({
            question: '',
            type: 'text',
            order: (questions.value.length + 1).toString(),
            required: false,
            group_questions_id: selectedGroupQuestions.value.id,
        });
        // TODO ADD NEW QUESTION TO DATABASE
    };

    const duplicateQuestion = (index: number) => {
        // TODO
    };

    const removeQuestion = (index: number) => {
        // TODO
    };

    const handleOrderChange = () => {
        // TODO
    };

    const addOption = (questionIndex: number) => {
        // TODO
    }

    const removeOption = (questionIndex: number, optionIndex: number) => {
        // TODO
    }

    onMounted(async () => {
        await getGroupQuestions(surveyId);
    });
</script>
