import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";

import { Placeholder } from "@/components/blocks/images";

const GRID_DURATION = 3;
const GRID_REPEAT_DELAY = 1;
const GRID_MAX_OPACITY = 0.1;
const GRID_NUMBER_OF_SQUARES = 64;

type tHeroProps = {
  children: React.ReactNode;
};
export default async function Main({ children }: tHeroProps) {
  return (
    <main className="section h-fullscreen flex">
      <div className="container grow grid gap-8 xl:grid-cols-2">
        <div className="relative grid items-center">
          <div className="absolute -z-10 size-full overflow-hidden">
            <AnimatedGridPattern
              duration={GRID_DURATION}
              repeatDelay={GRID_REPEAT_DELAY}
              maxOpacity={GRID_MAX_OPACITY}
              numSquares={GRID_NUMBER_OF_SQUARES}
              className="skew-y-12 mask-[radial-gradient(350px_circle_at_center,white,transparent)]"
            />
          </div>
          <div className="mx-auto w-full max-w-136">{children}</div>
        </div>
        <Placeholder
          priority
          className="hidden size-full rounded object-cover xl:block"
        />
      </div>
    </main>
  );
}
