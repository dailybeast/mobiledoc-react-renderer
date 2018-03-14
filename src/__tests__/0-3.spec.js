/* global describe, it, expect */

const { resolve: pathResolve } = require('path');
const { StringDecoder } = require('string_decoder');
const { readFile } = require('fs');

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
    it('renders a basic mobiledoc', async () => {
      const mobiledoc = await getFixture(__dirname, '0-3', 'simple-mobiledoc.json');

      const rendered = new MobiledocReactRenderer({}).render(mobiledoc);

      expect(renderToStaticMarkup(rendered)).toBe('<div class="Mobiledoc"><p>Hello world!</p></div>');
    });
  });
});
