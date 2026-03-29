import { Notepad } from "@/components/Notepad";
import { PageShell } from "@/components/PageShell";
import { WhyHeader } from "@/components/WhyHeader";
import { DesignSelector } from "@/components/DesignSelector";
import { whyData } from "@/data/whyData";

const sections = [
  {
    title: whyData.want.title,
    items: whyData.want.items,
    tone: "ambition" as const,
  },
  {
    title: whyData.staySame.title,
    items: whyData.staySame.items,
    tone: "warning" as const,
  },
];

export default function Home() {
  return (
    <PageShell>
      <WhyHeader />
      <section className="mt-10 grid gap-6 lg:mt-14 lg:grid-cols-2 lg:gap-8 xl:gap-10">
        {sections.map((section, index) => (
          <Notepad
            key={section.title}
            index={index}
            items={section.items}
            title={section.title}
            tone={section.tone}
          />
        ))}
      </section>
      <DesignSelector />
    </PageShell>
  );
}
