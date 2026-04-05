import { getTranslations } from "next-intl/server";

import { AnimatedGridPattern } from "@/features/components/ui/animated-grid-pattern";

import { PlaceholderImage } from "@/features/components/blocks/images/placeholder-image/placeholder.image";

import { Button } from "@/features/components/ui/button";

import { LinkType } from "@/features/components/blocks/links/types/link.type";
import { Link } from "@/features/components/blocks/links/link/link";

export default async function HeroSection() {
  const tHero = await getTranslations("app.page.hero");

  const exploreMore: LinkType = tHero.raw("explore-more");

  return (
    <section className="section h-fullscreen container grid grow grid-cols-2 items-center gap-6">
      <div className="relative flex h-full flex-col justify-center">
        <div className="absolute top-0 left-0 -z-10 size-full">
          <AnimatedGridPattern
            duration={3}
            repeatDelay={1}
            maxOpacity={0.1}
            numSquares={64}
            className="skew-y-12 mask-[radial-gradient(350px_circle_at_center,white,transparent)]"
          />
        </div>
        <div className="space-y-6">
          <h1 className="text-6xl font-medium">{tHero("title")}</h1>
          <p className="text-muted-foreground text-lg text-balance">
            {tHero("description")}
          </p>
          <Button asChild size="lg">
            <Link href={exploreMore.url} className="text-xl">
              {exploreMore.label}
            </Link>
          </Button>
        </div>
      </div>
      <PlaceholderImage className="max-h-128 rounded" />
    </section>
  );
}
