import dollarIcon from '../../../assets/images/Dollar_Sign.svg';
import ideaIcon from '../../../assets/images/Lightbulb.svg';
import cartIcon from '../../../assets/images/cart.svg';

export default function Service() {
    return (
        <>
            <div className="service_container" id="service">
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
                            Les commandes prises pensent à être original et
                            satisfaire le client !
                        </p>
                    </div>
                    <div className="service_item">
                        <img src={cartIcon} alt="Cart Icon" />
                        <hr />
                        <p>
                            Je vend mes services de developpeur et de designer,
                            il suffit de me contacter pour prendre une commande.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
