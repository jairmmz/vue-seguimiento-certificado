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
                class="relative w-full max-w-[870px] rounded-md bg-[linear-gradient(45deg,#fff9f9_0%,rgba(255,255,255,0)_25%,rgba(255,255,255,0)_75%,_#fff9f9_100%)] p-2 dark:bg-[linear-gradient(52.22deg,#0E1726_0%,rgba(14,23,38,0)_18.66%,rgba(14,23,38,0)_51.04%,rgba(14,23,38,0)_80.07%,#0E1726_100%)]"
            >
                <div class="relative flex flex-col justify-center rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 px-6 lg:min-h-[758px] py-20">
                    <div class="mx-auto w-full max-w-[440px]">
                        <div class="mb-10">
                            <h1 class="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">Inicio de sesión</h1>
                            <p class="text-base font-bold leading-normal text-white-dark">
                                Ingrese su correo electrónico y contraseña para acceder al panel de administración.
                            </p>
                        </div>
                        <form class="space-y-5 dark:text-white" @submit.prevent="handleLogin">
                            <div>
                                <label for="email">Correo electrónico</label>
                                <div class="relative text-white-dark">
                                    <input
                                        id="email"
                                        v-model="form.email"
                                        type="email"
                                        placeholder="Ingrese su correo electrónico"
                                        class="form-input ps-10 placeholder:text-white-dark"
                                        required
                                        autocomplete="email"
                                    />
                                    <span class="absolute start-4 top-1/2 -translate-y-1/2">
                                        <icon-mail :fill="true" />
                                    </span>
                                </div>
                            </div>
                            <div>
                                <label for="password">Contraseña</label>
                                <div class="relative text-white-dark">
                                    <input
                                        id="password"
                                        v-model="form.password"
                                        type="password"
                                        placeholder="Ingrese su contraseña"
                                        class="form-input ps-10 placeholder:text-white-dark"
                                    />
                                    <span class="absolute start-4 top-1/2 -translate-y-1/2">
                                        <icon-lock-dots :fill="true" />
                                    </span>
                                </div>
                            </div>
                            <button type="submit" class="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                                <span
                                    v-if="isLoading"
                                    class="animate-spin border-2 border-white border-l-transparent rounded-full w-5 h-5 ltr:mr-4 rtl:ml-4 inline-block align-middle"
                                >
                                </span>
                                <span>{{ isLoading ? 'Cargando...' : 'Iniciar sesión' }}</span>
                            </button>
                            <div>
                                <label class="text-center mt-4">
                                    <router-link :to="{ name: 'cover-password-reset' }" class="text-primary hover:underline">Recuperar contraseña</router-link>
                                </label>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import { ref } from 'vue';
    import { useMeta } from '@/composables/use-meta';
    import IconMail from '@/components/icon/icon-mail.vue';
    import IconLockDots from '@/components/icon/icon-lock-dots.vue';
    import { Login } from './types/auth';
    import { useLogin } from './actions/login';
    import { storeToRefs } from 'pinia';
    import { useAuthStore } from '@/stores/auth';

    useMeta({ title: 'Inicio de sesión' });
    const { login } = useLogin();
    const { isLoading } = storeToRefs(useAuthStore());

    const form = ref<Login>({} as Login);

    const handleLogin = () => {
        login(form.value);
    };
</script>
