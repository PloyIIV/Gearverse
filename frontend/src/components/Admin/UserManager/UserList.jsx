import { Eye, Pencil, RefreshCw, Trash2, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate, fullName } from "./userUtils";

export default function UserList({
  users,
  loading,
  loadError,
  onRetry,
  onView,
  onEdit,
  onDelete,
  hasActiveFilters = false,
}) {
  const hasActions = Boolean(onView || onEdit || onDelete);
  const colSpan = hasActions ? 8 : 7;

  return (
    <>
      {loadError && (
        <div className="flex items-center justify-between gap-4 border-b border-white/10 px-6 py-4">
          <p className="text-sm text-rose-300" role="alert">{loadError}</p>
          {onRetry && (
            <Button onClick={onRetry} variant="outline" size="sm" className="gap-2">
              <RefreshCw className="size-4" aria-hidden="true" /> Retry
            </Button>
          )}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-slate-500">
              <th className="px-6 py-4 font-semibold">User</th>
              <th className="px-6 py-4 font-semibold">Email</th>
              <th className="px-6 py-4 font-semibold">Phone</th>
              <th className="px-6 py-4 font-semibold">Role</th>
              <th className="px-6 py-4 font-semibold">Address</th>
              <th className="px-6 py-4 font-semibold">Created At</th>
              <th className="px-6 py-4 font-semibold">Updated At</th>
              {hasActions && <th className="px-6 py-4 text-right font-semibold">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={colSpan} className="px-6 py-16 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <Users className="size-10 animate-pulse text-slate-600" aria-hidden="true" />
                    <p className="font-semibold text-slate-300">Loading users...</p>
                    <p className="text-sm text-slate-500">Fetching from MongoDB.</p>
                  </div>
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={colSpan} className="px-6 py-16 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <Users className="size-10 text-slate-600" aria-hidden="true" />
                    <p className="font-semibold text-slate-300">No users found</p>
                    <p className="text-sm text-slate-500">
                      {hasActiveFilters
                        ? "Try adjusting your search filters."
                        : "Create your first user to get started."}
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="border-b border-white/5 transition hover:bg-white/[0.02]">
                  <td className="px-6 py-4">
                    {onView ? (
                      <button
                        type="button"
                        onClick={() => onView(user)}
                        className="group flex items-center gap-3 text-left"
                        title={`View ${fullName(user)} reviews & shopping cart`}
                      >
                        <div className="grid size-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 text-xs font-bold text-white">
                          {fullName(user)
                            .split(" ")
                            .map((part) => part[0])
                            .slice(0, 2)
                            .join("")
                            .toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold transition group-hover:text-violet-300">
                            {fullName(user)}
                          </p>
                          <p className="text-xs text-slate-500">@{user.username || "—"}</p>
                        </div>
                      </button>
                    ) : (
                      <div className="flex items-center gap-3">
                        <div className="grid size-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 text-xs font-bold text-white">
                          {fullName(user)
                            .split(" ")
                            .map((part) => part[0])
                            .slice(0, 2)
                            .join("")
                            .toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold">{fullName(user)}</p>
                          <p className="text-xs text-slate-500">@{user.username || "—"}</p>
                        </div>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-slate-300">{user.email}</td>
                  <td className="px-6 py-4 text-slate-300">
                    {user.phoneNumber != null ? user.phoneNumber.toLocaleString() : "—"}
                  </td>
                  <td className="px-6 py-4">
                    <Badge
                      variant={user.role === "admin" ? "default" : "secondary"}
                      className={cn(
                        user.role === "admin" && "bg-violet-500/20 text-violet-200",
                      )}
                    >
                      {user.role}
                    </Badge>
                  </td>
                  <td className="max-w-56 px-6 py-4 text-slate-400">
                    {user.address?.length ? (
                      <div className="flex flex-wrap gap-1.5">
                        {user.address.map((line) => (
                          <span
                            key={line}
                            className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-slate-300"
                          >
                            {line}
                          </span>
                        ))}
                      </div>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="px-6 py-4 text-slate-400">{formatDate(user.createdAt)}</td>
                  <td className="px-6 py-4 text-slate-400">{formatDate(user.updatedAt)}</td>
                  {hasActions && (
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {onView && (
                          <Button
                            onClick={() => onView(user)}
                            variant="ghost"
                            size="icon-sm"
                            className="text-slate-400 hover:text-cyan-300"
                            aria-label={`View ${fullName(user)} reviews & shopping cart`}
                            title="Reviews & shopping cart"
                          >
                            <Eye />
                          </Button>
                        )}
                        {onEdit && (
                          <Button
                            onClick={() => onEdit(user)}
                            variant="ghost"
                            size="icon-sm"
                            className="text-slate-400 hover:text-violet-300"
                            aria-label={`Edit ${fullName(user)}`}
                          >
                            <Pencil />
                          </Button>
                        )}
                        {onDelete && (
                          <Button
                            onClick={() => onDelete(user)}
                            variant="ghost"
                            size="icon-sm"
                            className="text-slate-400 hover:text-rose-400"
                            aria-label={`Delete ${fullName(user)}`}
                          >
                            <Trash2 />
                          </Button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}