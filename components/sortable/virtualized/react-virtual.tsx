"use client";

import { useState, useRef } from "react";
import {
  DragOverlay,
  DragStartEvent,
  UniqueIdentifier,
  closestCenter,
  type DragEndEvent,
} from "@dnd-kit/core";
import DndContext from "../../dnd-context";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { SortableItemWithDragHandle } from "../../ui/sortable-item";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Card, CardBody, CardHeader } from "../../ui/card";

export default function VirtualizedSortableList() {
  const parentRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const [items, setItems] = useState(() =>
    Array.from({ length: 500 }, (_, i) => `item-${i + 1}`)
  );

  const columnVirtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 70,
    overscan: 20,
    getItemKey: (index) => items[index],
  });

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveId(null);

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
      <CardHeader className="text-xl font-semibold mb-4">
        Virtualized Sortable List (500 items)
      </CardHeader>
      <CardBody>
        <DndContext
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div
            ref={parentRef}
            className="flex flex-col gap-2 overflow-auto max-h-[500px]"
          >
            <div
              style={{
                position: "relative",
                height: `${columnVirtualizer.getTotalSize()}px`,
              }}
            >
              <SortableContext
                items={items}
                strategy={verticalListSortingStrategy}
              >
                {columnVirtualizer.getVirtualItems().map((virtualItem) => {
                  const column = items[virtualItem.index];

                  return (
                    <div
                      key={column}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: `${virtualItem.size}px`,
                        transform: `translateY(${virtualItem.start}px)`,
                      }}
                    >
                      <SortableItemWithDragHandle
                        key={virtualItem.key}
                        id={virtualItem.key as UniqueIdentifier}
                      />
                    </div>
                  );
                })}
              </SortableContext>
            </div>
            <DragOverlay>
              {activeId && <SortableItemWithDragHandle id={activeId} />}
            </DragOverlay>
          </div>
        </DndContext>
      </CardBody>
    </Card>
  );
}
