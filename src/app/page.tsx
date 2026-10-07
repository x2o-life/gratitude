import CounterMoment from "@/components/home/counter-moment";
import Hero from "@/components/home/hero";
import Join, { Footer } from "@/components/home/join";
import PileToPass from "@/components/home/pile-to-pass";
import Questions from "@/components/home/questions";
import TwoDoors from "@/components/home/two-doors";
import WhyOnePass from "@/components/home/why-one-pass";

/**
 * The page's arc: the promise → the problem (a pile of loyalty cards) → the whole product in
 * one interactive moment → why it matters → pick your side → objections →
 * join, ending on a small celebration.
 */
export default function HomePage() {
  return (
    <div className="relative w-full overflow-x-clip">
      <Hero />
      <PileToPass />
      <CounterMoment />
      <WhyOnePass />
      <TwoDoors />
      <Questions />
      <Join />
      <Footer />
    </div>
  );
}
