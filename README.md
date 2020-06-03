# [BLACK LIVES MATTER](https://blacklivesmatters.carrd.co)

### Be aware. Be angry. Do better. Demand change. Show your support any way you can. Click on the link above to find protests, petitions, and other ways to help. DO NOT LET IT GO SILENT.

# Alt Variant Plugin for Tailwind CSS

## Introduction

This plugin adds general-purpose “alternative” variants to Tailwind CSS, which can be used to change an element’s styles when one of its ancestors (such as `body` or `html`) has a given class. It can be useful for toggling between themes (think dark mode), or for components that have different states. You can create as many variants as you want with the `variants` option, which defaults to `['alt']`, meaning that by default, the plugin provides an `alt` variant (as well as `alt-hover`, `alt-focus`, etc.) that takes effect when the `alt` class is applied to a parent element. However, if you set the `variants` option to `['alt', 'dark']`, the plugin will provide all the `alt` variants as well as `dark` variants (`dark`, `dark-hover`, `dark-focus`, etc.) which take effect when the `dark` class is applied to a parent element. That way, you can toggle between multiple states. Which variant has precedence over the other one is determined by the order in which they’re used (and not the order in which they’re defined in the plugin’s options). For instance, in the example config below (see “Usage”), if you had `inline alt:block dark:hidden` on an element and both the `alt` and the `dark` classes were applied to the `html` element, `dark:hidden` would win because `dark` is listed after `alt` in the config’s `variants.display` key.

## Requirements

This plugin requires Tailwind CSS 1.2 or later. If your project uses an older version of Tailwind, you should install the latest 1.x version of this plugin (`npm install tailwindcss-alt@1.x`).

## Installation

```bash
npm install tailwindcss-alt
```

## Usage

```js
// tailwind.config.js
module.exports = {
  variants: {
    display: ['alt', 'alt-hover', 'alt-focus', 'alt-focus-within', 'alt-active', 'alt-visited', 'alt-disabled', 'alt-first', 'alt-last', 'alt-odd', 'alt-even', 'alt-group-hover', 'alt-group-focus', 'alt-group-focus-within', 'alt-group-active', 'alt-group-visited', 'alt-group-disabled', 'dark', 'dark-hover', 'responsive'],
  },
  plugins: [
    require('tailwindcss-alt')({
      variants: ['alt', 'dark'], // defaults to ['alt']
    }),
  ],
};
```

The above configuration would generate the following CSS:

```css
.block {
  display: block;
}

.alt .alt\:block {
  display: block;
}

.alt .alt\:hover\:block:hover {
  display: block;
}

.alt .alt\:focus\:block:focus {
  display: block;
}

.alt .alt\:focus-within\:block:focus-within {
  display: block;
}

.alt .alt\:active\:block:active {
  display: block;
}

.alt .alt\:visited\:block:visited {
  display: block;
}

.alt .alt\:disabled\:block:disabled {
  display: block;
}

.alt .alt\:first\:block:first-child {
  display: block;
}

.alt .alt\:last\:block:last-child {
  display: block;
}

.alt .alt\:odd\:block:nth-child(odd) {
  display: block;
}

.alt .alt\:even\:block:nth-child(even) {
  display: block;
}

.alt .group:hover .alt\:group-hover\:block {
  display: block;
}

.alt .group:focus .alt\:group-focus\:block {
  display: block;
}

.alt .group:focus-within .alt\:group-focus-within\:block {
  display: block;
}

.alt .group:active .alt\:group-active\:block {
  display: block;
}

.alt .group:visited .alt\:group-visited\:block {
  display: block;
}

.alt .group:disabled .alt\:group-disabled\:block {
  display: block;
}

.dark .dark\:block {
  display: block;
}

.dark .dark\:hover\:block:hover {
  display: block;
}

/* etc. */
```

Which you can then use in your HTML like this:

```html
<header class="alt">
  <img class="block alt:hidden" src="logo.png">
  <img class="hidden alt:block" src="alt-logo.png">

  <a class="text-black hover:text-blue alt:text-white alt:hover:text-green">Home</a>

  <div class="group">
    <div class="group-hover:opacity-50 alt:group-hover:opacity-100">...</div>
  </div>
</header>
```
