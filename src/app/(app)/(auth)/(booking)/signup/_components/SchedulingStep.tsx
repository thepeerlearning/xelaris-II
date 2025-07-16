"use client";

import Form from "@/components/form/Form";
import FormField from "@/components/form/FormField";
import { Button } from "@/components/ui/button";
import {
  childAgeOptions,
  classDurationOptions,
  dayOptions,
  timezoneOptions,
} from "@/data";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const schema = z.object({
  timezone: z.string().min(1, "Timezone is required"),
  childAge: z.string().min(1, "Child age is required"),
  classDuration: z.string().min(1, "Class duration is required"),
  availableDay: z.string().min(1, "Available day is required"),
  availableTime: z.string().min(1, "Available time is required"),
});

type SchedulingFormData = z.infer<typeof schema>;

interface SchedulingStepProps {
  formData: SchedulingFormData;
  updateFormData: (data: SchedulingFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

export function SchedulingStep({
  formData,
  updateFormData,
  onNext,
  onBack,
}: SchedulingStepProps) {
  const form = useForm<SchedulingFormData>({
    resolver: zodResolver(schema),
    defaultValues: formData,
  });

  const handleSubmit = form.handleSubmit((data) => {
    updateFormData(data);
    onNext();
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField
          control={form.control}
          name="timezone"
          label="Time Zone"
          fieldType="select"
          options={timezoneOptions}
          placeholder="Select timezone"
          required
        />

        <FormField
          control={form.control}
          name="childAge"
          label="Select Child Age"
          fieldType="select"
          options={childAgeOptions}
          placeholder="Select age range"
          required
        />

        <FormField
          control={form.control}
          name="classDuration"
          label="Select Class Duration"
          fieldType="select"
          options={classDurationOptions}
          placeholder="Select duration"
          required
        />

        <FormField
          control={form.control}
          name="availableDay"
          label="What Day Are You Available For Class"
          fieldType="select"
          options={dayOptions}
          placeholder="Select day"
          required
        />

        <FormField
          control={form.control}
          name="availableTime"
          label="What Time Are You Available For Class"
          fieldType="select"
          options={timezoneOptions}
          placeholder="Select time"
          required
        />

        <div className="flex space-x-4 pt-4">
          <Button
            type="button"
            onClick={onBack}
            variant="outline"
            className="flex-1 py-3 rounded-full border-background text-background bg-transparent"
          >
            Back
          </Button>
          <Button type="submit" className="flex-1">
            Continue
          </Button>
        </div>
      </form>
    </Form>
  );
}
