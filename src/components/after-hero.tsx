import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export function AfterHero() {
    return (
        <Accordion type="single" collapsible className="relative max-w-6xl mx-auto px-6">
            <AccordionItem value="item-1">
                <AccordionTrigger>Nutrition</AccordionTrigger>
                <AccordionContent>
                    Learn about real nutrition science
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger>Lifestyle</AccordionTrigger>
                <AccordionContent>
                    Learn about lifestyle
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
                <AccordionTrigger>What caused all this nonsense</AccordionTrigger>
                <AccordionContent>
                    Learn about why the rich dont want you to eat meat
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}