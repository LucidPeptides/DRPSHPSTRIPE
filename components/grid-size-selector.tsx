"use client"

import { cn } from "@/lib/utils"

type GridSize = 2 | 3 | 4 | 5 | 6

interface GridSizeSelectorProps {
  value: GridSize
  onChange: (size: GridSize) => void
  className?: string
}

export function GridSizeSelector({ value, onChange, className }: GridSizeSelectorProps) {
  const options: { size: GridSize; label: string; Icon: React.FC<React.SVGProps<SVGSVGElement>> }[] = [
    { size: 2, label: "2 columns", Icon: Icon2Col },
    { size: 3, label: "3 columns", Icon: Icon3Col },
    { size: 4, label: "4 columns", Icon: Icon4Col },
  ]

  return (
    <div className={cn("flex items-center gap-2", className)} role="radiogroup" aria-label="Grid size">
      {options.map(({ size, label, Icon }) => {
        const active = value === size
        return (
          <button
            key={size}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={label}
            onClick={() => onChange(size)}
            className={cn(
              "inline-flex items-center justify-center rounded-md border px-2 py-2 transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary",
              active ? "bg-primary text-primary-foreground border-primary" : "bg-background hover:bg-muted"
            )}
          >
            <Icon width={24} height={24} aria-hidden="true" />
          </button>
        )
      })}
    </div>
  )
}

/* Unambiguous custom icons (2/3/4 columns) */

function Cell(props: React.SVGProps<SVGRectElement>) {
  return <rect rx="1.5" {...props} />
}

function Icon2Col(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <Cell x="3" y="5" width="8" height="6" />
      <Cell x="13" y="5" width="8" height="6" />
      <Cell x="3" y="13" width="8" height="6" />
      <Cell x="13" y="13" width="8" height="6" />
    </svg>
  )
}

function Icon3Col(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <Cell x="3" y="5" width="5" height="6" />
      <Cell x="9.5" y="5" width="5" height="6" />
      <Cell x="16" y="5" width="5" height="6" />
      <Cell x="3" y="13" width="5" height="6" />
      <Cell x="9.5" y="13" width="5" height="6" />
      <Cell x="16" y="13" width="5" height="6" />
    </svg>
  )
}

function Icon4Col(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <Cell x="3" y="5" width="4" height="6" />
      <Cell x="8" y="5" width="4" height="6" />
      <Cell x="13" y="5" width="4" height="6" />
      <Cell x="18" y="5" width="4" height="6" />
      <Cell x="3" y="13" width="4" height="6" />
      <Cell x="8" y="13" width="4" height="6" />
      <Cell x="13" y="13" width="4" height="6" />
      <Cell x="18" y="13" width="4" height="6" />
    </svg>
  )
}
