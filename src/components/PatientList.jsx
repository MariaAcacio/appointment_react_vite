import Patient from "./Patient"

const PatientList = ({ patients, setPatient, removePatient }) => {


  return (
	  <div className="md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll">
	  	{ patients && patients.length ? (
			<>	  
				<h2 className="font-black text-3xl text-center">Patient List</h2>		
				<p className="text-xl mt-5 mb-10 text-center">
					Manage your {''}
					<span className="text-indigo-600 font-bold ">Patients and Appointments</span>
				</p>
				{ patients.map( (patient) => (
					<Patient
						key = {patient.id}
						patient = {patient}
						setPatient = {setPatient}
						removePatient = {removePatient}
					/>
				))}
			</>
		) : (
			<>
				<h2 className="font-black text-3xl text-center">There is not patients</h2>		
				<p className="text-xl mt-5 mb-10 text-center">
					You can start by adding patients and will appear in this place {''}
					<span className="text-indigo-600 font-bold ">Patients and Appointments</span>
				</p>
			</>
			)
		}
		  
	  </div>
  )
}

export default PatientList
