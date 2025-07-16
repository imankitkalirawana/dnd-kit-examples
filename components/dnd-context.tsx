import {
  DndContext as DndKitContext,
  DndContextProps,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

const DndContext = (props: DndContextProps) => {
  const { children, ...rest } = props;

  // Setup DNDKit sensors for pointer (mouse/touch) and keyboard interactions.
  // Sensors detect user input and initiate drag operations.
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  return (
    <DndKitContext sensors={sensors} {...rest}>
      {children}
    </DndKitContext>
  );
};

export default DndContext;
