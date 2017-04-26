'use strict';
import { h, render, Component } from 'preact';
import cx from 'classnames';
const MarkdownIt = require('markdown-it'),
  md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true
  });

const s = require('./PersonRow.css');

class PersonRowComponent extends Component {

  constructor() {
    super();

    this.state = {
      explainerHeight: false
    };

    this.openBio = this.openBio.bind(this);
  }

  openBio() {
    this.props.callback(this.props.id, 'bio');
  }

  render(props) {
    const { round, ganador, explicacion, open } = props;

    return (

      <div className={cx(
        s.container,
        { [s.open]: open }
      )}>
        <div className={s.columns} onClick={this.openBio}>
          <div className={s.column}>
            <span className={s.text}>{round}</span>
          </div>
          <div className={s.column}>
            <span className={s.text}>{ganador}</span>
          </div>
        </div>
        <div className={cx(
          s.explainer,
          'row',
          { [s.row_open]: open.type === 'bio' }
        )}>
          <div className={s.explainer__triangle} />
          <div className="col-sm-7">
            <button className={s.close_btn} onClick={this.openBio}>
              <svg width="41px" height="41px" viewBox="545 936 41 41" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <polygon id="Page-1" stroke="none"
                         points="585.513587 938.104807 583.892261 936.483481 565.258261 955.120414 546.621327 936.483481 545 938.104807 563.636934 956.741741 545 975.378674 546.621327 977 565.258261 958.363067 583.892261 977 585.513587 975.378674 566.879587 956.741741" />
              </svg>
            </button>
            <div dangerouslySetInnerHTML={{ __html: md.render(explicacion) }}>
            </div>
          </div>
          <div className={cx("col-sm-4", s.titulo)}>
            <h3 className={s.round}>{round}</h3>
            <h4 className={s.ganador}>Ganador: {ganador}</h4>
          </div>

        </div>
      </div>
    );
  }
}

PersonRowComponent.displayName = 'PersonRowComponent';

// Uncomment properties you need
// PersonRowComponent.propTypes = {};
// PersonRowComponent.defaultProps = {};

export default PersonRowComponent;