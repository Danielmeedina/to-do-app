import { useTasks } from "@/store/Task";
import { useEffect, useState } from "react";

export const useHydration = () => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const unsubHydrate = useTasks.persist.onHydrate(() => setHydrated(false));

    const unsubFinishHydration = useTasks.persist.onFinishHydration(() =>
      setHydrated(true)
    );

    setHydrated(useTasks.persist.hasHydrated());

    return () => {
      unsubHydrate();
      unsubFinishHydration();
    };
  }, []);

  return hydrated;
};
