import { Label } from "#components/ui/label";
import React from "react";

const DialogForm = ({ handleSubmit, form, setForm }) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="text-slate-200 grid gap-4 sm:grid-cols-2"
    >
      {Object.keys(form).map((item, index) => {
        return (
          <div key={index}>
            <Label htmlFor={item}>{item}</Label>
            {item === "discount_type" ? (
              <div className="grid grid-cols-2 gap-2 mt-2">
                <label
                  className="h-10 flex items-center justify-center rounded-xl bg-gbase-2"
                  htmlFor="percent"
                >
                  <input
                    type="radio"
                    id="percent"
                    value={"percent"}
                    name="discount_type"
                    onChange={(e) =>
                      setForm({ ...form, discount_type: e.target.value })
                    }
                  />
                  <p className="ml-2">Percent</p>
                </label>
                <label
                  className="h-10 flex items-center justify-center rounded-xl bg-gbase-2"
                  htmlFor="baht"
                >
                  <input
                    type="radio"
                    id="baht"
                    name="discount_type"
                    value={"baht"}
                    onChange={(e) =>
                      setForm({ ...form, [e.target.name]: e.target.value })
                    }
                  />
                  <p className="ml-2">Baht</p>
                </label>
              </div>
            ) : (
              <input
                type={
                  form[item] === 0
                    ? "number"
                    : item === "promo_start"
                      ? "date"
                      : item === "expire_at"
                        ? "date"
                        : "text"
                }
                onChange={(e) =>
                  setForm({ ...form, [e.target.name]: e.target.value })
                }
                name={item}
                className={`mt-2 w-full rounded-xl border border-gbase-1 bg-[#11101d] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:ring-2 focus:ring-violet-500/30`}
              />
            )}
          </div>
        );
      })}
    </form>
  );
};

export default DialogForm;
