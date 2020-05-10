const plugin = require('tailwindcss/plugin');
const _ = require('lodash');
const selectorParser = require('postcss-selector-parser');

const defaultOptions = {
  variants: ['alt'],
};

module.exports = plugin.withOptions(function(options = {}) {
  return function({ addVariant, config, e }) {
    options = _.defaults({}, options, defaultOptions);

    const prefixClass = function(className) {
      const prefix = config('prefix');
      const getPrefix = typeof prefix === 'function' ? prefix : () => prefix;
      return `${getPrefix(`.${className}`)}${className}`;
    };

    _.forEach(options.variants, variant => {
      const altVariant = function() {
        return ({ modifySelectors, separator }) => {
          modifySelectors(({ selector }) => {
            return selectorParser(selectors => {
              selectors.walkClasses(classNode => {
                classNode.value = `${variant}${separator}${classNode.value}`;
                classNode.parent.insertBefore(classNode, selectorParser().astSync(`.${e(variant)} `));
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
                classNode.value = `${variant}${separator}${pseudoClass}${separator}${classNode.value}`;
                classNode.parent.insertBefore(classNode, selectorParser().astSync(`.${e(variant)} `));
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
                classNode.value = `${variant}${separator}group-${pseudoClass}${separator}${classNode.value}`;
                classNode.parent.insertBefore(classNode, selectorParser().astSync(`.${e(variant)} .${prefixClass('group')}:${pseudoClass} `));
              });
            }).processSync(selector);
          });
        };
      };

      addVariant(`${variant}`, altVariant());
      addVariant(`${variant}-hover`, altPseudoClassVariant('hover'));
      addVariant(`${variant}-focus`, altPseudoClassVariant('focus'));
      addVariant(`${variant}-focus-within`, altPseudoClassVariant('focus-within'));
      addVariant(`${variant}-active`, altPseudoClassVariant('active'));
      addVariant(`${variant}-visited`, altPseudoClassVariant('visited'));
      addVariant(`${variant}-disabled`, altPseudoClassVariant('disabled'));
      addVariant(`${variant}-first`, altPseudoClassVariant('first', ':first-child'));
      addVariant(`${variant}-last`, altPseudoClassVariant('last', ':last-child'));
      addVariant(`${variant}-odd`, altPseudoClassVariant('odd', ':nth-child(odd)'));
      addVariant(`${variant}-even`, altPseudoClassVariant('even', ':nth-child(even)'));
      addVariant(`${variant}-group-hover`, altGroupPseudoClassVariant('hover'));
      addVariant(`${variant}-group-focus`, altGroupPseudoClassVariant('focus'));
      addVariant(`${variant}-group-focus-within`, altGroupPseudoClassVariant('focus-within'));
      addVariant(`${variant}-group-active`, altGroupPseudoClassVariant('active'));
      addVariant(`${variant}-group-visited`, altGroupPseudoClassVariant('visited'));
      addVariant(`${variant}-group-disabled`, altGroupPseudoClassVariant('disabled'));
    });
  };
});
