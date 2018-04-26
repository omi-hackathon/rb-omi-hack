import React, { Component } from 'react';
import './home.scss';
import SelectLicenseModal from 'components/select-license-modal/select-license-modal';
import PurchaseModal from 'components/purchase-modal/purchase-modal';

class Home extends Component {
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
            <div id="parent">
                <div id="Title">Marketplace for licensable music</div>
                <div id="search">
                    <input type="search" id="mySearch" name="q" />
                    <button>Search</button>
                </div>
                <div id="table">
                    <table class="mk-table">
                        <thead>
                            {' '}
                            <tr>
                                {' '}
                                <th> Title </th> <th> Artist </th> <th> Duration </th> <th> Genre </th> <th> Mood </th>{' '}
                                <th> </th>{' '}
                            </tr>{' '}
                        </thead>
                        <tbody>
                            <tr>
                                <td class="title-td"> ABC </td>
                                <td class="artist-td"> Mike </td>
                                <td class="duration-td"> 3:10 </td>
                                <td class="genre-td"> Ambient </td>
                                <td class="mood-td"> Calm </td>
                                <td class="license-td">
                                    {' '}
                                    <button className="license-button" onClick={() => this.setState({ selectLicenseModalOpen: true })}>
                                        {' '}
                                        <span> Purchase </span>{' '}
                                    </button>{' '}
                                </td>
                            </tr>
                            <tr>
                                <td class="title-td"> DEF </td>
                                <td class="artist-td"> Stephen </td>
                                <td class="duration-td"> 2:34 </td>
                                <td class="genre-td"> Electronic </td>
                                <td class="mood-td"> Cinematic </td>
                                <td class="license-td">
                                    {' '}
                                    <button className="license-button" onClick={() => this.setState({ selectLicenseModalOpen: true })}>
                                        {' '}
                                        <span> Purchase </span>{' '}
                                    </button>{' '}
                                </td>
                            </tr>
                            <tr>
                                <td class="title-td"> GHI </td>
                                <td class="artist-td"> Ursi </td>
                                <td class="duration-td"> 1:20 </td>
                                <td class="genre-td"> Rock </td>
                                <td class="mood-td"> Action </td>
                                <td class="license-td">
                                    {' '}
                                    <button className="license-button" onClick={() => this.setState({ selectLicenseModalOpen: true })}>
                                        {' '}
                                        <span> Purchase </span>{' '}
                                    </button>{' '}
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

export default Home;
