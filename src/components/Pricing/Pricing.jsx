import './Pricing.scss';
import { NavLink, useLocation } from 'react-router-dom';
import { pricings } from '../../data';
import { useState } from 'react';

const BILLING_OPTIONS = [
    { value: 'Day', label: 'Daily' },
    { value: 'Week', label: 'Weekly' },
    { value: 'Month', label: 'Monthly' },
];

export default function Pricing() {
    const [billing, setBilling] = useState('Day');
    const location = useLocation();

    return (
        <div className="pricing" id="pricing">
            <div className="section">
                <h1 className="head">Pricing Plans</h1>
                <p className="subhead">Choose the plan that fits your game</p>

                <div className="pricing-header">
                    <div className="plans-options">
                        {BILLING_OPTIONS.map((opt) => (
                            <label key={opt.value}>
                                <input
                                    type="radio"
                                    name="billing"
                                    value={opt.value}
                                    checked={billing === opt.value}
                                    onChange={() => setBilling(opt.value)}
                                />
                                {opt.label}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="wrapper">
                    {pricings
                        .filter((item) => item.billing === billing)
                        .map((pricing) => (
                            <div className="plan-card" key={pricing.id} style={{ '--accent': pricing.color }}>
                                <div className="plan-header">
                                    <h2 className="plan-name">{pricing.plan}</h2>
                                    <div className="price">
                                        <span className="amount">KSH {pricing.price}</span>
                                        <span className="period">/{pricing.billing}</span>
                                    </div>
                                    <p className="plan-title">{pricing.title}</p>
                                </div>
                                <ul className="features">
                                    {pricing.features.map((feature) => (
                                        <li key={feature.split(' ').join('_')}>{feature}</li>
                                    ))}
                                </ul>
                                <NavLink
                                    className="btn"
                                    state={{ from: location, subscription: pricing }}
                                    to="/subscribe"
                                >
                                    Subscribe now
                                </NavLink>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}
