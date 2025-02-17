import { type ChangeEvent, useState, useEffect } from "react"
import toast from 'react-hot-toast';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { api } from "@/utils/api"
import type * as DialogPrimitive from "@radix-ui/react-dialog"
import { Checkbox } from "../ui/checkbox";
import { Textarea } from "@/components/ui/textarea"
import { LoadingSpinner } from "../ui/custom/icons";
type createQuestionnaireType = {
    id: string; title: string;
    showEnterpriseIdentification: boolean;
    showEnterpriseCharacteristics: boolean;
    showEmployment?: boolean;
    showReceipts?: boolean;
    showExpenditures?: boolean;
    showInventories?: boolean;
    showCapitalAssets?: boolean;
    showOwnAccountResearchAndDevelopment?: boolean;
    showContactDetails?: boolean;
    explanatoryNotes?: string
}
const initialiseQuestionnaire: createQuestionnaireType = {
    id: '', title: '', showEnterpriseIdentification: true, showEnterpriseCharacteristics: true, explanatoryNotes: ''
};
export type questionnaireTypeOptions = 'showEnterpriseIdentification' |
    'showEnterpriseCharacteristics' |
    'showEmployment' |
    'showReceipts' |
    'showExpenditures' |
    'showInventories' |
    'showCapitalAssets' |
    'showOwnAccountResearchAndDevelopment' |
    'showContactDetails'
const options = [
    'showEnterpriseIdentification',
    'showEnterpriseCharacteristics',
    'showEmployment',
    'showReceipts',
    'showExpenditures',
    'showInventories',
    'showCapitalAssets',
    'showOwnAccountResearchAndDevelopment',
    'showContactDetails',
] as questionnaireTypeOptions[]

export default function CreateQuestionnaireType(updateData: {
    id?: string, refetcher?: () => void,
    CloseTrigger: React.ForwardRefExoticComponent<DialogPrimitive.DialogTriggerProps & React.RefAttributes<HTMLButtonElement>>
}) {
    const { data: updateQuestionnaireQuery, isLoading } = api.questionnaireType.getById.useQuery({ id: updateData.id });
    const [data, setData] = useState(initialiseQuestionnaire)
    useEffect(() => {
        if (updateQuestionnaireQuery?.id) {
            setData(updateQuestionnaireQuery)
        }
    }, [updateQuestionnaireQuery])
    const createQuestionnaire = api.questionnaireType.create.useMutation({
        onSuccess: (createdQuestionnaire) => {
            setData(initialiseQuestionnaire)
            updateData.refetcher ? void updateData.refetcher() : null;
            toast.success('Questionnaire monitoring type ' + createdQuestionnaire.title + ' created successfully')
        },
        onError: () => {
            toast.error("Questionnaire monitoring type could not be created, please fill out all fields correctly")
        }
    });
    const updateQuestionnaire = api.questionnaireType.updateById.useMutation({
        onSuccess: (updatedQuestionnaire) => {
            updateData.refetcher ? void updateData.refetcher() : null;
            toast.success('Questionnaire monitoring type' + updatedQuestionnaire.title + ' updated successfully')
        }
    })
    const updateDataFields = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    function save() {
        if (updateData.id !== undefined) {
            updateQuestionnaire.mutate(data);
        }
        else {
            createQuestionnaire.mutate(data);
        }
    }
    if (isLoading) {
        return <LoadingSpinner />
    }
    return (
        <>
            <div className="p-1">
                <Label htmlFor="id">Code</Label>
                <Input disabled={updateData.id ? true : false} id="id" name="id" value={data.id} onChange={(e) => { updateDataFields(e); }} />
            </div>

            <div className="p-1">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" value={data.title} onChange={(e) => { updateDataFields(e); }} />
            </div>
            <Label><strong>Blocks</strong></Label>
            {options.map((option) => {
                return <div className="p-1 flex">
                    <Checkbox id={option} checked={data[option]} onClick={() => { setData({ ...data, [option]: !data[option] }) }} />
                    <Label className="px-1 pt-0.5" htmlFor={option}>{option.substring(4).replace(/([A-Z])/g, ' $1').trim()}</Label>
                </div>
            })}
            <div className="p-1">
                <Textarea placeholder="Explanatory notes" value={data.explanatoryNotes} onChange={(e) => { setData({ ...data, explanatoryNotes: e.target.value }) }} />
            </div>

            <div className="p-1">
                <updateData.CloseTrigger asChild>
                    <Button onClick={() => save()}>Save</Button>
                </updateData.CloseTrigger>
            </div>
        </>
    )
}
