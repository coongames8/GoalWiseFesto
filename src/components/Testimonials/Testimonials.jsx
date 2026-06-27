import './Testimonials.scss';
import { testimonials } from '../../data';

export default function Testimonials() {
    return (
        <div className="testimonials">
            <div className="wrapper">
                {testimonials.map((testimonial) => (
                    <div className="testimonial" key={testimonial.id}>
                        <div className="content">
                            <span className="badge">{testimonial.title}</span>
                            <p>{testimonial.description}</p>
                        </div>
                        <h2 className="name">{testimonial.name}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
}
