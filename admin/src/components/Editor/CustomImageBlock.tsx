import React from "react";

import { createReactBlockSpec } from "@blocknote/react";
import {
  defaultBlockSchema,
  defaultBlockSpecs,
  defaultProps,
  PropSchema,
} from "@blocknote/core";

const customImagePropSchema = {
  textAlignment: defaultProps.textAlignment,
  backgroundColor: defaultProps.backgroundColor,
  url: {
    default: "" as const,
  },
  caption: {
    default: "" as const,
  },
  width: {
    default: 512 as const,
  },
} satisfies PropSchema;

export const CustomImageBlock = createReactBlockSpec(
  {
    type: "image",
    propSchema: {
      ...defaultProps,
      ...customImagePropSchema,
    },
    content: "none",
  },
  {
    render: ({ block, editor }) => {
      return (
        <img
          width={`${Math.min(
            block.props.width,
            editor.domElement.firstElementChild!.clientWidth,
          )}px`}
          src={block.props.url}
          alt={block.props.caption}
        />
      );
    },
    toExternalHTML: ({ contentRef }) => <p ref={contentRef} />,
    parse: (element) => {
      const { src, alt, width } = element as HTMLImageElement;

      if (src === "") {
        return;
      }

      return {
        url: src,
        caption: alt,
        width: width,
      };
    },
  },
);

export const blockSchema = {
  ...defaultBlockSchema,
  image: CustomImageBlock.config,
};

export const blockSpecs = {
  ...defaultBlockSpecs,
  image: CustomImageBlock,
};
