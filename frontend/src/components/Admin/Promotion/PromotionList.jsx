import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "#components/ui/table";
import { Textarea } from "#components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";

import React, { useEffect, useState } from "react";

const toDateInputValue = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (isNaN(date)) return "";
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

const DateInput = ({ value }) => {
  const [expireAt, setExpireAt] = useState(toDateInputValue(value));

  return (
    <Input
      id="expire_at"
      name="expire_at"
      type="date"
      value={expireAt}
      onChange={(e) => setExpireAt(e.target.value)}
      className={"border-gbase-1 rounded-xl"}
    />
  );
};

const PromotionList = ({ data, loading }) => {
  const url = "http://localhost:3000/api/v1/promo";
  const updateData = async (e, index, id) => {
    e.preventDefault();
    console.log(data, id);
    const formData = new FormData(e.target);
    const response = await axios.put(`${url}/${id}`, {
      ...data[index],
      description: formData.get("description"),
    });
    console.log(response);
  };
  return (
    <div>
      <Table>
        <TableCaption>Total: {data.length} Promotions</TableCaption>
        <TableHeader>
          <TableRow className={"border-b-gbase-1 text-gray-500"}>
            <TableHead>Promotion</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Created at</TableHead>
            <TableHead>Updated at</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!loading ? (
            data.map((item, index) => {
              return (
                <TableRow key={item._id} className={"border-b-gbase-1"}>
                  <TableCell className="font-medium text-gpurple-2">
                    {item.name}
                  </TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.created_at}</TableCell>
                  <TableCell>{item.updatedAt}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger
                        render={<Button variant="outline">View detail</Button>}
                      />
                      <DialogContent className="sm:max-w-sm bg-gbase-4 text-white">
                        <form onSubmit={(e) => updateData(e, index, item._id)}>
                          <DialogHeader>
                            <DialogTitle>PROMOTION DETAIL</DialogTitle>
                            <DialogDescription
                              className={"text-gray-500 text-xs"}
                            >
                              Click save when you&apos;re done.
                            </DialogDescription>
                          </DialogHeader>
                          <FieldGroup>
                            <Field>
                              <div className="grid grid-cols-2">
                                <div>
                                  <Label className={"mb-2"} htmlFor="name">
                                    Promotion
                                  </Label>
                                  <Input id="name" value={item.name} disabled />
                                </div>
                                <div>
                                  <Label
                                    className={"mb-2"}
                                    htmlFor="discount_amount"
                                  >
                                    Discount amount
                                  </Label>
                                  <p className="bg-gbase-3 border border-gbase-1 px-6 py-3 font-semibold text-gray-500 rounded-xl">
                                    {item.discount_amount}{" "}
                                    {item.discount_type === "percent"
                                      ? "%"
                                      : "Baht"}
                                  </p>
                                </div>
                              </div>
                              <div className="grid grid-cols-2">
                                <div>
                                  <Label htmlFor="min_order_price">
                                    Minimum Price
                                  </Label>
                                  <Input
                                    id="min_order_price"
                                    value={item.min_order_price}
                                    disabled
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="max_use">Max Use</Label>
                                  <Input
                                    type="number"
                                    id="max_use"
                                    name="max_use"
                                    value={item.max_use}
                                    disabled
                                  />
                                </div>
                              </div>
                              <Label htmlFor="description">Description</Label>
                              <Textarea
                                type="text"
                                id="description"
                                name="description"
                                className={"border-gbase-1 rounded-xl"}
                                defaultValue={item.description}
                              />
                              <Label htmlFor="promo_start">Start date</Label>
                              <DateInput value={item.promo_start} />
                              <Label htmlFor="expire_at">Expire date</Label>
                              <DateInput value={item.expire_at} />
                            </Field>
                          </FieldGroup>
                          <DialogFooter className={"mt-4"}>
                            <DialogClose
                              render={<Button variant="outline">Cancel</Button>}
                            />
                            <Button
                              type="submit"
                              className="flex items-center justify-center gap-2 bg-linear-to-r from-violet-600 to-fuchsia-600 px-5 py-3.5 font-bold transition hover:from-violet-500 hover:to-fuchsia-500 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 focus:ring-offset-[#11101d] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              Save changes
                            </Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell>Loading</TableCell>
              <TableCell>Loading</TableCell>
              <TableCell>Loading</TableCell>
              <TableCell>Loading</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
export default PromotionList;

// import { Button } from "@/components/ui/button"
// import {
//   Field,
//   FieldDescription,
//   FieldGroup,
//   FieldLabel,
// } from "@/components/ui/field"
// import { Input } from "@/components/ui/input"
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"

//   const countries = [
//     { label: "United States", value: "us" },
//     { label: "United Kingdom", value: "uk" },
//     { label: "Canada", value: "ca" },
//   ]

{
  /* <Field>
            <FieldLabel htmlFor="form-country">Country</FieldLabel>
            <Select items={countries} defaultValue="us">
              <SelectTrigger id="form-country">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {countries.map((country) => (
                    <SelectItem key={country.value} value={country.value}>
                      {country.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field> */
}
// useEffect(() => {
//   setExpireAt(toDateInputValue(value));
// }, [value]);
