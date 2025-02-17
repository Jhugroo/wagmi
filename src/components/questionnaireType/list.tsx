import { api } from "@/utils/api"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
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
import toast from "react-hot-toast";
import CreateQuestionnaireType from "./create";
import { LoadingSpinner } from "../ui/custom/icons";
export default function ListQuestionnaireType() {
    const { data: questionnaires, refetch, isLoading } = api.questionnaireType.get.useQuery();
    const deleteQuestionnaire = api.questionnaireType.delete.useMutation({
        onSuccess: (deletedQuestionnaire) => {
            toast.success('Questionnaire  type ' + deletedQuestionnaire.title + ' deleted successfully')
            void refetch()
        },
        onError: () => {
            toast.error("Questionnaire type is referenced in foods and cannot be deleted anymore")
        }
    });
    return <>
        <CreateEditquestionnaireTypeDialog refetch={refetch} />
        <Table>
            <TableCaption>List of questionnaires types</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead >Title</TableHead>
                    <TableHead >Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {!isLoading ? questionnaires?.map((singleQuestionnaire) => (
                    <TableRow key={singleQuestionnaire.id}>
                        <TableCell className="font-medium">{singleQuestionnaire.title}</TableCell>
                        <TableCell className="font-medium">
                            <CreateEditquestionnaireTypeDialog refetch={refetch} questionnaireId={singleQuestionnaire.id} />
                            <Button variant="destructive" onClick={() => { deleteQuestionnaire.mutate(singleQuestionnaire.id) }}>Delete</Button>
                        </TableCell>
                    </TableRow>
                )) : <TableRow key="loading-row">
                    <TableCell className="font-medium"><LoadingSpinner /></TableCell>
                    <TableCell className="font-medium"><LoadingSpinner /></TableCell>
                </TableRow>}
            </TableBody >
            <TableFooter>
            </TableFooter>
        </Table>
    </>
}
function CreateEditquestionnaireTypeDialog({ refetch, questionnaireId }: { questionnaireId?: string, refetch?: () => void }) {
    const typeString: string = questionnaireId ? "Update" : "Create new"
    return <Dialog>
        <DialogTrigger asChild>
            <Button variant="default">{typeString}</Button>
        </DialogTrigger>
        <DialogContent className="min-w-full  max-h-screen overflow-auto">
            <DialogHeader>
                <DialogTitle className="text-left">
                    {typeString} questionnaire type
                </DialogTitle>
            </DialogHeader>
            <CreateQuestionnaireType id={questionnaireId} refetcher={refetch} CloseTrigger={DialogTrigger} />
        </DialogContent>
    </Dialog>
}