"use client";

import { AnimatedStepSeparator } from "@/components/animated-step-separator";
import {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper";
import { cn } from "@/lib/utils";

export type HowItWorksStep = {
  title: string;
  description: string;
};

type FlowStepperProps = {
  steps: readonly HowItWorksStep[];
};

export function FlowStepper({ steps }: FlowStepperProps) {
  return (
    <Stepper className="w-full" defaultValue={1} orientation="horizontal">
      <StepperNav className="overflow-visible">
        {steps.map(({ title, description }, index) => (
          <StepperItem
            key={title}
            step={index + 1}
            className="relative flex-1 overflow-visible"
          >
            <StepperTrigger className="flex w-full flex-col items-center gap-2.5">
              <div className="relative flex h-10 w-full items-center justify-center overflow-visible">
                <StepperIndicator
                  className={cn(
                    "relative z-10 size-10 text-base font-medium bg-transparent transition-colors duration-300",
                    index === 0
                      ? "border border-orange-300 data-[state=active]:bg-orange-300 data-[state=completed]:bg-orange-300"
                      : "border border-violet-300 data-[state=active]:bg-violet-300 data-[state=completed]:bg-violet-300",
                  )}
                >
                  {index + 1}
                </StepperIndicator>

                {steps.length > index + 1 && (
                  <AnimatedStepSeparator segmentIndex={index} />
                )}
              </div>
              <StepperTitle
                className={cn(
                  "mt-4 text-center text-xl font-medium font-bodoni-moda transition-colors duration-300",
                  "data-[state=inactive]:text-muted-foreground",
                )}
              >
                {title}
              </StepperTitle>
              <StepperDescription
                className={cn(
                  "w-md text-center font-light text-foreground transition-colors duration-300",
                  "data-[state=inactive]:text-muted-foreground",
                )}
              >
                {description}
              </StepperDescription>
            </StepperTrigger>
          </StepperItem>
        ))}
      </StepperNav>
    </Stepper>
  );
}

export function VerticalFlowStepper({ steps }: FlowStepperProps) {
  return (
    <Stepper className="w-full" defaultValue={1} orientation="vertical">
      <StepperNav className="overflow-visible gap-24">
        {steps.map(({ title, description }, index) => (
          <StepperItem
            key={title}
            step={index + 1}
            className="relative flex-1 overflow-visible"
          >
            <StepperTrigger className="flex w-full justify-start items-center gap-8">
              <div className="relative flex h-10 w-full items-center justify-start pl-8 overflow-visible">
                <StepperIndicator
                  className={cn(
                    "relative z-10 size-10 text-base font-medium bg-transparent transition-colors duration-300",
                    index === 0
                      ? "border border-orange-300 data-[state=active]:bg-orange-300 data-[state=completed]:bg-orange-300"
                      : "border border-violet-300 data-[state=active]:bg-violet-300 data-[state=completed]:bg-violet-300",
                  )}
                >
                  {index + 1}
                </StepperIndicator>

                {steps.length > index + 1 && (
                  <AnimatedStepSeparator segmentIndex={index} />
                )}
              </div>
              <div className="flex flex-col items-start">
                <StepperTitle
                  className={cn(
                    "mt-4 text-lg text-left font-medium font-bodoni-moda transition-colors duration-300",
                    "data-[state=inactive]:text-muted-foreground",
                  )}
                >
                  {title}
                </StepperTitle>
                <StepperDescription
                  className={cn(
                    "w-3xs text-left text-xs font-light text-foreground transition-colors duration-300",
                    "data-[state=inactive]:text-muted-foreground",
                  )}
                >
                  {description}
                </StepperDescription>
              </div>
            </StepperTrigger>
          </StepperItem>
        ))}
      </StepperNav>
    </Stepper>
  );
}
