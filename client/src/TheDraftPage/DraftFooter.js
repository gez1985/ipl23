import React, { useState } from "react";
import Vidiprinter from "./Vidiprinter";

export default function DraftFooter() {
  return (
    <>
      <div className="draft-footer standard-width-container flex-container">
        <Vidiprinter />
      </div>
    </>
  );
}
