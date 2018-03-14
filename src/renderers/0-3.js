import React from 'react';

export const MOBILE_DOC_VERSION_0_3_0 = '0.3.0';
export const MOBILE_DOC_VERSION_0_3_1 = '0.3.1';

export const MARKUP_SECTION_TYPE = 1;
export const IMAGE_SECTION_TYPE = 2;
export const LIST_SECTION_TYPE = 3;
export const CARD_SECTION_TYPE = 10;

export const MARKUP_MARKER_TYPE = 0;
export const ATOM_MARKER_TYPE = 1;

export default class Renderer {
  constructor(mobiledoc, options) {
    this.mobiledoc = mobiledoc;
    this.cards = options.cards;
  }

  render() {
    return <div>{this.renderSections()}</div>
  }

  renderSections() {
    return this.mobiledoc.sections.map(section => {
      return this.renderSection(section);
    });
  }

  renderSection(section) {
    const [type] = section;

    switch (type) {
      case MARKUP_SECTION_TYPE:
        return this.renderMarkupSection(section);
      case LIST_SECTION_TYPE:
        return this.renderListSection(section);
      case CARD_SECTION_TYPE:
        return this.renderCardSection(section);
      default:
        return null;
    }
  }

  renderMarkupSection([type, TagName, markers]) {
    let element = <TagName children={[]}></TagName>;
    return this.renderMarkersOnElement(element, markers);
  }

  renderListSection([type, TagName, markers]) {
    const items = markers.map(item => {
      return this.renderMarkersOnElement(<li children={[]} />, item);
    });

    return <TagName children={items}></TagName>;
  }

  renderCardSection([type, index]) {
    const [name, payload] = this.mobiledoc.cards[index];
    const card = this.cards[index];

    let env = {
      name: name,
      isInEditor: false,
      dom: 'dom',
      // didRender: (callback) => this._registerRenderCallback(callback),
      // onTeardown: (callback) => this._registerTeardownCallback(callback)
    };

    let options = {};

    return card.render({ env, options, payload });
  }

  renderMarkersOnElement(element, markers) {
    const elements = [element];

    let pushElement = (openedElement) => {
      element.props.children.push(openedElement);
      elements.push(openedElement);
      element = openedElement;
    };

    markers.forEach(marker => {
      let [type, openTypes, closeCount, value] = marker;
      openTypes.forEach(type => {
        const [TagName, attrs] = this.mobiledoc.markups[type];
        const props = Object.assign({ children: [] }, this.parseProps(attrs));

        if (TagName) {
          let openedElement = <TagName {...props}></TagName>
          pushElement(openedElement);
        } else {
          closeCount--;
        }
      });

      switch (type) {
        case MARKUP_MARKER_TYPE:
          element.props.children.push(value);
          break;
        case ATOM_MARKER_TYPE:
          // render atom
          break;
        default:
      }

      for (let j = 0, m = closeCount; j < m; j++) {
        elements.pop();
        element = elements[elements.length - 1];
      }
    });

    return element;
  }

  parseProps(attrs) {
    if (attrs) {
      return {
        [attrs[0]]: attrs[1],
      };
    }

    return null;
  }
}
