import { useQuestionnaireStore } from "@/state/questionnaire"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { useEffect, useState } from "react"
import AutocompleteField from "../ui/custom/autocomplete"
import { splitByLastSpace } from "@/lib/utils"
export function ShowEnterpriseCharacteristics() {
    const { characteristics, setCharacteristics } = useQuestionnaireStore()
    const [mainActivity, setMainActivity] = useState({ text: '', code: '' })
    const [secondaryActivities, setSecondaryActivities] = useState([] as { text: string, code: string }[])
    useEffect(() => {
        setCharacteristics({ ...characteristics, mainActivity: mainActivity.text + " " + mainActivity.code })
    }, [mainActivity])
    useEffect(() => {
        setCharacteristics({ ...characteristics, secondaryActivities: Object.values(secondaryActivities).map(({ text, code }) => (text.length > 0 || code.length > 0) && text + " " + code).filter((acts) => acts !== false) })
    }, [secondaryActivities])
    useEffect(() => {
        const fetchedMainAct = splitByLastSpace(characteristics.mainActivity)
        setMainActivity({ text: fetchedMainAct[0] ?? "", code: fetchedMainAct[1] ?? "" })
        const oldSecondaryActivities: { code: string, text: string }[] = []
        characteristics.secondaryActivities.map((secondaryActivity) => {
            const fetchedSecondaryActivity = splitByLastSpace(secondaryActivity)
            oldSecondaryActivities.push({ text: fetchedSecondaryActivity[0] ?? "", code: fetchedSecondaryActivity[1] ?? "", })
        })
        setSecondaryActivities(Object.values(oldSecondaryActivities))
    }, [])
    return <>
        <div className="p-1 flex space-x-2">
            <div>
                <Label htmlFor="name">Main activity*</Label>
                <Input id="name" name="name" className="min-w-96" value={mainActivity.text} onChange={(e) => { setMainActivity({ ...mainActivity, text: e.target.value ?? "" }) }} />
            </div>
            <div>
                <Label htmlFor="name">Code*</Label>
                <InputOTP maxLength={5} value={mainActivity.code} onChange={(e) => { setMainActivity({ ...mainActivity, code: e ?? "" }) }}>
                    <InputOTPGroup>
                        {Array.apply(0, Array(5)).map(function (_x, i) {
                            return <InputOTPSlot index={i} />
                        })}
                    </InputOTPGroup>
                </InputOTP>
            </div>
        </div >
        <div className="p-1 flex space-x-2">
            <div>
                <Label htmlFor="secondaryActivities">Secondary activity (if any)*</Label>
                <Input id="secondaryActivities" name="secondaryActivities" className="min-w-96" value={secondaryActivities[0]?.text ?? undefined} onChange={(e) => {
                    const activity = e.target.value;
                    setSecondaryActivities({ ...secondaryActivities, [0]: { code: secondaryActivities[0]?.code ?? "", text: activity } })
                }} />
            </div>
            <div>
                <Label htmlFor="name">Code*</Label>
                <InputOTP maxLength={5} value={secondaryActivities[0]?.code ?? undefined} onChange={(e) => { setSecondaryActivities({ ...secondaryActivities, [0]: { text: secondaryActivities[0]?.text ?? "", code: e } }) }}>
                    <InputOTPGroup>
                        {Array.apply(0, Array(5)).map(function (_x, i) {
                            return <InputOTPSlot index={i} />
                        })}
                    </InputOTPGroup>
                </InputOTP>
            </div>
        </div >
        <div className="p-1 flex space-x-2">
            <div>
                <Input id="secondaryActivities" className="min-w-96" name="secondaryActivities" value={secondaryActivities[1]?.text ?? undefined} onChange={(e) => {
                    const activity = e.target.value;
                    setSecondaryActivities({ ...secondaryActivities, [1]: { code: secondaryActivities[1]?.code ?? "", text: activity } })
                }} />
            </div>
            <div>
                <InputOTP maxLength={5} value={secondaryActivities[1]?.code ?? undefined} onChange={(e) => { setSecondaryActivities({ ...secondaryActivities, [1]: { text: secondaryActivities[1]?.text ?? "", code: e } }) }}>
                    <InputOTPGroup>
                        {Array.apply(0, Array(5)).map(function (_x, i) {
                            return <InputOTPSlot index={i} />
                        })}
                    </InputOTPGroup>
                </InputOTP>
            </div>
        </div >
        <div className="p-1 flex space-x-2">
            <div>
                <Input id="secondaryActivities" className="min-w-96" name="secondaryActivities" value={secondaryActivities[2]?.text ?? undefined} onChange={(e) => {
                    const activity = e.target.value;
                    setSecondaryActivities({ ...secondaryActivities, [2]: { code: secondaryActivities[2]?.code ?? "", text: activity } })
                }} />
            </div>
            <div>
                <InputOTP maxLength={5} value={secondaryActivities[2]?.code ?? undefined} onChange={(e) => { setSecondaryActivities({ ...secondaryActivities, [2]: { text: secondaryActivities[2]?.text ?? "", code: e } }) }}>
                    <InputOTPGroup>
                        {Array.apply(0, Array(5)).map(function (_x, i) {
                            return <InputOTPSlot index={i} />
                        })}
                    </InputOTPGroup>
                </InputOTP>
            </div>
        </div >
        <div className="p-1 max-w-96">
            <AutocompleteField
                hideInput={true}
                showLabel={true}
                onValueChange={(e) => { setCharacteristics({ ...characteristics, typeOfLegalOrganisation: e }) }}
                value={characteristics.typeOfLegalOrganisation}
                fieldName="Type of legal organisation*"
                options={[
                    { value: "Individual proprietor", label: "Individual proprietor" },
                    { value: "Commercial/Limited Liability Partnership", label: "Commercial/Limited Liability Partnership" },
                    { value: "Cooperative", label: "Cooperative" },
                    { value: "Company", label: "Company" },
                    { value: "Other (specify)", label: "Other (specify)" },
                ]} />
        </div>
        <div className="p-1 max-w-96">
            <AutocompleteField
                hideInput={true}
                showLabel={true}
                onValueChange={(value) => { setCharacteristics({ ...characteristics, equityParticipation: value, foreignPercentage: undefined, nationalityOfForeignOwnerShip: undefined }) }}
                value={characteristics.equityParticipation}
                fieldName="Equity participation*"
                options={[
                    { value: "Mauritian owned", label: "Mauritian owned" },
                    { value: "Joint Mauritian / Foreign", label: "Joint Mauritian / Foreign" },
                    { value: "Foreign owned", label: "Foreign owned" },
                ]} />
        </div>

        {(characteristics.equityParticipation === "Joint Mauritian / Foreign" || characteristics.equityParticipation === "Foreign owned") && <div className="p-1 flex space-x-8">
            {characteristics.equityParticipation === "Joint Mauritian / Foreign" && <div>
                <Label >State foreign share (%)*</Label>
                <InputOTP maxLength={2} value={characteristics.foreignPercentage?.toString() ?? undefined} onChange={(e) => { setCharacteristics({ ...characteristics, foreignPercentage: parseInt(e) }) }}>
                    <InputOTPGroup>
                        {Array.apply(0, Array(2)).map(function (_x, i) {
                            return <InputOTPSlot index={i} />
                        })}
                    </InputOTPGroup>
                </InputOTP>
            </div>}
            <div>
                <Label>State nationality of foreign ownership (main)*</Label>
                <InputOTP maxLength={2} value={characteristics.nationalityOfForeignOwnerShip?.toString() ?? undefined} onChange={(e) => { setCharacteristics({ ...characteristics, nationalityOfForeignOwnerShip: parseInt(e) }) }}>
                    <InputOTPGroup>
                        {Array.apply(0, Array(2)).map(function (_x, i) {
                            return <InputOTPSlot index={i} />
                        })}
                    </InputOTPGroup>
                </InputOTP></div>
        </div>}
    </>
}