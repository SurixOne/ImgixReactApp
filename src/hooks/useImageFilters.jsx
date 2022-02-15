import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function useImageFilters() {
  const imageFilters = useSelector((s) => s.options);
  const [mappedFilters, setMappedImageFilters] = useState({});

  useEffect(() => {
    setMappedImageFilters(
      Object.fromEntries(
        Object.entries(imageFilters).map(([key, elem]) => [key, elem.value])
      )
    );
  }, [imageFilters]);

  return mappedFilters;
}
