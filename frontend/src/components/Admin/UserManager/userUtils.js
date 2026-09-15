export const SORTABLE_COLUMNS = [
  { value: "name", label: "Name" },
  { value: "email", label: "Email" },
  { value: "createdAt", label: "Created At" },
  { value: "updatedAt", label: "Updated At" },
];

export const DEFAULT_USER_QUERY = {
  name: "",
  email: "",
  address: "",
  sort: "createdAt",
  order: "asc",
};

export const initialUserForm = {
  firstname: "",
  lastname: "",
  username: "",
  email: "",
  password: "",
  phoneNumber: "",
  role: "user",
  address: "",
};

export function fullName(user) {
  if (!user) return "";
  const name = [user.firstname, user.lastname].filter(Boolean).join(" ").trim();
  return name || user.username || "—";
}

export function formatDate(value) {
  if (!value) return "—";
  return new Date(value).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function fromUserDoc(doc) {
  return {
    firstname: doc.firstname ?? "",
    lastname: doc.lastname ?? "",
    username: doc.username ?? "",
    email: doc.email ?? "",
    password: "",
    phoneNumber: doc.phoneNumber != null ? String(doc.phoneNumber) : "",
    role: doc.role ?? "user",
    address: (doc.address ?? []).join(", "),
  };
}

export function toUserPayload(form) {
  return {
    firstname: form.firstname.trim() || undefined,
    lastname: form.lastname.trim() || undefined,
    username: form.username.trim() || undefined,
    email: form.email.trim() || undefined,
    password: form.password || undefined,
    phoneNumber: form.phoneNumber.trim() === "" ? undefined : Number(form.phoneNumber),
    role: form.role,
    address: form.address
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean),
  };
}

export function validateUser(form, isEdit) {
  const errors = {};

  if (!form.email.trim()) {
    errors.email = "Email is required";
  }

  if (!isEdit && !form.password) {
    errors.password = "Password is required";
  }

  if (form.phoneNumber.trim() !== "" && Number.isNaN(Number(form.phoneNumber))) {
    errors.phoneNumber = "Must be a valid number";
  }

  return errors;
}