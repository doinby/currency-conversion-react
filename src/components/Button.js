import React from 'react';

export default function Button({className, displayName, onClick}) {
  return (
    <button className={className} onClick={onClick}>
      {displayName}
    </button>
  );
}
