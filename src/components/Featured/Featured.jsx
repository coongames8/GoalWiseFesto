import './Featured.scss';
import { featured } from '../../data';

const Featured = () => {
    return (
        <section className="featured">
            <div className="section">
                <h1 className="heading">Why Goal Wise</h1>
                <p className="subheading">Everything you need to make smarter football predictions</p>
                <div className="wrapper">
                    {featured.map((feature) => (
                        <div className="item" key={feature.title}>
                            <div className="emoji">{feature.emoji}</div>
                            <h3>{feature.title}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Featured;
