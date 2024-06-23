'use client'
import React,{useRef} from 'react'
import { Editor} from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';
const RTE = ({control,name,value}:any) => {
    const editorRef:any = useRef();
  return (
    <div>
      <Controller
      name={name}
      control={control}
      render={({ field: { onChange} }) => (
        <Editor
        apiKey="udsi82f7q32y5zzsus4zskpa4uy4532c1vqybmn1vg65ezmu"
        onInit={(_evt, editor) => editorRef.current = editor}
        initialValue={value}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
        onEditorChange={onChange}
      />
      )}
      />
    </div>
  )
}

export default RTE
