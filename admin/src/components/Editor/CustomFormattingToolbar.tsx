import React from "react";
import {
  BlockTypeDropdown,
  ColorStyleButton,
  CreateLinkButton,
  NestBlockButton,
  TextAlignButton,
  ToggledStyleButton,
  Toolbar,
  ToolbarButton,
  UnnestBlockButton,
  FormattingToolbarProps,
  BlockTypeDropdownItem,
} from "@blocknote/react";
import { RiImageEditFill } from "react-icons/ri";

export const CustomFormattingToolbar: React.FC<
  FormattingToolbarProps<any> & {
    blockTypeDropdownItems?: BlockTypeDropdownItem[];
  } & { onReplaceImageClick: () => void }
> = (props) => {
  return (
    <Toolbar>
      <BlockTypeDropdown {...props} items={props.blockTypeDropdownItems} />

      <ToolbarButton
        onClick={props.onReplaceImageClick}
        mainTooltip={"Replace Image"}
        icon={RiImageEditFill}
      />
      <ToggledStyleButton editor={props.editor} toggledStyle={"bold"} />
      <ToggledStyleButton editor={props.editor} toggledStyle={"italic"} />
      <ToggledStyleButton editor={props.editor} toggledStyle={"underline"} />
      <ToggledStyleButton editor={props.editor} toggledStyle={"strike"} />

      <TextAlignButton editor={props.editor as any} textAlignment={"left"} />
      <TextAlignButton editor={props.editor as any} textAlignment={"center"} />
      <TextAlignButton editor={props.editor as any} textAlignment={"right"} />

      <ColorStyleButton editor={props.editor} />

      <NestBlockButton editor={props.editor} />
      <UnnestBlockButton editor={props.editor} />

      <CreateLinkButton editor={props.editor} />
    </Toolbar>
  );
};
