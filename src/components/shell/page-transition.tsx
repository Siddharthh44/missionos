"use client";

import { motion } from "framer-motion";
import type { PropsWithChildren } from "react";

export default function PageTransition({ children }: PropsWithChildren) {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
