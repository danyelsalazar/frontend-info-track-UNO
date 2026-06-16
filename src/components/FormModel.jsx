export const FormModel = ({children, onSubmit, active}) => {
  return (
    <div className={`${active ? 'componet-add-materia-user-active' : 'componet-add-materia-user'} componet-add-materia-user-forever`}>
      <form onSubmit={onSubmit} className="form-materia-user">
        <fieldset className="container-internal-form card">
          {children}
          <button type="submit" className="card btn-enviar-materia">Enviar</button>
          <button type="button" className="card btn-enviar-materia">Cancelar</button>
        </fieldset>
      </form>
    </div>
  )
}