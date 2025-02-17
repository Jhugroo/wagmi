import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/server/db'
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/server/auth'
import { faker } from '@faker-js/faker';
type ResponseData = {
    message: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    const questionnaireTypes = (await db.questionnaireType.findMany({
        select: {
            id: true
        }
    })).map(({ id }) => id)
    const session = await getServerSession(req, res, authOptions)
    if (!session) {
        return
    }
    const employment = {
        description: [
            "Number of employees who were paid for the last Thursday of March 2018",
            "Number of employees who were paid for the last Thursday of March 2018 of whom employees with disabilities",
            "Outworkers",
            "Outworkers of whom outworkers with disabilities"
        ]
    }
    const enterpriseCharacteristicsData = {
        typeOfLegalOrg: [
            'Individual proprietor',
            'Commercial/Limited Liability Partnership',
            'Cooperative',
            'Company',
            'Other (specify)',
        ],
        equityParticipation: [
            'Mauritian owned',
            'Joint Mauritian / Foreign',
            'Foreign owned'
        ]
    }
    const nationality = [
        'mauritian',
        'foreigner'
    ] as "mauritian" | "foreigner"[]
    const gender = [
        'male',
        'female'
    ]
    const descriptionOptions = [
        "Number of employees who were paid for the last Thursday of March 2018",
        "Number of employees who were paid for the last Thursday of March 2018 of whom employees with disabilities",
        "Outworkers",
        "Outworkers of whom employees with disabilities",
    ]
    const createCount = req.query.no && typeof req.query.no === 'string' ? parseInt(req.query.no) : 5
    for (let i = 0; i < createCount; i++) {
        await db.questionnaire.create({
            data: {
                createdBy: {
                    connect: { id: session?.user.id }
                },
                questionnaireType: {
                    connect: { id: questionnaireTypes[faker.number.int({ min: 0, max: questionnaireTypes.length - 1 })] }
                },
                enterpriseIdentification: {
                    create: {
                        name: faker.company.name(),
                        businessAddress: faker.helpers.fake('{{location.city}} {{location.state}} {{location.street}} {{location.streetAddress}} {{location.zipCode}}'),
                        businessLicenseHolderName: faker.helpers.fake('{{person.prefix}} {{person.lastName}}'),
                        brn: "C" + faker.number.int({ min: 100000000, max: 999999999 }).toString(),
                        telNo: [faker.phone.number().toString()],
                        email: faker.internet.email()
                    }
                },
                enterpriseCharacteristics: {
                    create: {
                        mainActivity: faker.person.jobTitle() + " " + faker.number.int({ min: 10000, max: 99999 }).toString(),
                        secondaryActivities: [faker.person.jobTitle() + " " + faker.number.int({ min: 10000, max: 99999 }).toString(), faker.person.jobTitle() + " " + faker.number.int({ min: 10000, max: 99999 }).toString()],
                        typeOfLegalOrganisation: enterpriseCharacteristicsData.typeOfLegalOrg[faker.number.int({ 'min': 0, 'max': enterpriseCharacteristicsData.typeOfLegalOrg.length - 1 })] ?? "",
                        equityParticipation: enterpriseCharacteristicsData.equityParticipation[faker.number.int({ 'min': 0, 'max': enterpriseCharacteristicsData.equityParticipation.length - 1 })] ?? "",
                    }
                },
                employment: {
                    create: {
                        employed: {
                            create: {
                                nationality: nationality[faker.number.int({ 'min': 0, 'max': nationality.length - 1 })] ?? "mauritian",
                                gender: gender[faker.number.int({ 'min': 0, 'max': gender.length - 1 })] ?? "male",
                                number: faker.number.int({ min: 0, max: 700 }),
                                description: descriptionOptions[faker.number.int({ 'min': 0, 'max': descriptionOptions.length - 1 })] ?? "Number of employees who were paid for the last Thursday of March 2018",
                            }
                        }
                    }
                }
            },
        })
    }
    res.status(200).json({ message: createCount + ' Created' })
}