
import { api } from "@/utils/api"
import { useEffect, useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Card,
    CardContent,
    CardHeader,
    CardDescription,
    CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { toast } from "react-hot-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LoadingSpinner } from "@/components/ui/custom/icons"
type userType = {
    id: string;
    name: string | null;
    email: string | null;
    isAdmin: boolean;
    isVerified: boolean;
    emailVerified: Date | null;
    image: string | null;
    phone: string | null;
} | null | undefined

export default function ProfilePage() {
    const { data: user, isLoading, refetch } = api.user.get.useQuery()
    return <div className=" pb-4 pt-8">
        <Card className="flex rounded-lg flex-col" >
            <CardHeader>

                <CardDescription>
                    {!isLoading ? (
                        <>
                            <div className="p-1">
                                <Label ><strong>Email:</strong> {user?.email}</Label>
                            </div>
                            <div className="p-1">
                                <Label ><strong>Full Name:</strong> {user?.name}</Label>
                            </div>
                            <div className="p-1">
                                <Label ><strong>Phone:</strong> {user?.phone}</Label>
                            </div>

                            <div className="p-1">
                                <UpdateAccount refetch={refetch} user={user} />
                            </div>
                        </>
                    ) : <LoadingSpinner />}
                </CardDescription>
            </CardHeader>
        </Card >
    </div >
}
function UpdateAccount({ refetch, user, }: {
    refetch: () => void,
    user: userType
}) {

    const mutateUser = api.user.updateUserData.useMutation({
        onSuccess: () => {
            toast.success('Account details updated')
            refetch && void refetch()
        },
        onError: () => {
            toast.error("Account details could not be updated, please try again later")
        }
    });
    const [data, setData] = useState<{ phone: string, name: string }>({ phone: '', name: '' });

    useEffect(() => {
        setData({ phone: user?.phone ?? '', name: user?.name ?? '' })
    }, [user])

    return <Dialog>
        <DialogTrigger asChild>
            <Button variant="secondary">Edit</Button>
        </DialogTrigger>
        <DialogContent className="overflow-auto">
            <Card className="mt-2"  >
                <CardHeader>
                    <CardTitle>
                        Update Account
                    </CardTitle>
                </CardHeader>
                <CardContent >
                    <div className="p-1">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" name="name" value={data.name} onChange={(e) => { setData({ ...data, ['name']: e.target.value }) }} />
                    </div>
                    <div className="p-1 pt-4">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" type="number" name="phone" value={data.phone} onChange={(e) => { setData({ ...data, ['phone']: e.target.value }) }} />
                    </div>
                    <div className="p-1 pt-4">
                        <Button onClick={() => { mutateUser.mutate({ name: data.name, phone: data.phone, id: user!.id }) }}>Update</Button>
                    </div>
                </CardContent>
            </Card >
            <DialogFooter >
            </DialogFooter>
        </DialogContent>
    </Dialog>
}