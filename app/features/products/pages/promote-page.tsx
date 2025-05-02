import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/promote-page";
import { Form, type MetaFunction } from "react-router";
import SelectPair from "~/common/components/select-pair";
import { Label } from "~/common/components/ui/label";
import { Calendar } from "~/common/components/ui/calendar";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { DateTime } from "luxon";
import { Button } from "~/common/components/ui/button";



export const meta: MetaFunction = () => {
  return [
    { title: "Promote Product | WeMake" },
    { name: "description", content: "Promote your product on WeMake" }
  ];
};

export default function PromotePage() {
  const [promotionPeriod, setPromotionPeriod] = useState<DateRange | undefined>();
  const totalDays = promotionPeriod?.from && promotionPeriod?.to
    ? DateTime.fromJSDate(promotionPeriod.to)
      .diff(DateTime.fromJSDate(promotionPeriod.from), "days").days : 0;

  return (
    <div>
      <Hero title="Promote Product"
        description="Boost your product's visibility."
      />

      <Form className="max-w-screen-sm mx-auto flex flex-col gap-4 items-center">
        <SelectPair
          label="Select a product"
          description="Choose the product you want to promote"
          name="product"
          placeholder="Select a product"
          options={[
            { label: "Boost", value: "boost1" },
            { label: "Boost2", value: "boost2" },
            { label: "Boost3", value: "boost3" },
            { label: "Boost4", value: "boost4" },
            { label: "Boost5", value: "boost5" },
            { label: "Boost6", value: "boost6" },
            { label: "Boost7", value: "boost7" },
            { label: "Boost8", value: "boost8" },
          ]}
        />
        <div className="flex flex-col gap-1 items-start">
          <Label>
            Select a range of dates for promotion{" "}
          </Label>
          <small className="text-muted-foreground ">
            Minimum duration is 3 days
          </small>

          <Calendar
            mode="range"
            selected={promotionPeriod}
            onSelect={setPromotionPeriod}
            min={3}
            disabled={{ before: new Date() }}
          />
        </div>
        <Button disabled={totalDays === 0 } type="submit" className="w-1/2">
          Go to checkout (${totalDays * 10})
        </Button>
      </Form>


    </div>
  );
} 