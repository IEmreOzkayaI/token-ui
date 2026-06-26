#!/bin/bash

# Components to add
COMPONENTS=(
  "accordion"
  "alert"
  "alert-dialog"
  "aspect-ratio"
  "avatar"
  "badge"
  "breadcrumb"
  "button"
  "button-group"
  "calendar"
  "card"
  "carousel"
  "chart"
  "checkbox"
  "collapsible"
  "combobox"
  "command"
  "context-menu"
  "dialog"
  "direction"
  "drawer"
  "dropdown-menu"
  "empty"
  "field"
  "hover-card"
  "input"
  "input-group"
  "input-otp"
  "item"
  "kbd"
  "label"
  "menubar"
  "native-select"
  "navigation-menu"
  "pagination"
  "popover"
  "progress"
  "radio-group"
  "resizable"
  "scroll-area"
  "select"
  "separator"
  "sheet"
  "sidebar"
  "skeleton"
  "slider"
  "sonner"
  "spinner"
  "switch"
  "table"
  "tabs"
  "textarea"
  "toggle"
  "toggle-group"
  "tooltip"
)

echo "📦 Adding all components from shadcn/ui..."
echo "Total: ${#COMPONENTS[@]} components"
echo ""

ADDED=0
SKIPPED=0

for component in "${COMPONENTS[@]}"; do
  echo -n "Adding $component... "

  # Run shadcn add command silently
  if echo "y" | pnpm dlx shadcn@latest add "$component" > /dev/null 2>&1; then
    echo "✓"
    ((ADDED++))
  else
    echo "⊘ (already exists or error)"
    ((SKIPPED++))
  fi
done

echo ""
echo "✅ Done!"
echo "Added: $ADDED"
echo "Skipped: $SKIPPED"
echo ""
echo "🔧 Moving components to primitives/"

# Move all components from ui/ to ui/primitives/
if [ -d "components/ui" ]; then
  for file in components/ui/*.tsx; do
    [ -f "$file" ] && mv "$file" "components/ui/primitives/" 2>/dev/null
  done
  echo "✓ Moved all .tsx files to primitives/"
fi

# Fix imports in primitives
echo "🔗 Fixing imports in primitives/"
find components/ui/primitives -name "*.tsx" -type f | xargs sed -i '' 's|from "@/components/ui/|from "@/components/ui/primitives/|g' 2>/dev/null || true
echo "✓ Imports fixed"

echo ""
echo "🎉 All components ready in components/ui/primitives/"
