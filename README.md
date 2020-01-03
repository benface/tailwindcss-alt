# Alt Variant Plugin for Tailwind CSS

## Installation

```bash
npm install tailwindcss-alt
```

## Usage

```js
// tailwind.config.js
module.exports = {
  variants: {
    display: ['alt', 'alt-hover', 'alt-focus', 'alt-focus-within', 'alt-active', 'alt-visited', 'alt-disabled', 'alt-group-hover', 'alt-group-focus', 'alt-group-focus-within', 'alt-group-active', 'alt-group-visited', 'alt-group-disabled', 'responsive'],
  },
  plugins: [
    require('tailwindcss-alt')({
      className: 'alt', // defaults to this value
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
