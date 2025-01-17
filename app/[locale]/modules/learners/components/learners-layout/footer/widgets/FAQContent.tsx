import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/shared/components';

import { faqSections } from '@/modules/learners/components/learners-layout/footer/widgets/mokeDataFAQ';

const FAQContent = () => {
  const renderContent = () => {
    return (
      <div className="space-y-8 mt-8">
        {faqSections.map((section, idx) => (
          <div key={idx}>
            <h1 className="text-2xl font-bold py-4">{section.title}</h1>
            <div className="border rounded-lg">
              <Accordion type="single" collapsible className="divide-y">
                {section.questions.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`section-${idx}-item-${index}`}
                  >
                    <AccordionTrigger className="px-4 hover:no-underline">
                      <div className="flex flex-col items-start text-left text-xl">
                        {faq.question}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 text-gray-600">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return <div>{renderContent()}</div>;
};

export default FAQContent;
