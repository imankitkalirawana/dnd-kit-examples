"use client";
import DndContext from "@/components/dnd-context";
import {
  closestCenter,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  UniqueIdentifier,
} from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import { GripHorizontal } from "lucide-react";
import { Card, CardBody, CardHeader } from "@/components/ui/card";

type Items = {
  [key: string]: string[];
};

const initialData: Items = {
  A: ["A0", "A1", "A2"],
  B: ["B0", "B1"],
  C: [],
};

export default function MultiList() {
  const [items, setItems] = useState<Items>(initialData);
  const [active, setActive] = useState<UniqueIdentifier | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "item") {
      setActive(event.active.id);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActive(null);

    if (!over) return;

    const activeId = active.id.toString();
    const overId = over.id.toString();

    // If the item was dropped in the same spot, do nothing
    if (activeId === overId) return;

    const activeType = active.data.current?.type;
    const overType = over.data.current?.type;

    // If we're dragging a column
    if (activeType === "column" && overType === "column") {
      setItems((items) => {
        const keys = Object.keys(items);
        const activeIndex = keys.indexOf(activeId);
        const overIndex = keys.indexOf(overId);

        // Create a new object with reordered keys
        const newItems: Items = {};
        const orderedKeys = [...keys];

        // Reorder the keys
        const [removedKey] = orderedKeys.splice(activeIndex, 1);
        orderedKeys.splice(overIndex, 0, removedKey);

        // Rebuild the object with the new order
        orderedKeys.forEach((key) => {
          newItems[key] = items[key];
        });

        return newItems;
      });
    }

    // If we're dragging an item
    if (activeType === "item") {
      const activeColumn = active.data.current?.column;
      const overColumn = over.data.current?.column || over.id;

      // If we're moving between columns or within the same column
      setItems((items) => {
        // Deep clone the items object
        const newItems = JSON.parse(JSON.stringify(items));

        // Remove item from source column
        const sourceColumn = activeColumn;
        const [movedItem] = newItems[sourceColumn].splice(
          newItems[sourceColumn].indexOf(activeId),
          1
        );

        // Handle different drop targets
        if (overType === "column") {
          // If dropping on a column container, add to end of that column
          newItems[overId].push(movedItem);
        } else {
          // If dropping on an item, find its position and insert there
          const targetColumn = overColumn;
          const overIndex = newItems[targetColumn].indexOf(overId);
          newItems[targetColumn].splice(overIndex, 0, movedItem);
        }

        return newItems;
      });
    }
  };

  return (
    <Card className="col-span-full">
      <CardHeader>Multi List</CardHeader>
      <CardBody className="flex-row gap-4">
        <DndContext
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToWindowEdges]}
        >
          <SortableContext items={Object.keys(items)}>
            {Object.keys(items).map((column) => (
              <Column key={column} id={column} items={items[column]} />
            ))}
          </SortableContext>
          <DragOverlay>
            {active ? <Item id={active} column={active} /> : null}
          </DragOverlay>
        </DndContext>
      </CardBody>
    </Card>
  );
}

export function Column({ id, items }: { id: string; items: string[] }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    isOver,
  } = useSortable({
    id,
    data: {
      type: "column",
      index: items.length,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    backgroundColor: isOver ? "#e2e8f0" : undefined,
  };

  return (
    <div
      className="bg-gray-200 items-center gap-4 p-4 justify-between flex flex-col rounded-md w-full"
      ref={setNodeRef}
      style={style}
    >
      <div className="w-full">
        <h2 className="text-lg font-bold mb-4">{`Column ${id}`}</h2>
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <div className="flex flex-col gap-2">
            {items.map((item) => (
              <Item key={item} id={item} column={id} />
            ))}
          </div>
        </SortableContext>
      </div>
      <div className="cursor-grab " {...attributes} {...listeners}>
        <GripHorizontal />
      </div>
    </div>
  );
}

export function Item({
  id,
  column,
}: {
  id: UniqueIdentifier;
  column: UniqueIdentifier;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    isOver,
  } = useSortable({
    id,
    data: {
      type: "item",
      column,
      index: 0,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    backgroundColor: isOver ? "#e2e8f0" : undefined,
  };

  return (
    <div
      className="bg-white p-3 rounded-md shadow cursor-grab"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {id}
    </div>
  );
}
