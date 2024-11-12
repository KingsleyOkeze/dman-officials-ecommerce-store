import React, { useState } from 'react';
import '../../styles/pages-styles/footer-pages-styles/FaqPage.css';

function FaqPage () {
  const [openQuestion, setOpenQuestion] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const faqData = [
    { topic: 'Products', questions: [
      { question: 'What materials are used?', answer: 'Our products use high-quality, sustainable materials.' },
      { question: 'Are your products eco-friendly?', answer: 'Yes, we prioritize eco-friendly practices.' },
    ]},
    { topic: 'Order Delivery', questions: [
      { question: 'How long is delivery time?', answer: 'Delivery typically takes 3-5 business days.' },
      { question: 'Can I track my order?', answer: 'Yes, a tracking link is sent upon shipping.' },
    ]},
    { topic: 'Returns', questions: [
      { question: 'What is the return policy?', answer: 'Returns are accepted within 30 days of purchase.' },
      { question: 'How do I initiate a return?', answer: 'Contact our support for a return label.' },
    ]},
    { topic: 'Payment', questions: [
      { question: 'What payment methods are accepted?', answer: 'We accept all major credit cards and PayPal.' },
      { question: 'Is my payment secure?', answer: 'Yes, we use SSL encryption for all payments.' },
    ]},
    { topic: 'My Account', questions: [
      { question: 'How do I create an account?', answer: 'Click on Sign Up and follow the prompts.' },
      { question: 'Can I delete my account?', answer: 'Yes, please contact support to delete your account.' },
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
