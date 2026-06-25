import { IconLoader } from "@tabler/icons-react"

export const BotonLoading = ({ loading, onClick, children, type="button", className="btn-primary", colorSpinner="#fff", size=16 }) => {
  return (
    <button onClick={onClick} disabled={loading} className={className} type={type}>
      {loading &&
        <IconLoader className="spinner" color={colorSpinner} size={size}/>
      }
      { children }
    </button>
  )
}