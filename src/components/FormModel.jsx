import { BotonLoading } from "./BotonLoading"

export const FormModel = ({children, loading, title, onSubmit, active, setActive, clearForm = () => {}}) => {
  return (
    <div className="form-model-container">
      <form onSubmit={onSubmit}  className={`${active ? 'form-model-active' : 'form-model-desactive'} form-model`}>
        <h2 className="form-model-title">
          {title}
        </h2>
        <fieldset className="internal-container-form-model">
          {children}
          <div className="form-model-row">
            <button 
              type="button"
              className="btn-cancelar"
              onClick={() => {
                setActive(false)
                clearForm()
              }}
            >
              Cancelar
            </button>
            <BotonLoading type="submit" loading={loading}>
              {loading ? "Guardando" : "Guardar"}
            </BotonLoading>
          </div>
        </fieldset>
      </form>
    </div>
  )
}