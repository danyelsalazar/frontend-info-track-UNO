export const FormModel = ({children, title, onSubmit, active, setActive, clearForm = () => {}}) => {
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
              className="btn-form-model btn-cancelar-form-model"
              onClick={() => {
                setActive(false)
                clearForm()
              }}
            >
              Cancelar
            </button>
            <button type="submit" className="btn-form-model btn-enviar-form-model">
              Guardar
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  )
}