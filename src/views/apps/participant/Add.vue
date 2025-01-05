<template>
    <ul class="flex space-x-2 pb-4 rtl:space-x-reverse">
        <li>
            <router-link :to="{ name: 'participant-index' }" class="text-primary hover:underline">Participantes</router-link>
        </li>
        <li class="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
            <span>Añadir</span>
        </li>
    </ul>
    <div class="panel p-5">
        <h1 class="font-semibold text-2xl border-b-2 mb-4">
            {{ participantId ? 'Editar participante' : 'Crear participante' }}
            <span
                v-if="isLoadingFetch"
                class="animate-spin border-2 border-white border-l-transparent rounded-full w-5 h-5 ltr:mr-4 rtl:ml-4 inline-block align-middle"
            >
            </span>
        </h1>
        <form class="space-y-5" @submit.prevent="submitForm()">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div :class="{ 'has-error': $v4.form.name.$error, 'has-success': isSubmitForm && !$v4.form.name.$error }">
                    <label for="customName">Nombres</label>
                    <input id="customName" type="text" class="form-input" v-model="form.name" />
                    <template v-if="isSubmitForm && !$v4.form.name.$error">
                        <p class="text-[#1abc9c] mt-1">¡Se ve bien!</p>
                    </template>
                    <template v-if="isSubmitForm && $v4.form.name.$error">
                        <p class="text-danger mt-1">Por favor ingrese los nombres</p>
                    </template>
                </div>
                <div :class="{ 'has-error': $v4.form.last_name.$error, 'has-success': isSubmitForm && !$v4.form.last_name.$error }">
                    <label for="customLastName">Apellidos</label>
                    <input id="customLastName" type="text" class="form-input" v-model="form.last_name" />
                    <template v-if="isSubmitForm && !$v4.form.last_name.$error">
                        <p class="text-[#1abc9c] mt-1">¡Se ve bien!</p>
                    </template>
                    <template v-if="isSubmitForm && $v4.form.last_name.$error">
                        <p class="text-danger mt-1">Por favor ingrese los apellidos</p>
                    </template>
                </div>
                <div :class="{ 'has-error': $v4.form.identification.$error, 'has-success': isSubmitForm && !$v4.form.identification.$error }">
                    <label for="customeEmail">Identification (DNI/CI)</label>
                    <input
                        id="customeEmail"
                        type="text"
                        class="form-input ltr:rounded-l-none rtl:rounded-r-none"
                        v-model="form.identification"
                    />
                    <template v-if="isSubmitForm && !$v4.form.identification.$error">
                        <p class="text-[#1abc9c] mt-1">¡Se ve bien!</p>
                    </template>
                    <template v-if="isSubmitForm && $v4.form.identification.$error">
                        <p class="text-danger mt-1">Por favor ingrese la identificación</p>
                    </template>
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div class="md:col-span-2" :class="{ 'has-error': $v4.form.email.$error, 'has-success': isSubmitForm && !$v4.form.email.$error }">
                    <label for="customeEmail">Email</label>
                    <input id="customeEmail" type="text" class="form-input" v-model="form.email" />
                    <template v-if="isSubmitForm && !$v4.form.email.$error">
                        <p class="text-[#1abc9c] mt-1">¡Se ve bien!</p>
                    </template>
                    <template v-if="isSubmitForm && $v4.form.email.$error">
                        <p class="text-danger mt-1">Ingrese el correo electrónico válido</p>
                    </template>
                </div>
                <div :class="{ 'has-error': $v4.form.phone.$error, 'has-success': isSubmitForm && !$v4.form.phone.$error }">
                    <label for="customePhone">N° de celular</label>
                    <input id="customePhone" type="text" class="form-input" v-model="form.phone" />
                    <template v-if="isSubmitForm && !$v4.form.phone.$error">
                        <p class="text-[#1abc9c] mt-1">¡Se ve bien!</p>
                    </template>
                    <template v-if="isSubmitForm && $v4.form.phone.$error">
                        <p v-if="$v4.form.phone.integer.$invalid" class="text-danger mt-1">El n° de celular debe contener números</p>
                        <p v-if="$v4.form.phone.minLength.$invalid" class="text-danger mt-1">El n° de celular debe contener al menos 9 dígitos</p>
                    </template>
                </div>
            </div>
            <div class="ltr:text-right rtl:text-left flex justify-start items-center mt-8">
                <router-link :to="{ name: 'participant-index' }" class="btn btn-outline-danger">Cancelar</router-link>
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
    import { Participant } from './types/participant';
    import { useCreateParticipant } from './actions/createParticipant';
    import { storeToRefs } from 'pinia';
    import { useParticipantStore } from './store/participant';
    import { useRoute } from 'vue-router';
    import { useGetParticipant } from './actions/getParticipant';
    import { useUpdateParticipant } from './actions/updateParticipant';
    import { useVuelidate } from '@vuelidate/core';
    import { required, email, integer, minLength } from '@vuelidate/validators';

    useMeta({ title: 'Participante' });

    const { createParticipant } = useCreateParticipant();
    const { updateParticipant } = useUpdateParticipant();
    const { getParticipant, participant, isLoadingFetch } = useGetParticipant();
    const { isLoadingSave } = storeToRefs(useParticipantStore());
    const route = useRoute();

    const participantId = parseInt(route.params.id as string);
    const form = ref<Participant>({} as Participant);

    const isSubmitForm = ref(false);
    const rules = {
        form: {
            name: { required },
            last_name: { required },
            identification: { required, integer },
            email: { email },
            phone: { integer, minLength: minLength(9) },
        },
    };

    const $v4 = useVuelidate(rules, { form });

    const loadParticipantData = async (id: number) => {
        await getParticipant(id);
        if (participant) {
            form.value = {
                id: participant.value.id,
                name: participant.value.name,
                last_name: participant.value.last_name,
                identification: participant.value.identification,
                email: participant.value.email,
                phone: participant.value.phone,
            };
            console.log(participant);
        }
    };

    const submitForm = async () => {
        isSubmitForm.value = true;
        $v4.value.form.$touch();
        if ($v4.value.form.$invalid) {
            return false;
        }
        if (participantId) {
            await updateParticipant(form.value);
        } else {
            await createParticipant(form.value);
        }
        console.log(form.value);
    };

    onMounted(() => {
        if (participantId) {
            loadParticipantData(participantId);
        }
    });
</script>

<style scoped></style>
