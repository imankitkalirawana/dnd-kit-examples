"use client";

import { useState } from "react";
import { closestCenter, type DragEndEvent } from "@dnd-kit/core";
import DndContext from "../../dnd-context";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "../../ui/sortable-item";
import { Card, CardBody, CardHeader } from "../../ui/card";

export default function HorizontalList() {
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
      <CardHeader>Horizontal List (15 items)</CardHeader>
      <CardBody>
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-2">
            <SortableContext
              items={items}
              strategy={horizontalListSortingStrategy}
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
