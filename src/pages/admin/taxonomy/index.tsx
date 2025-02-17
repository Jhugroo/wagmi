import { taxonomyLinks } from "@/components/menu/mainMenu";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Avatar } from "@radix-ui/react-avatar";

import { HomeIcon, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { AdminDashboardLink } from "..";


export default function AdminDashboardPage() {
    return <div className="w-full grid grid-flow-row-dense md:grid-cols-4 sm:grid-cols-2">{taxonomyLinks.map((adminLink) => <MenuCardOption adminLink={adminLink} key={adminLink.link} />)}
        <Link href={"/"} className="w-48">
            <Card className="bg-muted border-2 border-indigo-500 m-4 w-48">
                <CardHeader>
                    <CardTitle className="flex">
                        <Avatar className="h-8 w-8">
                            <HomeIcon />
                        </Avatar>
                        <span className="mt-1 ml-2">  Home</span>
                    </CardTitle>

                    <CardDescription className="text-accent-foreground">Back to homepage </CardDescription>
                </CardHeader>
                <CardContent >
                </CardContent>
            </Card >
        </Link>
        <AdminDashboardLink />
    </div>
}

function MenuCardOption({ adminLink: { link, Icon, text, description } }: {
    adminLink: {
        link: string;
        Icon: LucideIcon;
        text: string;
        description?: string
    }
}) {
    return (
        <Link href={"/admin/taxonomy" + link} className="w-48">
            <Card className="bg-muted border-2 border-indigo-500 m-4 w-48">
                <CardHeader>
                    <CardTitle className="flex">
                        <Avatar className="h-8 w-8">
                            <Icon />
                        </Avatar>
                        <span className="mt-1 ml-2">  {text}</span>
                    </CardTitle>

                    <CardDescription className="text-accent-foreground">{description ?? "Short description"} </CardDescription>
                </CardHeader>
                <CardContent >
                </CardContent>
            </Card >
        </Link>
    )
}
