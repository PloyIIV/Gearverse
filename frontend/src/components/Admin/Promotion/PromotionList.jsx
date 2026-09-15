import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "#components/ui/table";
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

import React, { useEffect } from "react";

const PromotionList = ({ data, setData, loading }) => {
  const getDate = () => {};
  useEffect(() => {
    console.log(data[0]);
  }, [data]);
  return (
    <div>
      <Table>
        <TableCaption>Total: {data.length} Promotions</TableCaption>
        <TableHeader>
          <TableRow className={"border-b-gbase-1 text-gray-500"}>
            <TableHead className="w-[100px]">Promotion</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Created at</TableHead>
            <TableHead>Updated at</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!loading ? (
            data.map((item) => {
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
                      <form>
                        <DialogTrigger
                          render={
                            <Button variant="outline">View detail</Button>
                          }
                        />
                        <DialogContent className="sm:max-w-sm bg-gbase-4 text-white">
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
                              <Label htmlFor="expire_at">Expire date</Label>
                              <Input
                                id="expire_at"
                                name="expire_at"
                                type="date"
                                value={item.expire_at}
                                defaultValue={item.expire_at}
                                className={"border-gbase-1 rounded-xl"}
                              />
                            </Field>
                          </FieldGroup>
                          <DialogFooter>
                            <DialogClose
                              render={<Button variant="outline">Cancel</Button>}
                            />
                            <Button type="submit">Save changes</Button>
                          </DialogFooter>
                        </DialogContent>
                      </form>
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
