import { EditorContent, PureEditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useCallback } from "react";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import Paragraph from "@tiptap/extension-paragraph";
import ListItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import HardBreak from "@tiptap/extension-hard-break";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Link from "@tiptap/extension-link";

type EditorProps = {
  value: string;
  onChange: (value: string) => void;
};

export default React.forwardRef<HTMLDivElement, EditorProps>(
  function TextEditor(props, ref) {
    const editor = useEditor({
      extensions: [
        Document,
        Text,
        Paragraph,
        StarterKit,
        HardBreak,
        HorizontalRule,
        BulletList,
        OrderedList,
        ListItem,
        Bold,
        Italic,
        Link,
      ],
      content: props.value,
      onUpdate: ({ editor }) => {
        props.onChange(editor.getHTML());
      },
    });

    const setUnsetLink = useCallback(() => {
      if (editor.isActive("link")) {
        editor.chain().focus().unsetLink().run();
        return;
      }
      const previousUrl = editor.getAttributes("link").href;
      const url = window.prompt("URL", previousUrl);

      // cancelled
      if (url === null) {
        return;
      }

      // empty
      if (url === "") {
        editor.chain().focus().extendMarkRange("link").unsetLink().run();
        return;
      }

      // update link
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    }, [editor]);

    return (
      <div className="editor bg-gray-100 appearance-none border-2 border-gray-100 rounded w-full text-gray-700 block cursor-text mt-2 focus-within:ring">
        <div className="flex items-center justify-between px-3 py-2 border-b dark:border-gray-600">
          <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x dark:divide-gray-600">
            <div className="flex items-center space-x-1 sm:pr-4">
              <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                type="button"
                className={`p-2 ${
                  editor?.isActive("bold") ? "text-gray-900" : "text-gray-500"
                } rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600`}
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 1h4.5a3.5 3.5 0 1 1 0 7H3m0-7v7m0-7H1m2 7h6.5a3.5 3.5 0 1 1 0 7H3m0-7v7m0 0H1"
                  />
                </svg>
                <span className="sr-only">Bold</span>
              </button>
              <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                type="button"
                className={`p-2 ${
                  editor?.isActive("italic") ? "text-gray-900" : "text-gray-500"
                } rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600`}
              >
                <svg
                  className="w-4 h-4 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m3.874 15 6.143-14M1 15h6.33M6.67 1H13"
                  />
                </svg>
                <span className="sr-only">Italic</span>
              </button>
              <button
                onClick={setUnsetLink}
                type="button"
                className={`p-2 ${
                  editor?.isActive("link") ? "text-gray-900" : "text-gray-500"
                } rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600`}
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 19 19"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11.013 7.962a3.519 3.519 0 0 0-4.975 0l-3.554 3.554a3.518 3.518 0 0 0 4.975 4.975l.461-.46m-.461-4.515a3.518 3.518 0 0 0 4.975 0l3.553-3.554a3.518 3.518 0 0 0-4.974-4.975L10.3 3.7"
                  />
                </svg>

                <span className="sr-only">Link</span>
              </button>
            </div>
            <div className="flex flex-wrap items-center space-x-1 sm:pl-4">
              <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                type="button"
                className={`p-2 ${
                  editor?.isActive("orderedList")
                    ? "text-gray-900"
                    : "text-gray-500"
                } rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600`}
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 21 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.5 3h9.563M9.5 9h9.563M9.5 15h9.563M1.5 13a2 2 0 1 1 3.321 1.5L1.5 17h5m-5-15 2-1v6m-2 0h4"
                  />
                </svg>
                <span className="sr-only">Numbered list</span>
              </button>
              <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                type="button"
                className={`p-2 ${
                  editor?.isActive("bulletList")
                    ? "text-gray-900"
                    : "text-gray-500"
                } rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600`}
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="2"
                    d="M6 1h10M6 5h10M6 9h10M1.49 1h.01m-.01 4h.01m-.01 4h.01"
                  />
                </svg>
                <span className="sr-only">Bullet List</span>
              </button>
            </div>
          </div>
        </div>

        <div className="py-2 px-4">
          <EditorContent
            editor={editor}
            ref={ref}
            className="prose max-w-none prose-a:text-primary-500"
          />
        </div>
      </div>
    );
  }
);
