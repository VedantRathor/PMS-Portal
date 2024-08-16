"use client";;
import { motion } from "framer-motion";

import { cn } from "../../lib/utils";

const BlurIn = ({
  word,
  className,
  variant,
  duration = 1
}) => {
  const defaultVariants = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };
  const combinedVariants = variant || defaultVariants;

  return (
    (<motion.h5
      initial="hidden"
      animate="visible"
      transition={{ duration }}
      variants={combinedVariants}
      className={cn(
        className,
        "font-display text-center  tracking-[-0.02em] drop-shadow-sm md:text-7xl md:leading-[1rem]"
      )}>
      {word}
    </motion.h5>)
  );
};

export default BlurIn;