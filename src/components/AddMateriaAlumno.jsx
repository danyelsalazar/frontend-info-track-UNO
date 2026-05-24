import { useState } from "react";
import info from "../data/infotrack_data (1).json";
import '../styles/formAddMateria.css'
const AddMateriaAlumno = () => {
  const { careers, subjects } = info;
    //   informacion sobre la materia a cargar
  const [form, setForm] = useState(
    {
        carrera: 
            {
               name: "",
               id: "" 
            },
        materia: "",
        estado: ""
    }
  )

  const manejarcambioCarrera = (e)=>{
    const {name, value} = e.target

    if(value === ""){
        setForm({
            ...form,
            [name]: name === "carrera" ? {name: "", id: ""} : ""
        })
    }

    // si cambia la carrera pareseo el json y reseteo los otros campos

    if(name === "carrera"){
        setForm({
            carrera: JSON.parse(value),
            materia: "",
            estado:""
        })
    }
    else{
        setForm({
            ...form,
            [name]: value
        })
    }
    
  }

  const handleSubmit = (e)=>{
    e.preventDefault()

    // verificaciones del form
    const carreraIdlimpio = form.carrera.id.toString().trim();
    const carreraNameLimpio = form.carrera.name.toString().trim()
    const materiaLimpio = form.materia.toString().trim()
    const estadoLimpio = form.estado.toString().trim()

    if(!carreraIdlimpio || !carreraNameLimpio || !materiaLimpio || !estadoLimpio){
        alert("Todos los campos son obligatorios")
        return;
    }

    const estadosValidos = ["aprobada", "desaprobada", "cursando"]

    if(!estadosValidos.includes(estadoLimpio)){
        alert("El estado ingresado no es valido")
        return
    }else if(!subjects.some(materia => materia.name === materiaLimpio)){
        alert("La materia no corresponde")
        return
    }else if(!careers.some(carrera => carrera.name === carreraNameLimpio)){
        alert("La carrera no corresponde")
    }

    setForm({
        carrera: {name: "", id: ""},
        materia: "",
        estado: ""
    })
    // aqui ya esta la data limpia para el back
  }
  return (
    <div className="container-add-materia-alumno">
      <form className="form-add-tasks" action="" onSubmit={handleSubmit}>
        {/* SELECT CARRERA */}
        <label htmlFor="selector-carrera">Selecciona una Carrera</label>
        <select
          id="selector-carrera"
          name="carrera"
          value={JSON.stringify(form.carrera)}
          className="select-input"
          onChange={(e)=>{manejarcambioCarrera(e)}}
          required
        >
        <option value="">Seleciona una carrera</option>
          {careers.map((carrera) => (
            <option key={carrera.id} value={JSON.stringify({name: carrera.name, id: carrera.id})}>{carrera.name}</option>
          ))}
        </select>
        {/* SELECT MATERIA */}
        <label htmlFor="selector-materia">Selecciona una Materia</label>
        <select
          id="selector-materia"
          name="materia"
          value={form.materia}
          className="select-input"
          onChange={(e)=>{manejarcambioCarrera(e)}}
          required
        >
           <option value="">Seleciona una materia</option>
          {
            subjects.filter(materia => materia.careerId === form.carrera.id)
            .map(materia => <option key={materia.id} value={materia.name}>{materia.name}</option>)
          }
        </select>
        {/* SELECT ESTADO */}
        <label htmlFor="selector-estado">Selecciona el estado de la materia</label>
        <select
          id="selector-estado"
          name="estado"
          value={form.estado}
          className="select-input"
          onChange={(e)=>{manejarcambioCarrera(e)}}
          required
        >
           <option value="">Seleciona estado</option>
           <option value="aprobada">Aprobada</option>
           <option value="desaprobada">Desaprobada</option>
           <option value="cursando">Cursando</option>
        </select>
        <button type="submit">Cargar materia</button>
      </form>
      <p>{form.carrera.name} - {form.materia} - {form.estado}</p>
    </div>
  );
};

export default AddMateriaAlumno;
