const _ = require('lodash');
const cssMatcher = require('jest-matcher-css');
const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const altPlugin = require('./index.js');

const generatePluginCss = (variants = []) => {
  return postcss(
    tailwindcss({
      theme: {
        screens: {
          'sm': '640px',
        },
      },
      corePlugins: false,
      plugins: [
        altPlugin(),
        ({ e, addUtilities }) => {
          addUtilities({
            '.block': {
              'display': 'block',
            },
          }, variants);
        },
      ],
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
      .block {
        display: block;
      }
    `);
  });
});

test('the alt variant is working', () => {
  return generatePluginCss(['alt']).then(css => {
    expect(css).toMatchCss(`
      .block {
        display: block;
      }
      .alt .alt\\:block {
        display: block;
      }
    `);
  });
});

test('the alt-hover variant is working', () => {
  return generatePluginCss(['alt-hover']).then(css => {
    expect(css).toMatchCss(`
      .block {
        display: block;
      }
      .alt .alt\\:hover\\:block:hover {
        display: block;
      }
    `);
  });
});

test('the alt-group-hover variant is working', () => {
  return generatePluginCss(['alt-group-hover']).then(css => {
    expect(css).toMatchCss(`
      .block {
        display: block;
      }
      .alt .group:hover .alt\\:group-hover\\:block {
        display: block;
      }
    `);
  });
});

test('all the variants are working', () => {
  return generatePluginCss(['alt', 'alt-hover', 'alt-focus', 'alt-focus-within', 'alt-active', 'alt-visited', 'alt-disabled', 'alt-group-hover', 'alt-group-focus', 'alt-group-focus-within', 'alt-group-active', 'alt-group-visited', 'alt-group-disabled']).then(css => {
    expect(css).toMatchCss(`
      .block {
        display: block;
      }
      .alt .alt\\:block {
        display: block;
      }
      .alt .alt\\:hover\\:block:hover {
        display: block;
      }
      .alt .alt\\:focus\\:block:focus {
        display: block;
      }
      .alt .alt\\:focus-within\\:block:focus-within {
        display: block;
      }
      .alt .alt\\:active\\:block:active {
        display: block;
      }
      .alt .alt\\:visited\\:block:visited {
        display: block;
      }
      .alt .alt\\:disabled\\:block:disabled {
        display: block;
      }
      .alt .group:hover .alt\\:group-hover\\:block {
        display: block;
      }
      .alt .group:focus .alt\\:group-focus\\:block {
        display: block;
      }
      .alt .group:focus-within .alt\\:group-focus-within\\:block {
        display: block;
      }
      .alt .group:active .alt\\:group-active\\:block {
        display: block;
      }
      .alt .group:visited .alt\\:group-visited\\:block {
        display: block;
      }
      .alt .group:disabled .alt\\:group-disabled\\:block {
        display: block;
      }
    `);
  });
});

test('all variants can be chained with the responsive variant', () => {
  return generatePluginCss(['alt', 'alt-hover', 'alt-focus', 'alt-focus-within', 'alt-active', 'alt-visited', 'alt-disabled', 'alt-group-hover', 'alt-group-focus', 'alt-group-focus-within', 'alt-group-active', 'alt-group-visited', 'alt-group-disabled', 'responsive']).then(css => {
    expect(css).toMatchCss(`
      .block {
        display: block;
      }
      .alt .alt\\:block {
        display: block;
      }
      .alt .alt\\:hover\\:block:hover {
        display: block;
      }
      .alt .alt\\:focus\\:block:focus {
        display: block;
      }
      .alt .alt\\:focus-within\\:block:focus-within {
        display: block;
      }
      .alt .alt\\:active\\:block:active {
        display: block;
      }
      .alt .alt\\:visited\\:block:visited {
        display: block;
      }
      .alt .alt\\:disabled\\:block:disabled {
        display: block;
      }
      .alt .group:hover .alt\\:group-hover\\:block {
        display: block;
      }
      .alt .group:focus .alt\\:group-focus\\:block {
        display: block;
      }
      .alt .group:focus-within .alt\\:group-focus-within\\:block {
        display: block;
      }
      .alt .group:active .alt\\:group-active\\:block {
        display: block;
      }
      .alt .group:visited .alt\\:group-visited\\:block {
        display: block;
      }
      .alt .group:disabled .alt\\:group-disabled\\:block {
        display: block;
      }
      @media (min-width: 640px) {
        .sm\\:block {
          display: block;
        }
        .alt .sm\\:alt\\:block {
          display: block;
        }
        .alt .sm\\:alt\\:hover\\:block:hover {
          display: block;
        }
        .alt .sm\\:alt\\:focus\\:block:focus {
          display: block;
        }
        .alt .sm\\:alt\\:focus-within\\:block:focus-within {
          display: block;
        }
        .alt .sm\\:alt\\:active\\:block:active {
          display: block;
        }
        .alt .sm\\:alt\\:visited\\:block:visited {
          display: block;
        }
        .alt .sm\\:alt\\:disabled\\:block:disabled {
          display: block;
        }
        .alt .group:hover .sm\\:alt\\:group-hover\\:block {
          display: block;
        }
        .alt .group:focus .sm\\:alt\\:group-focus\\:block {
          display: block;
        }
        .alt .group:focus-within .sm\\:alt\\:group-focus-within\\:block {
          display: block;
        }
        .alt .group:active .sm\\:alt\\:group-active\\:block {
          display: block;
        }
        .alt .group:visited .sm\\:alt\\:group-visited\\:block {
          display: block;
        }
        .alt .group:disabled .sm\\:alt\\:group-disabled\\:block {
          display: block;
        }
      }
    `);
  });
});
