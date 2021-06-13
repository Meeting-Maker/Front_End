import Button from "./Button";
import React, { useState } from "react";

const CreateComment = ({ createComment }) => {
  const [content, setContent] = useState("");

  function onSubmitComment(event) {
    event.preventDefault();
    if (content) {
      createComment(content);
      setContent("");
    }
  }

  return (
    <div>
      <form
        className="ui centered reply form"
        onSubmit={(e) => onSubmitComment(e)}
      >
        <hr />
        <div className="centered field">
          <textarea
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What are your thoughts?"
            style={{ width: "90%", height: "2rem" }}
          />
        </div>
        <div style={{ textAlign: "center", paddingBottom: "0.5em" }}>
          <Button
            type="submit"
            className="custom-button dark thin span"
            style={{ width: "90%" }}
          >
            Comment
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateComment;
