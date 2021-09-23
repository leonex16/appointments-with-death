import React from 'react'

interface ToastCustomProps {
  summary: string,
  detail: string
};

export const ToastCustom = (props: ToastCustomProps) => {
  const { detail, summary } = props;

  return (
    <div>
      <span className="p-toast-summary">{summary}</span>
      <div className="p-toast-detail">{detail}</div>
    </div>
  )
}
