import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import Underline from '@tiptap/extension-underline';


interface ContentProps{
  values;
  errors:any;
  watch;
  setValues :(fieldName:any,filedValue:any) =>void;
}

export const ContentEditor: React.FC<ContentProps>= ({values,watch,errors,setValues}) => {

    const editor = useEditor({
      extensions: [
        StarterKit,
        Underline,
        Link,
        Superscript,
        SubScript,
        TextAlign.configure({types: ['heading', 'paragraph']}),
      ],
      content:watch('content'),
      onUpdate({editor}){
        setValues('content',editor.getHTML())
      }
    });


    return (
      <RichTextEditor editor={editor}>
        <RichTextEditor.Toolbar sticky stickyOffset={60}>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold/>
            <RichTextEditor.Italic/>
            <RichTextEditor.Underline/>
            <RichTextEditor.Strikethrough/>
            <RichTextEditor.ClearFormatting/>
            <RichTextEditor.Highlight/>
            <RichTextEditor.Code/>
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1/>
            <RichTextEditor.H2/>
            <RichTextEditor.H3/>
            <RichTextEditor.H4/>
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Blockquote/>
            <RichTextEditor.Hr/>
            <RichTextEditor.BulletList/>
            <RichTextEditor.OrderedList/>
            <RichTextEditor.Subscript/>
            <RichTextEditor.Superscript/>
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link/>
            <RichTextEditor.Unlink/>
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft/>
            <RichTextEditor.AlignCenter/>
            <RichTextEditor.AlignJustify/>
            <RichTextEditor.AlignRight/>
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>
        <RichTextEditor.Content/>
      </RichTextEditor>
    );

}