/* SOLUTION FILE */
import React from 'react';
import { Link } from 'react-router-dom';

import { getMoji, getSires } from './services/requests';
import { parseDna } from './services/parse_dna';

export class MojiListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      isSire: false,
      mojiView: null
    };
  }

  componentDidMount() {
    getMoji(this.props.address)
      .then(moji => {
        this.setState({
          mojiView: parseDna(moji.dna).view
        });
        return getSires(moji.owner);
      })
      .then(sire => {
        const isSire = sire.address === this.props.address;
        if (isSire) {
          this.setState(prevState => ({
            mojiView: prevState.mojiView + ' 🎩'
          }));
        }
        this.setState({ isSire });
      })
      .finally(() => {
        this.setState({
          isLoaded: true
        });
      });
  }

  render() {
    return (
      <div className="card">
        <div className="card-body">
          <Link to={'/moji/' + this.props.address} className="card-title card-link">
            {this.state.isLoaded && (this.state.mojiView || this.props.address)}
          </Link>
        </div>
      </div>
    );
  }
}
