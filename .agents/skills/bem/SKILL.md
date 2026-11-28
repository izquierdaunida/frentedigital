---
name: bem
description: >
  BEM (Block Element Modifier) CSS naming convention. Enforces class name
  structure as block__element--modifier using double underscore for elements
  and double dash for modifiers. Activate when creating new components,
  writing CSS class names, adding HTML markup with class attributes, or
  reviewing existing BEM compliance. Covers naming rules, block vs element
  decisions, modifier usage, mixes, and external geometry positioning.
---

# BEM — CSS Naming Convention

BEM is a component-based naming convention for CSS classes. Class names
follow the pattern `block__element--modifier`. Blocks are standalone
reusable components, elements are parts of a block that have no meaning
outside it, and modifiers define appearance, state, or behavior variations.

Reference: https://en.bem.info/methodology/

## Naming Rules

- Names use lowercase Latin letters
- Words within a name are separated by a single hyphen (`-`)
- Element names are separated from the block name by double underscore (`__`)
- Modifier names are separated from the block or element name by double dash (`--`)
- Boolean modifiers have no value: `block--disabled`
- Key-value modifiers use a hyphen between name and value: `block--size-m`
- Elements always belong to a block, never to another element

Pattern:

```
block-name__element-name--modifier-name
block-name__element-name--modifier-name-value
block-name--modifier-name
block-name--modifier-name-value
```

## Core Patterns

### Naming a block and its elements

```html
<form class="search-form">
  <input class="search-form__input">
  <button class="search-form__button">Search</button>
</form>
```

```css
.search-form {}
.search-form__input {}
.search-form__button {}
```

The block name (`search-form`) describes purpose, not appearance. Elements
are flat — all belong directly to the block regardless of DOM nesting depth.

### Applying modifiers

A modifier class is always used together with the unmodified block or element
class. The base class provides default styles; the modifier overrides specific
properties.

```html
<form class="search-form search-form--focused">
  <input class="search-form__input">
  <button class="search-form__button search-form__button--disabled">Search</button>
</form>
```

```css
.search-form--focused {
  border-color: blue;
}

.search-form__button--disabled {
  opacity: 0.5;
  pointer-events: none;
}
```

### Using mixes for external geometry

Blocks must not set their own external geometry (margin, position). Use a mix
to apply positioning via the parent block's element class.

```html
<header class="header">
  <form class="search-form header__search-form"></form>
</header>
```

```css
/* search-form block: no margin or position rules */
.search-form {
  font-family: Arial, sans-serif;
}

/* Parent block controls positioning via its element */
.header__search-form {
  margin: 30px;
  position: relative;
}
```

### Block vs element decision

Create a **block** when the section of code can be reused independently.
Create an **element** when the section cannot be used separately from its
parent block. If an element needs to be broken into sub-parts, create a new
block instead of nesting elements.

## Common Mistakes

### CRITICAL Chaining elements creates deep, fragile class names

Wrong:

```html
<form class="search-form">
  <div class="search-form__content">
    <input class="search-form__content__input">
    <button class="search-form__content__button">Search</button>
  </div>
</form>
```

Correct:

```html
<form class="search-form">
  <div class="search-form__content">
    <input class="search-form__input">
    <button class="search-form__button">Search</button>
  </div>
</form>
```

Elements of elements (`block__elem1__elem2`) do not exist in BEM. The block
name defines the namespace for all elements. Regardless of DOM nesting depth,
every element's class name contains only `block__element` — never chained
deeper. Chaining couples class names to DOM structure and breaks when elements
are moved.

Source: https://en.bem.info/methodology/quick-start/#nesting-1

### HIGH Using a modifier class without the base class

Wrong:

```html
<form class="search-form--theme-islands">
  <input class="search-form__input">
  <button class="search-form__button">Search</button>
</form>
```

Correct:

```html
<form class="search-form search-form--theme-islands">
  <input class="search-form__input">
  <button class="search-form__button">Search</button>
</form>
```

A modifier changes appearance, behavior, or state — it does not replace the
entity. Without the base class, all default styles defined on `.search-form`
are lost, causing broken or unstyled rendering.

Source: https://en.bem.info/methodology/quick-start/#a-modifier-cant-be-used-alone

### HIGH Setting external geometry on the block itself

Wrong:

```css
.search-form {
  font-family: Arial, sans-serif;
  margin: 30px;
  position: absolute;
  top: 0;
  right: 0;
}
```

Correct:

```css
.search-form {
  font-family: Arial, sans-serif;
}

/* In the parent block's stylesheet */
.header__search-form {
  margin: 30px;
  position: absolute;
  top: 0;
  right: 0;
}
```

A block must not set its own margin or position. These properties couple the
block to a specific context and prevent reuse. Use a mix to set external
geometry via the parent block's element.

Source: https://en.bem.info/methodology/css/#external-geometry-and-positioning

### HIGH Nesting BEM selectors creates unnecessary specificity

Wrong:

```css
.search-form .search-form__input {
  color: red;
}
```

Correct:

```css
.search-form__input {
  color: red;
}
```

BEM class names already encode the relationship between block and element, so
descendant selectors are redundant. They raise specificity, making modifiers
harder to override and coupling styles to DOM nesting order. Use flat
single-class selectors.

Source: https://en.bem.info/methodology/css/#nested-selectors

### MEDIUM Using tag or ID selectors instead of class selectors

Wrong:

```css
#search-form {}
form.search-form {}
.header button {}
```

Correct:

```css
.search-form {}
.search-form__button {}
```

BEM uses only class selectors. Tag selectors (`.header button`) create
implicit dependencies on DOM structure. ID selectors are unique per page
and prevent reuse. Combined tag+class selectors (`form.search-form`) raise
specificity and cause override battles with modifiers.

Source: https://en.bem.info/methodology/css/#selectors

### MEDIUM Naming blocks by appearance instead of purpose

Wrong:

```html
<div class="red-text">Error: invalid input</div>
```

Correct:

```html
<div class="error">Error: invalid input</div>
```

Block names describe what the component is ("error"), not what it looks like
("red-text"). Appearance-based names break when the design changes, requiring
updates across HTML, CSS, and JavaScript.

Source: https://en.bem.info/methodology/quick-start/#block
