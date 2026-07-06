interface Props {
  optionChoices: readonly number[];
  optionCount: number;
  onOptionCount: (n: number) => void;
  adaptive: boolean;
  onToggleAdaptive: () => void;
  filterGroups?: string[];
  enabledGroups: ReadonlySet<string>;
  onToggleGroup: (group: string) => void;
  onSelectAllGroups: () => void;
}

export function GameSidebar({
  optionChoices,
  optionCount,
  onOptionCount,
  adaptive,
  onToggleAdaptive,
  filterGroups,
  enabledGroups,
  onToggleGroup,
  onSelectAllGroups,
}: Props) {
  return (
    <aside className="w-full shrink-0 space-y-6 rounded-2xl border border-neutral-800 bg-neutral-900/40 p-4 lg:sticky lg:top-6 lg:w-56">
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Options</h2>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {optionChoices.map((n) => (
            <button
              key={n}
              onClick={() => onOptionCount(n)}
              className={`h-8 w-8 rounded-lg border text-sm font-medium transition ${
                n === optionCount
                  ? "border-indigo-500 bg-indigo-600 text-white"
                  : "border-neutral-700 bg-neutral-800/60 hover:border-neutral-500"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Mode</h2>
        <button
          onClick={onToggleAdaptive}
          title="Show items you miss more often; down-weight ones you reliably get right."
          className={`mt-2 flex w-full items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-sm font-medium transition ${
            adaptive
              ? "border-emerald-500 bg-emerald-600/20 text-emerald-300"
              : "border-neutral-700 bg-neutral-800/60 hover:border-neutral-500"
          }`}
        >
          <span>{adaptive ? "✓" : "○"}</span> Adaptive
        </button>
      </section>

      {filterGroups && filterGroups.length > 0 && (
        <section>
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Groups</h2>
            <button
              onClick={onSelectAllGroups}
              disabled={enabledGroups.size === filterGroups.length}
              className="text-xs font-medium text-indigo-400 transition hover:text-indigo-300 disabled:cursor-not-allowed disabled:text-neutral-600"
            >
              All
            </button>
          </div>
          <div className="mt-2 space-y-1">
            {filterGroups.map((group) => {
              const on = enabledGroups.has(group);
              const isLastOn = on && enabledGroups.size === 1;
              return (
                <button
                  key={group}
                  onClick={() => onToggleGroup(group)}
                  disabled={isLastOn}
                  title={isLastOn ? "At least one group must stay enabled" : undefined}
                  className={`flex w-full items-center gap-2 rounded-lg border px-2.5 py-1.5 text-left text-xs font-medium transition ${
                    on
                      ? "border-indigo-500/60 bg-indigo-600/15 text-neutral-100"
                      : "border-neutral-800 bg-neutral-900/40 text-neutral-500 hover:border-neutral-600"
                  } ${isLastOn ? "cursor-not-allowed opacity-70" : ""}`}
                >
                  <span className="text-sm">{on ? "☑" : "☐"}</span>
                  {group}
                </button>
              );
            })}
          </div>
        </section>
      )}
    </aside>
  );
}
