import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import Head from "next/head";
import { api } from "@/utils/api";
import "@/styles/globals.css";
import { MainMenu } from "@/components/menu/mainMenu";
import { ThemeProvider } from "@/components/theme/provider";
import { ModeToggle } from "@/components/theme/switcher";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { FlagIcon, HomeIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Metadata } from "next"
import { Inter } from "next/font/google"
const inter = Inter({ subsets: ["latin"] })
export const metadata: Metadata = {
  title: "Crop Studio - Protect Your Privacy, Share What Matters",
  description: "Advanced screen sharing and workflow optimization tool",
}

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const pathname = usePathname()

  const [showMenu, setShowMenu] = useState(false)
  useEffect(() => {
    if (pathname !== null && pathname.substring(1, 9) === 'testpage') {
      setShowMenu(false)
    } else {
      setShowMenu(false)
    }
  }, [pathname])
  return (
    <SessionProvider session={session}>
      <Toaster />
      <Head>
        <title>We're all gonna make it</title>
        <meta name="description" content="We're all gonna make it catering services" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <ThemeProvider
        attribute="class"
        defaultTheme="light">
        <div className={`${inter.className} bg-slate antialiased`}>
          {showMenu && <div className="p-4">
            <Link href="/"><Button variant="ghost" className="rounded-full ml-2"><HomeIcon className="absolute h-[1.2rem] w-[1.2rem]" /></Button>
            </Link>
            <div className="flex float-right"><ModeToggle /><MainMenu /> </div>
          </div>}
          <MainMenuHeader />
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
    </SessionProvider>
  );
};
function MainMenuHeader() {
  return <header className="bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between">
    <Link href="/" className="flex items-center gap-2" prefetch={false}>
      <FlagIcon className="w-6 h-6" />
      <span className="text-xl font-bold">Real nutrition and health</span>
    </Link>

    <MainMenu />

  </header>
}

export default api.withTRPC(MyApp);

