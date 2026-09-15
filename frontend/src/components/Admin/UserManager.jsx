import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Plus,
  RefreshCw,
  ScrollText,
  ShoppingCart,
  Star,
  Trash2,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import UserSearch from "./UserManager/UserSearch";
import UserList from "./UserManager/UserList";
import {
  formatDate,
  fromUserDoc,
  fullName,
  initialUserForm,
  toUserPayload,
  validateUser,
} from "./UserManager/userUtils";

const API_URL = "/api/v1/users";

function fromReviewDoc(doc) {
  return {
    id: doc._id,
    product: doc.product_id?.product_name ?? "Unknown Product",
    rating: doc.rating,
    date: formatDate(doc.createdAt),
    comment: doc.comment ?? "",
  };
}

function fromCartItemDoc(item) {
  return {
    id: item._id,
    product: item.product_name ?? "Unknown Product",
    tag: item.tag ?? "",
    unitPrice: item.unit_price,
    quantity: item.quantity,
    image: item.image ?? "",
  };
}

function RatingStars({ value, className }) {
  return (
    <span className={cn("flex items-center gap-0.5", className)} aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          className={cn(
            "size-3.5",
            index < value ? "fill-amber-400 text-amber-400" : "text-slate-600",
          )}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}

function FieldError({ message }) {
  if (!message) return null;
  return (
    <p className="mt-1.5 text-sm font-medium text-rose-400" role="alert">
      {message}
    </p>
  );
}

export default function UserManager() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [query, setQuery] = useState({
    name: "",
    email: "",
    address: "",
    sort: "createdAt",
    order: "asc",
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState(initialUserForm);
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const [deletingUser, setDeletingUser] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const [refreshKey, setRefreshKey] = useState(0); //เพิ่มเมื่ออัปเดต list เช่น สร้าง/แก้ไข/ลบ user

  const [inspectingUser, setInspectingUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [detailTab, setDetailTab] = useState("reviews");
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadUsers() {
      setLoading(true);
      setLoadError("");
      try {
        const params = new URLSearchParams();
        if (query.name) params.set("name", query.name);
        if (query.email) params.set("email", query.email);
        if (query.address) params.set("address", query.address);
        params.set("sort", query.sort);
        params.set("order", query.order);

        const res = await fetch(`${API_URL}?${params.toString()}`);
        const result = await res.json();
        if (!res.ok) throw new Error(result.message || "Failed to load users");
        if (!cancelled) setUsers((result.data ?? []).map((doc) => ({ ...doc, id: doc._id })));
      } catch (error) {
        if (!cancelled) setLoadError(error.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadUsers();
    return () => {
      cancelled = true;
    };
  }, [query, refreshKey]);

  function openCreate() {
    setEditingUser(null);
    setForm(initialUserForm);
    setFormErrors({});
    setDialogOpen(true);
  }

  function openEdit(user) {
    setEditingUser(user);
    setForm(fromUserDoc(user));
    setFormErrors({});
    setDialogOpen(true);
  }

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((current) => ({ ...current, [name]: undefined }));
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const isEdit = Boolean(editingUser);
    const nextErrors = validateUser(form, isEdit);
    if (Object.keys(nextErrors).length > 0) {
      setFormErrors(nextErrors);
      return;
    }

    setSubmitting(true);
    try {
      const url = isEdit ? `${API_URL}/${editingUser.id}` : API_URL;
      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(toUserPayload(form)),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to save user");

      toast.success(isEdit ? "User updated successfully" : "User created successfully");
      setDialogOpen(false);
      setForm(initialUserForm);
      setEditingUser(null);
      setRefreshKey((current) => current + 1); //โหลด list ใหม่ให้เห็น user ที่เพิ่ม/แก้ไข
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete() {
    if (!deletingUser) return;
    setDeleting(true);
    try {
      const res = await fetch(`${API_URL}/${deletingUser.id}`, { method: "DELETE" });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to delete user");

      toast.success("User deleted successfully");
      setDeletingUser(null);
      setRefreshKey((current) => current + 1); //โหลด list ใหม่หลังลบ
    } catch (error) {
      toast.error(error.message);
    } finally {
      setDeleting(false);
    }
  }

  async function loadUserDetails(user) {
    setInspectingUser(user);
    setDetailTab("reviews");
    setReviews([]);
    setCartItems([]);
    setDetailsLoading(true);

    let errorMsg = "";
    try {
      const [reviewRes, cartRes] = await Promise.all([
        fetch(`/api/v1/reviews?userId=${user.id}`),
        fetch(`/api/v1/shoppingcart/${user.id}`),
      ]);

      const reviewResult = await reviewRes.json().catch(() => ({}));
      const cartResult = await cartRes.json().catch(() => ({}));

      if (!reviewRes.ok) {
        errorMsg = reviewResult.message || "Failed to load reviews";
      } else {
        setReviews((reviewResult.data ?? []).map(fromReviewDoc));
      }

      if (!cartRes.ok) {
        errorMsg = errorMsg || cartResult.message || "Failed to load shopping cart";
      } else {
        setCartItems((cartResult.data?.items ?? []).map(fromCartItemDoc));
      }
    } catch (error) {
      errorMsg = error.message;
    } finally {
      setDetailsError(errorMsg);
      setDetailsLoading(false);
    }
  }

  function closeInspector() {
    setInspectingUser(null);
    setReviews([]);
    setCartItems([]);
    setDetailTab("reviews");
    setDetailsError("");
  }

  const fieldClass = (field) =>
    cn(
      "mt-2 w-full rounded-xl border bg-[#11101d] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:ring-2 focus:ring-violet-500/30",
      formErrors[field]
        ? "border-rose-500 focus:border-rose-400"
        : "border-white/10 focus:border-violet-400",
    );

  return (
    <main className="min-h-screen bg-[#090813] px-4 py-10 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">
              Gear Vault Admin
            </p>
            <h1 className="text-3xl font-bold sm:text-4xl">User Manager</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
              Create, search, sort, and manage every account in your MongoDB store.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3 rounded-2xl border border-violet-400/20 bg-violet-500/10 px-4 py-3">
              <Users className="size-5 text-violet-300" aria-hidden="true" />
              <span className="text-sm font-semibold">{users.length} users</span>
            </div>
            <Button
              onClick={openCreate}
              className="gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 font-bold hover:from-violet-500 hover:to-fuchsia-500"
            >
              <Plus className="size-4" aria-hidden="true" /> Add User
            </Button>
          </div>
        </header>

        <section className="overflow-hidden rounded-3xl border border-white/10 bg-[#11101d] shadow-2xl shadow-violet-950/20">
          <UserSearch onQuery={setQuery} />

          <UserList
            users={users}
            loading={loading}
            loadError={loadError}
            onRetry={() => window.location.reload()}
            onView={loadUserDetails}
            onEdit={openEdit}
            onDelete={setDeletingUser}
            hasActiveFilters={Boolean(query.name || query.email || query.address)}
          />
        </section>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-2xl border-violet-400/20 bg-[#11101d] text-white">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">
                {editingUser ? "Edit User" : "Add User"}
              </DialogTitle>
              <DialogDescription className="text-slate-400">
                {editingUser
                  ? "Update the details for this account."
                  : "Create a new account for your store."}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} noValidate>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="firstname" className="text-slate-200">First name</Label>
                  <input
                    id="firstname"
                    name="firstname"
                    value={form.firstname}
                    onChange={updateField}
                    className={fieldClass("firstname")}
                    placeholder="e.g. Kim"
                  />
                </div>
                <div>
                  <Label htmlFor="lastname" className="text-slate-200">Last name</Label>
                  <input
                    id="lastname"
                    name="lastname"
                    value={form.lastname}
                    onChange={updateField}
                    className={fieldClass("lastname")}
                    placeholder="e.g. Winter"
                  />
                </div>
                <div>
                  <Label htmlFor="username" className="text-slate-200">Username</Label>
                  <input
                    id="username"
                    name="username"
                    value={form.username}
                    onChange={updateField}
                    className={fieldClass("username")}
                    placeholder="Defaults to email prefix"
                  />
                </div>
                <div>
                  <Label htmlFor="role" className="text-slate-200">Role</Label>
                  <select
                    id="role"
                    name="role"
                    value={form.role}
                    onChange={updateField}
                    className={fieldClass("role")}
                  >
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="email" className="text-slate-200">Email <span className="text-rose-400">*</span></Label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={updateField}
                    className={fieldClass("email")}
                    placeholder="e.g. user@shop.com"
                    aria-invalid={Boolean(formErrors.email)}
                    aria-describedby={formErrors.email ? "email-error" : undefined}
                  />
                  <FieldError message={formErrors.email} />
                </div>
                <div>
                  <Label htmlFor="password" className="text-slate-200">Password</Label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={updateField}
                    className={fieldClass("password")}
                    placeholder={editingUser ? "Leave blank to keep current" : "Required"}
                    aria-invalid={Boolean(formErrors.password)}
                    aria-describedby={formErrors.password ? "password-error" : undefined}
                  />
                  <FieldError message={formErrors.password} />
                </div>
                <div>
                  <Label htmlFor="phoneNumber" className="text-slate-200">Phone number</Label>
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="text"
                    inputMode="numeric"
                    value={form.phoneNumber}
                    onChange={updateField}
                    className={fieldClass("phoneNumber")}
                    placeholder="e.g. 0812345678"
                    aria-invalid={Boolean(formErrors.phoneNumber)}
                    aria-describedby={formErrors.phoneNumber ? "phone-error" : undefined}
                  />
                  <FieldError message={formErrors.phoneNumber} />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="address" className="text-slate-200">Address</Label>
                  <input
                    id="address"
                    name="address"
                    value={form.address}
                    onChange={updateField}
                    className={fieldClass("address")}
                    placeholder="e.g. 123 Rama Rd, Bangkok, Thailand"
                  />
                </div>
              </div>

              <DialogFooter className="mt-6">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setDialogOpen(false)}
                  className="text-slate-300"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 font-bold hover:from-violet-500 hover:to-fuchsia-500 disabled:from-violet-600/50 disabled:to-fuchsia-600/50"
                >
                  <Plus className="size-4" aria-hidden="true" />
                  {submitting ? "Saving..." : editingUser ? "Save Changes" : "Create User"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog open={Boolean(deletingUser)} onOpenChange={(open) => !open && setDeletingUser(null)}>
          <DialogContent className="border-rose-400/20 bg-[#11101d] text-white">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Delete user</DialogTitle>
              <DialogDescription className="text-slate-400">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-white">
                  {deletingUser ? fullName(deletingUser) : ""}
                </span>
                ? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setDeletingUser(null)}
                className="text-slate-300"
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={handleDelete}
                disabled={deleting}
                className="gap-2"
              >
                <Trash2 className="size-4" aria-hidden="true" />
                {deleting ? "Deleting..." : "Delete User"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      <Dialog open={Boolean(inspectingUser)} onOpenChange={(open) => !open && closeInspector()}>
          <DialogContent className="max-w-3xl border-violet-400/20 bg-[#11101d] text-white">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">
                {fullName(inspectingUser)}
              </DialogTitle>
              <DialogDescription className="text-slate-400">
                Activity for <span className="font-medium text-slate-300">{inspectingUser?.email}</span> — reviews & shopping cart.
              </DialogDescription>
            </DialogHeader>

            <div className="mb-2 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setDetailTab("reviews")}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition",
                  detailTab === "reviews"
                    ? "border-violet-400/50 bg-violet-500/20 text-violet-200"
                    : "border-white/10 bg-[#090813] text-slate-400 hover:border-violet-400/30 hover:text-slate-200",
                )}
              >
                <ScrollText className="size-4" aria-hidden="true" />
                Reviews{!detailsLoading && ` (${reviews.length})`}
              </button>
              <button
                type="button"
                onClick={() => setDetailTab("cart")}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition",
                  detailTab === "cart"
                    ? "border-violet-400/50 bg-violet-500/20 text-violet-200"
                    : "border-white/10 bg-[#090813] text-slate-400 hover:border-violet-400/30 hover:text-slate-200",
                )}
              >
                <ShoppingCart className="size-4" aria-hidden="true" />
                Shopping Cart{!detailsLoading && ` (${cartItems.length})`}
              </button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => loadUserDetails(inspectingUser)}
                className="ml-auto gap-2 text-slate-300 hover:text-violet-300"
              >
                <RefreshCw className="size-4" aria-hidden="true" />
                Refresh
              </Button>
            </div>

            <div className="max-h-[50vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#090813]">
              {detailsLoading ? (
                <div className="flex flex-col items-center gap-3 px-6 py-16">
                  <ScrollText className="size-10 animate-pulse text-slate-600" aria-hidden="true" />
                  <p className="font-semibold text-slate-300">Loading activity...</p>
                  <p className="text-sm text-slate-500">Fetching from MongoDB.</p>
                </div>
              ) : detailsError ? (
                <div className="px-6 py-12 text-center">
                  <p className="text-sm font-medium text-rose-300" role="alert">{detailsError}</p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => loadUserDetails(inspectingUser)}
                    className="mt-4 gap-2"
                  >
                    <RefreshCw className="size-4" aria-hidden="true" /> Retry
                  </Button>
                </div>
              ) : detailTab === "reviews" ? (
                reviews.length === 0 ? (
                  <div className="flex flex-col items-center gap-3 px-6 py-14 text-center">
                    <ScrollText className="size-10 text-slate-700" aria-hidden="true" />
                    <p className="font-semibold text-slate-300">No reviews yet</p>
                    <p className="text-sm text-slate-500">
                      This user hasn't written any product reviews.
                    </p>
                  </div>
                ) : (
                  <ul className="divide-y divide-white/5">
                    {reviews.map((review) => (
                      <li key={review.id} className="flex items-start justify-between gap-4 px-6 py-4">
                        <div className="min-w-0">
                          <p className="font-semibold text-white">{review.product}</p>
                          <div className="mt-1.5 flex items-center gap-2">
                            <RatingStars value={review.rating} />
                            <span className="text-xs text-slate-500">{review.date}</span>
                          </div>
                          {review.comment && (
                            <p className="mt-2 text-sm leading-6 text-slate-400">{review.comment}</p>
                          )}
                        </div>
                        <Badge
                          variant="secondary"
                          className="shrink-0 bg-violet-500/10 text-violet-200"
                        >
                          {review.rating}/5
                        </Badge>
                      </li>
                    ))}
                  </ul>
                )
              ) : cartItems.length === 0 ? (
                <div className="flex flex-col items-center gap-3 px-6 py-14 text-center">
                  <ShoppingCart className="size-10 text-slate-700" aria-hidden="true" />
                  <p className="font-semibold text-slate-300">Shopping cart is empty</p>
                  <p className="text-sm text-slate-500">
                    This user doesn't have any items in their active cart.
                  </p>
                </div>
              ) : (
                <ul className="divide-y divide-white/5">
                  {cartItems.map((item) => (
                    <li key={item.id} className="flex items-center gap-4 px-6 py-4">
                      <div className="grid size-11 shrink-0 place-items-center overflow-hidden rounded-xl border border-white/10 bg-[#11101d]">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.product}
                            className="size-full object-cover"
                          />
                        ) : (
                          <ShoppingCart className="size-5 text-slate-600" aria-hidden="true" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-semibold text-white">{item.product}</p>
                        {item.tag && (
                          <p className="truncate text-xs text-slate-500">{item.tag}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-white">${item.unitPrice.toFixed(2)}</p>
                        <p className="text-xs text-slate-500">
                          × {item.quantity} = ${(item.unitPrice * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
}