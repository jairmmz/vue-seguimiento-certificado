<template>
    <div>
        <div class="absolute inset-0">
            <img src="/assets/images/auth/bg-gradient.png" alt="image" class="h-full w-full object-cover" />
        </div>
        <div
            class="relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16"
        >
            <img src="/assets/images/auth/coming-soon-object1.png" alt="image" class="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2" />
            <img src="/assets/images/auth/coming-soon-object2.png" alt="image" class="absolute left-24 top-0 h-40 md:left-[30%]" />
            <img src="/assets/images/auth/coming-soon-object3.png" alt="image" class="absolute right-0 top-0 h-[300px]" />
            <img src="/assets/images/auth/polygon-object.svg" alt="image" class="absolute bottom-0 end-[28%]" />
            <div
                class="relative flex w-full max-w-[1502px] flex-col justify-between overflow-hidden rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 lg:min-h-[758px] lg:flex-row lg:gap-10 xl:gap-0"
            >
                <div
                    class="relative hidden w-full items-center justify-center bg-[linear-gradient(225deg,rgba(239,18,98,1)_0%,rgba(67,97,238,1)_100%)] p-5 lg:inline-flex lg:max-w-[835px] xl:-ms-28 ltr:xl:skew-x-[14deg] rtl:xl:skew-x-[-14deg]"
                >
                    <div
                        class="absolute inset-y-0 w-8 from-primary/10 via-transparent to-transparent ltr:-right-10 ltr:bg-gradient-to-r rtl:-left-10 rtl:bg-gradient-to-l xl:w-16 ltr:xl:-right-20 rtl:xl:-left-20"
                    ></div>
                    <div class="ltr:xl:-skew-x-[14deg] rtl:xl:skew-x-[14deg]">
                        <router-link to="/" class="w-48 block lg:w-72 ms-10">
                            <img src="/assets/images/auth/logo-white.svg" alt="Logo" class="w-full" />
                        </router-link>
                        <div class="mt-24 hidden w-full max-w-[430px] lg:block">
                            <img src="/assets/images/auth/reset-password.svg" alt="Cover Image" class="w-full" />
                        </div>
                    </div>
                </div>
                <div class="relative flex w-full flex-col items-center justify-center gap-6 px-4 pb-16 pt-6 sm:px-6 lg:max-w-[667px]">
                    <div class="w-full max-w-[440px] lg:mt-16">
                        <div class="mb-7">
                            <h1 class="mb-3 text-2xl font-bold !leading-snug dark:text-white">
                                Restablecer contraseña
                                <span
                                    v-if="isLodingValidatePasswordResetToken"
                                    class="animate-spin border-2 border-black dark:border-white border-l-transparent rounded-full w-5 h-5 ltr:mr-4 rtl:ml-4 inline-block align-middle"
                                >
                                </span>
                            </h1>
                            <p>Introduce tu correo electrónico para recuperar tu cuenta</p>
                        </div>
                        <form class="space-y-5" @submit.prevent="handlePasswordReset()">
                            <div>
                                <label for="customPassword">Nueva contraseña</label>
                                <input id="customPassword" type="password" class="form-input" v-model="form.password" />
                                <template v-if="isSubmitForm && !$v4.form.password.$error">
                                    <p class="text-[#1abc9c] mt-1">¡Se ve bien!</p>
                                </template>
                                <template v-if="isSubmitForm && $v4.form.password.$error">
                                    <p class="text-danger mt-1">
                                        {{
                                            $v4.form.password.minLength.$invalid
                                                ? 'La contraseña debe tener al menos 6 caracteres'
                                                : 'La nueva contraseña es requerida'
                                        }}
                                    </p>
                                </template>
                            </div>
                            <div>
                                <label for="customPasswordConfirmation">Confirmar contraseña</label>
                                <input id="customPasswordConfirmation" type="password" class="form-input" v-model="form.password_confirmation" />
                                <template v-if="isSubmitForm && !$v4.form.password_confirmation.$error">
                                    <p class="text-[#1abc9c] mt-1">¡Se ve bien!</p>
                                </template>
                                <!-- Required -->
                                <template v-if="isSubmitForm && $v4.form.password_confirmation.$error">
                                    <p class="text-danger mt-1">
                                        {{ $v4.form.password_confirmation.required.$invalid ? 'La confirmación de la contraseña es requerida' : '' }}
                                    </p>
                                </template>

                                <!-- Min Length -->
                                <template v-if="isSubmitForm && $v4.form.password_confirmation.$error">
                                    <p class="text-danger mt-1">
                                        {{ $v4.form.password_confirmation.minLength.$invalid ? 'La contraseña debe tener al menos 6 caracteres' : '' }}
                                    </p>
                                </template>

                                <!-- Same As -->
                                <template v-if="isSubmitForm && $v4.form.password_confirmation.$error">
                                    <p class="text-danger mt-1">
                                        {{ $v4.form.password_confirmation.sameAs.$invalid ? 'Las contraseñas no coinciden' : '' }}
                                    </p>
                                </template>
                            </div>
                            <button type="submit" class="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                                <span
                                    v-if="isLodingResetPassword"
                                    class="animate-spin border-2 border-white border-l-transparent rounded-full w-5 h-5 ltr:mr-4 rtl:ml-4 inline-block align-middle"
                                >
                                </span>
                                <span>{{ isLodingResetPassword ? 'Cambiando...' : 'Cambiar' }}</span>
                            </button>
                        </form>
                    </div>
                    <p class="absolute bottom-6 w-full text-center dark:text-white">© {{ new Date().getFullYear() }}. UNAMBA todos los derechos reservados.</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import { computed, onMounted, ref } from 'vue';
    import { useMeta } from '@/composables/use-meta';
    import { ResetPassword } from './types/auth';
    import { useResetPassword } from './actions/resetPassword';
    import { useVuelidate } from '@vuelidate/core';
    import { minLength, required, sameAs } from '@vuelidate/validators';
    import { useValidatePasswordResetToken } from './actions/validatePasswordResetToken';
    import { useRoute } from 'vue-router';

    useMeta({ title: 'Restablecer contraseña' });

    const { resetPassword, isLodingResetPassword } = useResetPassword();
    const { validatePasswordResetToken, isLodingValidatePasswordResetToken } = useValidatePasswordResetToken();

    const route = useRoute();

    const token = route.query.token as string;
    const email = route.query.email as string;

    const form = ref<ResetPassword>({} as ResetPassword);
    const isSubmitForm = ref(false);

    const rulesPassword = {
        form: {
            password: { required, minLength: minLength(6) },
            password_confirmation: {
                required,
                minLength: minLength(6),
                sameAs: sameAs(computed(() => form.value.password)),
            },
        },
    };

    const $v4 = useVuelidate(rulesPassword, { form });

    const handlePasswordReset = async () => {
        isSubmitForm.value = true;
        $v4.value.form.$touch();
        if ($v4.value.form.$invalid) {
            return false;
        }

        form.value.email = email;
        form.value.token = token;

        await resetPassword(form.value);
    };

    const loadValidatePasswordResetToken = async () => {
        await validatePasswordResetToken({ token, email });
    };

    onMounted(() => {
        loadValidatePasswordResetToken();
    });
</script>
