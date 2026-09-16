import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "#components/ui/table";
import { Input } from "@/components/ui/input";

import React, { useEffect, useState } from "react";
import PromotionDetailDialog from "./PromotionDetailDialog";

const PromotionList = ({ data, loading }) => {
  const url = "http://localhost:3000/api/v1/promo";
  return (
    <div>
      <Table>
        {/* <TableCaption className={'text-gray-500 font-bold uppercase'}>Total: {data.length} Promotions</TableCaption> */}
        <TableHeader>
          <TableRow className={"border-b-gbase-1 text-gray-500"}>
            <TableHead>Promotion</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Created at</TableHead>
            <TableHead>Promotion Start</TableHead>
            <TableHead>Promotion End</TableHead>
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
                  <TableCell>
                    {item.description.length >= 60
                      ? `${item.description.slice(0, 60)}...`
                      : item.description}
                  </TableCell>
                  <TableCell>{item.created_at.slice(0, 10)}</TableCell>
                  <TableCell>{item.promo_start.slice(0, 10)}</TableCell>
                  <TableCell>{item.expire_at.slice(0, 10)}</TableCell>
                  <TableCell>
                    <PromotionDetailDialog item={item} url={url} />
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
