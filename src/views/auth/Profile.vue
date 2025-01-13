<template>
    <ul class="flex space-x-2 pb-4 rtl:space-x-reverse">
        <li>
            <router-link :to="{ name: 'home-admin' }" class="text-primary hover:underline">Menú</router-link>
        </li>
        <li class="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
            <span>Perfil</span>
        </li>
    </ul>
    <div class="panel p-5 my-5">
        <h1 class="font-semibold text-2xl border-b-2 mb-4">Perfil de usuario</h1>
        <form class="space-y-5" @submit.prevent="submitUpdateProfile()" autocomplete="off" novalidate>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                    <label for="customName">Nombre de usuario</label>
                    <input id="customName" type="text" class="form-input" v-model="formProfile.name" />
                    <template v-if="isSubmitFormProfile && !$v4Profile.formProfile.name.$error">
                        <p class="text-[#1abc9c] mt-1">¡Se ve bien!</p>
                    </template>
                    <template v-if="isSubmitFormProfile && $v4Profile.formProfile.name.$error">
                        <p class="text-danger mt-1">Por favor ingrese nombre del curso</p>
                    </template>
                </div>
                <div>
                    <label for="customEmail">Correo electrónico</label>
                    <input id="customEmail" type="email" class="form-input" v-model="formProfile.email" />
                    <template v-if="isSubmitFormProfile && !$v4Profile.formProfile.email.$error">
                        <p class="text-[#1abc9c] mt-1">¡Se ve bien!</p>
                    </template>
                    <template v-if="isSubmitFormProfile && $v4Profile.formProfile.email.$error">
                        <p class="text-danger mt-1">Por favor ingrese el correo electrónico</p>
                    </template>
                </div>
            </div>

            <button type="submit" class="btn btn-primary" :disabled="isLoadingSaveProfile">
                <span
                    v-if="isLoadingSaveProfile"
                    class="animate-spin border-2 border-white border-l-transparent rounded-full w-5 h-5 ltr:mr-4 rtl:ml-4 inline-block align-middle"
                >
                </span>
                <span>{{ isLoadingSaveProfile ? 'Guardando...' : 'Guardar' }}</span>
            </button>
        </form>
    </div>

    <div class="panel p-5">
        <h1 class="font-semibold text-2xl border-b-2 mb-4">Cambiar contraseña</h1>
        <form class="space-y-5" @submit.prevent="submitUpdatePasswordProfile()" autocomplete="off" novalidate>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                    <label for="customCurrent_password">Contraseña actual</label>
                    <input id="customCurrent_password" type="password" class="form-input" v-model="formPassword.current_password" />
                    <template v-if="isSubmitFormPassword && !$v4Password.formPassword.current_password.$error">
                        <p class="text-[#1abc9c] mt-1">¡Se ve bien!</p>
                    </template>
                    <template v-if="isSubmitFormPassword && $v4Password.formPassword.current_password.$error">
                        <p class="text-danger mt-1">La contraseña actual es requerida</p>
                    </template>
                </div>
                <div>
                    <label for="customPassword">Nueva contraseña</label>
                    <input id="customPassword" type="password" class="form-input" v-model="formPassword.password" />
                    <template v-if="isSubmitFormPassword && !$v4Password.formPassword.password.$error">
                        <p class="text-[#1abc9c] mt-1">¡Se ve bien!</p>
                    </template>
                    <template v-if="isSubmitFormPassword && $v4Password.formPassword.password.$error">
                        <p class="text-danger mt-1">
                            {{
                                $v4Password.formPassword.password.minLength.$invalid
                                    ? 'La contraseña debe tener al menos 6 caracteres'
                                    : 'La nueva contraseña es requerida'
                            }}
                        </p>
                    </template>
                </div>
                <div>
                    <label for="customPasswordConfirmation">Confirmar contraseña</label>
                    <input id="customPasswordConfirmation" type="password" class="form-input" v-model="formPassword.password_confirmation" />
                    <template v-if="isSubmitFormPassword && !$v4Password.formPassword.password_confirmation.$error">
                        <p class="text-[#1abc9c] mt-1">¡Se ve bien!</p>
                    </template>
                    <!-- Required -->
                    <template v-if="isSubmitFormPassword && $v4Password.formPassword.password_confirmation.$error">
                        <p class="text-danger mt-1">{{ $v4Password.formPassword.password_confirmation.required.$invalid ? 'La confirmación de la contraseña es requerida' : '' }}</p>
                    </template>


                    <!-- Min Length -->
                    <template v-if="isSubmitFormPassword && $v4Password.formPassword.password_confirmation.$error">
                        <p class="text-danger mt-1">
                            {{
                                $v4Password.formPassword.password_confirmation.minLength.$invalid
                                    ? 'La contraseña debe tener al menos 6 caracteres'
                                    : ''
                            }}
                        </p>
                    </template>

                    <!-- Same As -->
                    <template v-if="isSubmitFormPassword && $v4Password.formPassword.password_confirmation.$error">
                        <p class="text-danger mt-1">
                            {{ $v4Password.formPassword.password_confirmation.sameAs.$invalid ? 'Las contraseñas no coinciden' : '' }}
                        </p>
                    </template>
                </div>
            </div>
            <button type="submit" class="btn btn-primary" :disabled="isLoadingSavePassword">
                <span
                    v-if="isLoadingSavePassword"
                    class="animate-spin border-2 border-white border-l-transparent rounded-full w-5 h-5 ltr:mr-4 rtl:ml-4 inline-block align-middle"
                >
                </span>
                <span>{{ isLoadingSavePassword ? 'Guardando...' : 'Guardar' }}</span>
            </button>
        </form>
    </div>
</template>

<script setup lang="ts">
    import { useMeta } from '@/composables/use-meta';
    import { computed, onMounted, ref } from 'vue';
    import { storeToRefs } from 'pinia';
    import { useVuelidate } from '@vuelidate/core';
    import { email, minLength, required, sameAs } from '@vuelidate/validators';
    import { useUpdateProfileUser } from './actions/updateProfileUser';
    import { useUpdatePasswordUser } from './actions/updatePasswordUser';
    import { useAuthStore } from '@/stores/auth';
    import { UserPasswordUpdate, UserProfileUpdate } from './types/auth';

    useMeta({ title: 'Perfil de usuario' });

    const { updateProfileUser, isLoadingSaveProfile } = useUpdateProfileUser();
    const { updatePasswordUser, isLoadingSavePassword, isSaveChangePassword } = useUpdatePasswordUser();
    const { user } = storeToRefs(useAuthStore());

    const formProfile = ref<UserProfileUpdate>({} as UserProfileUpdate);
    const formPassword = ref<UserPasswordUpdate>({} as UserPasswordUpdate);

    const isSubmitFormProfile = ref(false);
    const isSubmitFormPassword = ref(false);

    const rulesProfile = {
        formProfile: {
            name: { required },
            email: { required, email },
        },
    };

    const rulesPassword = {
        formPassword: {
            current_password: { required },
            password: { required, minLength: minLength(6) },
            password_confirmation: {
                required,
                minLength: minLength(6),
                sameAs: sameAs(computed(() => formPassword.value.password)),
            },
        },
    };

    const $v4Profile = useVuelidate(rulesProfile, { formProfile });
    const $v4Password = useVuelidate(rulesPassword, { formPassword });

    const submitUpdateProfile = async () => {
        isSubmitFormProfile.value = true;
        $v4Profile.value.formProfile.$touch();
        if ($v4Profile.value.formProfile.$invalid) {
            return false;
        }

        await updateProfileUser(formProfile.value);

        loadUser();
    };

    const submitUpdatePasswordProfile = async () => {
        isSubmitFormPassword.value = true;
        $v4Password.value.formPassword.$touch();
        if ($v4Password.value.formPassword.$invalid) {
            return false;
        }

        await updatePasswordUser(formPassword.value);

        if (isSaveChangePassword.value) {
            formPassword.value = {} as UserPasswordUpdate;
            isSubmitFormPassword.value = false;
            $v4Password.value.$reset();
        }
    };

    const loadUser = () => {
        formProfile.value = { ...user.value };
    };

    onMounted(() => {
        loadUser();
    });
</script>

<style scoped></style>
