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
            recordings: [],
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
        this.setState({ paymentAmount, licenseType, selectLicenseModalOpen: false, purchaseModalOpen: true });
    }

    buyLicense() {}

    render() {
        return (
            <div id="parent">
                <h1 id="Title">Marketplace for licensable music</h1>
                <div className="search-box">
                    <input type="search" />
                    <button className="button">Search</button>
                </div>
                <div id="table">
                    <table className="mk-table">
                        <thead>
                            <tr>
                                {Object.keys(this.state.recordings.map(r => (
                                    <th>{r}</th>
                                ))}
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="title-td"> ABC </td>
                                <td className="artist-td"> Mike </td>
                                <td className="duration-td"> 3:10 </td>
                                <td className="genre-td"> Ambient </td>
                                <td className="mood-td"> Calm </td>
                                <td className="license-td">
                                    <button
                                        className="license-button"
                                        onClick={() => this.setState({ selectLicenseModalOpen: true })}>
                                        <span> Purchase </span>
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td className="title-td"> DEF </td>
                                <td className="artist-td"> Stephen </td>
                                <td className="duration-td"> 2:34 </td>
                                <td className="genre-td"> Electronic </td>
                                <td className="mood-td"> Cinematic </td>
                                <td className="license-td">
                                    <button
                                        className="license-button"
                                        onClick={() => this.setState({ selectLicenseModalOpen: true })}>
                                        <span> Purchase </span>
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td className="title-td"> GHI </td>
                                <td className="artist-td"> Ursi </td>
                                <td className="duration-td"> 1:20 </td>
                                <td className="genre-td"> Rock </td>
                                <td className="mood-td"> Action </td>
                                <td className="license-td">
                                    <button
                                        className="license-button"
                                        onClick={() => this.setState({ selectLicenseModalOpen: true })}>
                                        <span> Purchase </span>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
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
                                        onClick={() => this.selectLicense('standard', '1.99')}>
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
                                        onClick={() => this.selectLicense('advanced', '29.99')}>
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
                                <h4>Carholder Name</h4>
                                <p className="code">John Doe</p>
                            </div>
                        </div>
                    }
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
