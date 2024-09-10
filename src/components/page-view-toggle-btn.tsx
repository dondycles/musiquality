"use client";

import { Columns3, Rows3 } from "lucide-react";
import { View } from "../../store";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
export default function PageViewToggleBtn({
  action,
  view,
}: {
  action: () => void;
  view: View;
}) {
  return (
    <Button onClick={action} size={"icon"} variant={"ghost"}>
      {view === "col" && (
        <motion.div
          key={"col"}
          initial={{ rotate: 90, scale: 0.75 }}
          animate={{ rotate: 0, scale: 1 }}
          exit={{ rotate: -90, scale: 0.75 }}
        >
          <Rows3 size={16} />
        </motion.div>
      )}

      {view === "row" && (
        <motion.div
          key={"row"}
          initial={{ rotate: 90, scale: 0.75 }}
          animate={{ rotate: 0, scale: 1 }}
          exit={{ rotate: -90, scale: 0.75 }}
        >
          <Columns3 size={16} />
        </motion.div>
      )}
    </Button>
  );
}
