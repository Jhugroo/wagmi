import { create } from 'zustand'
export type identificationType = {
    name: string
    businessAddress: string
    businessLicenseHolderName: string
    brn: string
    vatRegistrationNumber?: string
    telNo: string[]
    faxNo?: number
    email: string
}
export type receiptType = {
    receiptData: {
        receiptOptionId: string,
        amount: number[]
    }[]
}
export type employmentType = {
    employed: {
        description: "Number of employees who were paid for the last Thursday of March 2018" |
        "Number of employees who were paid for the last Thursday of March 2018 of whom employees with disabilities" |
        "Outworkers" |
        "Outworkers of whom outworkers with disabilities",
        nationality: "mauritian" | "foreigner",
        gender: "male" | "female"
        number: number
    }[]
}
export type characteristicsType = {
    mainActivity: string,
    secondaryActivities: string[],
    typeOfLegalOrganisation: string,
    equityParticipation: string,
    foreignPercentage?: number,
    nationalityOfForeignOwnerShip?: number,
}
interface questionnaireState {
    questionnaireType: string
    setQuestionnaireType: (questionnaireType: string) => void
    identification: identificationType
    setIdentification: (identification: identificationType) => void
    characteristics: characteristicsType
    setCharacteristics: (characteristics: characteristicsType) => void
    receipt: receiptType
    setReceipt: (receipt: receiptType) => void
    employment: employmentType
    setEmployment: (employment: employmentType) => void
}
const initializeIdentification = {
    name: "",
    businessAddress: "",
    businessLicenseHolderName: "",
    brn: "",
    telNo: [],
    email: ""
}
const initializeCharacteristics = {
    mainActivity: '',
    secondaryActivities: [],
    typeOfLegalOrganisation: '',
    equityParticipation: '',
}
export const useQuestionnaireStore = create<questionnaireState>()((set) => ({
    questionnaireType: '',
    setQuestionnaireType: (questionnaireType) => set({ identification: initializeIdentification, characteristics: initializeCharacteristics, receipt: { receiptData: [] }, employment: { employed: [] }, questionnaireType: questionnaireType }),
    identification: initializeIdentification,
    setIdentification: (identification) => set({ identification: identification }),
    characteristics: initializeCharacteristics,
    setCharacteristics: (characteristics) => set({ characteristics: characteristics }),
    receipt: { receiptData: [] },
    setReceipt: (receipt) => set({ receipt: receipt }),
    employment: { employed: [] },
    setEmployment: (employment) => set({ employment: employment }),

}))