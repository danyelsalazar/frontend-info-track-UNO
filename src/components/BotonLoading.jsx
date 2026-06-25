import { IconLoader } from "@tabler/icons-react"

export const BotonLoading = ({ loading, onClick, children, type="button" }) => {
  return (
    <button onClick={onClick} disabled={loading} className="btn-primary" type={type}>
      {loading &&
        <IconLoader className="spinner" color="#fff" size={16}/>
      }
      { children }
    </button>
  )
}