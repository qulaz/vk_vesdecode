import React from 'react';

import './StickyFooter.css'


class StickyFooter extends React.Component {
  stickyFooter = React.createRef()

  state = {
    height: 0
  }

  componentDidMount() {
    if (this.stickyFooter.current) {
      this.setState({ height: this.stickyFooter.current.clientHeight })
    }
  }

  render() {
    return (
      <div>
        <div className="StickyFooter" ref={this.stickyFooter}>
          <div className="wrapper" style={{ margin: this.props.margin }}>
            {this.props.children}
          </div>
        </div>
        <div
             style={{height: this.state.height}}
        />
      </div>
    )
  }
}

StickyFooter.defaultProps = {
  margin: 12,
}

export default StickyFooter
