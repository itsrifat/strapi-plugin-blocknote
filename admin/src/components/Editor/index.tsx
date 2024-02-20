import React, { useCallback, useMemo, useState } from "react";
import {
  BlockNoteView,
  useBlockNote,
  getDefaultReactSlashMenuItems,
  FormattingToolbarPositioner,
  SlashMenuPositioner,
  HyperlinkToolbarPositioner,
  SideMenuPositioner,
} from "@blocknote/react";
import "@blocknote/react/style.css";
import "../style.css";
import MediaLib from "../MediaLib";
import { blockSchema, blockSpecs } from "./CustomImageBlock";
import { CustomFormattingToolbar } from "./CustomFormattingToolbar";

const defaultSlashMenuItems = getDefaultReactSlashMenuItems(blockSchema);

const Editor: React.FC<{
  onChange: (data: { target: { name: string; value: string } }) => void;
  name: string;
  value: string;
  disabled?: boolean;
}> = ({ onChange, name, value, disabled }) => {
  const [mediaLibVisible, setMediaLibVisible] = useState(false);

  const toggleMediaLib = () => setMediaLibVisible((prev) => !prev);

  const slashMenuItems = useMemo(() => {
    return defaultSlashMenuItems.map((item) => {
      if (item.name !== "Image") {
        return item;
      }
      return {
        ...item,
        execute: () => {
          toggleMediaLib();
        },
      };
    });
  }, [toggleMediaLib]);

  const editor = useBlockNote<typeof blockSpecs>(
    {
      initialContent: value ? JSON.parse(value) : undefined,
      onEditorContentChange: (editor) => {
        onChange({
          target: { name, value: JSON.stringify(editor.topLevelBlocks) },
        });
      },
      onEditorReady: () => {},
      editable: !disabled,
      blockSpecs,
      slashMenuItems,
    },
    [],
  );

  const handleChangeAssets = (assets: { mime: string; url: string }[]) => {
    assets.map((asset) => {
      if (!asset.mime.includes("image")) {
        return;
      }

      editor.replaceBlocks(
        [editor.getTextCursorPosition().block],
        [
          {
            type: "image",
            props: {
              url: asset.url,
            },
          },
        ],
      );
    });

    toggleMediaLib();
  };

  const Toolbar = useCallback(
    (props) => {
      return (
        <CustomFormattingToolbar
          {...props}
          onReplaceImageClick={toggleMediaLib}
        />
      );
    },
    [toggleMediaLib],
  );

  return (
    <>
      <BlockNoteView editor={editor}>
        <FormattingToolbarPositioner
          editor={editor}
          formattingToolbar={Toolbar}
        />
        <HyperlinkToolbarPositioner editor={editor} />
        <SlashMenuPositioner editor={editor} />
        <SideMenuPositioner editor={editor} />
      </BlockNoteView>
      <MediaLib
        isOpen={mediaLibVisible}
        onChange={handleChangeAssets}
        onToggle={toggleMediaLib}
      />
    </>
  );
};

export default Editor;
