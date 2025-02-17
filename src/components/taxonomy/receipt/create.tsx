import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/utils/api";
import type * as DialogPrimitive from "@radix-ui/react-dialog"
import { type ChangeEvent, useState, useEffect } from "react"
import toast from "react-hot-toast";

export default function CreateReceiptOption(updateData: {
    id?: string, refetcher?: () => void,
    CloseTrigger: React.ForwardRefExoticComponent<DialogPrimitive.DialogTriggerProps & React.RefAttributes<HTMLButtonElement>>
}) {
    const { data: receiptOption } = api.receiptOption.getById.useQuery({ id: updateData.id })
    const [data, setData] = useState({
        title: '',
        showFor: [] as string[]
    })
    useEffect(() => {
        if (receiptOption?.id) {
            setData({ title: receiptOption.title, showFor: receiptOption.showFor.map((option) => option.id) })
        }
    }, [receiptOption])
    const { data: questionnaireOptions, isLoading: isQuestionnaireOptionsLoading } = api.questionnaireType.getQuestionnaireTypeOptions.useQuery()
    const mutateReceiptOption = api.receiptOption.create.useMutation({
        onSuccess(created) {
            updateData.refetcher && void updateData.refetcher()
            toast.dismiss()
            toast.success(created.title + " created successfully")
        },
    }
    );
    const mutateReceiptUpdateOption = api.receiptOption.updateById.useMutation({
        onSuccess(created) {
            updateData.refetcher && void updateData.refetcher()
            toast.dismiss()
            toast.success(created.title + " created successfully")
        },
    });
    const updateDataFields = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    function modifyShowFor(option: string) {
        if (data.showFor.length === 0) {
            setData({ ...data, showFor: [option] })
        } else {
            if (data.showFor.includes(option)) {
                setData({ ...data, showFor: data.showFor.filter(e => e !== option) })
            } else {
                data.showFor.push(option)
                setData({ ...data, showFor: data.showFor })
            }
        }
    }
    function save() {
        toast.loading("Saving")
        if (updateData.id) {
            mutateReceiptUpdateOption.mutate({ ...data, id: updateData.id })
        } else {
            mutateReceiptOption.mutate(data)
        }
    }
    return <div>
        <div className="p-1">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" value={data.title} onChange={(e) => { updateDataFields(e); }} />
        </div>
        {!isQuestionnaireOptionsLoading && questionnaireOptions?.map((questionnaireOption) => {
            return <div className="p-1" key={questionnaireOption.id}>
                <Checkbox id={questionnaireOption.id} checked={data.showFor.includes(questionnaireOption.id)} onClick={() => modifyShowFor(questionnaireOption.id)} />
                <Label htmlFor={questionnaireOption.id} className="ml-2">{questionnaireOption.title}</Label>
            </div>
        })
        }
        <updateData.CloseTrigger asChild>
            <Button onClick={() => { save() }}>Save</Button>
        </updateData.CloseTrigger>
    </div>
}