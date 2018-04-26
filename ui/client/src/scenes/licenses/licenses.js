import React, { Component } from 'react';
import api from '../../utils/api';
import { Link, withRouter } from 'react-router-dom';
import LinkModal from 'components/link-modal/link-modal';
import './licenses.scss';

class Licenses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            license: null,
            linkModalOpen: false,
            licenses: [{}],
            videoToLink: ''
        };
        this.getLicenses = this.getLicenses.bind(this);
    }

    componentDidMount() {
        this.getLicenses();
    }

    async getLicenses() {
        try {
            const licenses = await api.getLicenses();
            this.setState({ licenses });
        } catch (err) {
            console.error(err);
        }
    }

    async linkVideo(videoID, licenseID) {
        await api.linkVideo(videoID, licenseID);
    }

    render() {
        return (
            <div id="parent">
                <h1 id="Title">Your licenses</h1>
                {this.state.licenses.length > 0 ? (
                    <div>
                        <div className="search-box">
                            <input type="search" />
                            <button className="button">Search</button>
                        </div>
                        <div id="table">
                            <table className="mk-table">
                                <thead>
                                    <tr>
                                        {Object.keys(this.state.licenses[0]).map(r => <th key={r}>{r}</th>)}
                                        <th />
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.licenses.map(license => (
                                        <tr key={license.isrc}>
                                            {Object.keys(license).map(prop => (
                                                <td key={prop}>
                                                    <span>{license[prop]}</span>
                                                </td>
                                            ))}
                                            <td>
                                                {license.link ? (
                                                    <button className="see-button">
                                                        <Link to={license.link} target="_blank">
                                                            See Video
                                                        </Link>
                                                    </button>
                                                ) : (
                                                    <button
                                                        className="link-button"
                                                        onClick={() => this.setState({ linkModalOpen: true, license })}>
                                                        <span> Link Video </span>
                                                    </button>
                                                )}
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
                <LinkModal
                    isOpen={this.state.linkModalOpen}
                    title="Link a YouTube video"
                    content={
                        <div>
                            <div className="link-content">
                                <h4>YouTube Video Link or ID</h4>
                                <input
                                    type="text"
                                    value={this.state.videoToLink || ''}
                                    onChange={e => this.setState({ videoToLink: e.target.value })}
                                />
                            </div>
                        </div>
                    }
                    actions={[{ name: 'cancel', buttonClass: 'cancel' }, { name: 'Link', buttonClass: '' }]}
                    closeModal={name => {
                        if (name === 'cancel') {
                            this.setState({ linkModalOpen: false });
                        } else if (name === 'Link') {
                            this.setState({ linkModalOpen: false });
                            this.linkVideo(this.state.videoToLink, this.state.license.licenseID); 
                        }
                    }}
                />
            </div>
        );
    }
}

export default Licenses;
