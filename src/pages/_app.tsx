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
import { FlagIcon, HomeIcon, MenuIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import AuthCard from "@/components/auth/auth";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Card,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
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
        <title>CEA online Survey Application</title>
        <meta name="description" content="CEA online Survey Application catering services" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <ThemeProvider
        attribute="class"
        defaultTheme="light">
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 shrink">
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
      <span className="text-xl font-bold">CEA Online Survey</span>
    </Link>

    <MainMenu />

  </header>
}
function InfoData() {
  return (
    <Dialog >
      <DialogTrigger asChild>
        <Button variant="outline">Census</Button>
      </DialogTrigger>
      <DialogContent>
        <Card className="" key="identificaiton">
          <CardHeader>
            <CardDescription>
              Statistics Mauritius is conducting a Census of Economic Activities for the year 2018. Data supplied should relate to calendar year
              2018 covering the reporting period from January to December; where not available, please give the best estimates.
              Data should as far as possible relate to the enterprise unless otherwise stated. Please list all establishments/branches in the space
              provided on the last page.
              The Census is being conducted under the provision of the Statistics Act 2000 and in accordance with the Data Protection Act.
              Please refer to the explanatory notes enclosed before completing the questionnaire. If you need further clarification or assistance,
              please feel free to contact us.
            </CardDescription>
          </CardHeader>
        </Card >

      </DialogContent>
    </Dialog >
  )
}

export default api.withTRPC(MyApp);

