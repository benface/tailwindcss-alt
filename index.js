const _ = require('lodash');
const selectorParser = require('postcss-selector-parser');

module.exports = function(options = {}) {
  return ({ addVariant }) => {
    const defaultOptions = {
      className: 'alt',
    };
    options = _.defaults({}, options, defaultOptions);

    const altPseudoClassVariant = function(pseudoClass) {
      return ({ modifySelectors, separator }) => {
        modifySelectors(({ selector }) => {
          return selectorParser(selectors => {
            selectors.walkClasses(classNode => {
              classNode.value = `${options.className}${separator}${pseudoClass}${separator}${classNode.value}`;
              classNode.parent.insertBefore(classNode, selectorParser().astSync(`.${options.className} `));
              classNode.parent.insertAfter(classNode, selectorParser.pseudo({ value: `:${pseudoClass}` }));
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
              classNode.parent.insertBefore(classNode, selectorParser().astSync(`.${options.className} .group:${pseudoClass} `));
            });
          }).processSync(selector);
        });
      };
    };

    addVariant('alt', ({ modifySelectors, separator }) => {
      modifySelectors(({ selector }) => {
        return selectorParser(selectors => {
          selectors.walkClasses(classNode => {
            classNode.value = `${options.className}${separator}${classNode.value}`;
            classNode.parent.insertBefore(classNode, selectorParser().astSync(`.${options.className} `));
          });
        }).processSync(selector);
      });
    });

    addVariant('alt-hover', altPseudoClassVariant('hover'));
    addVariant('alt-focus', altPseudoClassVariant('focus'));
    addVariant('alt-focus-within', altPseudoClassVariant('focus-within'));
    addVariant('alt-active', altPseudoClassVariant('active'));
    addVariant('alt-visited', altPseudoClassVariant('visited'));
    addVariant('alt-disabled', altPseudoClassVariant('disabled'));
    addVariant('alt-group-hover', altGroupPseudoClassVariant('hover'));
    addVariant('alt-group-focus', altGroupPseudoClassVariant('focus'));
    addVariant('alt-group-focus-within', altGroupPseudoClassVariant('focus-within'));
    addVariant('alt-group-active', altGroupPseudoClassVariant('active'));
    addVariant('alt-group-visited', altGroupPseudoClassVariant('visited'));
    addVariant('alt-group-disabled', altGroupPseudoClassVariant('disabled'));
  };
};
