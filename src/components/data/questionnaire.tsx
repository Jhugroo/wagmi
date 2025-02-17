import { api } from "@/utils/api";
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
import {
    Card,
    CardDescription,
    CardHeader,
} from "@/components/ui/card"

import { Info } from "lucide-react";
import { Label } from "../ui/label";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { LoadingSpinner } from "../ui/custom/icons";
import PaginationNavigator from "../ui/custom/paginationNavigator";
import { type MutableRefObject, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
export default function QuestionnaireData() {
    const [skip, setSkip] = useState(0)
    const componentRef = useRef(null);
    const handlePrint = useReactToPrint({ content: () => componentRef.current, });
    const { data: questionnaires, isLoading } = api.questionnaire.get.useQuery(skip)
    return <>
        <div className="p-1 pt-4">
            <PaginationNavigator take={50} isLoading={isLoading} isNextNull={questionnaires?.isNextNull} skip={skip} setSkip={setSkip} />
        </div>
        <Table>
            <TableCaption>List of questionnaires</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead >Type</TableHead>
                    <TableHead >Created by</TableHead>
                    <TableHead >Created date</TableHead>
                    <TableHead >Data</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {!isLoading ? questionnaires?.data?.map((singleQuestionnaire) => (
                    <TableRow key={singleQuestionnaire.id}>
                        <TableCell className="font-medium">{singleQuestionnaire.questionnaireType.title}</TableCell>
                        <TableCell className="font-medium">{singleQuestionnaire.createdBy.name}</TableCell>
                        <TableCell className="font-medium">{singleQuestionnaire.createdAt.toDateString()}</TableCell>
                        <TableCell className="font-medium"> <QuestionnaireInfo id={singleQuestionnaire.id} handlePrint={handlePrint} componentRef={componentRef} /></TableCell>
                    </TableRow>
                )) : <TableRow key="loading-row">
                    <TableCell className="font-medium"><LoadingSpinner /></TableCell>
                    <TableCell className="font-medium"><LoadingSpinner /></TableCell>
                    <TableCell className="font-medium"><LoadingSpinner /></TableCell>
                    <TableCell className="font-medium"><LoadingSpinner /></TableCell>
                </TableRow>}
            </TableBody >
            <TableFooter>
            </TableFooter>
        </Table></>
}

function QuestionnaireInfo({ id, handlePrint, componentRef }: { id: string; handlePrint: (event?: unknown, content?: (() => React.ReactInstance | null)) => void, componentRef: MutableRefObject<null> }) {
    return <Dialog >
        <DialogTrigger asChild>
            <Button variant="outline"><Info /></Button>
        </DialogTrigger>
        <DialogContent className="min-w-full h-full overflow-auto">
            <DataCard id={id} handlePrint={handlePrint} componentRef={componentRef} />
        </DialogContent>
    </Dialog>
}

function DataCard({ id, handlePrint, componentRef }: { id: string; handlePrint: (event?: unknown, content?: (() => React.ReactInstance | null)) => void, componentRef: MutableRefObject<null> }) {
    const { isLoading, data: questionnaireData } = api.questionnaire.getById.useQuery(id);
    if (isLoading) {
        return <LoadingSpinner />
    }

    return <>
        <Button onClick={handlePrint} className="w-24">Print</Button>
        <div ref={componentRef}>
            <h2><strong>{questionnaireData?.questionnaireType.title}</strong></h2>
            <Card className="" key="identification">
                <CardHeader>
                    <Label><strong>Enterprise Identification</strong></Label>
                    <CardDescription>
                        <div className="p-2 mt-2 bg-secondary rounded-sm flex">
                            <div ><Label >Name </Label></div>
                            <span className="mx-4">{questionnaireData?.enterpriseIdentification.name}</span>
                        </div>
                        <div className="p-2 mt-2 bg-secondary rounded-sm flex">
                            <div ><Label >Business Address </Label></div>
                            <span className="mx-4">{questionnaireData?.enterpriseIdentification.businessAddress}</span>
                        </div>
                        <div className="p-2 mt-2 bg-secondary rounded-sm flex">
                            <div ><Label >Business License Holder Name</Label></div>
                            <span className="mx-4">{questionnaireData?.enterpriseIdentification.businessLicenseHolderName}</span>
                        </div>
                        <div className="p-2 mt-2 bg-secondary rounded-sm flex">
                            <div ><Label >BRN </Label> </div>
                            <span className="mx-4">{questionnaireData?.enterpriseIdentification.brn}</span>
                        </div>
                        <div className="p-2 mt-2 bg-secondary rounded-sm flex">
                            <div ><Label >Vat reg number </Label></div>
                            <span className="mx-4">{questionnaireData?.enterpriseIdentification.vatRegistrationNumber}</span>
                        </div>
                        <div className="p-2 mt-2 bg-secondary rounded-sm flex">
                            <div ><Label >E-mail </Label></div>
                            <span className="mx-4">{questionnaireData?.enterpriseIdentification.email}</span>
                        </div>
                        <div className="p-2 mt-2 bg-secondary rounded-sm flex">
                            <div ><Label >Tel</Label></div>
                            <span className="mx-4">{questionnaireData?.enterpriseIdentification.telNo.map((tel) => { return <div>{tel}</div> })}</span>
                        </div>
                        <div className="p-2 mt-2 bg-secondary rounded-sm flex">
                            <div ><Label >Fax </Label></div>
                            <span className="mx-4">{questionnaireData?.enterpriseIdentification.faxNo}</span>
                        </div>
                    </CardDescription>
                </CardHeader>
            </Card >
            <Card key="characteristcis">
                <CardHeader>
                    <Label><strong>Enterprise Characteristics</strong></Label>
                    <CardDescription>
                        <div className="p-2 mt-2 bg-secondary rounded-sm flex">
                            <div ><Label >Main Activity </Label></div>
                            <span className="mx-4">{questionnaireData?.enterpriseCharacteristics?.mainActivity}</span>
                        </div>
                        <div className="p-2 mt-2 bg-secondary rounded-sm flex">
                            <div ><Label >Secondary Activities</Label></div>
                            <span className="mx-4">{questionnaireData?.enterpriseCharacteristics?.secondaryActivities.map((act) => { return <div>{act}</div> })}</span>
                        </div>
                        <div className="p-2 mt-2 bg-secondary rounded-sm flex">
                            <div ><Label >Type of Legal Organisation</Label></div>
                            <span className="mx-4">{questionnaireData?.enterpriseCharacteristics?.typeOfLegalOrganisation}</span>
                        </div>
                        <div className="p-2 mt-2 bg-secondary rounded-sm flex">
                            <div ><Label >Equity Participation</Label></div>
                            <span className="mx-4">{questionnaireData?.enterpriseCharacteristics?.equityParticipation}</span>
                        </div>
                        <div className="p-2 mt-2 bg-secondary rounded-sm flex">
                            <div ><Label >Foreign Percentage</Label></div>
                            <span className="mx-4">{questionnaireData?.enterpriseCharacteristics?.foreignPercentage ? questionnaireData?.enterpriseCharacteristics?.foreignPercentage.toString() + "%" : "Not Applicable"}</span>
                        </div>
                        <div className="p-2 mt-2 bg-secondary rounded-sm flex">
                            <div ><Label >Nationality Of Foreign Ownership</Label></div>
                            <span className="mx-4">{questionnaireData?.enterpriseCharacteristics?.nationalityOfForeignOwnerShip ? questionnaireData?.enterpriseCharacteristics?.nationalityOfForeignOwnerShip.toString() + "%" : "Not Applicable"}</span>
                        </div>

                    </CardDescription>
                </CardHeader>
            </Card >
        </div>
    </>
}