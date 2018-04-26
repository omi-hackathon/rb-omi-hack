import React, { Component } from 'react';
import './licenses.scss';
import LinkModal from 'components/link-modal/link-modal';

class Licenses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            linkModalOpen: false,
        };
    }
    render() {
        return (
            <div id="parent">
                <h1 id="Title">Your licenses</h1>
                <div className="search-box">
                    <input type="search" />
                    <button className="button">Search</button>
                </div>
                <div id="table">
                    <table className="mk-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Artist</th>
                                <th>Duration</th>
                                <th>Genre</th>
                                <th>Mood</th>
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
                                        className="link-button"
                                        onClick={() => this.setState({ linkModalOpen: true })}>
                                        <span> Link Video </span>
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
                                        className="see-button"
                                        onClick={() => this.setState({ linkModalOpen: true })}>
                                        <span> See Video </span>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <LinkModal
                    isOpen={this.state.linkModalOpen}
                    title="Link a YouTube video"
                    content={
                        <div>
                            <div className="link-content">
                                <h4>YouTube Video Link or ID</h4>
                                <input type="text" />
                            </div>
                        </div>
                    }
                    actions={[{ name: 'cancel', buttonClass: 'cancel' }, { name: 'Link', buttonClass: '' }]}
                    closeModal={name => {
                        if (name === 'cancel') {
                            this.setState({ linkModalOpen: false });
                        }
                    }}
                />
            </div>
        );
    }
}

export default Licenses;
