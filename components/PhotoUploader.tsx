"use client";

import { useRef, useState } from "react";

export function PhotoUploader({
  value,
  onChange
}: {
  value?: string;
  onChange: (photo: string | undefined) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState(value);

  function handleFile(file?: File) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result);
      setPreview(result);
      onChange(result);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="photoUploader">
      {preview ? (
        <img src={preview} alt="今日照片预览" />
      ) : (
        <button className="photoEmpty" type="button" onClick={() => inputRef.current?.click()}>
          <span>📷</span>
          上传照片
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={(event) => handleFile(event.target.files?.[0])}
        hidden
      />
      <div className="buttonRow">
        <button className="secondaryButton" type="button" onClick={() => inputRef.current?.click()}>
          {preview ? "更换照片" : "选择照片"}
        </button>
        {preview ? (
          <button
            className="ghostButton"
            type="button"
            onClick={() => {
              setPreview(undefined);
              onChange(undefined);
            }}
          >
            移除
          </button>
        ) : null}
      </div>
    </div>
  );
}
