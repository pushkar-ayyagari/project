"use client";

import dynamic from "next/dynamic";

const PropertyMapInner = dynamic(() => import("./property-map-inner"), {
  ssr: false,
  loading: () => (
    <div className="aspect-[16/9] rounded-lg bg-muted animate-pulse" />
  ),
});

export function PropertyMap(props: {
  latitude: number;
  longitude: number;
  popup?: string;
}) {
  return <PropertyMapInner {...props} />;
}