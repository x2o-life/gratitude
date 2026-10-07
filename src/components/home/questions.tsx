import { Plus } from "lucide-react";
import { MonoLabel, SerifTitle } from "./kit";

const QUESTIONS = [
  {
    q: "Do I need to download an app?",
    a: "Not to start. Give your number at a Gratitude shop and you're already earning. Open the Pass on your phone whenever you want to see what you hold. Everything you earned is already there.",
  },
  {
    q: "Is it free?",
    a: "Yes, Gratitude is free for the people who shop.",
  },
  {
    q: "Who sees my number?",
    a: "Each brand sees only your visits with them, nobody else's. We use SMS only to send your sign-in codes, never for promotions.",
  },
  {
    q: "What do my staff need to do?",
    a: "Type the customer's number and the bill amount, check the preview, then confirm. Gratitude works out every stamp, point and discount.",
  },
  {
    q: "What kind of businesses is it for?",
    a: "Places people come back to: cafés, bakeries, restaurants, salons, gyms, grocers and shops of every kind.",
  },
  {
    q: "Do rewards expire?",
    a: "Some do, and the Pass always tells you when, well before it happens, so nothing slips away unnoticed.",
  },
];

export default function Questions() {
  return (
    <section id="questions" className="scroll-mt-20 px-4 pb-20 md:pb-28">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1fr_1.4fr]">
        <div>
          <MonoLabel>Questions</MonoLabel>
          <SerifTitle className="mt-3 text-4xl md:text-6xl [&_em]:text-pass-strong">
            Fair <em>questions</em>.
          </SerifTitle>
          <p className="mt-4 max-w-sm text-muted-foreground">
            The things people ask before they hand over a phone number.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          {QUESTIONS.map(({ q, a }) => (
            <details
              key={q}
              className="group rounded-2xl border-2 border-ink bg-white transition-shadow open:shadow-[4px_4px_0_0_var(--ink)]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-medium [&::-webkit-details-marker]:hidden">
                {q}
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full border-2 border-ink transition-transform group-open:rotate-45 group-open:bg-sun">
                  <Plus className="size-3.5" />
                </span>
              </summary>
              <p className="px-5 pb-5 text-sm text-muted-foreground">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
