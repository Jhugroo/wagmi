import { useQuestionnaireStore } from "@/state/questionnaire"

import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { api } from "@/utils/api"
import { Input } from "../ui/input"
export function ShowReceipts() {
    const { receipt, setReceipt, questionnaireType } = useQuestionnaireStore()
    const { data: options, isLoading } = api.receiptOption.getOptionByQuestionnaireType.useQuery(questionnaireType)

    function handleChange(parameter: string, receiptOption: string, value: number, i: number) {
        if (receipt.receiptData.length === 0) {
            setReceipt({ ...receipt, receiptData: [{ receiptOptionId: receiptOption, amount: [value] }] })
        } else {
            setReceipt({ ...receipt, receiptData: [...receipt.receiptData.filter(({ receiptOptionId }) => receiptOptionId !== receiptOption), { receiptOptionId: receiptOption, amount: [value] }] })
        }

    }

    return <>

        <div className="p-1">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead >Description</TableHead>
                        <TableHead >Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {!isLoading && options?.map((option, i) =>
                    (
                        <TableRow key={`receiptOption-${i}`} >
                            <TableCell title={option.title}>
                                {option.title}
                            </TableCell>
                            <TableCell>
                                <Input placeholder="" value={receipt.receiptData[i]?.amount[0] ?? 0} className="max-w-20 min-w-20" type="number" id="amount" name="amount" onChange={(e) => { handleChange("amount", option.id, parseInt(e.target.value), i) }} />
                            </TableCell>
                        </TableRow>
                    ))}
                    <TableRow key={`receiptOption-last`} >
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableBody >
                <TableFooter>
                </TableFooter>
            </Table >
        </div >

    </>
}