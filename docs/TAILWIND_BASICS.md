# Tailwind CSS Quick Reference

## Spacing & Sizing

### Padding
```css
p-{size}    /* All sides */
pt-{size}   /* Top */
pr-{size}   /* Right */
pb-{size}   /* Bottom */
pl-{size}   /* Left */
px-{size}   /* Left & Right */
py-{size}   /* Top & Bottom */

/* Size scale:
0 = 0px
1 = 0.25rem (4px)
2 = 0.5rem  (8px)
3 = 0.75rem (12px)
4 = 1rem    (16px)
6 = 1.5rem  (24px)
8 = 2rem    (32px)
10 = 2.5rem (40px)
12 = 3rem   (48px)
16 = 4rem   (64px)
*/
```

### Margin
```css
m-{size}    /* All sides */
mt-{size}   /* Top */
mr-{size}   /* Right */
mb-{size}   /* Bottom */
ml-{size}   /* Left */
mx-{size}   /* Left & Right */
my-{size}   /* Top & Bottom */
```

### Width & Height
```css
w-{size}    /* Width */
h-{size}    /* Height */
min-w-{size}/* Min width */
min-h-{size}/* Min height */
max-w-{size}/* Max width */
max-h-{size}/* Max height */

/* Common sizes:
full = 100%
screen = 100vw/vh
1/2 = 50%
1/3 = 33.333333%
2/3 = 66.666667%
1/4 = 25%
3/4 = 75%
*/
```

## Flexbox & Grid

### Flexbox
```css
flex       /* Display: flex */
flex-row   /* Direction: row */
flex-col   /* Direction: column */
flex-wrap  /* Wrap items */
flex-1     /* Flex grow and shrink */
justify-start     /* Justify-content: flex-start */
justify-end       /* Justify-content: flex-end */
justify-center    /* Justify-content: center */
justify-between   /* Justify-content: space-between */
items-start      /* Align-items: flex-start */
items-center     /* Align-items: center */
items-end        /* Align-items: flex-end */
```

### Grid
```css
grid               /* Display: grid */
grid-cols-{n}      /* Grid-template-columns */
grid-rows-{n}      /* Grid-template-rows */
gap-{size}         /* Gap between grid items */
col-span-{n}       /* Column span */
row-span-{n}       /* Row span */
```

## Typography

### Font Size
```css
text-xs     /* 0.75rem */
text-sm     /* 0.875rem */
text-base   /* 1rem */
text-lg     /* 1.125rem */
text-xl     /* 1.25rem */
text-2xl    /* 1.5rem */
text-3xl    /* 1.875rem */
text-4xl    /* 2.25rem */
```

### Font Weight
```css
font-thin       /* 100 */
font-light      /* 300 */
font-normal     /* 400 */
font-medium     /* 500 */
font-semibold   /* 600 */
font-bold       /* 700 */
font-extrabold  /* 800 */
```

## Colors & Backgrounds

### Text Colors
```css
text-{color}-{shade}
/* Example: text-blue-500 */
```

### Background Colors
```css
bg-{color}-{shade}
/* Example: bg-gray-100 */
```

## Responsive Design

### Breakpoints
```css
sm:    /* 640px */
md:    /* 768px */
lg:    /* 1024px */
xl:    /* 1280px */
2xl:   /* 1536px */

/* Example:
md:flex-row    /* Flex-row on medium screens and up */
```

## Common Utilities

### Border & Rounded Corners
```css
border         /* Add border */
border-{size}  /* Border width */
rounded        /* Border-radius */
rounded-{size} /* Specific border-radius */
```

### Shadows
```css
shadow-sm     /* Small shadow */
shadow        /* Default shadow */
shadow-md     /* Medium shadow */
shadow-lg     /* Large shadow */
shadow-xl     /* Extra large shadow */
```

### Opacity
```css
opacity-0    /* 0 */
opacity-25   /* 0.25 */
opacity-50   /* 0.5 */
opacity-75   /* 0.75 */
opacity-100  /* 1 */
```

### Transitions
```css
transition-{property}
duration-{time}
ease-{timing}
```

## Best Practices

1. Mobile First
   - Start with mobile layout
   - Add responsive classes for larger screens

2. Component Composition
   - Use consistent spacing
   - Group related utilities
   - Extract common patterns to components

3. State Variants
   - Use hover:, focus:, active: for states
   - Use dark: for dark mode

4. Performance
   - Use @apply for repeated utility patterns
   - Keep specificity low
   - Use arbitrary values sparingly 