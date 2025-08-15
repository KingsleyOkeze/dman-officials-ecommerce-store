import React, { useState } from 'react';
import '../../styles/pages-styles/footer-pages-styles/FaqPage.css';

function FaqPage () {
  const [openQuestion, setOpenQuestion] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const faqData = [
    { topic: 'Products', questions: [
      { question: 'What materials are used?', answer: 'Our products use high-quality, sustainable materials.' },
      { question: 'Are your products eco-friendly?', answer: 'Yes, we prioritize eco-friendly practices.' },


      { question: 'Which clothing size should I get?', 
        answer: `Most of our items fit due to size, however other items have a boxy fit. Therefore, 
        we recommend you take a look at the product page of the item you're interested in for information.`
      },
      { question: 'Can you give me more information about a specific product?', 
        answer: `Absolutely! Get in touch with us via chat, phone or mail when you desire more information 
                about a product. We are happy to help!.` 
      },
      { question: 'The item I want is out of stock . Will it be restocked?', 
        answer: `We're sorry that the item you're interested in is out of stock. Occasionally, depending 
        on the style, items and sizes are restocked. On the product page, you can subscribe yourself 
        to get notified when your item is back in stock.` 
        },

    ]},
    { topic: 'Order Delivery', questions: [
      { question: 'How long is delivery time?', 
        answer: `For orders within Nigeria, Delivery typically takes 3-5 business days. 
        For Orders outside Nigeria, 9 to 12 working days.`
      },
      { question: 'Can I track my order?', 
        answer: 'Yes, a tracking link is sent to you when a successful order is placed.' 
      },
      { question: 'I made a mistake with my shipping address. What can I do ? ', 
        answer: `Everybody makes mistake! When you accidentally filled in the wrong address, 
        please contact us as soon as possible. We will try our best to solve this issue for you. 
        Please note that the delivery of your package may be delayed.

        However, in order to guarantee fast processing, orders are sent to our logistics Warehouse 
        to be picked and shipped as soon as possible. Once your order is processed, unfortunately, 
        it is no longer possible to make adjustments.
        ` 
      },
      { question: 'How will my order be shipped?', 
        answer: `We will ship your order in the best custom paper- bag or boxing that best accommodate
        your order, depending on the size and number of items that are in your order.` 
      },
      { 
        question: 'Can I cancel or change my order?', 
        answer: `In order to process all orders quickly, we immediately send all orders to our logistics 
        warehouse to be picked, packaged and shipped to the recipient's location. Once your order has 
        been paid and processed, it is no longer possible to change or cancel the order` 
      }
    ]},
    { topic: 'Returns', questions: [
      { question: 'What is the return policy?', 
        answer: `At D.MAN ,We want you to be completely satisfied with your purchase. 
        If for any reason you're not delighted with your order due to:
        Incorrect shipment, Faulty or damaged items, Sizing issues.
      We are happy to provide a refund, exchange, or store credit. You can open the parcel and 
      check the contents. Once, we've received your returned item(s), we will refund the purchase 
      amount as soon as possible. Returns will only be accepted when items are unused, unworn, 
      unwashed, with all original D.MAN labels attached and in the original packaging.
      ` 
      },
      { question: 'How do I initiate a return?', 
        answer: `You have 7 days to return your order after the delivery. Orders must be returned 
        unused and in the original packaging still attached . Furthermore, items have to be unwashed 
        and with all labels still attached. Return costs are not covered by D.MAN

        – To send the item back kindly reach out to us on our email address or for faster response, 
        message us on WhatsApp via the balloon in the bottom left corner.

        – To ensure the arrival of your returned item gets to us, we strongly recommend sending the 
        parcel by a registered logistics company, D.MAN cannot be held liable for any misssing items.

        – Once we have received your return, we will do our best to process it quickly. Please keep 
        in mind sale & holiday periods might require extra processing time.
        `
      },
      { question: 'When can I expect my refund?', 
        answer: `We'll process your refund within 5-1O business days of receiving the returned item(s) 
        . Refunds will be issued to the original payment method.
        . please allow an additional 2–3 business days for the refund to appear on your statement.
      ` },
    ]},
    { topic: 'Payment', questions: [
      { question: 'What payment methods are accepted?', answer: 'We accept all major Credit cards, Bank transfers and USSD.' },
      { question: 'Is my payment secure?', answer: 'Yes, we use SSL encryption for all payments.' },
    ]},
    { topic: 'My Account', questions: [
      { question: 'How do I create an account?', answer: 'Click on Sign Up and follow the prompts.' },
      { question: 'Can I delete my account?', answer: 'Yes, please contact support to delete your account.' },
    ]},
    { topic: 'Flash Sale', questions: [
      { question: 'When are D. MAN Flash sales ?', 
        answer: 'For the latest updates on the next flash sale subscribe to our newsletter!' 
      },
      { question: 'Can I cancel/change my order?', 
        answer: `During our flash sale periods due to the high traffic of sales and special offers, 
        cancelling or changing any international or domestic order won't be possible.` 
      },
      { question: 'Where and when do you deliver during sale?', 
        answer: `Please be aware that delivery times may be longer during our Flash sale periods due 
        to the high purchasing demand of items on sale. We are working towards having your order 
        processed as fast as possible.` 
      },
    ]}
  ];

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  const filteredData = faqData.map(section => ({
    ...section,
    questions: section.questions.filter(q =>
      q.question.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(section => section.questions.length > 0);

  return (
    <div className="faq-container">
      <h1>Frequently Asked Questions (FAQs)</h1>
      <input
        type="text"
        placeholder="Search by topic"
        className="faq-search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="faq-content">
        {filteredData.map((section, sectionIndex) => (
          <div key={sectionIndex} className="faq-section">
            <h2>{section.topic}</h2>
            {section.questions.map((item, questionIndex) => (
              <div key={questionIndex} className="faq-item">
                <div
                  className="faq-question"
                  onClick={() => toggleQuestion(`${sectionIndex}-${questionIndex}`)}
                >
                  <span>{item.question}</span>
                  <span className="arrow">{openQuestion === `${sectionIndex}-${questionIndex}` ? '▲' : '▼'}</span>
                </div>
                {openQuestion === `${sectionIndex}-${questionIndex}` && (
                  <div className="faq-answer">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqPage;
