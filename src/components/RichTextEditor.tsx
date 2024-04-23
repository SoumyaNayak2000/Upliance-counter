import {
  Button,
  HStack,
  Box,
  Center,
  useColorModeValue,
} from "@chakra-ui/react";
import StarterKit from "@tiptap/starter-kit";
import { EditorContent, useEditor } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Underline from "@tiptap/extension-underline";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";

const extensions = [StarterKit, Document, Paragraph, Text, Underline];

const RichTextEditor = () => {
  const { formData } = useContext(UserContext);
  const [contentSaved, setContentSaved] = useState(false);

  const editor = useEditor({
    extensions,
    content: (formData && JSON.stringify(formData)) || "<p>Hello World !</p>",
  });
  useEffect(() => {
    if (editor && formData) {
      editor.commands.setContent(JSON.stringify(formData));
    }
  }, [formData, editor]);

  const handleSaveContent = () => {
    if (editor) {
      localStorage.setItem("richTextContent", JSON.stringify(editor.getHTML()));
      setContentSaved(true);
    }
  };

  if (!editor) {
    return null;
  }

  const bgLight = useColorModeValue(
    "linear(to-b, gray.200, gray.300)",
    "linear(to-b, gray.800, gray.900)"
  );
  const bgDark = useColorModeValue("gray.200", "gray.800");
  const bg = editor ? bgLight : bgDark;
  const buttonColor = useColorModeValue("gray.800", "gray.200");
  const buttonHoverColor = useColorModeValue("gray.700", "gray.300");

  return (
    <Center>
      <Box p={4} w={"80%"} h={"80vh"} bg={bg} borderRadius="xl" zIndex={10}>
        <HStack mb={4} spacing={2} flexWrap="wrap">
          <Button
            isActive={editor.isActive("bold")}
            onClick={() => editor.chain().focus().toggleBold().run()}
            colorScheme="teal"
            variant="outline"
            color={buttonColor}
            _hover={{ bg: buttonHoverColor }}
          >
            Bold
          </Button>
          <Button
            isActive={editor.isActive("italic")}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            colorScheme="teal"
            variant="outline"
            color={buttonColor}
            _hover={{ bg: buttonHoverColor }}
          >
            Italic
          </Button>
          <Button
            isActive={editor.isActive("strike")}
            onClick={() => editor.chain().focus().toggleStrike().run()}
            colorScheme="teal"
            variant="outline"
            color={buttonColor}
            _hover={{ bg: buttonHoverColor }}
          >
            Strike
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={editor.isActive("underline") ? "is-active" : ""}
            colorScheme="teal"
            variant="outline"
            color={buttonColor}
            _hover={{ bg: buttonHoverColor }}
          >
            UnderLine
          </Button>
          <Button
            isActive={editor.isActive("code")}
            onClick={() => editor.chain().focus().toggleCode().run()}
            colorScheme="teal"
            variant="outline"
            color={buttonColor}
            _hover={{ bg: buttonHoverColor }}
          >
            Code
          </Button>
          <Button
            onClick={() => editor.chain().focus().unsetAllMarks().run()}
            colorScheme="teal"
            variant="outline"
            color={buttonColor}
            _hover={{ bg: buttonHoverColor }}
          >
            Clear Marks
          </Button>
          <Button
            isActive={editor.isActive("paragraph")}
            onClick={() => editor.chain().focus().setParagraph().run()}
            colorScheme="teal"
            variant="outline"
            color={buttonColor}
            _hover={{ bg: buttonHoverColor }}
          >
            Paragraph
          </Button>

          <Button
            isActive={editor.isActive("bulletList")}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            colorScheme="teal"
            variant="outline"
            color={buttonColor}
            _hover={{ bg: buttonHoverColor }}
          >
            Bullet List
          </Button>
          <Button
            isActive={editor.isActive("orderedList")}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            colorScheme="teal"
            variant="outline"
            color={buttonColor}
            _hover={{ bg: buttonHoverColor }}
          >
            Ordered List
          </Button>
          <Button
            isActive={editor.isActive("codeBlock")}
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            colorScheme="teal"
            variant="outline"
            color={buttonColor}
            _hover={{ bg: buttonHoverColor }}
          >
            Code Block
          </Button>

          <Button
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
            colorScheme="teal"
            variant="outline"
            color={buttonColor}
            _hover={{ bg: buttonHoverColor }}
          >
            Undo
          </Button>
          <Button
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
            colorScheme="teal"
            variant="outline"
            color={buttonColor}
            _hover={{ bg: buttonHoverColor }}
          >
            Redo
          </Button>
        </HStack>
        <Box
          border="1px solid #CBD5E0"
          borderRadius="md"
          p={4}
          minHeight="200px"
        >
          <EditorContent editor={editor} />
        </Box>
        <Button
          onClick={handleSaveContent}
          disabled={contentSaved}
          mt={4}
          colorScheme="teal"
        >
          Save
        </Button>
      </Box>
    </Center>
  );
};

export default RichTextEditor;
