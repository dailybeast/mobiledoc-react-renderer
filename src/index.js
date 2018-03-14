import Renderer_0_3, {
  MOBILE_DOC_VERSION_0_3_0,
  MOBILE_DOC_VERSION_0_3_1
} from './renderers/0-3';

export default class MobiledocReactRenderer {
  constructor({ cards }) {
    this.options = {};
    this.options.cards = cards || [];
  }

  render(mobiledoc) {
    const { version } = mobiledoc;
    switch (version) {
      case MOBILE_DOC_VERSION_0_3_0:
      case MOBILE_DOC_VERSION_0_3_1:
        return new Renderer_0_3(mobiledoc, this.options).render();
      default:

    }
  }
}
