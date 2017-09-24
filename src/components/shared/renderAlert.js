import React from 'react';

export default function renderAlert(errorMessage) {
  if (errorMessage) {
    return (
      <div className="alert alert-danger">
        <strong>Oops! {errorMessage}</strong>
      </div>
    );
  }
}
