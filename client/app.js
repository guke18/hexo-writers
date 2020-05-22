const Link = require('react-router').Link
const React = require('react')
const DataFetcher = require('./data-fetcher')
const api = require('./api')


const App = React.createClass({

  mixins: [DataFetcher((params) => {
    return {
      username: api.username().then(data => data.username)
    }
  })],

  render: function () {
    return <div className="app">
      <div className="app_header">
        <img src="logo.png" className="app_logo"/>
        <span className="app_title">Hexo Writers</span>
        <ul className="app_nav">
          <li><Link to="posts">Write</Link></li>
          {/*<li><Link to="pages">Pages</Link></li>*/}
          <li><Link to="deploy">Approve</Link></li>
          <li><Link to="about">About</Link></li>
          <li><Link to="settings">Settings</Link></li>
        </ul>
        <div className="app_nav_right">
          <span className='app_username'>{this.state.username}</span>
          <a href='logout' className='app_logout'>Logout</a>
        </div>
      </div>
      <div className="app_main">
        <this.props.activeRouteHandler/>
      </div>
    </div>;
  }

})

module.exports = App
