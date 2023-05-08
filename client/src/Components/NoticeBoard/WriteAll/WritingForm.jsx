import React from "react";

function WritingForm() {
  return (
    <form style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <label htmlFor="title" >제목:</label>
        <input id="title" type="text" style={{ width: "400px" }} />
      </div>
      <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <label htmlFor="content" style={{ alignSelf: "flex-start", marginBottom: "0.5rem" }}>내용:</label>
        <textarea id="content" style={{ width: "900px", height: "200px" }} />
      </div>
      <button type="submit">작성 완료</button>
    </form>
  );
}

export default WritingForm;
