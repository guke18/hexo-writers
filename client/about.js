var React = require('react')

var About = React.createClass({
  render: function () {
    return <div className="about">
      <h1>This is the Hexo Writers Plugin</h1>
      <p><strong>Goal: Provide an awesome writing experience for contributing to a blog.</strong></p>
      <p>
        Useful links:
        <ul>
          <li><a href="http://hexo.io">Hexo site</a></li>
          <li><a href="https://github.com/musicin3d/hexo-writers">Github page for this plugin</a></li>
        </ul>
      </p>
    </div>
  }
})

module.exports = About

