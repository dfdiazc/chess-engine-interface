import {
  selectCurrentEngine,
  selectCurrentGameStart,
  setEngine,
} from "@/lib/features/chess/chessSlice";
import { AppDispatch } from "@/lib/store";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";

export default function Engine({
  engine: { name, image, buttonColor },
}: {
  engine: { name: string; image: string; buttonColor: string };
}) {
    const dispatch = useDispatch<AppDispatch>();
  const currentEngine = useSelector(selectCurrentEngine);
  const gameStart = useSelector(selectCurrentGameStart);
  const engineVariants = {
    hidden: { display: "none" },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.1 } },
    selected: {
      scale: 1.5,
      "margin-bottom": "25px",
      "margin-top": "10px",
      x: 0,
      y: 0,
      cursor: "default",
    },
  };
  return (
    <AnimatePresence>
      {(currentEngine === name && gameStart) || !gameStart ? (
        <motion.div
          onClick={() => {
            dispatch(setEngine(name));
          }}
          className={
            currentEngine === name
              ? `flex w-16 h-16 self-center rounded-lg justify-center ring-2 ring-flamingo-100`
              : `flex w-16 h-16 self-center rounded-lg justify-center`
          }
          variants={engineVariants}
          initial="visible"
          animate={currentEngine === name && gameStart ? "selected" : "visible"}
          exit="hidden"
        >
          <button
            className={`flex ${buttonColor} rounded-lg w-14 h-14 self-center justify-center`}
          >
            <div
              className={`self-center bg-[url('/images/${image}')] bg-center bg-contain bg-no-repeat w-14 h-14`}
            />
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
