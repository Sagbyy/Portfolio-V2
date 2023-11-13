import dollarIcon from '../../../assets/images/Dollar_Sign.svg';
import ideaIcon from '../../../assets/images/Lightbulb.svg';
import cartIcon from '../../../assets/images/cart.svg';

export default function Service() {
    return (
        <>
            <div className="service_container">
                <div className="service_title">
                    <h2 className="service_bigTitle">Services</h2>
                    <h2 className="service_littleTitle">Services</h2>
                </div>
                <div className="service_main">
                    <div className="service_item">
                        <img src={dollarIcon} alt="Dollar Icon" />
                        <hr />
                        <p>
                            Les prix varient énormément dans la quantité de
                            travail et la difficulté demandée.
                        </p>
                    </div>
                    <div className="service_item">
                        <img src={ideaIcon} alt="Idea Icon" />
                        <hr />
                        <p>
                            Les prix varient énormément dans la quantité de
                            travail et la difficulté demandée.
                        </p>
                    </div>
                    <div className="service_item">
                        <img src={cartIcon} alt="Cart Icon" />
                        <hr />
                        <p>
                            Les prix varient énormément dans la quantité de
                            travail et la difficulté demandée.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
