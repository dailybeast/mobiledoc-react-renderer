import Renderer_0_3, { // eslint-disable-line
  MOBILE_DOC_VERSION_0_3_0,
  MOBILE_DOC_VERSION_0_3_1
} from './renderers/0-3';

// ///////////////////////////////////////
//
// This will be factored out into a seperate NPM package
// and made publically available as TDB's first open-source
// contribution.
//
// NOTE: Currently unsupported mobiledoc features are:
// native image card, default card renderers
//
// ///////////////////////////////////////

export default class MobiledocReactRenderer {
  constructor ({ sections = {}, atoms = [], cards = [], markups = [] }) {
    this.options = {
      sections,
      atoms,
      cards,
      markups
    };
  }

  render (mobiledoc) {
    const { version } = mobiledoc;
    switch (version) {
      case MOBILE_DOC_VERSION_0_3_0:
      case MOBILE_DOC_VERSION_0_3_1:
        return new Renderer_0_3(mobiledoc, this.options).render();
      default:
        return null;
    }
  }
}
