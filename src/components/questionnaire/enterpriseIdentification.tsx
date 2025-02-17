import { useQuestionnaireStore } from "@/state/questionnaire"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { Minus, Plus } from "lucide-react"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
import { useEffect, useState } from "react"
import { splitByLastSpace } from "@/lib/utils"
export function ShowEnterpriseIdentification() {
    const { identification, setIdentification } = useQuestionnaireStore()
    const [address, setAddress] = useState('')
    const [postalAddress, setPostalAddress] = useState('')

    useEffect(() => {
        setIdentification({ ...identification, ['businessAddress']: address + " " + postalAddress ?? "" })
    }, [address, postalAddress])
    useEffect(() => {
        const address = splitByLastSpace(identification.businessAddress)
        setAddress(address[0] ?? '')
        setPostalAddress(address[1] ?? '')
        if (identification.telNo.length === 0) {
            setIdentification({
                ...identification, ['telNo']: identification.telNo ? [...identification?.telNo, '+'] : ['+']
            })
        }
    }, [])
    return <>
        <div className="p-1">
            <Label htmlFor="name">Name Of Business*</Label>
            <Input id="name" name="name" value={identification.name} onChange={(e) => { setIdentification({ ...identification, ['name']: e.target.value ?? "" }) }} />
        </div>
        <div className="p-1">
            <Label htmlFor="name">Business Address*</Label>
            <Input id="name" name="name" value={address ?? ""} onChange={(e) => { setAddress(e.target.value ?? "") }} />
            Postal Address Code*<InputOTP maxLength={5} value={postalAddress} onChange={(e) => { setPostalAddress(e ?? "") }}>
                <InputOTPGroup>
                    {Array.apply(0, Array(5)).map(function (_x, i) {
                        return <InputOTPSlot index={i} />
                    })}
                </InputOTPGroup>
            </InputOTP>
        </div>
        <div className="p-1">
            <Label htmlFor="name">Business Licence Holder Name*</Label>
            <Input id="name" name="name" value={identification.businessLicenseHolderName ?? ""} onChange={(e) => { setIdentification({ ...identification, ['businessLicenseHolderName']: e.target.value ?? "" }) }} />
        </div >
        <div className="p-1">
            <Label >BRN*</Label>
            <InputOTP pattern={REGEXP_ONLY_DIGITS_AND_CHARS} maxLength={9} value={identification.brn ?? ""} onChange={(e) => { setIdentification({ ...identification, ['brn']: e.toLocaleUpperCase() ?? "" }) }}>
                <InputOTPGroup>
                    {Array.apply(0, Array(9)).map(function (_x, i) {
                        return <InputOTPSlot index={i} />
                    })}
                </InputOTPGroup>
            </InputOTP>
        </div>
        <div className="p-1">
            <Label>Vat Registration Number</Label>
            <div className="flex">
                <InputOTP pattern={REGEXP_ONLY_DIGITS_AND_CHARS} maxLength={3} value={"VAT"} disabled aria-disabled={false}>
                    <InputOTPGroup>
                        {Array.apply(0, Array(3)).map(function (_x, i) {
                            return <InputOTPSlot index={i} />
                        })}
                    </InputOTPGroup>
                </InputOTP>
                <InputOTP pattern={REGEXP_ONLY_DIGITS_AND_CHARS} maxLength={8} value={identification.vatRegistrationNumber ?? ""} onChange={(e) => { setIdentification({ ...identification, ['vatRegistrationNumber']: e.toLocaleUpperCase() ?? "" }) }}>
                    <InputOTPGroup>
                        {Array.apply(0, Array(8)).map(function (_x, i) {
                            return <InputOTPSlot index={i} />
                        })}
                    </InputOTPGroup>
                </InputOTP>
            </div>
        </div>
        <div className="p-1">
            <Label htmlFor="name">Tel/Mobile No*</Label>
            {identification.telNo?.map((tel, i) => {
                return <div className="flex" key={`tel-mobile-${i}`} >
                    <span className="pt-2">+230</span><Input id="name" name="name" value={tel} type="number" onChange={(e) => {
                        const newNumber = e.target.value;
                        setIdentification({ ...identification, ['telNo']: identification.telNo?.map((num, idx) => idx === i ? newNumber : num) })
                    }} />
                    <Button variant="destructive" onClick={() => setIdentification({ ...identification, ['telNo']: identification.telNo?.filter((_, idx) => idx !== i) })} >
                        <Minus />
                    </Button>
                </div>
            })}
            <Button variant="default" className="mx-2" onClick={() => setIdentification({ ...identification, ['telNo']: identification.telNo ? [...identification?.telNo, '+'] : ['+'] })}>
                <Plus />
            </Button>
        </div >
        <div className="p-1">
            <Label htmlFor="name">Fax No</Label>
            <Input id="name" name="name" value={identification.faxNo ?? ""} type="number" onChange={(e) => { setIdentification({ ...identification, ['faxNo']: parseInt(e.target.value) }) }} />
        </div>
        <div className="p-1">
            <Label htmlFor="name">E-mail*</Label>
            <Input id="name" name="name" value={identification.email ?? ""} type="email" onChange={(e) => { setIdentification({ ...identification, ['email']: e.target.value ?? "" }) }} />
        </div>

    </>
}