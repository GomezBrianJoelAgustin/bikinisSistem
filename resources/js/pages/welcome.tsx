import { Head, Link, usePage } from '@inertiajs/react';
import { useState, type ReactNode } from 'react';
import {
    Menu,
    X,
    Search,
    ShoppingCart,
    Mail,
    MapPin,
    Instagram,
    Share2,
    Phone,
    ArrowRight,
    User,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Auth } from '@/types/auth';

export interface Product {
    id: number;
    name: string;
    slug: string;
    price: number;
    originalPrice?: number;
    discount?: number;
    image: string;
    hasFreeShipping: boolean;
    colors?: string[];
    sizes?: string[];
    inStock: boolean;
}

export interface WelcomePageProps {
    auth: Auth;
    name: string;
    laravelVersion?: string;
    phpVersion?: string;
    [key: string]: unknown;
}

const formatPriceARS = (price: number): string =>
    `$${new Intl.NumberFormat('es-AR').format(price)}`;

const PRODUCTS: Product[] = [
    {
        id: 1,
        name: 'Bikini Luna',
        slug: 'bikini-luna',
        price: 35000,
        originalPrice: 45000,
        discount: 20,
        image:
            'https://plus.unsplash.com/premium_photo-1682535209719-839f625f8770?q=80&w=392&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
        hasFreeShipping: true,
        sizes: ['S', 'M', 'L'],
        inStock: true,
    },
    {
        id: 2,
        name: 'Bikini Sol',
        slug: 'bikini-sol',
        price: 28000,
        image:
            'https://plus.unsplash.com/premium_photo-1682535209719-839f625f8770?q=80&w=392&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
        hasFreeShipping: false,
        sizes: ['S', 'M', 'L', 'XL'],
        inStock: true,
    },
    {
        id: 3,
        name: 'Bikini Mar',
        slug: 'bikini-mar',
        price: 42000,
        originalPrice: 52000,
        discount: 15,
        image:
            'https://plus.unsplash.com/premium_photo-1682535209719-839f625f8770?q=80&w=392&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
        hasFreeShipping: true,
        sizes: ['S', 'M'],
        inStock: true,
    },
    {
        id: 4,
        name: 'Bikini Oro',
        slug: 'bikini-oro',
        price: 31000,
        image:
            'https://plus.unsplash.com/premium_photo-1682535209719-839f625f8770?q=80&w=392&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
        hasFreeShipping: false,
        sizes: ['M', 'L', 'XL'],
        inStock: true,
    },
    {
        id: 5,
        name: 'Bikini Nube',
        slug: 'bikini-nube',
        price: 39000,
        originalPrice: 49000,
        discount: 20,
        image:
            'https://plus.unsplash.com/premium_photo-1682535209719-839f625f8770?q=80&w=392&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
        hasFreeShipping: true,
        sizes: ['S', 'M', 'L'],
        inStock: false,
    },
    {
        id: 6,
        name: 'Bikini Alma',
        slug: 'bikini-alma',
        price: 26000,
        image:
            'https://plus.unsplash.com/premium_photo-1682535209719-839f625f8770?q=80&w=392&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
        hasFreeShipping: false,
        sizes: ['S', 'M', 'L'],
        inStock: true,
    },
    {
        id: 7,
        name: 'Bikini Luna Negra',
        slug: 'bikini-luna-negra',
        price: 38000,
        image:
            'https://plus.unsplash.com/premium_photo-1682535209719-839f625f8770?q=80&w=392&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
        hasFreeShipping: true,
        sizes: ['S', 'M', 'L', 'XL'],
        inStock: true,
    },
    {
        id: 8,
        name: 'Bikini Sal',
        slug: 'bikini-sal',
        price: 33000,
        originalPrice: 41000,
        discount: 15,
        image:
            'https://plus.unsplash.com/premium_photo-1682535209719-839f625f8770?q=80&w=392&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
        hasFreeShipping: false,
        sizes: ['M', 'L'],
        inStock: true,
    },
];

const BadgeLabel = ({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) => (
    <span
        className={cn(
            'absolute top-3 left-3 z-10 flex h-6 items-center gap-1 rounded-md bg-red-600 px-2 py-0.5 text-xs font-semibold text-white shadow-sm',
            className
        )}
    >
        {children}
    </span>
);

const NavLinkItem = ({
    title,
    href,
    isActive = false,
}: {
    title: string;
    href: string;
    isActive?: boolean;
}) => (
    <Link
        href={href}
        className={cn(
            'flex items-center gap-2.5 px-3 py-2 text-sm rounded-lg transition-colors',
            isActive
                ? 'bg-neutral-100 text-red-600 font-semibold dark:bg-neutral-800 dark:text-red-400'
                : 'text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800'
        )}
    >
        <ArrowRight className="size-3.5 shrink-0 text-neutral-400" />
        {title}
    </Link>
);

const SidebarContent = ({ onClose }: { onClose: () => void }) => {
    const navLinks = [
        { title: 'Inicio', href: '/' },
        { title: 'Bikinis', href: '#bikinis' },
        { title: 'Ofertas', href: '#ofertas' },
        { title: 'Nuevo', href: '#nuevo' },
        { title: 'Contacto', href: '#contacto' },
    ];

    const categories = ['Todos', 'Bikinis', 'Tops', 'Bottoms', 'Ofertas', 'Nuevo'];

    const accountLinks = [
        { title: 'Iniciar sesión', href: '/login', icon: User },
        { title: 'Admin', href: '/admin', icon: ArrowRight },
    ];

    return (
        <div className="flex flex-col h-full">
            <div className="px-4 py-3 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between shrink-0">
                <img
                    src="/images/logo-arenea.jpeg"
                    alt="Arenea Bikinis"
                    className="h-8 w-auto rounded-xl"
                />
                <button
                    onClick={onClose}
                    className="p-2 text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
                    aria-label="Cerrar menú"
                >
                    <X className="size-5" />
                </button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-0.5">
                <nav className="px-4 py-3 space-y-0.5">
                    <h3 className="px-3 mb-2 text-xs font-semibold uppercase text-neutral-400 dark:text-neutral-500">
                        Navegación
                    </h3>
                    {navLinks.map((link) => (
                        <NavLinkItem key={link.title} title={link.title} href={link.href} />
                    ))}
                </nav>
                <nav className="px-4 py-3 border-t border-neutral-200 dark:border-neutral-800 space-y-0.5">
                    <h3 className="px-3 mb-2 text-xs font-semibold uppercase text-neutral-400 dark:text-neutral-500">
                        Categorías
                    </h3>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            className="flex items-center justify-between px-3 py-2 text-sm font-medium text-neutral-600 rounded-lg hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
                        >
                            {cat}
                            <ArrowRight className="size-3.5 shrink-0 text-neutral-400" />
                        </button>
                    ))}
                </nav>
                <div className="px-4 py-3 border-t border-neutral-200 dark:border-neutral-800 space-y-0.5">
                    <h3 className="px-3 mb-2 text-xs font-semibold uppercase text-neutral-400 dark:text-neutral-500">
                        Cuenta
                    </h3>
                    {accountLinks.map((link) => (
                        <Link
                            key={link.title}
                            href={link.href}
                            className="flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-neutral-600 rounded-lg hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
                        >
                            <link.icon className="size-3.5 shrink-0 text-neutral-400" />
                            {link.title}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

const Navbar = ({ onToggleSidebar, isSidebarOpen }: { onToggleSidebar: () => void; isSidebarOpen: boolean }) => (
    <header className="sticky top-0 z-30 w-full bg-white shadow-sm border-b border-neutral-200 dark:border-neutral-800 dark:bg-neutral-950">
        <div className="mx-auto max-w-7xl px-4">
            <div className="flex h-14 items-center justify-between gap-2">
                {!isSidebarOpen && (
                    <button
                        onClick={onToggleSidebar}
                        className="p-2 text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
                        aria-label="Abrir menú"
                    >
                        <Menu className="size-5" />
                    </button>
                )}
                <Link
                    href="/"
                    className="flex items-center gap-1"
                    aria-label="Arenea"
                >
                    <img src="/images/logo-arenea.jpeg" alt="Arenea Bikinis" className="h-8 w-auto rounded-xl" />
                </Link>
                <div className="flex items-center gap-2">
                    <div className="relative w-[260px] md:w-[340px] hidden sm:block">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-neutral-400" />
                        <input
                            type="text"
                            placeholder="Buscar bikinis..."
                            className="w-full rounded-full border border-neutral-200 bg-transparent px-4 py-2 pl-10 text-sm font-medium text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-red-600 dark:border-neutral-800 dark:bg-neutral-950 dark:text-white dark:placeholder-neutral-500 dark:focus:ring-red-500"
                        />
                    </div>
                    <Link
                        href="/carrito"
                        className="relative p-2 text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
                        aria-label="Carrito de compras"
                    >
                        <ShoppingCart className="size-5" />
                        <span
                            className={cn(
                                'absolute top-1 right-1 z-20 flex size-4 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white shadow',
                                3 > 0 ? '' : 'hidden'
                            )}
                        >
                            3
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    </header>
);

const FeaturedSection = () => (
    <section className="w-full h-[400px] md:h-[45vh]">
        <div className="relative h-full w-full overflow-hidden flex items-center justify-center">
            <img
                src="/images/titulo-arenea.png"
                alt="Título Arenea"
                className="w-full max-w-[800px] h-full object-contain object-center"
                aria-hidden="true"
                loading="lazy"
                decoding="async"
            />
        </div>
    </section>
);

const SectionHeader = () => (
    <div className="mx-auto max-w-7xl px-4 py-8">
        <nav className="flex items-center gap-1 text-xs font-medium text-neutral-500 dark:text-neutral-400">
            <Link href="/" className="hover:text-neutral-900 dark:hover:text-white">
                Inicio
            </Link>
            <span className="mx-1">›</span>
            <span>Bikinis</span>
        </nav>
        <h1 className="mt-2 font-serif text-4xl font-bold text-neutral-900 tracking-tight dark:text-white md:text-5xl">
            Bikinis
        </h1>
        <div className="mt-6 flex flex-wrap items-center gap-3">
            <button className="rounded-full border border-neutral-200 bg-white px-5 py-2 text-xs font-medium text-neutral-900 shadow-sm hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950 dark:text-white dark:hover:bg-neutral-800">
                Filtrar
            </button>
            <select
                defaultValue="precio-asc"
                className="rounded-full border border-neutral-200 bg-white px-5 py-2 text-xs font-medium text-neutral-900 outline-none focus:ring-2 focus:ring-red-600 dark:border-neutral-800 dark:bg-neutral-950 dark:text-white dark:focus:ring-red-500"
            >
                <option value="precio-asc">Orden por: Precio menor a mayor</option>
                <option value="precio-desc">Precio mayor a menor</option>
                <option value="novedades">Novedades primero</option>
            </select>
        </div>
    </div>
);

const ProductCard = ({ product }: { product: Product }) => {
    const badge =
        product.hasFreeShipping
            ? 'ENVÍO GRATIS'
            : product.discount
                ? `${product.discount}% OFF`
                : null;

    return (
        <article className="group relative flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
            <div className="relative size-full aspect-[3/4] overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                <img
                    src={product.image}
                    alt={product.name}
                    className="size-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                    loading="lazy"
                />
                {badge && <BadgeLabel>{badge}</BadgeLabel>}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-opacity duration-300" />
                <button
                    className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 rounded-full bg-white px-4 py-2 text-sm font-semibold text-neutral-900 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 dark:text-neutral-100 hover:bg-red-600 hover:text-white"
                    aria-label={`Agregar ${product.name} al carrito`}
                >
                    Agregar
                </button>
            </div>
            <div className="px-5 py-4 flex-1 flex flex-col">
                <h3 className="font-serif text-lg font-semibold text-neutral-900 dark:text-white">
                    {product.name}
                </h3>
                <div className="mt-auto flex items-baseline gap-2">
                    <span className="font-bold text-neutral-900 dark:text-white">
                        {formatPriceARS(product.price)}
                    </span>
                    {product.originalPrice && product.discount && (
                        <span className="text-sm text-neutral-500 line-through dark:text-neutral-400">
                            {formatPriceARS(product.originalPrice)}
                        </span>
                    )}
                </div>
                <div className="mt-2 flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400">
                    {product.hasFreeShipping && (
                        <>
                            <span className="flex size-1.5 rounded-full bg-green-600 dark:bg-green-500" />
                            <span>Envío gratis</span>
                        </>
                    )}
                    {!product.inStock && (
                        <span className="font-medium text-red-600 dark:text-red-400">Agotado</span>
                    )}
                </div>
            </div>
        </article>
    );
};

const ProductGrid = () => (
    <section id="bikinis" className="mx-auto max-w-7xl px-4 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    </section>
);

const WhatsAppButton = () => (
    <a
        href="https://wa.me/5491100000000"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 size-12 rounded-full bg-green-500 p-3 shadow-xl hover:bg-green-600 transition-colors"
        aria-label="Contactar por WhatsApp"
    >
        <Phone className="size-6 text-white" />
    </a>
);

const Footer = ({
    laravelVersion,
    phpVersion,
}: {
    laravelVersion?: string;
    phpVersion?: string;
}) => (
    <footer id="contacto" className="border-t border-neutral-200 bg-white px-4 pt-12 pb-8 dark:border-neutral-800 dark:bg-neutral-950">
        <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
                <div className="lg:col-span-1">
                    <img
                        src="/images/logo-arenea.jpeg"
                        alt="Arenea Bikinis"
                        className="h-8 w-auto mb-4 rounded-xl"
                    />
                    <p className="mt-4 max-w-xs text-sm text-neutral-500 dark:text-neutral-400">
                        Bikinis y trajes de baño diseñados para el verano.
                    </p>
                </div>
                <div>
                    <h3 className="mb-4 text-sm font-semibold text-neutral-900 uppercase tracking-wider dark:text-white">
                        Contacto
                    </h3>
                    <ul className="space-y-2 text-sm text-neutral-500 dark:text-neutral-400">
                        <li className="flex items-start gap-3">
                            <Phone className="size-5 mt-0.5 shrink-0" />
                            <span>WhatsApp: +54 9 11 0000-0000</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Mail className="size-5 shrink-0" />
                            <span>hola@arenea.com</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <MapPin className="size-5 shrink-0" />
                            <span>Punto de retiro: Palermo, CABA</span>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className="mb-4 text-sm font-semibold text-neutral-900 uppercase tracking-wider dark:text-white">
                        Newsletter
                    </h3>
                    <p className="mb-3 text-sm text-neutral-500 dark:text-neutral-400">
                        Suscribite y enterate de los lanzamientos.
                    </p>
                    <form className="flex gap-2">
                        <input
                            type="email"
                            placeholder="Tu email"
                            className="flex-1 rounded-full border border-neutral-200 bg-transparent px-4 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-red-600 dark:border-neutral-800 dark:bg-neutral-950 dark:text-white dark:placeholder-neutral-500 dark:focus:ring-red-500"
                        />
                        <button
                            type="submit"
                            className="rounded-full bg-red-600 px-4 py-2 text-xs font-semibold text-white hover:bg-red-700 dark:bg-red-600"
                        >
                            Suscribirse
                        </button>
                    </form>
                </div>
                <div>
                    <h3 className="mb-4 text-sm font-semibold text-neutral-900 uppercase tracking-wider dark:text-white">
                        Seguinos
                    </h3>
                    <div className="flex gap-3">
                        <a
                            href="https://instagram.com/arenea"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="size-8 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-500 hover:text-red-600 dark:border-neutral-800 dark:text-neutral-400 dark:hover:text-red-500"
                            aria-label="Instagram"
                        >
                            <Instagram className="size-4" />
                        </a>
                        <a
                            href="#"
                            className="size-8 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-500 hover:text-red-600 dark:border-neutral-800 dark:text-neutral-400 dark:hover:text-red-500"
                            aria-label="Más redes sociales"
                        >
                            <Share2 className="size-4" />
                        </a>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                        <span className="rounded-full border border-neutral-200 bg-white px-2.5 py-0.5 dark:border-neutral-800 dark:bg-neutral-900">
                            Visa
                        </span>
                        <span className="rounded-full border border-neutral-200 bg-white px-2.5 py-0.5 dark:border-neutral-800 dark:bg-neutral-900">
                            Mastercard
                        </span>
                        <span className="rounded-full border border-neutral-200 bg-white px-2.5 py-0.5 dark:border-neutral-800 dark:bg-neutral-900">
                            Amex
                        </span>
                        <span className="rounded-full border border-neutral-200 bg-white px-2.5 py-0.5 dark:border-neutral-800 dark:bg-neutral-900">
                            Mercado Pago
                        </span>
                    </div>
                </div>
            </div>
            <div className="mt-12 border-t border-neutral-200 pt-8 flex flex-col items-center justify-between gap-4 text-xs text-neutral-500 dark:border-neutral-800 dark:text-neutral-400 md:flex-row">
                <span>Arenea &copy; 2026. Todos los derechos reservados.</span>
                <span>
                    Laravel {laravelVersion ?? ''} · PHP {phpVersion ?? ''}
                </span>
            </div>
        </div>
    </footer>
);

export default function Welcome() {
    const { auth, laravelVersion, phpVersion } = usePage().props as WelcomePageProps;
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <>
            <Head title="Arenea - Bikinis y Trajes de Baño" />
            <div className="relative min-h-screen flex flex-col bg-transparent text-neutral-900 dark:text-white">
                {/* Fondo de página con textura de arena repetida */}
                <div className="absolute inset-0 z-0 bg-repeat bg-[length:400px_400px]" style={{ backgroundImage: "url('/images/fondo-arenea.jfif')" }}>
                    <div className="absolute inset-0 bg-white/20 pointer-events-none" />
                </div>

                <div className="relative z-10 flex flex-col flex-1 min-h-0">
                    <Navbar
                        onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
                        isSidebarOpen={isSidebarOpen}
                    />
                    <div className="flex flex-1 relative min-h-0">
                        <aside
                            className={cn(
                                'fixed inset-y-0 left-0 z-50 h-screen w-64 border-r border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950 shadow-xl transform transition-transform duration-300 ease-in-out overflow-hidden flex flex-col',
                                isSidebarOpen
                                    ? 'translate-x-0 opacity-100'
                                    : '-translate-x-full opacity-0'
                            )}
                        >
                            <SidebarContent onClose={() => setIsSidebarOpen(false)} />
                        </aside>
                        <div className="flex flex-col flex-1">
                            <main className="flex-1 pt-20">
                                <FeaturedSection />
                                <SectionHeader />
                                <ProductGrid />
                            </main>
                            <Footer laravelVersion={laravelVersion} phpVersion={phpVersion} />
                        </div>
                    </div>
                </div>
            </div>
            <WhatsAppButton />
        </>
    );
}

Welcome.layout = {
    breadcrumbs: [
        {
            title: 'Inicio',
            href: '/',
        },
        {
            title: 'Bikinis',
        },
    ],
};
