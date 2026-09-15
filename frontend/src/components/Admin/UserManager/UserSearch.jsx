import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp, ArrowUpDown, Search } from "lucide-react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { DEFAULT_USER_QUERY, SORTABLE_COLUMNS } from "./userUtils";

export default function UserSearch({ onQuery, sortableColumns = SORTABLE_COLUMNS }) {
  const [search, setSearch] = useState({
    name: DEFAULT_USER_QUERY.name,
    email: DEFAULT_USER_QUERY.email,
    address: DEFAULT_USER_QUERY.address,
  });
  const [sort, setSort] = useState(DEFAULT_USER_QUERY.sort);
  const [order, setOrder] = useState(DEFAULT_USER_QUERY.order);

  useEffect(() => {
    const timer = setTimeout(() => onQuery({ ...search, sort, order }), 400);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  function handleFieldChange(field, value) {
    setSearch((current) => ({ ...current, [field]: value }));
  }

  function toggleSort(field) {
    const nextOrder = sort === field ? (order === "asc" ? "desc" : "asc") : "asc";
    setSort(field);
    setOrder(nextOrder);
    onQuery({ ...search, sort: field, order: nextOrder });
  }

  const SortIcon = ({ field }) => {
    if (sort !== field) return <ArrowUpDown className="size-3.5 text-slate-500" />;
    return order === "asc" ? (
      <ArrowUp className="size-3.5 text-violet-300" />
    ) : (
      <ArrowDown className="size-3.5 text-violet-300" />
    );
  };

  return (
    <div className="grid gap-4 border-b border-white/10 p-5 sm:grid-cols-2 lg:grid-cols-3 lg:p-6">
      {[
        { field: "name", label: "Search name", placeholder: "e.g. Kim or Winter" },
        { field: "email", label: "Search email", placeholder: "e.g. user@mail.com" },
        { field: "address", label: "Search address", placeholder: "e.g. Bangkok" },
      ].map(({ field, label, placeholder }) => (
        <div key={field}>
          <Label htmlFor={`search-${field}`} className="text-sm font-semibold text-slate-200">
            {label}
          </Label>
          <div className="relative mt-2">
            <Search
              className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-slate-500"
              aria-hidden="true"
            />
            <input
              id={`search-${field}`}
              className="w-full rounded-xl border border-white/10 bg-[#090813] py-3 pr-4 pl-10 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30"
              value={search[field]}
              onChange={(event) => handleFieldChange(field, event.target.value)}
              placeholder={placeholder}
            />
          </div>
        </div>
      ))}

      <div className="sm:col-span-2 lg:col-span-3">
        <Label className="text-sm font-semibold text-slate-200">Sort by</Label>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {sortableColumns.map((column) => (
            <button
              key={column.value}
              type="button"
              onClick={() => toggleSort(column.value)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition",
                sort === column.value
                  ? "border-violet-400/50 bg-violet-500/20 text-violet-200"
                  : "border-white/10 bg-[#090813] text-slate-400 hover:border-violet-400/30 hover:text-slate-200",
              )}
            >
              {column.label}
              <SortIcon field={column.value} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}