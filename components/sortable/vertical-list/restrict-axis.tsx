"use client";

import { useState } from "react";
import { closestCenter, type DragEndEvent } from "@dnd-kit/core";
import {
  restrictToVerticalAxis,
  restrictToHorizontalAxis,
} from "@dnd-kit/modifiers";
import DndContext from "../../dnd-context";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import SortableItem from "../../ui/sortable-item";
import { Card, CardBody, CardHeader } from "../../ui/card";

interface RestictAxisProps {
  orientation?: "vertical" | "horizontal";
}

export default function RestictAxis({
  orientation = "vertical",
}: RestictAxisProps) {
  const axisLockMap = {
    vertical: [restrictToVerticalAxis],
    horizontal: [restrictToHorizontalAxis],
  };

  const [items, setItems] = useState(() =>
    Array.from({ length: 15 }, (_, i) => `item-${i + 1}`)
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setItems((currentItems) => {
        const oldIndex = currentItems.indexOf(active.id as string);
        const newIndex = currentItems.indexOf(over?.id as string);
        return arrayMove(currentItems, oldIndex, newIndex);
      });
    }
  }

  return (
    <Card>
      <CardHeader>Simple Sortable List (15 items)</CardHeader>
      <CardBody>
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={axisLockMap[orientation]}
        >
          <div className="flex flex-col gap-2">
            <SortableContext
              items={items}
              strategy={verticalListSortingStrategy}
            >
              {items.map((id) => (
                <SortableItem key={id} id={id} />
              ))}
            </SortableContext>
          </div>
        </DndContext>
      </CardBody>
    </Card>
  );
}
