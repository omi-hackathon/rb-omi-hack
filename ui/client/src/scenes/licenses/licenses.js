import React, { Component } from 'react';
import SelectLicenseModal from 'components/select-license-modal/select-license-modal';
import PurchaseModal from 'components/purchase-modal/purchase-modal';

class Licenses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectLicenseModalOpen: false,
            purchaseModalOpen: false,
        };
    }

    selectLicense(type) {}

    buyLicense() {}

    render() {
        return (
            <div>
                Licenses<button onClick={() => this.setState({ selectLicenseModalOpen: true })}>Buy</button>
                <SelectLicenseModal
                    isOpen={this.state.selectLicenseModalOpen}
                    title="Select the license you want to buy"
                    content={
                        <div>
                            <p>This will overwrite your data for this work with the data in state.</p>
                            <div className="licenses">
                                <div className="license license-standard">
                                    <h1>STANDARD</h1>
                                    <h2>You will get:</h2>
                                    <ul>
                                        <li>Feature 1</li>
                                        <li>Feature 2</li>
                                        <li>Feature 3</li>
                                    </ul>
                                    <button
                                        className="button button-license"
                                        onClick={() => this.action('purchase-standard')}>
                                        Purchase
                                    </button>
                                </div>
                                <div className="license license-advanced">
                                    <h1>ADVANCED</h1>
                                    <h2>You will get:</h2>
                                    <ul>
                                        <li>Feature 1</li>
                                        <li>Feature 2</li>
                                        <li>Feature 3</li>
                                    </ul>
                                    <button
                                        className="button button-license"
                                        onClick={() => this.action('purchase-advanced')}>
                                        Purchase
                                    </button>
                                </div>
                            </div>
                        </div>
                    }
                    actions={[]} //{ name: 'cancel', buttonClass: 'cancel' }, { name: 'buy', buttonClass: '' }
                    closeModal={name => {
                        if (name === 'cancel') {
                            this.setState({ selectLicenseModalOpen: false });
                        } else if (name === 'buy') {
                            this.setState({ selectLicenseModalOpen: false }); // temp
                            this.buyLicense();
                        }
                    }}
                />
                <PurchaseModal
                    isOpen={this.state.purchaseModalOpen}
                    title="Verify your payment information"
                    content={
                        <div>
                            <div className="card-details">
                                <img src="http://chittagongit.com//images/paypal-credit-card-icon/paypal-credit-card-icon-11.jpg" />
                                <p>xxxx-xxxx-xxxx-xxxx</p>
                            </div>
                        </div>
                    }
                    actions={[{ name: 'cancel', buttonClass: 'cancel' }, { name: 'purchase', buttonClass: '' }]}
                    closeModal={name => {
                        if (name === 'cancel') {
                            this.setState({ purchaseModalOpen: false });
                        } else if (name === 'purchase') {
                            this.setState({ purchaseModalOpen: false }); // temp
                            this.buyLicense();
                        }
                    }}
                />
            </div>
        );
    }
}

export default Licenses;
