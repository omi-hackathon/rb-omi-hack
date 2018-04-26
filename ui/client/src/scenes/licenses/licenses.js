import React, { Component } from 'react';
import './licenses.scss';

class Licenses extends Component {
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
                                <th> Title </th> <th> Artist </th> <th> Duration </th> <th> Genre </th> <th> Mood </th>
                                <th> </th>
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
                                    <button className="link-button">
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
                                    <button className="see-button">
                                        <span> See Video </span>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Licenses;
