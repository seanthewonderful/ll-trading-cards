import { useEffect } from "react";

export default function useConsoleLog(variable) {
  useEffect(() => {
    console.log(variable);
  }, [variable]);
}