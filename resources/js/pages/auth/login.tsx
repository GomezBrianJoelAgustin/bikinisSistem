import { Head, Link, useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { store } from '@/routes/login';
import { register } from '@/routes';
import { request } from '@/routes/password';
import { cn } from '@/lib/utils';

type LoginFormData = {
    email: string;
    password: string;
    remember: boolean;
};

export interface LoginPageProps {
    status?: string;
    canResetPassword?: boolean;
}

export default function Login({ status, canResetPassword }: LoginPageProps) {
    const { data, setData, errors, processing, reset, recentlySuccessful, submit } = useForm<LoginFormData>({
        email: '',
        password: '',
        remember: false,
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        submit('post', '/login', {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: () => {},
        });
    };

    return (
        <>
            <Head title="Iniciar sesión - Arenea" />
            <div className="relative min-h-screen w-full flex items-center justify-center px-6 py-12">
                {/* Fondo único cubriendo todo el viewport */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070&auto=format&fit=crop"
                        alt=""
                        className="w-full h-full object-cover"
                        aria-hidden="true"
                        loading="lazy"
                        decoding="async"
                    />
                    <div className="absolute inset-0 bg-black/[20] dark:bg-black/[40]" />
                </div>

                <div className="relative z-10 w-full max-w-[1300px]">
                    {/* Split layout: dos tarjetas blancas lado a lado */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center min-h-[600px]">
                        {/* Tarjeta izquierda: Marca y estética Arenea */}
                        <div className="rounded-2xl border border-white/20 bg-white/90 backdrop-blur-md p-8 md:p-16 shadow-2xl dark:border-neutral-800/50 dark:bg-neutral-900/80 flex flex-col items-center text-center lg:text-start lg:items-start h-full">
                            <Link
                                href="/"
                                className="flex items-center gap-1 mb-6 font-serif text-5xl font-bold text-neutral-900 dark:text-white tracking-tighter"
                                aria-label="Arenea"
                            >
                                Are<span className="text-red-600 dark:text-red-500">nea</span>
                            </Link>
                            <h2 className="font-serif text-3xl font-bold text-neutral-900 dark:text-white tracking-tight mb-6 lg:text-4xl">
                                Bienvenida a tu cuenta
                            </h2>
                            <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-10 lg:mb-12">
                                Accede a Arenea y descubre nuestra colección de bikinis y trajes de baño diseñados para el verano.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6 items-center lg:items-start">
                                <div className="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400">
                                    <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
                                    Envíos gratis en compras +$100.000
                                </div>
                                <div className="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400">
                                    <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
                                    3 y 6 cuotas sin interés
                                </div>
                            </div>
                        </div>

                        {/* Tarjeta derecha: Formulario de acceso */}
                        <div className="rounded-2xl border border-neutral-200 bg-white p-8 md:p-16 shadow-2xl dark:border-neutral-800 dark:bg-neutral-900 w-full max-w-md lg:max-w-none">
                            {/* Estado de éxito */}
                            {recentlySuccessful && (
                                <div className="mb-6 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700 dark:bg-green-900/20 dark:text-green-400">
                                    Sesión iniciada correctamente.
                                </div>
                            )}

                            {/* Mensaje de estado */}
                            {status && (
                                <div className="mb-6 rounded-lg bg-blue-50 px-4 py-3 text-sm text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
                                    {status}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Campo Email */}
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="font-serif text-base font-semibold text-neutral-900 dark:text-neutral-100">
                                        Correo electrónico
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                        autoFocus
                                        autoComplete="email"
                                        placeholder="tu@email.com"
                                        className={cn(
                                            'border-neutral-200 text-neutral-900 placeholder:text-neutral-400 dark:border-neutral-800 dark:text-white dark:placeholder-neutral-500',
                                            errors.email && 'border-red-600 dark:border-red-500'
                                        )}
                                    />
                                    {errors.email && (
                                        <InputError message={errors.email as string} />
                                    )}
                                </div>

                                {/* Campo Contraseña */}
                                <div className="space-y-2 flex flex-col">
                                    <div className="flex items-center justify-between">
                                        <Label
                                            htmlFor="password"
                                            className="font-serif text-base font-semibold text-neutral-900 dark:text-neutral-100"
                                        >
                                            Contraseña
                                        </Label>
                                        {canResetPassword && (
                                            <TextLink
                                                href={request()}
                                                className="text-xs font-medium text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400 transition-colors"
                                            >
                                                ¿Olvidaste tu contraseña?
                                            </TextLink>
                                        )}
                                    </div>
                                    <PasswordInput
                                        id="password"
                                        name="password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        required
                                        autoComplete="current-password"
                                        placeholder="••••••••"
                                        className={cn(
                                            'border-neutral-200 text-neutral-900 placeholder:text-neutral-400 dark:border-neutral-800 dark:text-white dark:placeholder-neutral-500',
                                            errors.password && 'border-red-600 dark:border-red-500'
                                        )}
                                    />
                                    {errors.password && (
                                        <InputError message={errors.password as string} />
                                    )}
                                </div>

                                {/* Recordarme */}
                                <div className="flex items-center space-x-3">
                                    <Checkbox
                                        id="remember"
                                        name="remember"
                                        checked={data.remember as boolean}
                                        onCheckedChange={(checked) => setData('remember', checked as boolean)}
                                    />
                                    <Label htmlFor="remember" className="text-sm text-neutral-600 dark:text-neutral-400 cursor-pointer">
                                        Recordarme
                                    </Label>
                                </div>

                                {/* Botón principal */}
                                <Button
                                    type="submit"
                                    className={cn(
                                        'w-full mt-2 text-sm font-semibold uppercase tracking-wider bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-500 shadow-lg',
                                        processing && 'opacity-70'
                                    )}
                                    disabled={processing}
                                >
                                    {processing ? (
                                        <>
                                            <Spinner className="size-4 mr-2" />
                                            Iniciando sesión...
                                        </>
                                    ) : (
                                        'Iniciar sesión'
                                    )}
                                </Button>
                            </form>

                            {/* Registro */}
                            <div className="mt-8 text-center text-sm text-neutral-500 dark:text-neutral-400">
                                ¿No tienes cuenta?{' '}
                                <Link
                                    href={register()}
                                    className="font-semibold text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400 transition-colors"
                                >
                                    Regístrate aquí
                                </Link>
                            </div>

                            {/* Separador */}
                            <div className="mt-8 relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-neutral-200 dark:border-neutral-800"></span>
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-white px-2 text-neutral-500 dark:bg-neutral-900 dark:text-neutral-400">
                                        O continúa con
                                    </span>
                                </div>
                            </div>

                            {/* Botones sociales */}
                            <div className="mt-4 grid grid-cols-2 gap-3">
                                <Button
                                    variant="outline"
                                    className="w-full h-11 text-sm font-medium border-neutral-200 hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-800/50"
                                    asChild
                                >
                                    <Link href="#" className="flex items-center justify-center gap-2 text-neutral-600 dark:text-neutral-300">
                                        <span className="size-5">G</span> Google
                                    </Link>
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full h-11 text-sm font-medium border-neutral-200 hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-800/50"
                                    asChild
                                >
                                    <Link href="#" className="flex items-center justify-center gap-2 text-neutral-600 dark:text-neutral-300">
                                        <span className="size-5">🍎</span> Apple
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-center gap-2 text-xs text-neutral-400 pb-4">
                    <span>Arenea &copy; 2026. Todos los derechos reservados.</span>
                    <span>
                        · <a href="#" className="text-red-500 hover:text-red-600">Política de privacidad</a>
                        · <a href="#" className="text-red-500 hover:text-red-600">Términos</a>
                    </span>
                </div>
            </div>
        </>
    );
}

Login.layout = {
    title: 'Iniciar sesión - Arenea',
    description: 'Accede a tu cuenta de Arenea',
};
