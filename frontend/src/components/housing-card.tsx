import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectLocation() {
  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Location" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Available Locations</SelectLabel>
          <SelectItem value="kathmandu">Kathmandu</SelectItem>
          <SelectItem value="bhaktapur">Bhaktapur</SelectItem>
          <SelectItem value="lalitpur">Lalitpur</SelectItem>
          <SelectItem value="pokhara">Pokhara</SelectItem>
          <SelectItem value="butwal">Butwal</SelectItem>
          <SelectItem value="biratnagar">Biratnagar</SelectItem>
          <SelectItem value="birgunj">Birgunj</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
