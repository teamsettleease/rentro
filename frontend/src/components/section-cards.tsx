import { SelectLocation } from "@/components/housing-card";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 gap-6 px-4 lg:px-8 py-8">
      {" "}
      <Card className="@container/card bg-gradient-to-br from-primary/10 to-white dark:from-primary/10 dark:to-card shadow-lg rounded-2xl transition-all duration-300 hover:shadow-xl">
        {" "}
        <CardHeader className="space-y-4">
          {" "}
          <div className="flex flex-col items-start gap-2">
            {" "}
            <CardTitle className="text-3xl font-bold tracking-tight text-primary">
              {" "}
              Find a Place to Live{" "}
            </CardTitle>{" "}
            <p className="text-muted-foreground text-sm">
              {" "}
              Browse flats, apartments, or shared rooms with ease.{" "}
            </p>{" "}
          </div>{" "}
          <div className="w-full">
            {" "}
            <SelectLocation />{" "}
          </div>{" "}
        </CardHeader>{" "}
        <CardContent className="text-sm text-muted-foreground">
          {" "}
          Explore verified rental listings across Kathmandu and other cities.
          Whether you&apos;re returning or starting anew, we help you find the
          right home.{" "}
        </CardContent>{" "}
      </Card>{" "}
    </div>
  );
}
