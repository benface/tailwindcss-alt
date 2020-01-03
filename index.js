const plugin = require('tailwindcss/plugin');
const _ = require('lodash');
const selectorParser = require('postcss-selector-parser');

const defaultOptions = {
  className: 'alt',
};

module.exports = plugin.withOptions(function(options = {}) {
  return function({ addVariant, config, e }) {
    options = _.defaults({}, options, defaultOptions);

    const prefixClass = function(className) {
      const prefix = config('prefix');
      const getPrefix = typeof prefix === 'function' ? prefix : () => prefix;
      return `${getPrefix(`.${className}`)}${className}`;
    };

    const altVariant = function() {
      return ({ modifySelectors, separator }) => {
        modifySelectors(({ selector }) => {
          return selectorParser(selectors => {
            selectors.walkClasses(classNode => {
              classNode.value = `${options.className}${separator}${classNode.value}`;
              classNode.parent.insertBefore(classNode, selectorParser().astSync(`.${e(options.className)} `));
            });
          }).processSync(selector);
        });
      };
    };

    const altPseudoClassVariant = function(pseudoClass, pseudoSelector = null) {
      pseudoSelector = pseudoSelector ? pseudoSelector : `:${pseudoClass}`;
      return ({ modifySelectors, separator }) => {
        modifySelectors(({ selector }) => {
          return selectorParser(selectors => {
            selectors.walkClasses(classNode => {
              classNode.value = `${options.className}${separator}${pseudoClass}${separator}${classNode.value}`;
              classNode.parent.insertBefore(classNode, selectorParser().astSync(`.${e(options.className)} `));
              classNode.parent.insertAfter(classNode, selectorParser.pseudo({ value: pseudoSelector }));
            });
          }).processSync(selector);
        });
      };
    };

    const altGroupPseudoClassVariant = function(pseudoClass) {
      return ({ modifySelectors, separator }) => {
        modifySelectors(({ selector }) => {
          return selectorParser(selectors => {
            selectors.walkClasses(classNode => {
              classNode.value = `${options.className}${separator}group-${pseudoClass}${separator}${classNode.value}`;
              classNode.parent.insertBefore(classNode, selectorParser().astSync(`.${e(options.className)} .${prefixClass('group')}:${pseudoClass} `));
            });
          }).processSync(selector);
        });
      };
    };

    addVariant('alt', altVariant());
    addVariant('alt-hover', altPseudoClassVariant('hover'));
    addVariant('alt-focus', altPseudoClassVariant('focus'));
    addVariant('alt-focus-within', altPseudoClassVariant('focus-within'));
    addVariant('alt-active', altPseudoClassVariant('active'));
    addVariant('alt-visited', altPseudoClassVariant('visited'));
    addVariant('alt-disabled', altPseudoClassVariant('disabled'));
    addVariant('alt-first', altPseudoClassVariant('first', ':first-child'));
    addVariant('alt-last', altPseudoClassVariant('last', ':last-child'));
    addVariant('alt-odd', altPseudoClassVariant('odd', ':nth-child(odd)'));
    addVariant('alt-even', altPseudoClassVariant('even', ':nth-child(even)'));
    addVariant('alt-group-hover', altGroupPseudoClassVariant('hover'));
    addVariant('alt-group-focus', altGroupPseudoClassVariant('focus'));
    addVariant('alt-group-focus-within', altGroupPseudoClassVariant('focus-within'));
    addVariant('alt-group-active', altGroupPseudoClassVariant('active'));
    addVariant('alt-group-visited', altGroupPseudoClassVariant('visited'));
    addVariant('alt-group-disabled', altGroupPseudoClassVariant('disabled'));
  };
});
