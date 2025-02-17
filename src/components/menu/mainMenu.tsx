import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import AuthCard from "@/components/auth/auth";
import {
  type LucideIcon,
  Home,
  Menu,
  Users,
  Shield,
  HomeIcon,
  BookA,
  BookCheck,
  LucideBarChart4,
  Library,
  MenuIcon,
  Layers,
} from "lucide-react"
import { api } from "@/utils/api";
export const adminLinks = [
  { link: "/view-users", Icon: Users, text: "Users" },
  { link: "/data/questionnaire", Icon: BookCheck, text: "Questionnaire Data", description: "Data from users" },
  { link: "/questionnaire-type", Icon: BookA, text: "Questionnaire type", description: "Types for questionnaires" },
  { link: "/reporting", Icon: LucideBarChart4, text: "Reporting", description: "Charts and reports" },
  { link: "/taxonomy", Icon: Library, text: "Taxonomy" },
]
export const taxonomyLinks = [
  { link: "/receipt", Icon: Library, text: "Receipt" },
]


const verifiedLinks = [
  { link: "/create-questionnaire", Icon: Layers, text: "Create" },
]

export function MainMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { data: user } = api.user.get.useQuery()
  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    pathname === "/profile" && closeMenu();
  }, [pathname]);


  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <MenuIcon className="h-6 w-6" />
          <span className="sr-only">Toggle navigation</span>
        </Button>
      </SheetTrigger>
      <SheetContent >
        <SheetTitle onClick={() => closeMenu()}>
          <MenuLink href="/" pathname={pathname} Icon={HomeIcon} text="Home" key="home-menu-item" />
          {(user?.isVerified ?? user?.isAdmin) && <>
            {verifiedLinks.map((verifiedLink) => <MenuLink href={verifiedLink.link} pathname={pathname} Icon={verifiedLink.Icon} text={verifiedLink.text} key={verifiedLink.link} />)}
          </>}
          {user?.isAdmin && <>
            <MenuItem itemKey="adminTab" Icon={Shield} text="Admin Section" />
            {adminLinks.map((adminLink) => <MenuLink href={"/admin" + adminLink.link} pathname={pathname} Icon={adminLink.Icon} text={adminLink.text} key={adminLink.link} />)}
          </>}
        </SheetTitle>
        <AuthCard />
      </SheetContent>
    </Sheet >
  );
}

function MenuLink({ pathname, href, text, Icon }: { pathname: string, href: string, text: string, Icon?: LucideIcon }) {
  return (
    <Link
      key={href}
      href={href}
      className={cn(
        buttonVariants({ variant: "ghost" }),
        pathname === href
          ? "bg-muted hover:bg-muted"
          : "font-medium hover",
        "justify-start w-full"
      )}
    >
      {Icon && <Icon className="pd-3 mr-2 w-5 h-5" strokeWidth={1} />} {text}
    </Link>
  );
}

function MenuItem({ itemKey, text, Icon }: { itemKey: string, text: string, Icon?: LucideIcon }) {
  return (
    <Link href="/admin">
      <div
        key={itemKey}
        className={cn(
          buttonVariants({ variant: "default" }),
          "font-bold ", "justify-start w-full bg-accent-foreground text-accent"
        )}
      >
        {Icon && <Icon className="pd-3 mr-2 w-5 h-5" strokeWidth={3} />} {text}
      </div>
    </Link >
  );
}