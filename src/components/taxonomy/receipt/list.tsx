import { api } from "@/utils/api"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../ui/dialog";
import { Button } from "../../ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import CreateReceiptOption from "./create";
import toast from "react-hot-toast";
export default function ReceiptOptionList() {
    const { data: receiptOptions, refetch, isLoading } = api.receiptOption.get.useQuery();
    const deleteReceiptOption = api.receiptOption.deleteById.useMutation({
        onSuccess: (deleted) => {
            toast.success(deleted.title + ' deleted succesfully')
            void refetch()
        }
    });
    return <>
        <CreateEditReceiptOptionDialog refetch={refetch} />
        <Table>
            <TableCaption>List of receipt options</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead >Title</TableHead>
                    <TableHead >Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {!isLoading && receiptOptions?.map((receiptOption) => (
                    <TableRow key={receiptOption.id}>
                        <TableCell className="font-medium">{receiptOption.title}</TableCell>
                        <TableCell className="font-medium">
                            <CreateEditReceiptOptionDialog refetch={refetch} receiptOptionId={receiptOption.id} />
                            <Button variant="destructive" onClick={() => { deleteReceiptOption.mutate(receiptOption.id) }}>Delete</Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody >
            <TableFooter>
            </TableFooter>
        </Table>
    </>
}


function CreateEditReceiptOptionDialog({ refetch, receiptOptionId }: { receiptOptionId?: string, refetch?: () => void }) {
    const typeString: string = receiptOptionId ? "Update" : "Create new"
    return <Dialog>
        <DialogTrigger asChild>
            <Button variant="default">{typeString}</Button>
        </DialogTrigger>
        <DialogContent className="h-fit overflow-auto">
            <DialogHeader>
                <DialogTitle className="text-left">
                    {typeString} questionnaire type
                </DialogTitle>
            </DialogHeader>
            <CreateReceiptOption id={receiptOptionId} refetcher={refetch} CloseTrigger={DialogTrigger} />
        </DialogContent>
    </Dialog>
}