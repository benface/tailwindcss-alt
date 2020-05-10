const _ = require('lodash');
const cssMatcher = require('jest-matcher-css');
const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const altPlugin = require('./index.js');

const generatePluginCss = (variants = [], pluginOptions = {}, tailwindOptions = {}, css = null) => {
  return postcss(
    tailwindcss({
      theme: {
        screens: {
          'sm': '640px',
        },
      },
      corePlugins: false,
      plugins: [
        altPlugin(pluginOptions),
        ({ addUtilities }) => {
          addUtilities(css ? css : {
            '.w-1\\/2': {
              'width': '50%',
            },
          }, variants);
        },
      ],
      ...tailwindOptions,
    })
  )
  .process('@tailwind utilities', {
    from: undefined,
  })
  .then(result => {
    return result.css;
  });
};

expect.extend({
  toMatchCss: cssMatcher,
});

test('the plugin doesn’t do anything if the variants aren’t used', () => {
  return generatePluginCss().then(css => {
    expect(css).toMatchCss(`
      .w-1\\/2 {
        width: 50%;
      }
    `);
  });
});

test('the alt variant is working', () => {
  return generatePluginCss(['alt']).then(css => {
    expect(css).toMatchCss(`
      .w-1\\/2 {
        width: 50%;
      }
      .alt .alt\\:w-1\\/2 {
        width: 50%;
      }
    `);
  });
});

test('the alt-hover variant is working', () => {
  return generatePluginCss(['alt-hover']).then(css => {
    expect(css).toMatchCss(`
      .w-1\\/2 {
        width: 50%;
      }
      .alt .alt\\:hover\\:w-1\\/2:hover {
        width: 50%;
      }
    `);
  });
});

test('the alt-group-hover variant is working', () => {
  return generatePluginCss(['alt-group-hover']).then(css => {
    expect(css).toMatchCss(`
      .w-1\\/2 {
        width: 50%;
      }
      .alt .group:hover .alt\\:group-hover\\:w-1\\/2 {
        width: 50%;
      }
    `);
  });
});

test('all the variants are working', () => {
  return generatePluginCss(['alt', 'alt-hover', 'alt-focus', 'alt-focus-within', 'alt-active', 'alt-visited', 'alt-disabled', 'alt-first', 'alt-last', 'alt-odd', 'alt-even', 'alt-group-hover', 'alt-group-focus', 'alt-group-focus-within', 'alt-group-active', 'alt-group-visited', 'alt-group-disabled']).then(css => {
    expect(css).toMatchCss(`
      .w-1\\/2 {
        width: 50%;
      }
      .alt .alt\\:w-1\\/2 {
        width: 50%;
      }
      .alt .alt\\:hover\\:w-1\\/2:hover {
        width: 50%;
      }
      .alt .alt\\:focus\\:w-1\\/2:focus {
        width: 50%;
      }
      .alt .alt\\:focus-within\\:w-1\\/2:focus-within {
        width: 50%;
      }
      .alt .alt\\:active\\:w-1\\/2:active {
        width: 50%;
      }
      .alt .alt\\:visited\\:w-1\\/2:visited {
        width: 50%;
      }
      .alt .alt\\:disabled\\:w-1\\/2:disabled {
        width: 50%;
      }
      .alt .alt\\:first\\:w-1\\/2:first-child {
        width: 50%;
      }
      .alt .alt\\:last\\:w-1\\/2:last-child {
        width: 50%;
      }
      .alt .alt\\:odd\\:w-1\\/2:nth-child(odd) {
        width: 50%;
      }
      .alt .alt\\:even\\:w-1\\/2:nth-child(even) {
        width: 50%;
      }
      .alt .group:hover .alt\\:group-hover\\:w-1\\/2 {
        width: 50%;
      }
      .alt .group:focus .alt\\:group-focus\\:w-1\\/2 {
        width: 50%;
      }
      .alt .group:focus-within .alt\\:group-focus-within\\:w-1\\/2 {
        width: 50%;
      }
      .alt .group:active .alt\\:group-active\\:w-1\\/2 {
        width: 50%;
      }
      .alt .group:visited .alt\\:group-visited\\:w-1\\/2 {
        width: 50%;
      }
      .alt .group:disabled .alt\\:group-disabled\\:w-1\\/2 {
        width: 50%;
      }
    `);
  });
});

test('all variants can be chained with the responsive variant', () => {
  return generatePluginCss(['alt', 'alt-hover', 'alt-focus', 'alt-focus-within', 'alt-active', 'alt-visited', 'alt-disabled', 'alt-first', 'alt-last', 'alt-odd', 'alt-even', 'alt-group-hover', 'alt-group-focus', 'alt-group-focus-within', 'alt-group-active', 'alt-group-visited', 'alt-group-disabled', 'responsive']).then(css => {
    expect(css).toMatchCss(`
      .w-1\\/2 {
        width: 50%;
      }
      .alt .alt\\:w-1\\/2 {
        width: 50%;
      }
      .alt .alt\\:hover\\:w-1\\/2:hover {
        width: 50%;
      }
      .alt .alt\\:focus\\:w-1\\/2:focus {
        width: 50%;
      }
      .alt .alt\\:focus-within\\:w-1\\/2:focus-within {
        width: 50%;
      }
      .alt .alt\\:active\\:w-1\\/2:active {
        width: 50%;
      }
      .alt .alt\\:visited\\:w-1\\/2:visited {
        width: 50%;
      }
      .alt .alt\\:disabled\\:w-1\\/2:disabled {
        width: 50%;
      }
      .alt .alt\\:first\\:w-1\\/2:first-child {
        width: 50%;
      }
      .alt .alt\\:last\\:w-1\\/2:last-child {
        width: 50%;
      }
      .alt .alt\\:odd\\:w-1\\/2:nth-child(odd) {
        width: 50%;
      }
      .alt .alt\\:even\\:w-1\\/2:nth-child(even) {
        width: 50%;
      }
      .alt .group:hover .alt\\:group-hover\\:w-1\\/2 {
        width: 50%;
      }
      .alt .group:focus .alt\\:group-focus\\:w-1\\/2 {
        width: 50%;
      }
      .alt .group:focus-within .alt\\:group-focus-within\\:w-1\\/2 {
        width: 50%;
      }
      .alt .group:active .alt\\:group-active\\:w-1\\/2 {
        width: 50%;
      }
      .alt .group:visited .alt\\:group-visited\\:w-1\\/2 {
        width: 50%;
      }
      .alt .group:disabled .alt\\:group-disabled\\:w-1\\/2 {
        width: 50%;
      }
      @media (min-width: 640px) {
        .sm\\:w-1\\/2 {
          width: 50%;
        }
        .alt .sm\\:alt\\:w-1\\/2 {
          width: 50%;
        }
        .alt .sm\\:alt\\:hover\\:w-1\\/2:hover {
          width: 50%;
        }
        .alt .sm\\:alt\\:focus\\:w-1\\/2:focus {
          width: 50%;
        }
        .alt .sm\\:alt\\:focus-within\\:w-1\\/2:focus-within {
          width: 50%;
        }
        .alt .sm\\:alt\\:active\\:w-1\\/2:active {
          width: 50%;
        }
        .alt .sm\\:alt\\:visited\\:w-1\\/2:visited {
          width: 50%;
        }
        .alt .sm\\:alt\\:disabled\\:w-1\\/2:disabled {
          width: 50%;
        }
        .alt .sm\\:alt\\:first\\:w-1\\/2:first-child {
          width: 50%;
        }
        .alt .sm\\:alt\\:last\\:w-1\\/2:last-child {
          width: 50%;
        }
        .alt .sm\\:alt\\:odd\\:w-1\\/2:nth-child(odd) {
          width: 50%;
        }
        .alt .sm\\:alt\\:even\\:w-1\\/2:nth-child(even) {
          width: 50%;
        }
        .alt .group:hover .sm\\:alt\\:group-hover\\:w-1\\/2 {
          width: 50%;
        }
        .alt .group:focus .sm\\:alt\\:group-focus\\:w-1\\/2 {
          width: 50%;
        }
        .alt .group:focus-within .sm\\:alt\\:group-focus-within\\:w-1\\/2 {
          width: 50%;
        }
        .alt .group:active .sm\\:alt\\:group-active\\:w-1\\/2 {
          width: 50%;
        }
        .alt .group:visited .sm\\:alt\\:group-visited\\:w-1\\/2 {
          width: 50%;
        }
        .alt .group:disabled .sm\\:alt\\:group-disabled\\:w-1\\/2 {
          width: 50%;
        }
      }
    `);
  });
});

test('the variants can be customized', () => {
  return generatePluginCss(['dark', 'dark-hover', 'dark-group-focus-within'], {
    variants: ['dark'],
  }).then(css => {
    expect(css).toMatchCss(`
      .w-1\\/2 {
        width: 50%;
      }
      .dark .dark\\:w-1\\/2 {
        width: 50%;
      }
      .dark .dark\\:hover\\:w-1\\/2:hover {
        width: 50%;
      }
      .dark .group:focus-within .dark\\:group-focus-within\\:w-1\\/2 {
        width: 50%;
      }
    `);
  });
});

test('custom class names are escaped', () => {
  return generatePluginCss(['alt', 'alt-hover', 'alt-group-focus-within', 'test-1/2', 'test-1/2-hover', 'test-1/2-group-focus-within'], {
    variants: ['alt', 'test-1/2'],
  }).then(css => {
    expect(css).toMatchCss(`
      .w-1\\/2 {
        width: 50%;
      }
      .alt .alt\\:w-1\\/2 {
        width: 50%;
      }
      .alt .alt\\:hover\\:w-1\\/2:hover {
        width: 50%;
      }
      .alt .group:focus-within .alt\\:group-focus-within\\:w-1\\/2 {
        width: 50%;
      }
      .test-1\\/2 .test-1\\/2\\:w-1\\/2 {
        width: 50%;
      }
      .test-1\\/2 .test-1\\/2\\:hover\\:w-1\\/2:hover {
        width: 50%;
      }
      .test-1\\/2 .group:focus-within .test-1\\/2\\:group-focus-within\\:w-1\\/2 {
        width: 50%;
      }
    `);
  });
});

test('the variants work well with Tailwind’s prefix option', () => {
  return generatePluginCss(['alt', 'alt-hover', 'alt-group-focus-within'], {}, {
    prefix: 'tw-',
  }).then(css => {
    expect(css).toMatchCss(`
      .tw-w-1\\/2 {
        width: 50%;
      }
      .alt .alt\\:tw-w-1\\/2 {
        width: 50%;
      }
      .alt .alt\\:hover\\:tw-w-1\\/2:hover {
        width: 50%;
      }
      .alt .tw-group:focus-within .alt\\:group-focus-within\\:tw-w-1\\/2 {
        width: 50%;
      }
    `);
  });
});

test('the variants work on utilities that include pseudo-elements', () => {
  return generatePluginCss(['alt', 'alt-hover', 'alt-group-focus-within'], {}, {}, {
    '.placeholder-gray-400::placeholder': {
      'color': '#cbd5e0',
    },
  }).then(css => {
    expect(css).toMatchCss(`
      .placeholder-gray-400::placeholder {
        color: #cbd5e0;
      }
      .alt .alt\\:placeholder-gray-400::placeholder {
        color: #cbd5e0;
      }
      .alt .alt\\:hover\\:placeholder-gray-400:hover::placeholder {
        color: #cbd5e0;
      }
      .alt .group:focus-within .alt\\:group-focus-within\\:placeholder-gray-400::placeholder {
        color: #cbd5e0;
      }
    `);
  });
});
