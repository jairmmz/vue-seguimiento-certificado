import { useToast } from 'vue-toast-notification';

const toast = useToast();

export function messageError(message: string): void {
    toast.error(message, {
        position: 'bottom-right',
        duration: 4000,
        dismissible: true,
    });
}

export function messageSuccess(message: string): void {
    toast.success(message, {
        position: 'bottom-right',
        duration: 4000,
        dismissible: true,
    });
}

export function messageWarning(message: string): void {
    toast.warning(message, {
        position: 'bottom-right',
        duration: 4000,
        dismissible: true,
    });
}

export function messageInfo(message: string): void {
    toast.info(message, {
        position: 'bottom-right',
        duration: 4000,
        dismissible: true,
    });
}