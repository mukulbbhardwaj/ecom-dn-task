import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { ListItem } from "./_components/list-item";
import { PaginationSystem } from "./_components/pagination";
import { getAllCategoriesWithInterestStatus } from "~/actions";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>;
}) {
  const { page } = searchParams;
  const pageNumber = page ? parseInt(page, 10) : 1;
  const categories = await getAllCategoriesWithInterestStatus(pageNumber);

  return (
    <Card className="mx-auto max-w-lg pb-10">
      <CardHeader>
        <CardTitle className="pb-2 text-center text-[32px] font-semibold">
          Please mark your interests!
        </CardTitle>
        <CardDescription className="mx-auto justify-center text-black">
          We will keep you notified.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <h1 className="text-[20px] font-medium">My saved interests!</h1>
        {categories?.map((category) => {
          return <ListItem key={category.id} {...category} />;
        })}
      </CardContent>
      <CardFooter className="mt-6">
        <PaginationSystem pageNumber={pageNumber} />
      </CardFooter>
    </Card>
  );
}
