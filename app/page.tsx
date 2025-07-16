import SimpleSortableList from "@/components/sortable/vertical-list/basic-list";
import DisabledItems from "@/components/sortable/vertical-list/disabled-items";
import SortableListWithDragHandle from "@/components/sortable/vertical-list/drag-handle";
import RestictAxis from "@/components/sortable/vertical-list/restrict-axis";
import VirtualizedSortableList from "@/components/sortable/virtualized/react-virtual";
import HorizontalList from "@/components/sortable/horizontal-list";
import Grid from "@/components/sortable/grid";
import MultiList from "@/components/sortable/multi-list";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8 lg:p-12 gap-8 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6">
        DNDKit Sortable Lists
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl">
        <SimpleSortableList />
        <SortableListWithDragHandle />
        <RestictAxis orientation="vertical" />
        <VirtualizedSortableList />
        <DisabledItems />
        <HorizontalList />
        <Grid />
        <MultiList />
      </div>
    </main>
  );
}
