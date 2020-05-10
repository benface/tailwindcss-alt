# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project mostly adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.0.0] - 2020-05-09

### Added
- Added a `variants` option (set to `['alt']` by default) which can be used to provide multiple alternative variants (e.g. both `alt` and `dark`)

### Removed
- Removed the `className` option (the class that needs to be added to a parent element for a variant to take effect is the same as the variant’s name as defined in `variants`)

## [2.0.0] - 2020-02-05

### Added
- Added 4 variants: `alt-first`, `alt-last`, `alt-odd`, and `alt-even`

### Changed
- Changed to use Tailwind 1.2’s new plugin definition syntax

## [1.0.1] - 2019-12-20

### Fixed
- The `className` option is now properly escaped in the generated CSS
- Tailwind’s `prefix` option is now properly applied to the `.group` part of the selector for group variants

## [1.0.0] - 2019-12-20

Initial release

[Unreleased]: https://github.com/benface/tailwindcss-alt/compare/v3.0.0...HEAD
[3.0.0]: https://github.com/benface/tailwindcss-alt/compare/v2.0.0...v3.0.0
[2.0.0]: https://github.com/benface/tailwindcss-alt/compare/v1.0.1...v2.0.0
[1.0.1]: https://github.com/benface/tailwindcss-alt/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/benface/tailwindcss-alt/releases/tag/v1.0.0
