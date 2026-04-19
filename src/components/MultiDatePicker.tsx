"use client";

import { useMemo, useState } from "react";

type MultiDatePickerProps = {
  selected: string[];
  onChange: (isoDates: string[]) => void;
  /** Optional class on outer wrapper */
  className?: string;
};

function toISODateLocal(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function parseISODateLocal(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

/** Monday = 0 … Sunday = 6 */
function weekdayMondayFirst(d: Date): number {
  return (d.getDay() + 6) % 7;
}

const WEEK_LABELS = ["Δε", "Τρ", "Τε", "Πέ", "Πα", "Σά", "Κυ"];

export function MultiDatePicker({
  selected,
  onChange,
  className = "",
}: MultiDatePickerProps) {
  const today = useMemo(() => {
    const n = new Date();
    n.setHours(0, 0, 0, 0);
    return n;
  }, []);

  const [cursor, setCursor] = useState(() => {
    const t = new Date();
    return new Date(t.getFullYear(), t.getMonth(), 1);
  });

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const monthLabel = cursor.toLocaleDateString("el-GR", {
    month: "long",
    year: "numeric",
  });

  const firstOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const padStart = weekdayMondayFirst(firstOfMonth);
  const cells: (number | null)[] = [];
  for (let i = 0; i < padStart; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const selectedSet = useMemo(() => new Set(selected), [selected]);

  function toggleDay(day: number) {
    const d = new Date(year, month, day);
    const iso = toISODateLocal(d);
    if (d < today) return;
    const next = new Set(selectedSet);
    if (next.has(iso)) next.delete(iso);
    else next.add(iso);
    onChange(Array.from(next).sort());
  }

  function prevMonth() {
    setCursor(new Date(year, month - 1, 1));
  }

  function nextMonth() {
    setCursor(new Date(year, month + 1, 1));
  }

  return (
    <div
      role="group"
      aria-label="Επιλογή ημερομηνιών ενδιαφέροντος"
      className={`rounded-lg border border-charcoal/20 bg-ivory p-3 sm:p-4 ${className}`}
    >
      <div className="flex items-center justify-between gap-2 mb-3">
        <button
          type="button"
          onClick={prevMonth}
          className="rounded-lg px-2 py-1 text-sm text-charcoal hover:bg-charcoal/10 focus:outline-none focus:ring-2 focus:ring-blush/40"
          aria-label="Προηγούμενος μήνας"
        >
          ‹
        </button>
        <span className="text-sm font-medium text-charcoal">{monthLabel}</span>
        <button
          type="button"
          onClick={nextMonth}
          className="rounded-lg px-2 py-1 text-sm text-charcoal hover:bg-charcoal/10 focus:outline-none focus:ring-2 focus:ring-blush/40"
          aria-label="Επόμενος μήνας"
        >
          ›
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs text-charcoal/70 mb-1">
        {WEEK_LABELS.map((w) => (
          <div
            key={w}
            className="flex h-8 items-center justify-center font-medium leading-none"
          >
            {w}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, idx) =>
          day === null ? (
            <div
              key={`e-${idx}`}
              className="h-10 min-h-10 w-full min-w-0"
              aria-hidden
            />
          ) : (
            <button
              key={day}
              type="button"
              onClick={() => toggleDay(day)}
              disabled={new Date(year, month, day) < today}
              className={[
                "inline-flex h-10 min-h-10 w-full min-w-0 items-center justify-center rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blush/40",
                new Date(year, month, day) < today
                  ? "text-charcoal/25 cursor-not-allowed"
                  : selectedSet.has(toISODateLocal(new Date(year, month, day)))
                    ? "bg-charcoal text-white font-medium"
                    : "text-charcoal hover:bg-charcoal/10",
              ].join(" ")}
            >
              {day}
            </button>
          )
        )}
      </div>

      {selected.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-2 border-t border-charcoal/10 pt-3">
          {selected
            .slice()
            .sort()
            .map((iso) => (
              <button
                key={iso}
                type="button"
                onClick={() => onChange(selected.filter((d) => d !== iso))}
                className="inline-flex items-center gap-1 rounded-full border border-charcoal/20 bg-white px-2.5 py-1 text-xs text-charcoal hover:border-rose-400 hover:bg-rose-50"
              >
                {parseISODateLocal(iso).toLocaleDateString("el-GR", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
                <span className="text-charcoal/50" aria-hidden>
                  ×
                </span>
              </button>
            ))}
        </div>
      ) : (
        <p className="mt-3 text-xs text-charcoal/50 border-t border-charcoal/10 pt-3">
          Πατήστε ημέρες στο ημερολόγιο για να τις επιλέξετε (πολλαπλές).
        </p>
      )}
    </div>
  );
}
