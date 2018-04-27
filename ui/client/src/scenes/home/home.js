import React, { Component } from 'react';
import api from '../../utils/api';
import loadImage from 'utils/load-image';
import SelectLicenseModal from 'components/select-license-modal/select-license-modal';
import PurchaseModal from 'components/purchase-modal/purchase-modal';
import './home.scss';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recordings: [{}],
            isrc: null,
            licenseType: 0,
            selectedLicense: null,
            selectLicenseModalOpen: false,
            purchaseModalOpen: false,
            paymentAmount: 0,
        };
        this.getRecordings = this.getRecordings.bind(this);
    }

    componentDidMount() {
        this.getRecordings();
    }

    async getRecordings() {
        try {
            const recordings = await api.getRecordings();
            this.setState({ recordings });
        } catch (err) {
            console.error(err);
        }
    }

    selectLicense(licenseType, paymentAmount) {
        this.setState({
            paymentAmount,
            licenseType,
            selectLicenseModalOpen: false,
            purchaseModalOpen: true,
        });
    }

    buyLicense() {}

    render() {
        return (
            <div id="parent">
                <h1 id="Title">Marketplace for licensable music</h1>
                {this.state.recordings.length > 0 ? (
                    <div>
                        <div className="search-box">
                            <input type="search" />
                            <button className="button">Search</button>
                        </div>
                        <div id="table">
                            <table className="mk-table">
                                <thead>
                                    <tr>
                                        {Object.keys(this.state.recordings[0]).map(r => <th key={r}>{r}</th>)}
                                        <th key="button" />
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.recordings.map(recording => (
                                        <tr key={recording.isrc}>
                                            {Object.keys(recording).map(prop => (
                                                <td key={prop}>
                                                    <span>{recording[prop]}</span>
                                                </td>
                                            ))}
                                            <td>
                                                <button
                                                    className="license-button"
                                                    onClick={() =>
                                                        this.setState({
                                                            selectLicenseModalOpen: true,
                                                            isrc: recording.isrc,
                                                        })
                                                    }>
                                                    <span>Purchase</span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <p>You have not purchased any license yet.</p>
                )}
                <SelectLicenseModal
                    isOpen={this.state.selectLicenseModalOpen}
                    title="Select the license you want to buy"
                    content={
                        <div>
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
                                        onClick={() => this.selectLicense(0, '1.99')}>
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
                                        onClick={() => this.selectLicense(1, '29.99')}>
                                        Purchase
                                    </button>
                                </div>
                            </div>
                        </div>
                    }
                    actions={[]} //{ name: 'cancel', buttonClass: 'cancel' }, { name: 'buy', buttonClass: '' }
                    closeModal={() => {
                        this.setState({ selectLicenseModalOpen: false });
                    }}
                />
                <PurchaseModal
                    isOpen={this.state.purchaseModalOpen}
                    title="Verify your payment information"
                    content={
                        <div>
                            <div className="payment-details">
                                <img src={loadImage('card-icon.jpg')} />
                                <h4>Payment Amount</h4>
                                <p className="code">€{this.state.paymentAmount}</p>
                                <h4>Credit Card Number</h4>
                                <p className="code">xxxx-xxxx-xxxx-xxxx</p>
                                <h4>Expiration Date</h4>
                                <p className="code">07/20</p>
                                <h4>Cardholder Name</h4>
                                <p className="code">John Doe</p>
                            </div>
                        </div>
                    }
                    licenseType={this.state.licenseType}
                    isrc={this.state.isrc}
                    actions={[{ name: 'back', buttonClass: 'cancel' }, { name: 'purchase', buttonClass: '' }]}
                    closeModal={name => {
                        if (name === 'cancel') {
                            this.setState({ purchaseModalOpen: false });
                        } else if (name === 'back') {
                            this.setState({ selectLicenseModalOpen: true, purchaseModalOpen: false });
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

export default Home;
