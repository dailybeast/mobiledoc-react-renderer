## Mobiledoc React Renderer

Mobiledoc server and client rendering for [Mobiledoc-kit](https://github.com/bustlelabs/mobiledoc-kit).

This renderer is used across [www.thedailybeast.com](https://www.thedailybeast.com) to perform both client and server rendering of our React app. It supports rendering of markups, atoms, cards and custom sections of any mobiledoc (0.3.0 or greater).

[![CircleCI](https://circleci.com/gh/dailybeast/mobiledoc-react-renderer.svg?style=svg)](https://circleci.com/gh/dailybeast/mobiledoc-react-renderer)

### Usage

This renderer is intended to  be used from react components, for example:

```javascript
import PropTypes from 'prop-types';
import { Component } from 'react';
import MobiledocReactRenderer from 'mobiledoc-react-renderer';

const mobiledoc = {
  "atoms": [],
  "cards": [],
  "markups": [],
  "sections": [
    [
      1,
      "p",
      [
        [0, [], 0, "Hello world!"]
      ]
    ]
  ],
  "version": "0.3.0"
};

export default class Mobiledoc extends Component {
  static propTypes = {
    mobiledoc: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    const options = { atoms: [], cards: [], markups: [] };

    this.renderer = new MobiledocReactRenderer(options);
  }

  render() {
    return this.renderer.render(this.props.mobiledoc);
  }
}

```

### Tests
 To run the unit tests use:  `npm test`
