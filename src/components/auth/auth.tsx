import { signIn, signOut, useSession } from "next-auth/react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import Link from "next/link";
import { LoadingSpinner } from "../ui/custom/icons";
export default function AuthCard() {
    const { data: sessionData, status } = useSession();
    if (status === 'loading') {
        return (
            <Card>
                <CardHeader>
                    <LoadingSpinner />
                </CardHeader>
            </Card >
        );
    }
    return (
        <Card className="bg-muted">
            <CardHeader>
                {sessionData ? <><CardTitle className="flex">
                    <Avatar className="h-8 w-8">
                        {sessionData?.user.image && <AvatarImage src={sessionData.user.image} />}
                        <AvatarFallback>{sessionData && <span> {sessionData.user?.name}</span>}</AvatarFallback>
                    </Avatar>{sessionData && <span className="pt-2 pl-2"> {sessionData.user?.name}</span>}
                </CardTitle><CardDescription>{sessionData.user.email && <span> {sessionData.user.email}</span>}</CardDescription></> : <>
                    <CardDescription>Please login or create an account.</CardDescription>
                </>}
            </CardHeader>
            <CardContent >
                {sessionData && <Link href="/profile" ><Button variant="default" className="m-1 mr-4">Profile</Button></Link>}
                <Button disabled variant={sessionData ? "destructive" : "default"} className="m-1 mr-4" onClick={sessionData ? () => void signOut() : () => void signIn('google')}>{sessionData ? "Logout" : "Login"}</Button>
                {!sessionData && <Button disabled variant="default" className="m-1" onClick={() => void signIn('google')}>Sign Up</Button>}
            </CardContent>
        </Card >
    );
}