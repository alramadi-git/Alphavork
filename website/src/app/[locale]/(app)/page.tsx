import PageTemplate from "@/features/components/templates/app/page/page.template";

export default async function Page(props: PageProps<"/[locale]">) {
  return <PageTemplate {...props} />;
}
