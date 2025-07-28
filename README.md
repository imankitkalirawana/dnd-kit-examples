# DNDKit Sortable Components Documentation

## Project Overview

A Next.js application showcasing various drag-and-drop sortable components built with `@dnd-kit/core`. The project demonstrates different sortable patterns including vertical lists, horizontal lists, grids, multi-column layouts, and virtualized lists.

## Tech Stack

- **Framework**: Next.js 15.2.0 with App Router
- **React**: 19.0.0
- **Drag & Drop**: @dnd-kit/core, @dnd-kit/sortable, @dnd-kit/utilities
- **Styling**: Tailwind CSS
- **Virtualization**: @tanstack/react-virtual
- **Icons**: Lucide React
- **Package Manager**: pnpm

## Project Structure

```
sandbox/
├── app/
│   ├── page.tsx              # Main page showcasing all components
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── dnd-context.tsx       # Shared DND context wrapper
│   ├── sortable/
│   │   ├── vertical-list/    # Vertical sortable components
│   │   ├── horizontal-list/  # Horizontal sortable component
│   │   ├── grid/            # Grid sortable component
│   │   ├── multi-list/      # Multi-column sortable component
│   │   └── virtualized/     # Virtualized sortable component
│   └── ui/
│       ├── card.tsx         # Card UI components
│       └── sortable-item.tsx # Base sortable item component
├── lib/
│   └── utils.ts             # Utility functions
└── public/                  # Static assets
```

## Core Components

### DndContext (`components/dnd-context.tsx`)

A wrapper component that provides consistent drag-and-drop configuration across all sortable components.

**Features:**

- Configures pointer sensor with 5px activation distance
- Prevents accidental drags on small movements
- Provides consistent sensor setup for all components

**Usage:**

```tsx
<DndContext onDragEnd={handleDragEnd}>
  <SortableContext items={items}>{/* Sortable items */}</SortableContext>
</DndContext>
```

### MultiList (`components/sortable/multi-list/index.tsx`)

A complex multi-column sortable component supporting:

- **Column reordering**: Drag columns to reorder them
- **Item movement**: Move items between columns
- **Cross-column sorting**: Items can be sorted within and across columns

**Key Features:**

- Handles both column and item drag operations
- Supports dropping items on columns or specific positions
- Visual feedback during drag operations
- Maintains data structure integrity

**Data Structure:**

```tsx
type Items = {
  [key: string]: string[];
};
```

**Event Handling:**

- `handleDragStart`: Sets active item for overlay
- `handleDragEnd`: Processes column reordering or item movement

### Vertical List Components (`components/sortable/vertical-list/`)

#### BasicList (`basic-list.tsx`)

- Simple vertical sortable list
- 15 items with basic drag-and-drop functionality
- Uses `arrayMove` for reordering

#### DragHandle (`drag-handle.tsx`)

- Items can only be dragged by specific handle
- Prevents accidental drags on item content
- Uses grip icon as drag handle

#### DisabledItems (`disabled-items.tsx`)

- Some items are disabled and cannot be dragged
- Demonstrates conditional sortability
- Visual indicators for disabled state

#### RestrictAxis (`restrict-axis.tsx`)

- Restricts dragging to vertical axis only
- Prevents horizontal movement during drag

### HorizontalList (`components/sortable/horizontal-list/index.tsx`)

Horizontal scrollable sortable list with:

- Horizontal layout using flexbox
- Horizontal list sorting strategy
- Scroll behavior during drag operations

### Grid (`components/sortable/grid/index.tsx`)

2D grid sortable component featuring:

- Grid layout with multiple rows and columns
- Maintains grid structure during reordering
- Visual grid positioning

### VirtualizedList (`components/sortable/virtualized/react-virtual.tsx`)

High-performance sortable list for large datasets:

- Uses `@tanstack/react-virtual` for virtualization
- Handles 10,000+ items efficiently
- Maintains scroll position during operations
- Dynamic height calculation

## UI Components

### Card (`components/ui/card.tsx`)

Reusable card components for consistent layout:

- `Card`: Main container with border and shadow
- `CardHeader`: Styled header section
- `CardBody`: Scrollable content area with max height

### SortableItem (`components/ui/sortable-item.tsx`)

Base sortable item component providing:

- Drag handle integration
- Visual feedback during drag
- Consistent styling across components
- Transform animations

## Utilities

### Utils (`lib/utils.ts`)

Utility functions for styling:

- `cn()`: Combines clsx and tailwind-merge for conditional classes
- Handles Tailwind CSS class conflicts and merging

## Key Patterns

### Drag Event Handling

```tsx
function handleDragEnd(event: DragEndEvent) {
  const { active, over } = event;

  if (!over || active.id === over.id) return;

  // Process the drag operation
  setItems((items) => {
    // Update items array
    return newItems;
  });
}
```

### Sortable Context Setup

```tsx
<SortableContext items={items} strategy={verticalListSortingStrategy}>
  {items.map((item) => (
    <SortableItem key={item.id} id={item.id} />
  ))}
</SortableContext>
```

### Item Data Structure

Items use data attributes to identify their type and context:

```tsx
data: {
  type: "item" | "column",
  column: string,
  index: number
}
```

## Performance Considerations

1. **Virtualization**: Large lists use react-virtual for performance
2. **Memoization**: Components avoid unnecessary re-renders
3. **Efficient Updates**: State updates use functional updates to prevent stale closures
4. **Sensor Configuration**: 5px activation distance prevents accidental drags

## Styling Approach

- **Tailwind CSS**: Utility-first styling
- **Responsive Design**: Mobile-first responsive layouts
- **Visual Feedback**: Opacity changes and background colors during drag
- **Consistent Spacing**: Standardized gaps and padding

## Development Scripts

```bash
# Development server with Turbopack
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint
```

## Browser Support

- Modern browsers supporting ES2020+
- Touch devices supported via PointerSensor
- Keyboard navigation (where implemented)

## Future Enhancements

- Keyboard navigation support
- Accessibility improvements (ARIA labels, screen reader support)
- Animation customization options
- Additional sorting strategies
- Persistence layer integration
- Undo/redo functionality

## Dependencies

### Core Dependencies

- `@dnd-kit/core`: Core drag-and-drop functionality
- `@dnd-kit/sortable`: Sortable components and utilities
- `@dnd-kit/utilities`: Helper utilities for transforms
- `@dnd-kit/modifiers`: Drag modifiers (window edge restriction)

### UI Dependencies

- `lucide-react`: Icon components
- `tailwind-merge`: Tailwind class merging
- `clsx`: Conditional class names

### Performance

- `@tanstack/react-virtual`: List virtualization

This documentation provides a comprehensive overview of the codebase structure, component functionality, and implementation patterns used throughout the project.
