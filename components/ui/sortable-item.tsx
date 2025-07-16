import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

export default function SortableItem({
  id,
  disabled = false,
}: {
  id: UniqueIdentifier;
  disabled?: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id, disabled });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex justify-between ${
        disabled
          ? "cursor-not-allowed opacity-60"
          : "cursor-grab hover:shadow-xl"
      } items-center bg-white shadow-lg whitespace-nowrap p-4 capitalize rounded-lg border-2 border-gray-300`}
      {...attributes}
      {...listeners}
    >
      <span>{id}</span>
      {disabled && <span className="text-sm text-gray-500">(Disabled)</span>}
    </div>
  );
}

export function SortableItemWithDragHandle({
  id,
  disabled = false,
}: {
  id: UniqueIdentifier;
  disabled?: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id, disabled });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex justify-between items-center bg-white shadow-lg p-4 capitalize rounded-lg border-2 border-gray-300 ${
        disabled ? "opacity-60" : ""
      }`}
    >
      <span>{id}</span>
      {!disabled && (
        <span className="cursor-grab" {...attributes} {...listeners}>
          <GripVertical />
        </span>
      )}
      {disabled && <span className="text-sm text-gray-500">(Disabled)</span>}
    </div>
  );
}
