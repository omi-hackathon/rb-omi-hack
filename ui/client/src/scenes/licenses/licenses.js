import React, { Component } from 'react';
import './licenses.scss';

class Licenses extends Component {
    render() {
        return (
        <div id="parent">
        <div id="Title">
          Marketplace for licensable music
        </div>
          <div id="search">
              <input type="search" id="mySearch" name="q"></input>
              <button>Search</button>
          </div>
          <div id="table">
          <table class='mk-table'>
            <thead> <tr> <th> Title </th> <th> Artist </th> <th> Duration </th> <th> Genre </th> <th> Mood </th> <th> </th> </tr> </thead>
            <tbody>
              <tr>
                <td class="title-td"> ABC </td>
                <td class="artist-td"> Mike </td>
                <td class="duration-td"> 3:10 </td>
                <td class="genre-td"> Ambient </td>
                <td class="mood-td"> Calm </td>
                <td class="license-td"> <button className="link-button"> <span> Link Video </span> </button> </td>
              </tr>
              <tr>
                <td class="title-td"> DEF </td>
                <td class="artist-td"> Stephen </td>
                <td class="duration-td"> 2:34 </td>
                <td class="genre-td"> Electronic </td>
                <td class="mood-td"> Cinematic </td>
                <td class="license-td"> <button className="see-button"> <span> See Video </span> </button> </td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>);

    }
}

export default Licenses;
