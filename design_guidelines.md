# Medicare Plan Card with Match Score - Design Guidelines

## Design Approach
Healthcare Component Design - Professional, trustworthy interface with data visualization emphasis. Drawing inspiration from healthcare portals like Oscar Health and UnitedHealthcare's modern card-based UIs, combined with fintech-style progress indicators.

## Core Design Elements

### Typography
- **Score Display**: Bold, large numerals (text-4xl or text-5xl) for the percentage
- **Card Headers**: Medium weight (font-medium) for plan names
- **Body Text**: Regular weight for details (premium, deductibles)
- **Labels**: Small, uppercase tracking-wide for categories
- Font stack: System fonts (sans-serif) for optimal healthcare readability

### Layout System
Tailwind spacing units: **2, 3, 4, 6, 8** for consistent rhythm
- Card padding: p-6
- Element spacing: space-y-4 for vertical stacks, gap-3 for horizontal layouts
- Circular progress: Fixed size (w-24 h-24 or w-28 h-28)

### Circular Progress Indicator Specifications

**Placement**: Top-right corner of card (absolute positioning) with slight inset (top-4 right-4)

**Visual Design**:
- Circle diameter: 96-112px (24-28 tailwind units)
- Stroke width: 8-10px for visibility
- Background circle: Light gray/neutral (opacity 10-20%)
- Progress circle: Color-coded based on score
- Center: Match percentage prominently displayed

**Color Coding System**:
- 90-100%: Vibrant green (#10B981 or #22C55E) - "Excellent Match"
- 75-89%: Warm amber (#F59E0B) - "Good Match"  
- Below 75%: Coral/orange (#F97316) - "Fair Match"

**Animation Behavior**:
- Progress animates on card entry/mount
- Duration: 1.2-1.5 seconds with easing (ease-out)
- Starts from 0% and fills to target percentage
- Percentage counter animates simultaneously (counting up effect)
- Subtle pulse on completion (optional enhance)

### Card Layout Enhancements

**Structure** (top to bottom):
1. Header row: Plan name + Star rating (left) | Circular score (right, absolute)
2. Premium section with clear pricing hierarchy
3. Key details grid: Deductibles, pharmacy coverage (2-column on desktop)
4. Action row: Compare checkbox (left) | CTA buttons (right, gap-3)

**Interactive Elements**:
- Compare checkbox: Accessible size (w-5 h-5) with clear label
- "View Plan Details" button: Secondary style (outline or ghost)
- "Enroll" button: Primary CTA (solid, prominent)
- Maintain sufficient touch targets (min 44px height)

### Component Styling

**Card Container**:
- White background with subtle shadow (shadow-md)
- Rounded corners (rounded-xl)
- Border: 1px solid neutral (optional: highlight on hover)
- Relative positioning for absolute score placement

**Visual Hierarchy**:
- Match score: Highest visual weight (size + color + position)
- Plan name: Secondary prominence (text-xl font-semibold)
- Premium: Bold numerals with smaller currency symbols
- Supporting details: Subdued text color (text-gray-600)

**Spacing Rationale**:
- Dense enough to show all information clearly
- Generous padding around edges (p-6) for breathing room
- Consistent vertical rhythm between sections (space-y-4)

### Accessibility Considerations
- Aria labels for circular progress ("90% match score")
- Sufficient color contrast for all text (WCAG AA minimum)
- Keyboard accessible interactive elements
- Screen reader announcements for animated score

### Responsive Behavior
- Desktop (lg+): Full card layout with circular score in corner
- Tablet (md): Maintain layout, slightly reduced card padding
- Mobile: Stack elements vertically, circular score remains top-right but slightly smaller (w-20 h-20)

## No Images Required
This is a data-driven card component - no hero images or decorative imagery needed. Focus on clean information design and the animated progress indicator as the primary visual element.