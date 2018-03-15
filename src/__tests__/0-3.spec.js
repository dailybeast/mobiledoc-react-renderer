/* global describe, it, expect */

const { resolve: pathResolve } = require('path');
const { StringDecoder } = require('string_decoder');
const { readFile } = require('fs');

const snapshot = require('react-test-renderer');
const { renderToStaticMarkup } = require('react-dom/server');

const MobiledocReactRenderer = require('..').default;

function getFixture (path, ...rest) {
  const decoder = new StringDecoder('utf8');
  const fixture = pathResolve(path, '__fixtures__', rest.join('/'));

  return new Promise((resolve, reject) => {
    readFile(fixture, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(decoder.write(data)));
      }
    });
  });
}

describe('React Mobiledoc renderer', () => {
  describe('0.3', () => {
    describe('basic formatting', () => {
      it('renders a basic mobiledoc', async () => {
        const mobiledoc = await getFixture(__dirname, '0-3', 'simple-mobiledoc.json');

        const rendered = new MobiledocReactRenderer({}).render(mobiledoc);

        expect(renderToStaticMarkup(rendered)).toBe('<div class="Mobiledoc"><p>Hello world!</p></div>');
      });

      it('renders a bold markup in mobiledoc', async () => {
        const mobiledoc = await getFixture(__dirname, '0-3', 'bold-mobiledoc.json');

        const rendered = new MobiledocReactRenderer({}).render(mobiledoc);

        expect(renderToStaticMarkup(rendered)).toBe('<div class="Mobiledoc"><p><strong>Hello world!</strong></p></div>');
      });

      it('renders a italic markup in mobiledoc', async () => {
        const mobiledoc = await getFixture(__dirname, '0-3', 'italic-mobiledoc.json');

        const rendered = new MobiledocReactRenderer({}).render(mobiledoc);

        expect(renderToStaticMarkup(rendered)).toBe('<div class="Mobiledoc"><p><em>Hello world!</em></p></div>');
      });

      it('renders a underlined markup in mobiledoc', async () => {
        const mobiledoc = await getFixture(__dirname, '0-3', 'underline-mobiledoc.json');

        const rendered = new MobiledocReactRenderer({}).render(mobiledoc);

        expect(renderToStaticMarkup(rendered)).toBe('<div class="Mobiledoc"><p><u>Hello world!</u></p></div>');
      });

      it('renders a strikethrough markup in mobiledoc', async () => {
        const mobiledoc = await getFixture(__dirname, '0-3', 'strikethrough-mobiledoc.json');

        const rendered = new MobiledocReactRenderer({}).render(mobiledoc);

        expect(renderToStaticMarkup(rendered)).toBe('<div class="Mobiledoc"><p><s>Hello world!</s></p></div>');
      });

      it('renders links in mobiledoc', async () => {
        const mobiledoc = await getFixture(__dirname, '0-3', 'link-mobiledoc.json');

        const rendered = new MobiledocReactRenderer({}).render(mobiledoc);

        expect(renderToStaticMarkup(rendered)).toBe('<div class="Mobiledoc"><p>A link <a href="https://www.thedailybeast.com">Hello world!</a></p></div>');
      });

      it('renders nested markup', async () => {
        const mobiledoc = await getFixture(__dirname, '0-3', 'nested-markup-mobiledoc.json');

        const rendered = new MobiledocReactRenderer({}).render(mobiledoc);

        expect(renderToStaticMarkup(rendered)).toBe('<div class="Mobiledoc"><p>Some <strong>nested <em>markup</em></strong></p></div>');
      });

      it('renders complex nested markup', async () => {
        const mobiledoc = await getFixture(__dirname, '0-3', 'complex-nested-markup-mobiledoc.json');

        const rendered = new MobiledocReactRenderer({}).render(mobiledoc);

        expect(renderToStaticMarkup(rendered)).toBe('<div class="Mobiledoc"><p>Some <strong>nested <em>markup </em></strong>then normal</p></div>');
      });

      it('renders multiple paragraphs', async () => {
        const mobiledoc = await getFixture(__dirname, '0-3', 'multi-paragraph-mobiledoc.json');

        const rendered = new MobiledocReactRenderer({}).render(mobiledoc);

        expect(renderToStaticMarkup(rendered)).toBe('<div class="Mobiledoc"><p>This is the first paragraph.</p><p>This is the second paragraph.</p></div>');
      });
    });

    describe('Real content', () => {
      it('renders complex cheat mobiledocs', async () => {
        const mobiledoc = await getFixture(__dirname, '0-3', 'cheat-commerce-mobiledoc.json');

        const rendered = new MobiledocReactRenderer({}).render(mobiledoc);
        const tree = snapshot.create(rendered).toJSON();

        expect(tree).toMatchSnapshot();
      });

      it('renders complex article mobiledocs', async () => {
        const mobiledoc = await getFixture(__dirname, '0-3', 'article-mobiledoc.json');

        const rendered = new MobiledocReactRenderer({}).render(mobiledoc);
        const tree = snapshot.create(rendered).toJSON();

        expect(tree).toMatchSnapshot();
      });
    });
  });
});
