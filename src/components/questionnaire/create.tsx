import { api } from "@/utils/api";
import { LoadingSpinner } from "../ui/custom/icons";
import AutocompleteField from "../ui/custom/autocomplete";
import { useEffect, useState } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { useQuestionnaireStore } from "@/state/questionnaire";
import { type questionnaireTypeOptions } from "../questionnaireType/create";
import { capitalizeFirstLetter } from "@/lib/utils";
import { ShowEnterpriseIdentification } from "./enterpriseIdentification";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { ShowReceipts } from "./receipt";
import ExplantoryNotes from "./explanatoryNotes";
import { ShowEmployment } from "./employment";
import { ShowEnterpriseCharacteristics } from "./enterpriseCharacteristics";
type componentNameOptions = "ShowEnterpriseIdentification" |
    "ShowEnterpriseCharacteristics" |
    "ShowEmployment"
    | "ShowReceipts" |
    "ShowInventories" |
    "ShowCapitalAssets" |
    "ShowOwnAccountResearchAndDevelopment" |
    "ShowContactDetails"

export default function CreateQuestionnaire() {
    const { data: formTypes, isLoading } = api.questionnaireType.getQuestionnaireTypeOptions.useQuery()
    const { identification, questionnaireType, setQuestionnaireType, employment, characteristics } = useQuestionnaireStore()
    const [selectedFormType, setQuestionnaireTypeType] = useState<{
        id: string;
        title: string;
        showEnterpriseIdentification: boolean;
        showEnterpriseCharacteristics: boolean;
        showEmployment?: boolean;
        showReceipts?: boolean;
        showExpenditures?: boolean;
        showInventories?: boolean;
        showCapitalAssets?: boolean;
        showOwnAccountResearchAndDevelopment?: boolean;
        showContactDetails?: boolean;
    } | undefined>()
    useEffect(() => {
        setQuestionnaireTypeType(formTypes?.find(({ id }) => id === questionnaireType))
    }, [questionnaireType])
    const saveQuestionnaire = api.questionnaire.create.useMutation({
        onSuccess: (createdQuestionnaire) => {
            toast.dismiss()
            toast.success('Questionnaire ' + createdQuestionnaire.questionnaireType.title + ' created successfully')
        },
        onError: () => {
            toast.dismiss()
            toast.error("Questionnaire could not be created, please fill out all fields correctly")
        }
    });

    if (isLoading || !formTypes) {
        return <LoadingSpinner />
    }
    function save() {
        if (identification !== undefined) {
            toast.loading("Saving");
            saveQuestionnaire.mutate({
                identification: identification,
                employment: employment,
                characteristics: characteristics,
                questionnaireType: questionnaireType
            })
        }
    }

    return <div className="mt-4">
        <div className="max-w-96">
            <AutocompleteField
                hideInput={true}
                showLabel={true}
                onValueChange={(e) => { setQuestionnaireType(e) }}
                value={questionnaireType}
                fieldName="Form type*" options={formTypes.map((formType) => {
                    return {
                        value: formType.id,
                        label: formType.title
                    }
                })} />
        </div>
        {selectedFormType !== undefined && <QuestionnaireFields form={selectedFormType} />}
        {questionnaireType && <><Button className="mr-2" onClick={() => { save() }}>Save</Button>
            <ExplantoryNotes id={questionnaireType} /></>}
    </div>
}

export function QuestionnaireFields({ form }: {
    form: {
        showEnterpriseIdentification: boolean;
        showEnterpriseCharacteristics: boolean;
        showEmployment?: boolean;
        showReceipts?: boolean;
        showExpenditures?: boolean;
        showInventories?: boolean;
        showCapitalAssets?: boolean;
        showOwnAccountResearchAndDevelopment?: boolean;
        showContactDetails?: boolean;
    }
}) {
    const filtered = Object.keys(Object.fromEntries(Object.entries(form).filter(([, val]) => val === true))) as unknown as questionnaireTypeOptions[]

    const ComponentsMap = {
        ShowEnterpriseIdentification
        , ShowEnterpriseCharacteristics
        , ShowEmployment
        , ShowReceipts
        , ShowInventories
        , ShowExpenditures
        , ShowCapitalAssets
        , ShowOwnAccountResearchAndDevelopment
        , ShowContactDetails
    };

    return (
        <Accordion type="single" collapsible className="w-full my-4">
            {filtered.map((formData, i) => {
                const RenderComponent = ComponentsMap[capitalizeFirstLetter(formData) as componentNameOptions]
                return <AccordionItem value={formData} key={formData}>
                    <AccordionTrigger className=" my-1 rounded-sm py-4 font-bold">{i + 1}. {formData.substring(4).replace(/([A-Z])/g, ' $1').trim()}</AccordionTrigger>
                    <AccordionContent>
                        <RenderComponent />
                    </AccordionContent>
                </AccordionItem>
            })}
        </Accordion>
    )
}

function ShowExpenditures() {
    return <>work in progress</>
}
function ShowContactDetails() {
    return <>work in progress</>
}
function ShowOwnAccountResearchAndDevelopment() {
    return <>work in progress</>
}

function ShowCapitalAssets() {
    return <>work in progress</>
}
function ShowInventories() {
    return <>work in progress</>
}