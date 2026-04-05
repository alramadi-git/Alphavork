import LayoutTemplate from "@/features/components/templates/app/layout/layout.template";

export const dynamic = "force-static";

export default function Layout(props: LayoutProps<"/[locale]">) {
  return <LayoutTemplate {...props} />;
}
