import React from "react";
import { prefixFileUrlWithBackendUrl, useLibrary } from "@strapi/helper-plugin";

export type MediaAsset = {
  name: string;
  alternativeText: string;
  url: string;
  mime: string;
};

const MediaLib: React.FC<{
  isOpen: boolean;
  onChange: (files: any) => void;
  onToggle: () => void;
}> = ({ isOpen, onChange, onToggle }) => {
  const { components } = useLibrary();
  const MediaLibraryDialog = components["media-library"];

  const handleSelectAssets = (assets: MediaAsset[]) => {
    const formattedFiles = assets.map((f) => ({
      alt: f.alternativeText || f.name,
      url: prefixFileUrlWithBackendUrl(f.url),
      mime: f.mime,
    }));

    onChange(formattedFiles);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <MediaLibraryDialog
      onClose={onToggle}
      allowedTypes={["images"]}
      onSelectAssets={handleSelectAssets}
    />
  );
};

export default MediaLib;
