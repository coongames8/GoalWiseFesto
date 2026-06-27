import { useState } from 'react';
import './Faq.scss';
import { faqs } from '../../data';

export default function Faq() {
    const [activeFaq, setActiveFaq] = useState(null);

    const toggleAccordion = (id) => {
        setActiveFaq((prev) => (prev === id ? null : id));
    };

    return (
        <div className="faq" id="faq">
            <h1>Frequently Asked Questions</h1>
            <p className="subtitle">Everything you need to know</p>
            <div className="accordion">
                {faqs.map((faq) => {
                    const isOpen = activeFaq === faq.id;
                    return (
                        <div
                            className={`accordion-item ${isOpen ? 'open' : ''}`}
                            key={faq.id}
                        >
                            <button
                                type="button"
                                className="accordion-button"
                                onClick={() => toggleAccordion(faq.id)}
                                aria-expanded={isOpen}
                            >
                                <span className="accordion-title">{faq.question}</span>
                                <span className={`icon ${isOpen ? 'rotated' : ''}`} aria-hidden="true" />
                            </button>
                            <div className="accordion-content">
                                <p>{faq.answer}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
