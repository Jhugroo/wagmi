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
import { Input } from "../ui/input"
import { type ChangeEvent } from "react"
const options = [
    {
        title: "Number of employees who were paid for the last Thursday of March 2018",
        value: "Number of employees who were paid for the last Thursday of March 2018",
    },
    {
        title: "of whom employees with disabilities",
        value: "Number of employees who were paid for the last Thursday of March 2018 of whom employees with disabilities",
    },
    {
        title: "Outworkers",
        value: "Outworkers",
    },
    {
        title: "of whom employees with disabilities",
        value: "Outworkers of whom employees with disabilities",
    },
]
export function ShowEmployment() {
    const { employment, setEmployment } = useQuestionnaireStore()
    function setOption(value: ChangeEvent<HTMLInputElement>, index: number, origin = "foreigner") {
        const newEmployed = employment.employed.filter(({ description, nationality, gender }) => (description !== value.target.id || nationality !== origin || gender !== value.target.name))
        setEmployment({
            ...employment, employed: [...newEmployed, {
                description: value.target.id as "Number of employees who were paid for the last Thursday of March 2018" | "Number of employees who were paid for the last Thursday of March 2018 of whom employees with disabilities" | "Outworkers" | "Outworkers of whom outworkers with disabilities",
                nationality: origin as "mauritian" | "foreigner",
                gender: value.target.name as "male" | "female",
                number: parseInt(value.target.value)
            }]
        })
    }
    return <>
        <div className="p-1">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="font-bold">Description</TableHead>
                        <TableHead className="pl-8"><span className="pl-8 font-bold">Mauritian</span> <TableHead className="pr-8">Male</TableHead> <TableHead >Female</TableHead></TableHead>
                        <TableHead className="pl-8"><span className="pl-8 font-bold">Foreigner</span> <TableHead className="pr-8">Male</TableHead> <TableHead >Female</TableHead></TableHead>
                        <TableHead className="pl-8"><span className="pl-8 font-bold">Total</span> <TableHead className="pr-8" >Male</TableHead> <TableHead >Female</TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {options.map(({ value: option, title }, i) =>
                        <TableRow key={`employmentOption-${i}`} >
                            <TableCell title={option}>
                                {title}
                            </TableCell>
                            <TableCell >
                                <div className="flex">
                                    <Input className="max-w-20 min-w-20 mr-2" type="number" id={option} name="male" value={employment.employed.find(({ description, gender, nationality }) => (description === option && gender === 'male' && nationality === "mauritian"))?.number ?? undefined} onChange={(e) => { setOption(e, i, "mauritian") }} />
                                    <Input className="max-w-20 min-w-20" type="number" id={option} name="female" value={employment.employed.find(({ description, gender, nationality }) => (description === option && gender === 'female' && nationality === "mauritian"))?.number ?? undefined} onChange={(e) => { setOption(e, i, "mauritian") }} />
                                </div>
                            </TableCell>
                            <TableCell >
                                <div className="flex">
                                    <Input className="max-w-20 min-w-20 mr-2" disabled={(i === 3 || i === 2) ? true : false} type="number" value={employment.employed.find(({ description, gender, nationality }) => (description === option && gender === 'male' && nationality === "foreigner"))?.number ?? undefined} id={option} name="male" onChange={(e) => { setOption(e, i) }} />
                                    <Input className="max-w-20 min-w-20" disabled={(i === 3 || i === 2) ? true : false} type="number" value={employment.employed.find(({ description, gender, nationality }) => (description === option && gender === 'female' && nationality === "foreigner"))?.number ?? undefined} id={option} name="female" onChange={(e) => { setOption(e, i) }} />
                                </div>
                            </TableCell>
                            <TableCell >
                                <div className="flex">
                                    <Input className="max-w-20 min-w-20 mr-2" disabled type="number" id={option} name="male" value={employment.employed.filter(({ description, gender }) => (description === option && gender === 'male')).reduce((acc, { number }) => acc + number, 0)} />
                                    <Input className="max-w-20 min-w-20" disabled type="number" id={option} name="female" value={employment.employed.filter(({ description, gender }) => (description === option && gender === 'female')).reduce((acc, { number }) => acc + number, 0)} />
                                </div>
                            </TableCell>
                        </TableRow>)
                    }

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