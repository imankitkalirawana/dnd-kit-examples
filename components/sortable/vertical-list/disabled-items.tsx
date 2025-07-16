"use client";

import { useState } from "react";
import { closestCenter, type DragEndEvent } from "@dnd-kit/core";
import DndContext from "../../dnd-context";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import SortableItem from "../../ui/sortable-item";
import { Card, CardBody, CardHeader } from "../../ui/card";

export default function DisabledItems() {
  const [items, setItems] = useState(() =>
    Array.from({ length: 15 }, (_, i) => `item-${i + 1}`)
  );

  // Items with even numbers are disabled
  const disabledItems = ["item-2", "item-4", "item-6", "item-8", "item-10"];

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
      <CardHeader>Disabled Items (Even-Numbered Items are Disabled)</CardHeader>
      <CardBody>
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <div className="flex flex-col gap-2">
            <SortableContext
              items={items}
              strategy={verticalListSortingStrategy}
            >
              {items.map((id) => (
                <SortableItem
                  key={id}
                  id={id}
                  disabled={disabledItems.includes(id)}
                />
              ))}
            </SortableContext>
          </div>
        </DndContext>
      </CardBody>
    </Card>
  );
}
