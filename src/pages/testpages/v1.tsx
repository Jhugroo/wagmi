/**
 * v0 by Vercel.
 * @see https://v0.dev/t/WLbWEtJp4YF
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"
import image from "../../../public/home.jpg"
import Image from "next/image"
import { UtensilsIcon } from "lucide-react"
export default function ComponentV1() {
    return (
        <div className="flex flex-col min-h-[100dvh]">
            <header className="bg-primary text-primary-foreground px-4 lg:px-6 h-14 flex items-center">
                <Link href="#" className="flex items-center justify-center" prefetch={false}>
                    <UtensilsIcon className="size-6 mr-2" />
                    <span className="text-lg font-semibold">Catering App</span>
                </Link>
                <nav className="ml-auto flex gap-4 sm:gap-6">
                    <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                        Menu
                    </Link>
                    <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                        Pricing
                    </Link>
                    <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                        About
                    </Link>
                    <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                        Contact
                    </Link>
                </nav>
            </header>
            <section className="relative w-full h-[80dvh] overflow-hidden">
                <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
                    <source src="/hero-video.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="text-center space-y-4 px-4 sm:px-6 md:px-10">
                        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">
                            Elevate Your Catering Experience
                        </h1>
                        <p className="text-lg sm:text-xl md:text-2xl text-white">
                            Experience the best catering service in town with our app.
                        </p>
                        <div className="flex justify-center gap-4">
                            <Link
                                href="#"
                                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                                prefetch={false}
                            >
                                Download App
                            </Link>
                            <Link
                                href="#"
                                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                                prefetch={false}
                            >
                                Learn More
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-12 md:py-24 lg:py-32 bg-muted">
                <div className="container px-4 md:px-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        <div className="grid gap-4 animate-fade-up">
                            <TruckIcon className="w-12 h-12 text-primary" />
                            <h3 className="text-xl font-bold">Fast Delivery</h3>
                            <p className="text-muted-foreground">Get your meals delivered to your doorstep in no time.</p>
                        </div>
                        <div className="grid gap-4 animate-fade-up delay-100">
                            <LeafIcon className="w-12 h-12 text-primary" />
                            <h3 className="text-xl font-bold">Fresh Ingredients</h3>
                            <p className="text-muted-foreground">Our chefs use only the freshest, locally-sourced ingredients.</p>
                        </div>
                        <div className="grid gap-4 animate-fade-up delay-200">
                            <SmileIcon className="w-12 h-12 text-primary" />
                            <h3 className="text-xl font-bold">Delicious Meals</h3>
                            <p className="text-muted-foreground">Enjoy a wide variety of delicious, chef-prepared meals.</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-12 md:py-24 lg:py-32">
                <div className="container px-4 md:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="grid gap-4 animate-fade-up">

                            <Image src={image} width={600}
                                height={400}
                                alt="Menu Item 1"
                                className="rounded-xl object-cover aspect-[3/2]" />
                            <h3 className="text-xl font-bold">Grilled Salmon</h3>
                            <p className="text-muted-foreground">
                                Succulent salmon fillet grilled to perfection, served with a side of roasted vegetables.
                            </p>
                        </div>
                        <div className="grid gap-4 animate-fade-up delay-100">

                            <Image src={image} width={600}
                                height={400}
                                alt="Menu Item 1"
                                className="rounded-xl object-cover aspect-[3/2]" />
                            <h3 className="text-xl font-bold">Beef Burrito Bowl</h3>
                            <p className="text-muted-foreground">
                                Spicy beef, rice, beans, avocado, and fresh salsa, all in a delicious burrito bowl.
                            </p>
                        </div>
                        <div className="grid gap-4 animate-fade-up delay-200">
                            <Image src={image} width={600}
                                height={400}
                                alt="Menu Item 1"
                                className="rounded-xl object-cover aspect-[3/2]" />
                            <h3 className="text-xl font-bold">Vegetable Stir-Fry</h3>
                            <p className="text-muted-foreground">
                                A colorful and flavorful mix of fresh vegetables, stir-fried in a delicious sauce.
                            </p>
                        </div>
                        <div className="grid gap-4 animate-fade-up delay-300">

                            <Image src={image} width={600}
                                height={400}
                                alt="Menu Item 1"
                                className="rounded-xl object-cover aspect-[3/2]" />
                            <h3 className="text-xl font-bold">Chicken Teriyaki</h3>
                            <p className="text-muted-foreground">
                                Tender chicken breast in a sweet and savory teriyaki sauce, served with steamed rice.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-12 md:py-24 lg:py-32 bg-muted">
                <div className="container px-4 md:px-6 text-center">
                    <div className="space-y-4 animate-fade-up">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter">Download Our App Today</h2>
                        <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Experience the convenience of delicious meals delivered right to your doorstep. Download our app and start
                            ordering now.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link
                                href="#"
                                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                                prefetch={false}
                            >
                                Download on iOS
                            </Link>
                            <Link
                                href="#"
                                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                                prefetch={false}
                            >
                                Download on Android
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

function LeafIcon({ className }: { className: string }) {
    return (
        <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
            <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
        </svg>
    )
}


function SmileIcon({ className }: { className: string }) {
    return (
        <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
            <path d="M8 14s1.5 2 4 2 4-2 4-2" />
            <line x1="9" x2="9.01" y1="9" y2="9" />
            <line x1="15" x2="15.01" y1="9" y2="9" />
        </svg>
    )
}


function TruckIcon({ className }: { className: string }) {
    return (
        <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
            <path d="M15 18H9" />
            <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
            <circle cx="17" cy="18" r="2" />
            <circle cx="7" cy="18" r="2" />
        </svg>
    )
}
