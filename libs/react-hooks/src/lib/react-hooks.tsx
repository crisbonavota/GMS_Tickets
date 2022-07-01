import { useEffect, useRef } from "react";

// Use effect that doesn't run on first render
export const useDidMountEffect = (func: (params?: any) => any, deps: any[]) => {
    const didMount = useRef(false);
    useEffect(() => didMount.current ? func() : didMount.current = true, deps);
};

