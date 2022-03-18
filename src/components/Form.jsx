import { useState, useEffect } from 'react';
import Error from './Error';

const Form = ({patients, setPatients, patient, setPatient }) => {
	const [name, setName] = useState('');
	const [owner, setOwner] = useState('');
	const [email, setEmail] = useState('');
	const [date, setDate] = useState('');
	const [symptoms, setSymptoms] = useState('');

	const [error, setError] = useState(false);

	useEffect(() => {
		if(Object.keys(patient).length > 0) {
			setName(patient.name)
			setOwner(patient.owner)
			setEmail(patient.email)
			setDate(patient.date)
			setSymptoms(patient.symptoms)
		}
	}, [patient])

	const generateId = () =>{
		const random = Math.random().toString(36).slice(2);
		const date = Date.now().toString(36)

		return random + date;

	}

		const handleSubmit = (e) =>{
		e.preventDefault();

		// Form Validation
		if ([name, owner, email, date, symptoms].includes('')) {
			console.log('Hay al menos un campo vacío');
			setError(true);
			return;
		}
		setError(false);
		// Patients Object
		const patientObject = {
			name, 
			owner, 
			email, 
			date, 
			symptoms,
			// id: generateId()
		}
		if(patient.id) {
			// Editing the registry
			patientObject.id = patient.id;
			const updatedPatients = patients.map( patientState => patientState.id === patient.id ? patientObject : patientState )
			setPatients(updatedPatients)
			setPatient({})

		}
		else{
			// New register
			patientObject.id = generateId();
			setPatients([...patients, patientObject])
		}
		// reset form
		setName('');
		setOwner('');
		setEmail('');
		setDate('');
		setSymptoms('');
	}

  return (
	 <div className="md:w-1/2 lg:w-2/5 mx-5">
		<h2 className="font-black text-3xl text-center">
			Patient Follow-ups
		</h2>
		<p className="text-lg mt-5 text-center mb-10">
			Add and manage {''}
			<span className="text-indigo-600 font-bold ">Patients</span>
		</p>
		<form
			onSubmit={handleSubmit} 
			className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
		>
			{ error && <Error>All fields are required</Error>}
			<div className="mb-5">
				<label htmlFor="pet" className="block text-gray-700 uppercase font-bold">
					Pet's Name
				</label>
				<input
					id="pet"
					type='text'
					placeholder="Pet's name"
					className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
					value={name}
					onChange={(event)=>{setName(event.target.value)}}
				/>
			</div>

			<div className="mb-5">
				<label htmlFor="owner" className="block text-gray-700 uppercase font-bold">
					Owner's Name
				</label>
				<input
					id="owner"
					type='text'
					placeholder="Owner's name"
					className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
					value={owner}
					onChange={(event)=>{setOwner(event.target.value)}}
				/>
			</div>

			<div className="mb-5">
				<label htmlFor="email" className="block text-gray-700 uppercase font-bold">
					Email
				</label>
				<input
					id="email"
					type='text'
					placeholder="Email Contact Owner"
					className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
					value={email}
					onChange={(event)=>{setEmail(event.target.value)}}
				/>
			</div>

			<div className="mb-5">
				<label htmlFor="discharge" className="block text-gray-700 uppercase font-bold">
					Discharge date
				</label>
				<input
					id="discharge"
					type='date'
					className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
					value={date}
					onChange={(event)=>{setDate(event.target.value)}}
				/>
			</div>
		
			<div className="mb-5">
				<label htmlFor="symptoms" className="block text-gray-700 uppercase font-bold">
					Symptoms
				</label>
				<textarea
					id="symptoms"
					className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
					placeholder="Describes the symptoms"
					value={symptoms}
					onChange={(event)=>{setSymptoms(event.target.value)}}
				/>
			</div>

			<input
				type ="submit"
				className ="bg-indigo-600 w-full p-3 text-white uppercase font-bold 
					hover:bg-indigo-800 cursor-pointer transition-all"
				value = {patient.id ? 'Edit patient' : 'Add Patient' }
			/>
		</form>
	 </div>
  )
}

export default Form