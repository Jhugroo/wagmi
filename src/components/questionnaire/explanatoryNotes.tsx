import { api } from "@/utils/api"
import { Button } from "../ui/button"
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
import { LoadingSpinner } from "../ui/custom/icons"
export default function ExplantoryNotes({ id }: { id: string }) {
    const { data: explanatoryNotes, isLoading } = api.questionnaireType.getExplanatoryNotes.useQuery(id)
    return <Dialog >
        <DialogTrigger asChild>
            <Button variant="outline">Explanatory Notes</Button>
        </DialogTrigger>
        <DialogContent className="min-w-full  max-h-screen overflow-auto">
            <Card className="w-full" key="identification">
                <CardHeader>
                    <CardDescription>
                        {isLoading ? <LoadingSpinner /> : <span className="w-full" dangerouslySetInnerHTML={{ __html: explanatoryNotes?.explanatoryNotes.replaceAll("\n", "<br/>") ?? "" }}></span >}
                    </CardDescription>
                </CardHeader>
            </Card >
        </DialogContent>
    </Dialog >
}