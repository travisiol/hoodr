import { Certificate } from "@/components/Certificate";
import { Marquee } from "@/components/Marquee";
import { Thesis } from "@/components/Thesis";
import { RouteDiagram } from "@/components/RouteDiagram";
import { Conditions } from "@/components/Conditions";
import { ChainReadout } from "@/components/ChainReadout";
import { Register } from "@/components/Register";
import { Ledger } from "@/components/Ledger";
import { Verify } from "@/components/Verify";
import { Undecided } from "@/components/Undecided";
import { Questions } from "@/components/Questions";
import { BuyButton } from "@/components/BuyButton";
import { Section, SectionHead } from "@/components/ui/Section";
import { Chip } from "@/components/ui/Chip";
import { GuillocheBand } from "@/components/Guilloche";
import { siteConfig } from "@/lib/site-config";

export default function Home() {
  return (
    <>
      <Certificate />
      <Marquee />

      <Section id="thesis">
        <div data-reveal>
          <SectionHead index="01" title="The trade" />
          <Thesis />
        </div>
      </Section>

      <Section id="mechanism">
        <div data-reveal>
          <SectionHead
            index="02"
            title="Where the money goes"
            aside={<Chip tone="unissued">not running</Chip>}
          />
          <RouteDiagram />
        </div>
      </Section>

      <Section id="asset">
        <div data-reveal>
          <SectionHead
            index="03"
            title="What has to be true first"
            aside={<Chip tone="unissued">unproven</Chip>}
          />
          <Conditions />
        </div>
      </Section>

      <Section id="register">
        <div data-reveal>
          <SectionHead
            index="04"
            title="The chain, and this project"
            aside={<Chip tone="live">one of these is real</Chip>}
          />
          <div className="grid gap-6">
            <ChainReadout />
            <Register />
          </div>
        </div>
      </Section>

      <Section id="math">
        <div data-reveal>
          <SectionHead index="05" title="The math, unfilled" />
          <Ledger />
        </div>
      </Section>

      <Section id="verify">
        <div data-reveal>
          <SectionHead index="06" title="Verify" />
          <Verify />
        </div>
      </Section>

      <Section id="open">
        <div data-reveal>
          <SectionHead index="07" title="Not decided yet" />
          <Undecided />
        </div>
      </Section>

      <Section id="questions">
        <div data-reveal>
          <SectionHead index="08" title="Questions, including the awkward ones" />
          <Questions />
        </div>
      </Section>

      <Section className="pb-24">
        <div
          data-reveal
          className="relative overflow-hidden rounded-[3px] bg-ink px-6 py-14 text-paper sm:px-12 sm:py-20"
        >
          <div className="relative">
            <p className="text-[10px] tracking-[0.2em] text-paper/50 uppercase">
              Nothing to buy
            </p>
            <h2 className="display mt-5 max-w-[18ch] text-[clamp(2.2rem,6.5vw,4.6rem)] leading-[0.98]">
              There is no token yet.
            </h2>
            <p className="prose-sans mt-6 max-w-[56ch] text-[14.5px] leading-relaxed text-paper/70">
              When there is one, its address appears in § 06 and the button
              below stops being dead. Until then the honest thing this page can
              offer is the mechanism, the open decisions, and a way to check
              both.
            </p>
            <div className="mt-9 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
              <BuyButton onDark />
              <a
                href={siteConfig.x}
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-paper/30 pb-0.5 text-[11px] tracking-[0.18em] text-paper/70 uppercase transition hover:border-paper hover:text-paper"
              >
                Follow on X ↗
              </a>
            </div>
          </div>
          <GuillocheBand className="absolute inset-x-0 bottom-0 h-6 w-full text-paper/25" />
        </div>
      </Section>
    </>
  );
}
